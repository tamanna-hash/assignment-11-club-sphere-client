import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ClubDataTable from "../../../components/Dashboard/Tables/ClubDataTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import PendingClubDataTable from "../../../components/Dashboard/Tables/PendingClubDataTable";

const PendingClubs = () => {
  const [role] = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: clubPending = [], isLoading,refetch } = useQuery({
    queryKey: ["clubPending", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/clubs-pending`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
    <title>ClubSphere- My Pending Clubs</title>
      <h1 className="main-title">My Pending Clubs</h1>
      <p className="subtitle">Track, edit, and organize the clubs in pending</p>
      <div className="overflow-x-auto bg-base-300">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Name</th>
              <th>Fee</th>
              <th>Membership Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubPending.map((club, index) => (
              <PendingClubDataTable key={club._id} club={club} index={index} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PendingClubs;
