import {
  FaCcDinersClub,
  FaCreditCard,
  FaUserCog,
  FaUsers,
  FaUserTag,
} from "react-icons/fa";
import { RiPassPendingFill } from "react-icons/ri";
import { Link } from "react-router";

const AdminMenu = () => {
  return (
    <>
      {/* Manage Clubs */}
      <li>
        <Link
          to="club-management"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Club Management"
        >
          <FaCcDinersClub />
          <span className="is-drawer-close:hidden">Club Management</span>
        </Link>
      </li>
      {/* Manage Users */}
      <li>
        <Link
          to="user-management"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="User Management"
        >
          <FaUsers />
          <span className="is-drawer-close:hidden">User Management</span>
        </Link>
      </li>
      {/* manage manager requests */}
      <li>
        <Link
          to="manager-requests"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manager Requests"
        >
          <RiPassPendingFill />
          <span className="is-drawer-close:hidden">Manager Requests</span>
        </Link>
      </li>
      {/* all payments */}
      <li>
        <Link
          to="all-payments"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="All Payments"
        >
          <FaCreditCard />
          <span className="is-drawer-close:hidden">All Payments</span>
        </Link>
      </li>
    </>
  );
};

export default AdminMenu;
