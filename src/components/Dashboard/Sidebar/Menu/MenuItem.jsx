import React from "react";
import { BsFileBarGraph } from "react-icons/bs";
import {
  FaCcDinersClub,
  FaCreditCard,
  FaHome,
  FaTree,
  FaVrCardboard,
} from "react-icons/fa";
import { Link } from "react-router";
import ManagerMenu from "./ManagerMenu";
import useRole from "../../../../hooks/useRole";
import MemberMenu from "./MemberMenu";
import AdminMenu from "./AdminMenu";
import Logo from "../../../Shared/Logo";

const MenuItem = () => {
  const [role, isRoleLoading] = useRole();
  return (
    <div>
      <Logo/>
      <ul className="menu w-full grow menu-item">
        {/* List item */}
        {/* member menu item */}
        {role === "member" && <MemberMenu />}
        {/* manager menu item */}
        {role === "manager" && <ManagerMenu />}
        {/* admin menu */}
        {role === "admin" && <AdminMenu />}
      </ul>
    </div>
  );
};

export default MenuItem;
