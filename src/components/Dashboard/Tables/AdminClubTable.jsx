import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminClubTable = ({ club, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, clubName, manager, category, membershipFee, status, createdAt } =
    club || {};
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
        try {
          await axiosSecure.post(`/clubs-approve/${_id}`, club);
          refetch();
          Swal.fire({
            title: "Approved!",
            text: "approved club successfully",
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
          await axiosSecure.delete(`/clubs-reject/${_id}`);
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "Rejected club successfully",
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
      <th>{manager.email}</th>
      <td>{membershipFee}</td>
      <td>{createdAt}</td>

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
        <button onClick={handleApproveClub} className="btn text-white bg-purple-400 hover:bg-purple-300 ">
          Approve
        </button>
        <button onClick={handleRejectClub} className="btn text-white bg-purple-400 hover:bg-purple-300 ">
          Reject
        </button>
      </td>
    </tr>
  );
};

export default AdminClubTable;
