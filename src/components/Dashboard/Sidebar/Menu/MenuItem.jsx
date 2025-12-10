import React from "react";
import { BsFileBarGraph } from "react-icons/bs";
import { FaCcDinersClub, FaHome } from "react-icons/fa";
import { Link } from "react-router";

const MenuItem = () => {
  return (
    <div>
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <Link
            to="/dashboard"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Statistics"
          >
            {/* statistics icon */}
            <FaHome/>
            <span className="is-drawer-close:hidden">Statistics</span>
          </Link>
        </li>
        {/* Add club */}
        <li>
          <Link
            to="add-club"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Add Club"
          >
            <FaCcDinersClub />
            <span className="is-drawer-close:hidden">Add Club</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuItem;
