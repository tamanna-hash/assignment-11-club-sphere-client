import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";

const MemberMembershipTable = ({ membership, index }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { name, category, fee, image, status } = membership || {};
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img src={image} alt="Club image" className="h-15 w-15 rounded-2xl" />
      </td>
      <td>{name}</td>
      <td>{category}</td>
      <td>${fee}</td>
      <td>{status}</td>
      <td>
        <button
          onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative cursor-pointer">Cancel</span>
        </button>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  );
};

export default MemberMembershipTable;
