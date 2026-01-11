import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaUsers,
  FaCalendarAlt,
  FaCreditCard,
  FaLayerGroup,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaClock,
  FaUserCheck,
  FaChartLine,
  FaChartBar,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ErrorPage from "../../../pages/ErrorPage";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  
  // ===== Admin Summary =====
  const {
    data: adminData,
    isLoading: adminLoading,
    error: adminError,
  } = useQuery({
    queryKey: ["adminSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-summary");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Loading state
  const isLoading = adminLoading;
  
  // Error handling
  const hasError = adminError;
  
  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
  
  if (hasError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
        <p className="text-gray-600">Please try refreshing the page</p>
      </div>
    </div>
  );

  const {
    totalUsers = 0,
    clubsSummary = { pending: 0, approved: 0 },
    totalMemberships = 0,
    totalEvents = 0,
    totalPayments = 0,
    membershipsPerClub = [],
  } = adminData || {};

  // Colors for charts
  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  // Prepare club status data for pie chart
  const clubStatusData = [
    { name: 'Approved', value: clubsSummary.approved, color: '#10b981' },
    { name: 'Pending', value: clubsSummary.pending, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ===== Header Section ===== */}
        <header className="text-center lg:text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive overview of platform analytics and management
          </p>
        </header>

        {/* ===== Key Performance Indicators ===== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={<FaUsers className="text-xl" />}
            color="#8b5cf6"
          />
          <StatCard
            title="Approved Clubs"
            value={clubsSummary.approved}
            icon={<FaLayerGroup className="text-xl" />}
            color="#06b6d4"
          />
          <StatCard
            title="Total Memberships"
            value={totalMemberships}
            icon={<FaUserCheck className="text-xl" />}
            color="#10b981"
          />
          <StatCard
            title="Platform Revenue"
            value={`$${totalPayments?.toLocaleString() || 0}`}
            icon={<FaCreditCard className="text-xl" />}
            color="#f59e0b"
          />
        </section>

        {/* ===== Platform Overview ===== */}
        <section className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Platform Overview
            </h3>
            <p className="text-gray-600">
              Key platform metrics comparison
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalUsers}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">{clubsSummary.approved}</div>
              <div className="text-sm text-gray-600">Active Clubs</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalMemberships}</div>
              <div className="text-sm text-gray-600">Memberships</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">{totalEvents}</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
          </div>
        </section>

        {/* ===== Analytics Section ===== */}
        <section className="space-y-8">
          {/* Memberships per Club */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Memberships per Club
              </h3>
              <p className="text-gray-600">
                Member distribution across clubs
              </p>
            </div>
            
            {membershipsPerClub?.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={membershipsPerClub} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="clubName" 
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="totalMembers"
                    fill="url(#adminGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="adminGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="No membership data available" />
            )}
          </div>

          {/* Club Status Distribution */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Club Status Distribution
              </h3>
              <p className="text-gray-600">
                Approved vs pending clubs
              </p>
            </div>
            
            {clubStatusData?.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={clubStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {clubStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="No club status data available" />
            )}
          </div>
        </section>

        {/* ===== Management Actions ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Pending Approvals
              </h3>
              <p className="text-gray-600">
                Items requiring admin attention
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-3">
                  <FaClock className="text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Pending Clubs</p>
                    <p className="text-sm text-gray-600">Awaiting approval</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {clubsSummary.pending}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Quick Statistics
              </h3>
              <p className="text-gray-600">
                Platform health indicators
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Members per Club</span>
                <span className="font-semibold text-gray-900">
                  {clubsSummary.approved > 0 ? Math.round(totalMemberships / clubsSummary.approved) : 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Events per Club</span>
                <span className="font-semibold text-gray-900">
                  {clubsSummary.approved > 0 ? Math.round(totalEvents / clubsSummary.approved) : 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Revenue per User</span>
                <span className="font-semibold text-gray-900">
                  ${totalUsers > 0 ? Math.round(totalPayments / totalUsers) : 0}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminStatistics;

/* ===== Clean Minimal Stat Card Component ===== */
const StatCard = ({ title, value, icon, color = "#8b5cf6" }) => {
  // Generate mock trend data for the mini chart
  const trendData = Array.from({ length: 7 }, (_, i) => ({
    value: Math.floor(Math.random() * 50) + 20 + i * 2
  }));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="text-2xl font-bold text-gray-900">
          {typeof value === 'string' && value.startsWith('$') 
            ? value 
            : (value?.toLocaleString() || 0)
          }
        </h3>
      </div>

      {/* Mini Line Chart */}
      <div className="h-12 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ===== Empty State Component ===== */
const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
    <FaExclamationTriangle className="text-4xl mb-4 opacity-50" />
    <p className="text-lg font-medium">{message}</p>
    <p className="text-sm opacity-75 mt-2">Data will appear here once available</p>
  </div>
);