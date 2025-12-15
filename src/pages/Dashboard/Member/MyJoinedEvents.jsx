import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import MyJoinedEventCard from "../../../components/Home/cards/MyJoinedEventCard";
import { motion } from "framer-motion";
const MyJoinedEvents = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
  const { data: joinedEvents = [], isLoading } = useQuery({
    queryKey: ["joinedEvents", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-joined-events");
      return res.data;
    },
  });
console.log(joinedEvents);
  if (isLoading) return <p>Loading...</p>;

  return (
     <section className="p-6 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        My JoinedEvents
      </motion.h1>

      {joinedEvents.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          You haven't joined any Events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {joinedEvents.map((event, index) => (
            <MyJoinedEventCard
              key={event._id}
              event={event}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
   
  );
};

export default MyJoinedEvents;
