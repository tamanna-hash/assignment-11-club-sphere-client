import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail, BiSolidCalendarEvent } from "react-icons/bi";
import { Link } from "react-router";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const EventDataTable = ({ event, index, refetch }) => {
  const { title, eventLocation, eventDate, maxAttendees, bannerImage, _id } =
    event || {};
  const axiosSecure = useAxiosSecure();
  const handleEventDelete = async () => {
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
          await axiosSecure.delete(`/event-delete/${_id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "deleted event successfully",
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
      <td>{title}</td>
      <td>{new Date(eventDate).toLocaleDateString()}</td>
      <td>{eventLocation}</td>
      <td>{maxAttendees}</td>

      {/* actions */}
      <td>
        <div className="flex gap-2 items-center justify-center">
          <Link
            to={`/events/${_id}`}
            className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded transition"
          >
            View
          </Link>
          <Link
            to={`/dashboard/update-event/${_id}`}
            className="text-purple-500 hover:text-purple-400 font-medium transition"
          >
            Edit
          </Link>

          <button
            onClick={handleEventDelete}
            className="text-red-500 hover:text-red-400 font-medium transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EventDataTable;
