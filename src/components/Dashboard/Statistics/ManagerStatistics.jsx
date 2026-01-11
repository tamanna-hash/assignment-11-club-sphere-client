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
  AreaChart,
  Area,
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
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ErrorPage from "../../../pages/ErrorPage";

const ManagerStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ===== Overview Statistics =====
  const {
    data: overview,
    isLoading: overviewLoading,
    error: overviewError,
  } = useQuery({
    queryKey: ["manager-overview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-overview/${user.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // ===== Members Per Club =====
  const {
    data: membersPerClub,
    isLoading: membersLoading,
    error: membersError,
  } = useQuery({
    queryKey: ["members-per-club", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-members-per-club/${user.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // ===== Clubs vs Events =====
  const {
    data: clubsVsEvents,
    isLoading: chartLoading,
    error: chartError,
  } = useQuery({
    queryKey: ["manager-chart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-chart/${user.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // ===== Growth Analytics =====
  const {
    data: growth,
    isLoading: growthLoading,
    error: growthError,
  } = useQuery({
    queryKey: ["manager-growth", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-growth/${user.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // ===== Demographics =====
  const {
    data: demographics,
    isLoading: demographicsLoading,
    error: demographicsError,
  } = useQuery({
    queryKey: ["manager-demographics", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-demographics/${user.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // ===== Recent Activity =====
  const {
    data: recentActivity,
    isLoading: activityLoading,
    error: activityError,
  } = useQuery({
    queryKey: ["manager-recent-activity", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-recent-activity/${user.email}`);
      return res.data;
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  // Loading state
  const isLoading = overviewLoading || membersLoading || chartLoading || growthLoading || demographicsLoading || activityLoading;
  
  // Error handling
  const hasError = overviewError || membersError || chartError || growthError || demographicsError || activityError;
  
  // Debug logging
  console.log('ManagerStatistics Debug:', {
    isLoading,
    hasError,
    user: user?.email,
    overview,
    errors: { overviewError, membersError, chartError, growthError, demographicsError, activityError }
  });
  
  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
  
  if (hasError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-base-content/90 mb-2">Error Loading Dashboard</h2>
        <p className="text-base-content/70">Please try refreshing the page</p>
      </div>
    </div>
  );

  const {
    numClubs = 0,
    totalMembers = 0,
    totalEvents = 0,
    totalPayments = 0,
    pendingMemberships = 0,
    upcomingEvents = 0,
  } = overview || {};

  const growthRate = growth?.insights?.memberGrowthRate || 0;
  const isPositiveGrowth = growthRate >= 0;

  // Colors for charts
  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  // Prepare pie chart data for demographics
  const pieChartData = demographics?.map((item, index) => ({
    name: item.category,
    value: item.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ===== Header Section ===== */}
        <header className="text-center lg:text-left mb-8">
          <h1 className="text-3xl font-bold text-base-content/90 mb-2">
            Manager Dashboard
          </h1>
          <p className="text-base-content/70">
            Comprehensive analytics and performance insights
          </p>
        </header>

        {/* ===== Key Performance Indicators ===== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Clubs Managed"
            value={numClubs}
            icon={<FaLayerGroup className="text-xl" />}
            description="Active clubs under management"
            color="#8b5cf6"
          />
          <StatCard
            title="Total Members"
            value={totalMembers}
            icon={<FaUsers className="text-xl" />}
            description="Registered club members"
            color="#06b6d4"
          />
          <StatCard
            title="Events Organized"
            value={totalEvents}
            icon={<FaCalendarAlt className="text-xl" />}
            description="Total events hosted"
            color="#10b981"
          />
          <StatCard
            title="Revenue Generated"
            value={`$${totalPayments?.toLocaleString() || 0}`}
            icon={<FaCreditCard className="text-xl" />}
            description="Total revenue collected"
            color="#f59e0b"
          />
          <StatCard
            title="Pending Requests"
            value={pendingMemberships}
            icon={<FaClock className="text-xl" />}
            description="Awaiting approval"
            color="#ef4444"
          />
          <StatCard
            title="Upcoming Events"
            value={upcomingEvents}
            icon={<FaChartBar className="text-xl" />}
            description="Future events scheduled"
            color="#8b5cf6"
          />
        </section>

        {/* ===== Growth Analytics ===== */}
        <section className="bg-base rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-base-content/90 mb-2">
                Growth Analytics
              </h2>
              <p className="text-base-content/70">
                Track member and event growth trends over time
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                isPositiveGrowth 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isPositiveGrowth ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(growthRate)}% this month
              </div>
            </div>
          </div>

          {growth?.growthData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={growth.growthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="label" 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
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
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalMembers"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
                  name="Total Members"
                />
                <Line
                  type="monotone"
                  dataKey="totalEvents"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                  name="Total Events"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState message="No growth data available" />
          )}
        </section>

        {/* ===== Detailed Analytics ===== */}
        <section className="space-y-8">
          {/* Member Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Members Distribution */}
            <div className="bg-base rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-base-content/90 mb-2">
                  Member Distribution
                </h3>
                <p className="text-base-content/70">
                  Members across different clubs
                </p>
              </div>
              
              {membersPerClub?.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={membersPerClub} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="label" 
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
                        color:"black",
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#memberGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState message="No member data available" />
              )}
            </div>

            {/* Category Demographics Pie Chart */}
            <div className="bg-base rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-base-content/90 mb-2">
                  Members by Category
                </h3>
                <p className="text-base-content/70">
                  Distribution across club categories
                </p>
              </div>
              
              {pieChartData?.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
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
                <EmptyState message="No category data available" />
              )}
            </div>
          </div>

          {/* Activity Overview - Full Width */}
          <div className="bg-base rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-base-content/90 mb-2">
                Activity Overview
              </h3>
              <p className="text-base-content/70">
                Comprehensive metrics comparison
              </p>
            </div>
            
            {clubsVsEvents?.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={clubsVsEvents} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="label" 
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
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
                      color:"black",
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill={(entry) => entry.color || "#10b981"}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="No activity data available" />
            )}
          </div>
        </section>

        {/* ===== Recent Activity Section ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Memberships */}
          <div className="bg-base rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-base-content/90 mb-2">
                Recent Memberships
              </h3>
              <p className="text-base-content/70">
                Latest member activities
              </p>
            </div>
            
            {recentActivity?.recentMemberships?.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.recentMemberships.slice(0, 5).map((membership, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        membership.status === 'joined' ? 'bg-green-500' : 
                        membership.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <p className="font-semibold text-base-content/90">{membership.member}</p>
                        <p className="text-sm text-base-content/70">{membership.clubName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-base-content/90">
                        ${membership.fee || 0}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {membership.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No recent memberships" />
            )}
          </div>

          {/* Recent Events */}
          <div className="bg-base rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-base-content/90 mb-2">
                Recent Events
              </h3>
              <p className="text-base-content/70">
                Latest event activities
              </p>
            </div>
            
            {recentActivity?.recentEvents?.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.recentEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-500" />
                      <div>
                        <p className="font-semibold text-base-content/90">{event.title}</p>
                        <p className="text-sm text-base-content/70">
                          {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-base-content/90">
                        {event.isPaid ? `$${event.eventFee}` : 'Free'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No recent events" />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerStatistics;

/* ===== Clean Minimal Stat Card Component ===== */
const StatCard = ({ title, value, icon, description, color = "#8b5cf6" }) => {
  // Generate mock trend data for the mini chart
  const trendData = Array.from({ length: 7 }, (_, i) => ({
    value: Math.floor(Math.random() * 50) + 20 + i * 2
  }));

  return (
    <div className="bg-base rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-base-200 rounded-lg text-base-content/70">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="text-3xl font-bold text-base-content/90 mb-1">
          {typeof value === 'string' && value.startsWith('$') 
            ? value 
            : (value?.toLocaleString() || 0)
          }
        </h3>
      </div>

      {/* Mini Line Chart */}
      <div className="h-12 mb-3">
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
      
      <p className="text-sm text-base-content/70">{description}</p>
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