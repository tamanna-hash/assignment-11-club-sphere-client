import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router";
const ClubDataTable = ({ club, index }) => {
  const { _id,clubName, category, membershipFee, image, status } = club || {};
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
            club.status === "approved" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      </td>
      {/* actions */}
      <td>
        <Link to={`/clubs/${_id}`} className="btn btn-square hover:bg-primary">
          <BiDetail />
        </Link>
        <button className="btn btn-square mx-2 hover:bg-primary">
          <FiEdit />
        </button>
        <button
          // onClick={() => handleParcelDelete(parcel._id)}
          className="btn btn-square hover:bg-red-400"
        >
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  );
};

export default ClubDataTable;
