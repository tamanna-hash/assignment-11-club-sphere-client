import { Link } from "react-router";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { MdEditNote } from "react-icons/md";
import { BiCalendarPlus } from "react-icons/bi";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const ClubDataTable = ({ club, index, refetch }) => {
  const {
    _id,
    clubName,
    category,
    membershipFee,
    status,
    created_at,
    updated_at,
  } = club || {};
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  const handleClubDelete = async () => {
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
          await axiosSecure.delete(`/club-delete/${_id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "deleted club successfully",
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

      <td>{membershipFee}</td>
      <td>{new Date(created_at).toLocaleString()}</td>
      <td>{updated_at && new Date(updated_at).toLocaleString()}</td>
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
      <td className="">
        <div className="flex justify-end items-center gap-3">
          {/* View Club */}
          <Link
            to={`/clubs/${_id}`}
            className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded transition"
          >
            View
          </Link>

          {/* Edit */}
          <Link
            to={`/dashboard/update-club/${_id}`}
            className="text-purple-500 hover:text-purple-400 font-medium transition"
          >
            Edit
          </Link>

          {/* Delete */}
          <button
            onClick={() => handleClubDelete(_id)}
            className="text-red-500 hover:text-red-400 font-medium transition"
          >
            Delete
          </button>

          {/* Add Event */}
          <Link
            to={`/dashboard/add-event/${_id}`}
            className="btn btn-sm bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded transition"
          >
            Add Event
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ClubDataTable;
