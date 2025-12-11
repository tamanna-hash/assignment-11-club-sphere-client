import SellerOrderDataRow from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import UserDataTable from "../../../components/Dashboard/Tables/UserDataTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading ,refetch} = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>

              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined at</th>
              <th>Admin actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserDataTable key={user._id} user={user} refetch={refetch} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
