import React, { useEffect, useState } from "react";
import { FaUser, FaTachometerAlt, FaSignOutAlt, FaChartBar } from "react-icons/fa";
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
        <div className="text-center">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle text-white"
          />
        </div>
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
        <ul className="menu nav-li menu-horizontal gap-2 text-white">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
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
