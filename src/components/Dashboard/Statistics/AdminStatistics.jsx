import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ErrorPage from "../../../pages/ErrorPage";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const AdminStatistics = () => {
  // Fetch admin summary using TanStack Query
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-summary");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center mt-10 text-xl"><LoadingSpinner/></div>;
  if (error)
    return <ErrorPage/>

  const {
    totalUsers,
    clubsSummary,
    totalMemberships,
    totalEvents,
    totalPayments,
    membershipsPerClub,
  } = data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        <div className="card bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>

        <div className="card bg-linear-to-r from-green-400 to-teal-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Clubs</h2>
            <p className="text-lg">
              Pending: {clubsSummary.pending} <br />
              Approved: {clubsSummary.approved} <br />
            </p>
          </div>
        </div>

        <div className="card bg-linear-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Total Memberships</h2>
            <p className="text-2xl font-bold">{totalMemberships}</p>
          </div>
        </div>

        <div className="card bg-linear-to-r from-red-400 to-pink-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Total Events</h2>
            <p className="text-2xl font-bold">{totalEvents}</p>
          </div>
        </div>

        <div className="card bg-linear-to-r from-blue-400 to-cyan-500 text-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Total Payments</h2>
            <p className="text-2xl font-bold">${totalPayments}</p>
          </div>
        </div>
      </div>

      {/* Memberships per Club Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Memberships per Club
        </h2>
        {membershipsPerClub && membershipsPerClub.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={membershipsPerClub}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="clubName" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="totalMembers"
                fill="#4f46e5"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No membership data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminStatistics;
