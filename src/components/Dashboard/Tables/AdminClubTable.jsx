import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AdminClubTable = ({ club, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, clubName, manager, category, membershipFee, status, createdAt } =
    club || {};
  const handleApproveClub = async () => {
    try {
      await axiosSecure.post(`/clubs-approve/${_id}`, club);
      toast.success("approved club");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };
  const handleRejectClub = async () => {
    try {
      await axiosSecure.delete(`/clubs-reject/${_id}`);
      toast.success("approved club");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
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
        <button onClick={handleApproveClub} className="btn">
          Approve
        </button>
        <button onClick={handleRejectClub} className="btn bg-red-300">
          Reject
        </button>
      </td>
    </tr>
  );
};

export default AdminClubTable;
