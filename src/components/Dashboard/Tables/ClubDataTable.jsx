import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail, BiSolidCalendarEvent } from "react-icons/bi";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const ClubDataTable = ({ club, index,refetch}) => {
 
  const { _id, clubName, category, membershipFee, status } = club || {};
  const [role] = useRole();
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
            await axiosSecure.delete(`/club-delete/${_id}`);
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
  return (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{category}</td>
      <td>{clubName}</td>

      <td>{membershipFee}</td>
      {/* status */}
      {role === "admin" && (
        <td>
          <p
            className={`${
              status === "approved" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        </td>
      )}
      {/* actions */}
      <td>
        <div className="flex gap-2">
          <Link
            to={`/clubs/${_id}`}
            className="btn btn-square hover:bg-primary"
          >
            <BiDetail />
          </Link>
          <Link to={`/dashboard/update-club/${_id}`} className="btn btn-square mx-2 hover:bg-primary">
            <FiEdit />
          </Link>

          <button
            onClick={handleClubDelete}
            className="btn btn-square hover:bg-red-400"
          >
            <MdDeleteForever />
          </button>
          <Link to={`/dashboard/add-event/${_id}`} className="btn flex">
            Add Event
            <BiSolidCalendarEvent />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ClubDataTable;
