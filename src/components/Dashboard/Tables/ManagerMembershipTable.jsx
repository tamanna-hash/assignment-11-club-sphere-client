import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManagerMembershipTable = ({ membership, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isApproved, setIsApproved] = useState(false);
  const { _id, name, member, category, fee, image, paymentId, status } =
    membership || {};
  const handleApproveClub = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsApproved(true);
        try {
          await axiosSecure.patch(`/manage-membership/${_id}`, _id);
          refetch();
          Swal.fire({
            title: "Approved!",
            text: "approved membership successfully",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          toast.error(error?.message);
        }
      }
    });
  };
  const handleRejectClub = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/membership-reject/${_id}`);
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "Rejected membership successfully",
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
      <td>{name}</td>
      <td>{member}</td>
      <td>{paymentId}</td>
      {/* status */}
      <td>
        <p
          className={`${
            status === "pending" ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </p>
      </td>
      {/* actions */}
      <td className="w-40">
        <div className="flex gap-2 justify-end">
          {status==="joined" ? (
            <button
              onClick={handleRejectClub}
              className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded transition"
            >
              Reject
            </button>
          ) : (
            <>
              <button
                onClick={handleApproveClub}
                className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded transition"
              >
                Approve
              </button>
              <button
                onClick={handleRejectClub}
                className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded transition"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ManagerMembershipTable;
