import { FaCcDinersClub, FaCreditCard, FaHome, FaMoneyCheckAlt, FaUsers } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdPendingActions } from "react-icons/md";
import { RiAdminFill, RiPassPendingFill } from "react-icons/ri";
import { NavLink } from "react-router";

const AdminMenu = () => {
  return (
    <ul className="menu sidebar-dashboard p-4 w-64 bg-gray-800 text-white gap-2 menu-item">
      <li>
        <NavLink
          to="/dashboard"
          className=" flex items-center gap-3 tooltip tooltip-right "
          data-tip="Admin Overview"
        >
          {/* statistics icon */}
          <FaHome />
          <span className="truncate">Admin Overview</span>
        </NavLink>
      </li>
       <li>
        <NavLink to="club-management">
          <HiOutlineOfficeBuilding className="text-lg" />
          <span>Club Management</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="user-management">
          <FaUsers className="text-lg" />
          <span>User Management</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="manager-requests">
          <MdPendingActions className="text-lg" />
          <span>Manager Requests</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="admin-all-clubs">
          <RiAdminFill className="text-lg" />
          <span>All Clubs</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="all-payments">
          <FaMoneyCheckAlt className="text-lg" />
          <span>All Payments</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default AdminMenu;
