import { BsFillHouseAddFill } from "react-icons/bs";
import { MdEvent, MdEventAvailable, MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
import { FaCcDinersClub, FaClock, FaTree, FaVrCardboard } from "react-icons/fa";
import { Link } from "react-router";
const ManagerMenu = () => {
  return (
    <>
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
      {/* event management */}
      <li>
        <Link
          to="event-management"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Event Management"
        >
         <MdEvent /> 
          <span className="is-drawer-close:hidden">Event Management</span>
        </Link>
      </li>
      {/* My events */}
      <li>
        <Link
          to="my-events"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Events"
        >
        <MdEventAvailable /> 
          <span className="is-drawer-close:hidden">My Events</span>
        </Link>
      </li>

      {/* manage-memberships */}
      <li>
        <Link
          to="manage-memberships"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Memberships"
        >
          <FaVrCardboard />
          <span className="is-drawer-close:hidden">Manage Memberships</span>
        </Link>
      </li>
      {/* my-clubs-pending */}
      <li>
        <Link
          to="pending-clubs"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Pending Clubs"
        >
          <FaClock />
          <span className="is-drawer-close:hidden">Pending Clubs</span>
        </Link>
      </li>
      {/* my-inventory */}
      <li>
        <Link
          to="my-inventory"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Inventory"
        >
          <FaTree />
          <span className="is-drawer-close:hidden">My Inventory</span>
        </Link>
      </li>
    </>
  );
};

export default ManagerMenu;
