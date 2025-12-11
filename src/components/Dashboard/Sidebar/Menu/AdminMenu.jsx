import { FaCreditCard, FaUserCog, FaUserTag } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { Link } from "react-router";

const AdminMenu = () => {
  return (
    <>
      {/* Manage USers */}
      <li>
        <Link
          to="user-management"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="User Management"
        >
          <FaCreditCard />
          <span className="is-drawer-close:hidden">User Management</span>
        </Link>
      </li>
    </>
  );
};

export default AdminMenu;
