import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyClubMembers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: memberships = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: ["memberships", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(
        `/manage-memberships?status=joined,pending`
      );
      return result.data;
    },
  });
  if (isError) return "something went wrongヽ（≧□≦）ノ";
  const handleExpireMembership = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, expire it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axiosSecure.patch(`/memberships/${id}/expire`);
          refetch();
          console.log(result);
          if (result.data.modifiedCount === 1 || result.data.success) {
              Swal.fire({
                title: "Expired!",
                text: "Membership expired successfully",
                icon: "success",
              });
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to expire membership");
        }
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Joined at</th>
              <th>Membership Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((membership, i) => (
              <tr key={membership._id}>
                <th>{i + 1}</th>
                <td>{membership.member}</td>
                <td>{new Date(membership.joined_at).toLocaleString()}</td>
                <td>
                  <p
                    className={`${
                      membership.status === "expired"
                        ? "text-red-400"
                        : "text-green-500"
                    }`}
                  >
                    {membership.status}
                  </p>
                </td>
                <td>
                  <button
                    disabled={membership.status === "expired"}
                    onClick={() => handleExpireMembership(membership._id)}
                    className="btn btn-sm text-slate-700 bg-purple-200 hover:bg-purple-100"
                  >
                    Expire
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClubMembers;
