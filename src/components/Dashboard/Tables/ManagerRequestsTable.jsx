import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManagerRequestsTable = ({ request, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { email } = request || {};
  const handleRoleUpdate = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this member a manager!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch("/update-role", {
            email: email,
            role: "manager",
          });
          Swal.fire({
            title: "Approved!",
            text: "Approved as Manager.",
            icon: "success",
          });

          refetch();
        } catch (err) {
          console.log(err);
          toast.error(err?.response?.data?.message);
        }
      }
    });
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{email}</td>
      {/* actions */}
      <td>
        <button onClick={handleRoleUpdate} className="btn bg-green-300">
          <FaUserShield />
        </button>
      </td>
    </tr>
  );
};

export default ManagerRequestsTable;
