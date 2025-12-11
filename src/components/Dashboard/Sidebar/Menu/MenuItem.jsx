import React from "react";
import { BsFileBarGraph } from "react-icons/bs";
import {
  FaCcDinersClub,
  FaCreditCard,
  FaHome,
  FaTree,
  FaVrCardboard,
} from "react-icons/fa";
import { Link } from "react-router";
import ManagerMenu from "./ManagerMenu";
import useRole from "../../../../hooks/useRole";
import MemberMenu from "./MemberMenu";
import AdminMenu from "./AdminMenu";

const MenuItem = () => {
  const [role, isRoleLoading] = useRole();
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
            <FaHome />
            <span className="is-drawer-close:hidden">Statistics</span>
          </Link>
        </li>
        {/* member menu item */}
        {role === "member" && <MemberMenu />}
        {/* manager menu item */}
        {role === "manager" && <ManagerMenu />}
        {/* admin menu */}
        {role === "admin" && <AdminMenu />}
      </ul>
    </div>
  );
};

export default MenuItem;
