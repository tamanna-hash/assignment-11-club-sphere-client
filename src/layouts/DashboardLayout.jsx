import { Outlet } from "react-router";
import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import MenuItem from "../components/Dashboard/Sidebar/Menu/MenuItem";
import Navbar from "../components/Shared/Navbar/Navbar";
import UserDropdown from "../components/Shared/dropdown/UserDropdown";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch notifications
  const { data: notifications = [], refetch: refetchNotifications } = useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch unread count
  const { data: unreadData = { count: 0 } } = useQuery({
    queryKey: ["unread-notifications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications/${user?.email}/unread-count`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const markAsRead = async (notificationId) => {
    try {
      await axiosSecure.patch(`/notifications/${notificationId}/read`);
      refetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axiosSecure.patch(`/notifications/${user?.email}/read-all`);
      refetchNotifications();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'membership_approved':
        return 'bg-green-500';
      case 'event_created':
        return 'bg-blue-500';
      case 'payment_received':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="drawer lg:drawer-open">
        {/* Drawer toggle checkbox */}
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* Drawer content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Enhanced Dashboard Navbar */}
          <nav className="navbar w-full border-b border-gray-200 bg-base-200/80 shadow-sm sticky top-0 z-50">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="dashboard-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost text-gray-600 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
            </div>

            {/* Logo/Brand */}
            <div className="flex-1">
              <div className="flex items-center gap-3 px-4">
                <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="px-2 py-1 rounded-lg bg-[#1A1433] text-[#9B8CFF] text-sm font-bold border border-[#2A2452]">
            CS
          </span>

                </div>
                <div>
                  <h1 className="text-xl font-bold text-base-content/90">ClubSphere</h1>
                  <p className="text-xs text-base-content/60 hidden sm:block">Dashboard</p>
                </div>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex-none">
              <div className="flex items-center gap-2">
                {/* Notifications */}
                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    className="btn btn-ghost btn-circle btn-sm text-gray-600 hover:bg-gray-100 relative"
                  >
                    <FaBell className="h-4 w-4" />
                    {unreadData.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadData.count > 9 ? '9+' : unreadData.count}
                      </span>
                    )}
                  </button>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 p-0 w-80 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-hidden"
                  >
                    {/* Header */}
                    <li className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Notifications</span>
                        {unreadData.count > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-purple-600 hover:text-purple-800"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                    </li>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li key={notification._id}>
                            <div
                              className={`flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer ${
                                !notification.isRead ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => !notification.isRead && markAsRead(notification._id)}
                            >
                              <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationIcon(notification.type)}`}></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatTimeAgo(notification.createdAt)}
                                </p>
                              </div>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              )}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="p-8 text-center text-base-content/50">
                          <FaBell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No notifications yet</p>
                        </li>
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <li className="border-t border-gray-100">
                        <a className="text-center text-sm text-purple-600 hover:bg-purple-50 py-3 block">
                          View all notifications
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                {/* User Info & Dropdown */}
                <div className="flex items-center gap-3 ml-2">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-base-content/90">
                      {user?.displayName || user?.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {user?.email}
                    </p>
                  </div>
                  <UserDropdown />
                </div>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main className="flex-1 p-4 ">
            <Outlet />
          </main>
        </div>

        {/* Drawer sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <aside className="flex min-h-full pt-17 md:pt-0 flex-col w-64 lg:w-64 bg-gray-800 text-white">
            <MenuItem />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
