import axios from "axios";
import SellerOrderDataRow from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import ManagerMembershipTable from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageMemberships = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: memberships = [], isLoading ,refetch} = useQuery({
    queryKey: ["memberships", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(
        `/manage-memberships`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
     <title>ClubSphere- Manage Memberships</title>
      <h1 className="main-title">Manage Memberships</h1>
      <p className="subtitle">View and monitor the memberships under your supervision</p>
      <div className="overflow-x-auto bg-base-300">
        <table className="table table-zebra table-sm">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Name</th>
              <th>Email</th>
              <th>Membership Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((membership, index) => (
              <ManagerMembershipTable
                key={membership._id}
                membership={membership}
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

export default ManageMemberships;
