import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaUserMinus } from "react-icons/fa";

const EventRegistrationsTable = ({ register, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, userEmail, registeredAt, status, cancelledAt } = register || {};
  const handleRemoveMember = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove registered!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // only updating the status
          await axiosSecure.patch(`/event-register-remove/${_id}`);
          refetch();
          Swal.fire({
            title: "Removed!",
            text: "Removed registration successfully",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          const backendMessage =
            error.response?.data?.message || "Something went wrong";

          Swal.fire({
            title: "Error",
            text: backendMessage,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{userEmail}</td>
      <td>
        <p className={`${status === "cancelled" && "text-red-500"}`}>
          {status}
        </p>
      </td>
      <td>
        {status === "cancelled" ? (
          <span className="text-red-500">
            Cancelled At: {new Date(cancelledAt).toLocaleString()}
          </span>
        ) : (
          new Date(registeredAt).toLocaleString()
        )}
      </td>
      {/* actions */}
      <td>
        <button onClick={handleRemoveMember} className="btn bg-red-300">
          <FaUserMinus />
        </button>
      </td>
    </tr>
  );
};

export default EventRegistrationsTable;
