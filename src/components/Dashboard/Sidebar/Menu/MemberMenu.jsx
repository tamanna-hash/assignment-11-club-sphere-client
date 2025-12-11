import React from "react";
import { FaCreditCard } from "react-icons/fa";
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
    </>
  );
};

export default MemberMenu;
