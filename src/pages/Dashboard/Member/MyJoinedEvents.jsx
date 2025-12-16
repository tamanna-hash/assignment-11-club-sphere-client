import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import MyJoinedEventCard from "../../../components/Home/cards/MyJoinedEventCard";
import { motion } from "framer-motion";
const MyJoinedEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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
    <>
      <title>ClubSphere-My Joined Events</title>

      <h1 className="main-title">
        My Joined Events
      </h1>
      <p className="subtitle">
        Check the events you're registered for and upcoming events
      </p>
      <section className="p-6 min-h-screen">
        {joinedEvents.length === 0 ? (
          <p className="text-center text-slate-800 mt-20">
            You haven't joined any Events yet or waiting for admin approval.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {joinedEvents.map((event, index) => (
              <MyJoinedEventCard key={event._id} event={event} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default MyJoinedEvents;
