import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail, BiSolidCalendarEvent } from "react-icons/bi";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const PendingClubDataTable = ({ club, index,refetch }) => {
  const axiosSecure=useAxiosSecure()
  const handleClubDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/club-delete/pending/${_id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "deleted club successfully",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          toast.error(error?.message);
        }
      }
    });
  };
  const { _id, clubName, category, membershipFee, status } = club || {};
  return (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{category}</td>
      <td>{clubName}</td>

      <td>{membershipFee}</td>
      {/* status */}
      <td>
        <p
          className={`${
            status === "approved" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      </td>
      {/* actions */}
      <td className="w-48 pr-4">
        <div className="flex justify-end items-center gap-3">
          {/* View Details */}
          <Link
            to={`/dashboard/pending-clubs/${_id}`}
            className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded transition"
          >
            View
          </Link>

          {/* Edit */}
          <Link
            to={`/dashboard/update-club/${_id}`}
            className="text-purple-500 hover:text-purple-400 font-medium transition"
          >
            Edit
          </Link>

          {/* Delete */}
          <button
            onClick={() => handleClubDelete(_id)}
            className="text-red-500 hover:text-red-400 font-medium transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PendingClubDataTable;
