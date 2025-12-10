import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { PuffLoader } from "react-spinners";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  const links = (
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
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
             {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">ClubSphere</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              {loading ? (
                <PuffLoader />
              ) : user ? (
                <>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img alt="user photo" src={user?.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to='/dashboard/profile' className="justify-between">Profile</Link>
                    </li>
                    <li>
                      <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                      <Link onClick={handleLogOut}>Logout</Link>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <button className="btn btn-xs border border-cyan-400 hover:text-white bg-transparent md:btn-md md:px-5  hover:bg-cyan-800 transition ">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn btn-xs border border-cyan-400 hover:text-white bg-transparent md:btn-md md:px-5  hover:bg-cyan-800 transition">
                    <Link to="/signup">Register</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
