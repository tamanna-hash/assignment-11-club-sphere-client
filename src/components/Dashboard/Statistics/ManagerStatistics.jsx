import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ErrorPage from "../../../pages/ErrorPage";
import {
  FaUsers,
  FaCalendarAlt,
  FaCreditCard,
  FaLayerGroup,
} from "react-icons/fa";
const ManagerStatistics = () => {
  // Fetch manager overview data
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["managerSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-overview/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <ErrorPage />;

  const { numClubs, totalMembers, totalEvents, totalPayments } = data||{};

  return (
    <>
      <title>ClubSphere-Manager Dashboard</title>
      <h1 className="main-title">Manager Dashboard</h1>
      <p className="subtitle">
        Oversee your clubs, events, and member engagement with ease
      </p>

      <div className="p-6 bg-base-200 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Clubs Managed */}
          <div className="card bg-linear-to-r from-cyan-700 to-cyan-500 text-white shadow-lg rounded-2xl hover:scale-[1.03] transition-transform flex items-center gap-4 p-4">
            <FaLayerGroup className="text-4xl md:text-5xl" />
            <div className="card-body p-0">
              <h2 className="card-title text-lg md:text-xl font-semibold">
                Clubs Managed
              </h2>
              <p className="text-3xl md:text-4xl font-bold">{numClubs}</p>
            </div>
          </div>

          {/* Total Members */}
          <div className="card bg-linear-to-r from-teal-700 to-teal-500 text-white shadow-lg rounded-2xl hover:scale-[1.03] transition-transform flex items-center gap-4 p-4">
            <FaUsers className="text-4xl md:text-5xl" />
            <div className="card-body p-0">
              <h2 className="card-title text-lg md:text-xl font-semibold">
                Total Members
              </h2>
              <p className="text-3xl md:text-4xl font-bold">{totalMembers}</p>
            </div>
          </div>

          {/* Total Events */}
          <div className="card bg-linear-to-r from-purple-800 to-purple-400 text-white shadow-lg rounded-2xl hover:scale-[1.03] transition-transform flex items-center gap-4 p-4">
            <FaCalendarAlt className="text-4xl md:text-5xl" />
            <div className="card-body p-0">
              <h2 className="card-title text-lg md:text-xl font-semibold">
                Total Events
              </h2>
              <p className="text-3xl md:text-4xl font-bold">{totalEvents}</p>
            </div>
          </div>

          {/* Total Payments */}
          <div className="card bg-linear-to-r from-blue-900 to-indigo-500 text-white shadow-lg rounded-2xl hover:scale-[1.03] transition-transform flex items-center gap-4 p-4">
            <FaCreditCard className="text-4xl md:text-5xl" />
            <div className="card-body p-0">
              <h2 className="card-title text-lg md:text-xl font-semibold">
                Total Payments
              </h2>
              <p className="text-3xl md:text-4xl font-bold">${data?.totalPayments}</p>
            </div>
          </div>
        </div>
        {/* Optional: Add calm footer or note */}
        <div className="mt-10 text-center text-gray-500">
          <p>Keep up the great work managing your clubs and members!</p>
        </div>
      </div>
    </>
  );
};

export default ManagerStatistics;
