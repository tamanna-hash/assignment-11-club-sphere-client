import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: clubPending, isLoading } = useQuery({
    queryKey: ["clubPending", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs-pending/${id}`);
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
  } = clubPending || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <title>ClubSphere - Pending Club Details</title>
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
            {/* Club Image */}
            <div className="shrink-0 w-full md:w-1/2">
              <img
                src={coverImage}
                alt={clubName}
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Club Info */}
            <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {clubName}
              </h2>

              <div className="badge badge-outline badge-info font-semibold">
                Category: {category}
              </div>

              <div>
                <span className="font-semibold">Membership Fee: </span>
                {membershipFee} $
              </div>

              <div>
                <span className="font-semibold">Manager Email: </span>
                {manager?.email || "N/A"}
              </div>

              <p>
                <span className="font-semibold">Location: </span>
                {clubLocation}
              </p>

              <p>
                <span className="font-semibold">Description: </span>
                {description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 font-bold rounded-lg text-white bg-purple-500 hover:bg-purple-400 transition"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingClubDetails;
