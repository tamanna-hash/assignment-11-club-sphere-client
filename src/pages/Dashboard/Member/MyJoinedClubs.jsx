import { useQuery } from "@tanstack/react-query";
import MyJoinedClubCard from "../../../components/Home/cards/MyJoinedClubCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
const MyJoinedClubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: joinedClubs = [], isLoading } = useQuery({
    queryKey: ["my-joined-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-joined-clubs");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <title>ClubSphere-My Joined Clubs</title>
      <h1 className="main-title">My Joined Clubs</h1>
      <p className="subtitle">Browse and manage the clubs you are part of</p>
      <section className="p-6 min-h-screen">
        {joinedClubs.length === 0 ? (
          <p className="text-center text-slate-800 mt-20">
            You haven't joined any clubs yet or waiting for admin approval.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {joinedClubs.map((club, index) => (
              <MyJoinedClubCard key={club._id} club={club} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default MyJoinedClubs;
