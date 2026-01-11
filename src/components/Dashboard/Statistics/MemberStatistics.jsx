import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
  
  // ===== Member Overview =====
  const {
    data: memberData,
    isLoading: memberLoading,
    error: memberError,
  } = useQuery({
    queryKey: ["memberOverview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-overview/${user?.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Loading state
  const isLoading = memberLoading;
  
  // Error handling
  const hasError = memberError;
  
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
    totalClubsJoined = 0,
    totalEventsRegistered = 0,
    upcomingEvents = [],
  } = memberData || {};

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ===== Header Section ===== */}
        <header className="text-center lg:text-left mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Member Dashboard
          </h1>
          <p className="text-base-content/70">
            Welcome back, {user?.email?.split("@")[0]}! Track your club activities and events
          </p>
        </header>

        {/* ===== Key Performance Indicators ===== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Clubs Joined"
            value={totalClubsJoined}
            icon={<FaLayerGroup className="text-xl" />}
            color="#8b5cf6"
          />
          <StatCard
            title="Events Registered"
            value={totalEventsRegistered}
            icon={<FaCalendarAlt className="text-xl" />}
            color="#06b6d4"
          />
          <StatCard
            title="Upcoming Events"
            value={upcomingEvents?.length || 0}
            icon={<FaClock className="text-xl" />}
            color="#10b981"
          />
          <StatCard
            title="Total Events"
            value={(totalEventsRegistered || 0) + (upcomingEvents?.length || 0)}
            icon={<FaChartBar className="text-xl" />}
            color="#f59e0b"
          />
        </section>

        {/* ===== Member Overview ===== */}
        <section className="bg-base-100 rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-base-content mb-2">
              Member Overview
            </h3>
            <p className="text-base-content/70">
              Your activity summary and engagement metrics
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalClubsJoined}</div>
              <div className="text-sm text-gray-600">Clubs Joined</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalEventsRegistered}</div>
              <div className="text-sm text-gray-600">Events Registered</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">{upcomingEvents?.length || 0}</div>
              <div className="text-sm text-gray-600">Upcoming Events</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">{(totalEventsRegistered || 0) + (upcomingEvents?.length || 0)}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
          </div>
        </section>

        {/* ===== Upcoming Events Section (Unchanged) ===== */}
        <section className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600">
              Events from your joined clubs
            </p>
          </div>
          
          {upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <EmptyState message="No upcoming events from your clubs" />
          )}
        </section>

        {/* ===== Quick Actions ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Member Activity */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Your Activity
              </h3>
              <p className="text-gray-600">
                Recent club and event activities
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <FaLayerGroup className="text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Club Memberships</p>
                    <p className="text-sm text-gray-600">Active memberships</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {totalClubsJoined}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Event Registrations</p>
                    <p className="text-sm text-gray-600">Total registrations</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {totalEventsRegistered}
                </div>
              </div>
            </div>
          </div>

          {/* Member Insights */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Member Insights
              </h3>
              <p className="text-gray-600">
                Your engagement statistics
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Events per Club</span>
                <span className="font-semibold text-gray-900">
                  {totalClubsJoined > 0 ? Math.round(totalEventsRegistered / totalClubsJoined) : 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Upcoming Events</span>
                <span className="font-semibold text-gray-900">
                  {upcomingEvents?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Status</span>
                <span className="font-semibold text-green-600">
                  Active
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberStatistics;

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
          {typeof value === 'string' && (value.startsWith('$') || value === 'Member') 
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
    <p className="text-sm opacity-75 mt-2">Check back later for updates</p>
  </div>
);
