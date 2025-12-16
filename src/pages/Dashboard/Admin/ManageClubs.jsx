import SellerOrderDataRow from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import UserDataTable from "../../../components/Dashboard/Tables/UserDataTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ClubDataTable from "../../../components/Dashboard/Tables/ClubDataTable";
import AdminClubTable from "../../../components/Dashboard/Tables/AdminClubTable";

const ManageClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: clubRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["club-requests"],
    queryFn: async () => {
      const result = await axiosSecure(`/club-requests`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere- Manage Clubs</title>
      <h1 className="main-title">Manage Clubs</h1>
      <p className="subtitle">Approve, update, or review all clubs on the platform</p>
      <div className="overflow-x-auto bg-base-300">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Club Name</th>
              <th>Manager Email</th>
              <th>Fee</th>
              <th>Created at</th>
              <th>status</th>
              <th>Admin actions</th>
            </tr>
          </thead>
          <tbody>
            {clubRequests.map((club, index) => (
              <AdminClubTable
                key={club._id}
                club={club}
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

export default ManageClubs;
