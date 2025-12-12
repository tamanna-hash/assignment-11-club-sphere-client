import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManagerRequestsTable = ({ request, index ,refetch}) => {
  const axiosSecure =useAxiosSecure()
  const { email } = request || {};
  const handleRoleUpdate = async () => {
   try {
     await axiosSecure.patch('/update-role', {
       email:email,
       role: 'manager',
     })
     toast.success('Role Updated!')
     refetch()
   } catch (err) {
     console.log(err)
     toast.error(err?.response?.data?.message)
   }
 }
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{email}</td>
      {/* actions */}
      <td>
        <button
          onClick={handleRoleUpdate}
          className="btn bg-green-300"
          
        >
          <FaUserShield />
        </button>
      </td>
    </tr>
  );
};

export default ManagerRequestsTable;
