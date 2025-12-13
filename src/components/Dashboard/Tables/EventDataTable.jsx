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
        <div className="flex gap-2">
          <Link
            to={`/events/${_id}`}
            className="btn btn-square hover:bg-primary"
          >
            <BiDetail />
          </Link>
          <Link
            to={`/dashboard/update-event/${_id}`}
            className="btn btn-square mx-2 hover:bg-primary"
          >
            <FiEdit />
          </Link>

          <button
            onClick={handleEventDelete}
            className="btn btn-square hover:bg-red-400"
          >
            <MdDeleteForever />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EventDataTable;
