import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaUserTag } from "react-icons/fa";
import Swal from "sweetalert2";

const BecomeManager = () => {
  const axiosSecure = useAxiosSecure();
  const handleRequest = async () => {
    Swal.fire({
  title: "Are you sure?",
  text: "You want to be a Club Manager!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, i want!"
}).then(async(result) => {
  if (result.isConfirmed) {
    try {
      await axiosSecure.post("/become-manager");
      Swal.fire({
        title: "Request Send!",
        text: "Request sent, please wait for admin approval!",
        icon: "success"
      });
      // toast.success("Request sent, please wait for admin approval!");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  }
});
  };
  return (
    <>
      <title>ClubSphere-Become a Manager</title>
      <h1 className="main-title">
        Become a Manager
      </h1>
      <p className="subtitle">
        Apply to manage clubs and events, and take a more active role in the
        community
      </p>
      <div className="max-w-md mx-auto text-center p-6 bg-gray-50 rounded-2xl shadow-lg">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          Ready to Lead a Club?
        </h3>
        <p className="text-gray-600 mb-6">
          Take charge and manage your own club. Gain control over events,
          members, and more!
        </p>
        <button
          onClick={handleRequest}
          className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl shadow-lg bg-gradient-to-r from-cyan-700 to-purple-700 hover:scale-105 hover:shadow-2xl transition-transform duration-200"
        >
          Become a Club Manager
          <FaUserTag className="text-lg" />
        </button>
      </div>
    </>
  );
};

export default BecomeManager;
