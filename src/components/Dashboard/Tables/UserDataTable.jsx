import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { FiEdit, FiShieldOff } from "react-icons/fi";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const UserDataTable = ({ user, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, name, email, role, status, created_at } = user || {};
  console.log(user);
  const handleRoleUpdate = async (userRole) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Be careful before revert to this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, marked as ${userRole}!`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/update-role`, {
          email,
          role: userRole,
        });

        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} marked as an ${userRole}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
    }
  };

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
            onClick={() => handleRoleUpdate("member")}
            className="btn bg-red-300"
          >
            <FiShieldOff />
          </button>
        ) : (
          <button
            onClick={() => handleRoleUpdate("manager")}
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
