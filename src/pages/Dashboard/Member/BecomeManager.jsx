import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaUserTag } from "react-icons/fa";

const BecomeManager = () => {
  const axiosSecure = useAxiosSecure();
  const handleRequest = async () => {
    try {
      await axiosSecure.post("/become-manager");
      toast.success("Request sent, please wait for admin approval!");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div>
      <button onClick={handleRequest} className="btn text-white hover:animate-pulse bg-[#1f0038]">
        Become a Club Manager  <FaUserTag />
      </button>
    </div>
  );
};

export default BecomeManager;
