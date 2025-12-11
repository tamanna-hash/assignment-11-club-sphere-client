import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";

const ManagerMembershipTable = ({ membership, index }) => {
  const { name, member, category, fee, image,paymentId, status } = membership || {};
  return (
   
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{category}</td>
      <td>{name}</td>
      <td>{member}</td>
      <td>{paymentId}</td>
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
      <td>
        <button
          // onClick={() => handleApproval(rider)}
          className="btn"
        >
          <BsPersonFillCheck />
        </button>

        <button
          onClick={() => {
            // handleRejection(rider);
          }}
          className="btn"
        >
          <MdPersonRemoveAlt1 />
        </button>
        <button className="btn">
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  );
};

export default ManagerMembershipTable;
