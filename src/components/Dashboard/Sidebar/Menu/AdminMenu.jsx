import { FaCcDinersClub, FaCreditCard, FaHome, FaMoneyCheckAlt, FaUsers } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdPendingActions } from "react-icons/md";
import { RiAdminFill, RiPassPendingFill } from "react-icons/ri";
import { Link } from "react-router";

const AdminMenu = () => {
  return (
    <ul className="menu p-4 w-64 bg-gray-800 text-white gap-2 menu-item">
      <li>
        <Link
          to="/dashboard"
          className=" flex items-center gap-3 tooltip tooltip-right "
          data-tip="Manager Overview"
        >
          {/* statistics icon */}
          <FaHome />
          <span className="truncate">Manager Overview</span>
        </Link>
      </li>
       <li>
        <Link to="club-management">
          <HiOutlineOfficeBuilding className="text-lg" />
          <span>Club Management</span>
        </Link>
      </li>

      <li>
        <Link to="user-management">
          <FaUsers className="text-lg" />
          <span>User Management</span>
        </Link>
      </li>

      <li>
        <Link to="manager-requests">
          <MdPendingActions className="text-lg" />
          <span>Manager Requests</span>
        </Link>
      </li>

      <li>
        <Link to="admin-all-clubs">
          <RiAdminFill className="text-lg" />
          <span>All Clubs</span>
        </Link>
      </li>

      <li>
        <Link to="all-payments">
          <FaMoneyCheckAlt className="text-lg" />
          <span>All Payments</span>
        </Link>
      </li>
    </ul>
  );
};

export default AdminMenu;
