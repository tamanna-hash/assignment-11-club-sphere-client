import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManagerMembershipTable from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import ManagerRequestsTable from "../../../components/Dashboard/Tables/ManagerRequestsTable";

const ManagerRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/manager-requests`);
      return result.data;
    },
  });
console.log(requests);
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <ManagerRequestsTable
                key={request._id}
                request={request}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManagerRequests;
