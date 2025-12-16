import SellerOrderDataRow from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import UserDataTable from "../../../components/Dashboard/Tables/UserDataTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentTable from "../../../components/Dashboard/Tables/PaymentTable";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const result = await axiosSecure(`/all-payments`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
    <title>ClubSphere- Payment Records</title>
      <h1 className="main-title">Payment Records</h1>
      <p className="subtitle">View and manage all payment transactions</p>
      <div className="overflow-x-auto bg-base-300">
        <table className="table table-zebra ">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Category</th>
              
              <th>User Email</th>
              
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <PaymentTable
                key={payment._id}
                payment={payment}
                refetch={refetch}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
