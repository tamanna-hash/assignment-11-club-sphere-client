import { MdEvent, MdEventAvailable, MdPendingActions } from "react-icons/md";
import { FaPlusCircle, FaBoxOpen, FaUsersCog, FaHome, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router";

const ManagerMenu = () => {
  return (
    <ul className="menu sidebar-dashboard p-4 w-64 bg-gray-800 text-white gap-2 menu-item">
      <li>
        <NavLink
          to="/dashboard"
          className=" flex items-center gap-3 tooltip tooltip-right "
          data-tip="Manager Overview"
        >
          {/* statistics icon */}
          <FaHome />
          <span className="truncate">Manager Overview</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="my-events">
          <MdEventAvailable className="text-lg" />
          <span>Events Management</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="event-registrations">
          <MdEvent className="text-lg" />
          <span>Event Registrations</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="manage-memberships">
          <FaUsersCog className="text-lg" />
          <span>Manage Memberships</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="pending-clubs">
          <MdPendingActions className="text-lg" />
          <span>Pending Clubs</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="my-club-members">
          <FaUsers className="text-lg" />
          <span>Club Members</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="my-clubs">
          <FaBoxOpen className="text-lg" />
          <span>My Clubs</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="add-club">
          <FaPlusCircle className="text-lg" />
          <span>Add Club</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default ManagerMenu;
