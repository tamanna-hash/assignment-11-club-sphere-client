import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ErrorPage from "../../../pages/ErrorPage";

const ManagerStatistics = () => {
  // Fetch manager overview data
  const{user}=useAuth()
   const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["managerSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-overview/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <ErrorPage/>;

  const { numClubs, totalMembers, totalEvents, totalPayments } = data;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Manager Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-linear-to-r from-green-300 to-green-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Clubs Managed</h2>
            <p className="text-3xl font-bold">{numClubs}</p>
          </div>
        </div>

        <div className="card bg-linear-to-r from-blue-300 to-blue-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Total Members</h2>
            <p className="text-3xl font-bold">{totalMembers}</p>
          </div>
        </div>

        <div className="card bg-linear-to-r from-purple-300 to-purple-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Total Events</h2>
            <p className="text-3xl font-bold">{totalEvents}</p>
          </div>
        </div>

        <div className="card bg-linear-to-r from-pink-300 to-pink-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Total Payments</h2>
            <p className="text-3xl font-bold">${totalPayments}</p>
          </div>
        </div>
      </div>

      {/* Optional: Add calm footer or note */}
      <div className="mt-10 text-center text-gray-500">
        <p>Keep up the great work managing your clubs and members!</p>
      </div>
    </div>
  );
};

export default ManagerStatistics;
