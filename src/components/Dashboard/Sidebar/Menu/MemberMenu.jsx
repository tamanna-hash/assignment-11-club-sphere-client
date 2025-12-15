import React from "react";
import { CgCardClubs } from "react-icons/cg";
import { FaCreditCard, FaUser, FaUserTag } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { Link } from "react-router";

const MemberMenu = () => {
  return (
    <ul className="menu p-4 w-64 bg-gray-800 text-white gap-2 menu-item">
      {/* My Memberships */}
      <li>
        <Link
          to="my-memberships"
          className="flex items-center gap-2 tooltip tooltip-right"
          data-tip="My Memberships"
        >
          <FaCreditCard />
          <span className="truncate">My Memberships</span>
        </Link>
      </li>

      {/* My Joined Events */}
      <li>
        <Link
          to="my-joined-events"
          className="flex items-center gap-2 tooltip tooltip-right"
          data-tip="My Joined Events"
        >
          <MdOutlineEventAvailable />
          <span className="truncate">My Joined Events</span>
        </Link>
      </li>

      {/* My Joined Clubs */}
      <li>
        <Link
          to="my-joined-clubs"
          className="flex items-center gap-2 tooltip tooltip-right"
          data-tip="My Joined Clubs"
        >
          <CgCardClubs />
          <span className="truncate">My Joined Clubs</span>
        </Link>
      </li>

      {/* Become a Manager */}
      <li>
        <Link
          to="become-manager"
          className="flex items-center gap-2 tooltip tooltip-right"
          data-tip="Become a Manager"
        >
          <FaUserTag />
          <span className="truncate">Become a Manager</span>
        </Link>
      </li>
    </ul>
  );
};

export default MemberMenu;
