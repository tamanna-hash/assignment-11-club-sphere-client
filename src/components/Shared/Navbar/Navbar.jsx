import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaTachometerAlt,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";
import { PiSignOut, PiSignOutBold } from "react-icons/pi";
import { NavLink, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { PuffLoader } from "react-spinners";
import Logo from "../../Shared/Logo";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/clubs">Clubs</NavLink>
      </li>
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
      <li>
        <NavLink to={"/help"}>Support</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 z-50 transition-all duration-300
      ${scrolled ? "bg-black/60 backdrop-blur-md shadow-lg" : "bg-black/85"}`}
    >
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} className="btn btn-ghost text-white">
            ☰
          </div>
          <ul className="menu nav-li dropdown-content bg-black/80 backdrop-blur-md rounded-box mt-3 w-52 p-2 shadow text-white">
            {navLinks}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu nav-li menu-horizontal font-semibold text-white">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        <div className="mr-2">
          <div className="text-center text-white rounded-[50%] h-7 w-7 hover:bg-white hover:shadow-none hover:text-purple-900">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                onChange={(e) => handleTheme(e.target.checked)}
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className="text-white"
              />

              {/* sun icon */}
              <svg
                className="swap-on h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
        {loading ? (
          <PuffLoader size={24} />
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-purple-400 ring-offset-2">
                <img src={user.photoURL} alt="avatar" />
              </div>
            </div>
            <ul
              className="menu nav-li dropdown-content mt-3 p-2 w-48
              bg-black/70 backdrop-blur-lg rounded-xl shadow-xl text-white"
            >
              <li>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2"
                >
                  <FaUser className="text-white" />
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <FaChartBar className="text-white" />
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="flex items-center gap-2 w-full"
                >
                  <PiSignOutBold className="text-white" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              className="btn btn-sm btn-outline border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700"
              to="/signup"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
