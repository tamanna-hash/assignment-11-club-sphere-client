import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PurchaseModal from "../../../components/Modal/PurchaseModal";

const ClubDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate=useNavigate()
  const { data: club, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs/${id}`
      );
      return res.data;
    },
  });
  const {
    clubName,
    clubLocation,
    category,
    description,
    coverImage,
    _id,
    membershipFee,
    manager,
  } = club || {};
  const closeModal = () => {
    setIsOpen(false);
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere-Club Details</title>
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
            <div className="shrink-0 w-full md:w-1/2">
              <img
                src={coverImage}
                alt=""
                className="w-full object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
              <h2 className="card-title md:text-2xl">{clubName}</h2>
              <div className="badge badge-outline badge-accent font-semibold ">
                Category: {category}
              </div>
              <div>
                <span className="font-semibold">Membership Fee:</span>
                {membershipFee} $
              </div>
              <div>
                <span className=" font-semibold">Manager: </span> {manager.name}
              </div>
              <div>
                <span className="font-semibold">Manager email: </span>
                {manager.email}
              </div>
              {/* <p className="gap-2 items-center">
                <span className="font-semibold"></span>
                <span className="font-semibold">Availability:</span>
                {vehicle.availability}
              </p> */}
              <p className="flex items-center">
                <span className="font-semibold">Location: </span>
                {clubLocation}
              </p>
              <p className=" ">
                <span className="font-semibold">Description: </span>
                {description}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn px-4 py-2  font-bold text-white hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 transition-transform"
                >
                  Join Club
                </button>
                <button
                  //   onClick={handleBack}
                  className="btn px-4 py-2 font-bold text-white hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 transition-transform"
                >
                  View Events
                </button>
                <Link to={navigate(-1)}
                  //   onClick={handleBack}
                  className="btn px-4 py-2 font-bold text-white hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 transition-transform"
                >
                  Back
                </Link>
              </div>
              <PurchaseModal
                club={club}
                closeModal={closeModal}
                isOpen={isOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubDetails;
