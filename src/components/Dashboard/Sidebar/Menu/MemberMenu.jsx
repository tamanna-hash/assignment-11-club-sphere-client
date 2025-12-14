import React from "react";
import { CgCardClubs } from "react-icons/cg";
import { FaCreditCard, FaUser } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { Link } from "react-router";

const MemberMenu = () => {
  return (
    <>
      {/* my memberships */}
      <li>
        <Link
          to="my-memberships"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Memberships"
        >
          <FaCreditCard />
          <span className="is-drawer-close:hidden">My Memberships</span>
        </Link>
      </li>
      {/* my joined events */}
      <li>
        <Link
          to="my-joined-events"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My joined Events"
        >
         <MdOutlineEventAvailable />
          <span className="is-drawer-close:hidden">My joined Events</span>
        </Link>
      </li>
      {/* my joined clubs */}
      <li>
        <Link
          to="my-joined-clubs"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My joined Clubs"
        >
          <CgCardClubs />
          <span className="is-drawer-close:hidden">My joined Clubs</span>
        </Link>
      </li>
      {/* become a manager */}
      <li>
        <Link
          to="become-manager"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Become a Manager"
        >
          <FaUser />
          <span className="is-drawer-close:hidden">Become a Manager</span>
        </Link>
      </li>
    </>
  );
};

export default MemberMenu;
