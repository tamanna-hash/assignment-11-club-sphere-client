import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ClubDataTable from "../../../components/Dashboard/Tables/ClubDataTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyInventory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(
        `/my-inventory/${user?.email}`
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
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <ClubDataTable
                key={club._id}
                club={club}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyInventory;
