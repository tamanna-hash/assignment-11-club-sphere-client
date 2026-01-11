import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { FaChartBar, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

const UserDropdown = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Enhanced Theme Toggle */}
      <div className="tooltip tooltip-bottom" data-tip="Toggle theme">
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm text-gray-600 hover:bg-gray-100">
          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={localStorage.getItem("theme") === "dark"}
          />
          <FaSun className="swap-on h-4 w-4" />
          <FaMoon className="swap-off h-4 w-4" />
        </label>
      </div>

      {/* User Dropdown */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-gray-100">
          <div className="w-8 rounded-full ring-2 ring-purple-200 hover:ring-purple-300 transition-all">
            <img 
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=8b5cf6&color=fff`} 
              alt="avatar" 
              className="rounded-full"
            />
          </div>
        </div>
        <ul
          className="menu dropdown-content mt-3 p-0 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* User Info Header */}
          <li className="px-4 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full ring-2 ring-purple-200">
                <img 
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=8b5cf6&color=fff`} 
                  alt="avatar" 
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {user?.displayName || user?.email?.split("@")[0]}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </li>

          {/* Menu Items */}
          <li>
            <Link 
              to="/dashboard/profile" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaUser className="text-gray-500" />
              <span>Profile</span>
            </Link>
          </li>

          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaChartBar className="text-gray-500" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="border-t border-gray-100">
            <button 
              onClick={logOut} 
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <PiSignOutBold className="text-red-500" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;