import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { Link } from "react-router";

const MemberMembershipTable = ({ membership, index }) => {
  const { name, category, fee, image, status, clubId, joined_at } =
    membership || {};
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img src={image} alt="Club image" className="h-15 w-15 rounded-2xl" />
      </td>
      <td>{name}</td>
      <td>{category}</td>
      <td>${fee}</td>
      <td>
        <p
          className={`${
            status === "pending" ? "text-red-600" : "text-green-600"
          } text-center`}
        >
          {status}
        </p>
      </td>
      <td>
        {(status === "joined" && new Date(joined_at).toLocaleString()) ||
          "waiting for approval"}
      </td>
      <td>
        <Link
          to={`/clubs/${clubId}`}
          className="btn btn-xs text-white bg-purple-500 hover:bg-purple-400"
        >
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default MemberMembershipTable;
