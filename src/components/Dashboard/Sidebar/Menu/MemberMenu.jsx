import { NavLink } from "react-router";
import {
  FaCreditCard,
  FaHome,
  FaIdCard,
  FaRegHeart,
  FaUserTie,
} from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const MemberMenu = () => {
  return (
    <ul className="menu sidebar-dashboard p-4 w-64 bg-gray-800 text-white gap-2">
      {/* Member Dashboard */}
      <li>
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="Member Overview"
        >
          <FaHome className="text-lg" />
          <span className="truncate">Member Dashboard</span>
        </NavLink>
      </li>

      {/* My Wishlist */}
      <li>
        <NavLink
          to="/dashboard/my-wishlist"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Wishlist"
        >
          <FaRegHeart className="text-lg" />
          <span className="truncate">My Wishlist</span>
        </NavLink>
      </li>

      {/* My Joined Events */}
      <li>
        <NavLink
          to="/dashboard/my-joined-events"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Joined Events"
        >
          <MdEventNote className="text-lg" />
          <span className="truncate">My Joined Events</span>
        </NavLink>
      </li>

      {/* My Joined Clubs */}
      <li>
        <NavLink
          to="/dashboard/my-joined-clubs"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Joined Clubs"
        >
          <HiOutlineOfficeBuilding className="text-lg" />
          <span className="truncate">My Joined Clubs</span>
        </NavLink>
      </li>

      {/* My Memberships */}
      <li>
        <NavLink
          to="/dashboard/my-memberships"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Memberships"
        >
          <FaIdCard className="text-lg" />
          <span className="truncate">My Memberships</span>
        </NavLink>
      </li>

      {/* My Payments */}
      <li>
        <NavLink
          to="/dashboard/my-payments"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Payments"
        >
          <FaCreditCard className="text-lg" />
          <span className="truncate">My Payments</span>
        </NavLink>
      </li>

      {/* Become a Manager */}
      <li>
        <NavLink
          to="/dashboard/become-manager"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="Become a Manager"
        >
          <FaUserTie className="text-lg" />
          <span className="truncate">Become a Manager</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default MemberMenu;
