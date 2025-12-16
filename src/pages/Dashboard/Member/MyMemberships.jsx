import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import MemberMembershipTable from "../../../components/Dashboard/Tables/MemberMembershipTable";

const MyMemberships = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: memberships = [], isLoading } = useQuery({
    queryKey: ["memberships", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-memberships`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere-My Memberships</title>
      <h1 className="main-title">My Memberships</h1>
      <p className="subtitle">View your membership status and renewal info</p>
      {memberships.length === 0 && (
        <h1 className="text-2xl font-bold">
          Your Not A Member of Any Clubs Yet{" "}
        </h1>
      )}
      <div className="container mx-auto px-4 sm:px-8 bg-base-100">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Fee</th>
                      <th>Status</th>
                      <th>Joined at</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberships.map((membership, index) => (
                      <MemberMembershipTable
                        membership={membership}
                        key={membership._id}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMemberships;
