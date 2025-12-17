import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ErrorPage from "../../../pages/ErrorPage";
import { Link } from "react-router";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
  }),
};

const MemberStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["memberOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-overview/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-10 text-xl">
        <LoadingSpinner />
      </div>
    );
  if (error) return <ErrorPage />;

  const { totalClubsJoined, totalEventsRegistered, upcomingEvents } = data||{};

  return (
    <>
      <title>ClubSphere-Member Dashboard</title>
      <h1 className="main-title">
        Member Dashboard
      </h1>
      <p className="subtitle">
        See your joined clubs, upcoming events, and membership status
      </p>
      <div className="p-6 bg-base-200 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">
          Welcome back, {user?.email.split("@")[0]}!
        </h1>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Clubs Joined",
              value: totalClubsJoined,
              className: "bg-gradient-to-r from-purple-500 to-purple-900",
            },
            {
              title: "Events Registered",
              value: totalEventsRegistered,
              className: "bg-gradient-to-r from-cyan-500 to-cyan-900",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`card shadow-xl text-white ${stat.className}`}
            >
              <div className="card-body">
                <h2 className="card-title text-lg">{stat.title}</h2>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events Grid */}
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Upcoming Events
        </h2>
        {upcomingEvents && upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event._id}
                custom={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
                className="card bg-base-100 shadow-xl rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition-transform duration-300"
              >
                <Link to={`/events/${event._id}`}>
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {event.eventLocation}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {event.eventDate}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming events from your clubs.</p>
        )}
      </div>
    </>
  );
};

export default MemberStatistics;
