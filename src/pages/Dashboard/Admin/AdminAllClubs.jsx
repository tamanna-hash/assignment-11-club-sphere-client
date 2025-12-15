import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaUsers } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminAllClubs = () => {
  const axiosSecure=useAxiosSecure()
  const { data: clubs = [], isLoading, refetch } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/clubs");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve club?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/clubs/approve/${id}`);
      refetch();
      Swal.fire("Approved!", "", "success");
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject club?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/clubs/reject/${id}`);
      refetch();
      Swal.fire("Rejected!", "", "success");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading clubs...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Club Name</th>
            <th>Manager Email</th>
            <th>Status</th>
            <th>Membership Fee</th>
            <th>Stats</th>
          </tr>
        </thead>

        <tbody>
          {clubs.map((club, index) => (
            <tr key={club._id}>
              <th>{index + 1}</th>

              <td className="font-semibold">{club.clubName}</td>

              <td>{club.manager?.email}</td>

              <td>
                <span
                  className={`badge badge-success`}
                >
                  {club.status}
                </span>
              </td>

              <td>${club.membershipFee}</td>

              {/* Stats */}
              <td className="flex gap-3">
                <span className="flex items-center gap-1">
                  <FaUsers />
                  {club.membersCount ?? 0}
                </span>
                <span className="flex items-center gap-1">
                  <MdEvent />
                  {club.eventsCount ?? 0}
                </span>
              </td>

             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllClubs;
