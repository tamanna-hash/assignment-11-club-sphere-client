import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MyPayments = () => {
  const {user}=useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: payments, isLoading } = useQuery({
    queryKey: ["payment",user?.email],
    queryFn: async () => {
      const result = await axiosSecure("/my-payments");
      return result.data;
    },
  });

  const { data: clubs, isLoading: clubLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/clubs`);
      return result.data.data;
    },
  });
  if (isLoading || clubLoading) return <LoadingSpinner />;
  return (
    <div>
      <h1 className="main-title">My Payments</h1>
      <div className="overflow-x-auto bg-base-100">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Club</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i) => (
              <tr key={payment._id}>
                <th>{i + 1}</th>
                <td>{new Date(payment?.createdAt).toLocaleString()}</td>
                <td>
                  {clubs?.find((c) => c._id === payment.clubId)?.category ||
                    "Unknown"}
                </td>
                <td>
                  {clubs?.find((c) => c._id === payment.clubId)?.clubName ||
                    "Unknown"}
                </td>

                <td>$ {payment?.amount}</td>
                <td>
                  <p
                    className={`${
                      payment?.status === "paid" && "text-green-600"
                    }`}
                  >
                    {payment?.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPayments;
