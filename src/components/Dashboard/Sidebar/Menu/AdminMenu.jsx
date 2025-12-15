import { FaCcDinersClub, FaCreditCard, FaUsers } from "react-icons/fa";
import { RiPassPendingFill } from "react-icons/ri";
import { Link } from "react-router";

const AdminMenu = () => {
  return (
    <ul className="menu gap-2 text-base-content">
      <li>
        <Link to="club-management">
          <FaCcDinersClub className="text-lg" />
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
          <RiPassPendingFill className="text-lg" />
          <span>Manager Requests</span>
        </Link>
      </li>

      <li>
        <Link to="admin-all-clubs">
          <FaCreditCard className="text-lg" />
          <span>All Clubs</span>
        </Link>
      </li>

      <li>
        <Link to="all-payments">
          <FaCreditCard className="text-lg" />
          <span>All Payments</span>
        </Link>
      </li>
    </ul>
  );
};

export default AdminMenu;
