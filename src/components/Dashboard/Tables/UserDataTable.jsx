import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { FiEdit, FiShieldOff } from "react-icons/fi";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router";
import { FaUserShield } from "react-icons/fa";
const UserDataTable = ({ user, index }) => {
  const { _id, name, email, role, status, created_at } = user || {};
  return (
    <tr key={index}>
      <th>{index + 1}</th>

      <td>{name}</td>
      <td>{email}</td>

      <td>{role}</td>
      <td>{created_at}</td>
      {/* actions */}
      <td>
        {user.role === "manager" ? (
          <button
            // onClick={() => handleRemoveAdmin(user)}
            className="btn bg-red-300"
          >
            <FiShieldOff />
          </button>
        ) : (
          <button
            // onClick={() => handleMakeAdmin(user)}
            className="btn bg-green-300"
          >
            <FaUserShield />
          </button>
        )}
      </td>
      <td>details</td>
    </tr>
  );
};

export default UserDataTable;
