import { Link } from "react-router";
import { FaHome, FaIdCard, FaUserTie } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const MemberMenu = () => {
  return (
    <ul className="menu p-4 w-64 bg-gray-800 text-white gap-2 menu-item">
      <li>
        <Link
          to="/dashboard"
          className=" flex items-center gap-3 tooltip tooltip-right"
          data-tip="Manager Overview"
        >
          {/* statistics icon */}
          <FaHome />
          <span className="truncate">Member Overview</span>
        </Link>
      </li>
      {/* My Memberships */}
      <li>
        <Link
          to="my-memberships"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Memberships"
        >
          <FaIdCard className="text-lg" />
          <span className="truncate">My Memberships</span>
        </Link>
      </li>

      {/* My Joined Events */}
      <li>
        <Link
          to="my-joined-events"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Joined Events"
        >
          <MdEventNote className="text-lg" />
          <span className="truncate">My Joined Events</span>
        </Link>
      </li>

      {/* My Joined Clubs */}
      <li>
        <Link
          to="my-joined-clubs"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="My Joined Clubs"
        >
          <HiOutlineOfficeBuilding className="text-lg" />
          <span className="truncate">My Joined Clubs</span>
        </Link>
      </li>

      {/* Become a Manager */}
      <li>
        <Link
          to="become-manager"
          className="flex items-center gap-3 tooltip tooltip-right"
          data-tip="Become a Manager"
        >
          <FaUserTie className="text-lg" />
          <span className="truncate">Become a Manager</span>
        </Link>
      </li>
    </ul>
  );
};

export default MemberMenu;
