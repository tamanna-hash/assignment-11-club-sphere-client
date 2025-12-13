import axios from "axios";
import SellerOrderDataRow from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import ManagerMembershipTable from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageEvents = () => {
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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Name</th>
              <th>Email</th>
              <th>PaymentID</th>
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

export default ManageEvents;
