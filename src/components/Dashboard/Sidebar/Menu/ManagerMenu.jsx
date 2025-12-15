import { MdEvent, MdEventAvailable, MdPendingActions } from "react-icons/md";
import { FaPlusCircle, FaBoxOpen, FaUsersCog, FaHome } from "react-icons/fa";
import { Link } from "react-router";

const ManagerMenu = () => {
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
          <span className="truncate">Manager Overview
</span>
        </Link>
      </li>
      <li>
        <Link to="add-club">
          <FaPlusCircle className="text-lg" />
          <span>Add Club</span>
        </Link>
      </li>

      <li>
        <Link to="event-registrations">
          <MdEvent className="text-lg" />
          <span>Event Registrations</span>
        </Link>
      </li>

      <li>
        <Link to="my-events">
          <MdEventAvailable className="text-lg" />
          <span>My Events</span>
        </Link>
      </li>

      <li>
        <Link to="manage-memberships">
          <FaUsersCog className="text-lg" />
          <span>Manage Memberships</span>
        </Link>
      </li>

      <li>
        <Link to="pending-clubs">
          <MdPendingActions className="text-lg" />
          <span>Pending Clubs</span>
        </Link>
      </li>

      <li>
        <Link to="my-inventory">
          <FaBoxOpen className="text-lg" />
          <span>My Clubs</span>
        </Link>
      </li>
    </ul>
  );
};

export default ManagerMenu;
