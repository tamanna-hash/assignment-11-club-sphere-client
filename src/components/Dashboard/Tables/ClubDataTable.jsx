import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail, BiSolidCalendarEvent } from "react-icons/bi";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";
const ClubDataTable = ({ club, index }) => {
  const { _id, clubName, category, membershipFee, status } = club || {};
  const [role] = useRole();
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
            // onClick={() => handleParcelDelete(parcel._id)}
            className="btn btn-square hover:bg-red-400"
          >
            <MdDeleteForever />
          </button>
          <button className="btn flex">
            Add Event
            <BiSolidCalendarEvent />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClubDataTable;
