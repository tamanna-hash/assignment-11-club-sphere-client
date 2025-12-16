import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ClubDataTable from "../../../components/Dashboard/Tables/ClubDataTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubs", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-inventory/${user?.email}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere- My Clubs</title>
      <h1 className="main-title">My Clubs</h1>
      <p className="subtitle">Access and manage the clubs you are responsible for</p>
      <div className="overflow-x-auto bg-base-300">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="">
              <th></th>
              <th>Category</th>
              <th>Name</th>
              <th>Fee</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <ClubDataTable
                key={club._id}
                club={club}
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

export default MyClubs;
