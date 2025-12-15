import {
  MdEvent,
  MdEventAvailable,
} from "react-icons/md";
import {
  FaCcDinersClub,
  FaClock,
  FaTree,
  FaVrCardboard,
} from "react-icons/fa";
import { Link } from "react-router";

const ManagerMenu = () => {
  return (
    <ul className="menu gap-2 text-base-content">
      <li>
        <Link to="add-club">
          <FaCcDinersClub className="text-lg" />
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
          <FaVrCardboard className="text-lg" />
          <span>Manage Memberships</span>
        </Link>
      </li>

      <li>
        <Link to="pending-clubs">
          <FaClock className="text-lg" />
          <span>Pending Clubs</span>
        </Link>
      </li>

      <li>
        <Link to="my-inventory">
          <FaTree className="text-lg" />
          <span>My Inventory</span>
        </Link>
      </li>
    </ul>
  );
};

export default ManagerMenu;
