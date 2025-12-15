import { Outlet } from "react-router";
import MenuItem from "../components/Dashboard/Sidebar/Menu/MenuItem";
import Navbar from "../components/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar/>
      <div className="drawer lg:drawer-open pt-17">
        {/* Drawer toggle checkbox */}
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Drawer content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Dashboard Navbar */}
          <nav className="navbar w-full bg-gray-800 text-white shadow-md sticky top-0 ">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block h-5 w-5"
              >
                <path d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <div className="px-4 text-lg font-semibold text-purple-300">
              ClubsSphere Dashboard
            </div>
          </nav>

          {/* Main content */}
          <main className="flex-1 p-6 bg-gray-200">
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
