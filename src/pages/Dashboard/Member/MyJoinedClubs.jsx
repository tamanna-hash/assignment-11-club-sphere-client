import { useQuery } from "@tanstack/react-query";
import MyJoinedClubCard from "../../../components/Home/MyJoinedClubCard";
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
    <section className="p-6 min-h-screen bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        My Joined Clubs
      </motion.h1>

      {joinedClubs.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          You haven’t joined any clubs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {joinedClubs.map((club, index) => (
            <MyJoinedClubCard
              key={club._id}
              club={club}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyJoinedClubs;