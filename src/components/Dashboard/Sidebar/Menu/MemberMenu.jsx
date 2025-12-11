import React from "react";
import { FaCreditCard, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const MemberMenu = () => {
  return (
    <>
      {/* my memberships */}
      <li>
        <Link
          to="my-memberships"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Memberships"
        >
          <FaCreditCard />
          <span className="is-drawer-close:hidden">My Memberships</span>
        </Link>
      </li>
      {/* become a manager */}
      <li>
        <Link
          to="become-manager"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Become a Manager"
        >
          <FaUser />
          <span className="is-drawer-close:hidden">Become a Manager</span>
        </Link>
      </li>
    </>
  );
};

export default MemberMenu;
