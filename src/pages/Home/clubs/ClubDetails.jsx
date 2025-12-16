import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PurchaseModal from "../../../components/Modal/PurchaseModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClubDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: club, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
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
  const { data: myMemberships, isLoading: membershipLoading } = useQuery({
    queryKey: ["my-memberships", _id, user?.email],
    enabled: !!_id && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-memberships`, {
        params: {
          clubId: _id,
          email: user.email,
        },
      });
      return res.data;
    },
  });
  const isJoined =
    myMemberships?.some((membership) => membership.clubId === _id) || false;
  console.log(club);
  const closeModal = () => {
    setIsOpen(false);
  };
  if (isLoading || membershipLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere-Club Details</title>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Image */}
            <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={coverImage}
                alt={clubName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {clubName}
                </h1>

                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline badge-primary">
                    {category}
                  </span>
                  <span className="badge badge-outline">{clubLocation}</span>
                </div>

                <p className="text-base-content/80 leading-relaxed">
                  {description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                  <div>
                    <p className="text-base-content/60">Membership Fee</p>
                    <p className="font-semibold text-lg">${membershipFee}</p>
                  </div>
                  <div>
                    <p className="text-base-content/60">Manager</p>
                    <p className="font-medium">{manager?.name}</p>
                    <p className="text-xs text-base-content/60">
                      {manager?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-8">
                {user && (
                  <button
                    disabled={isJoined}
                    onClick={() => setIsOpen(true)}
                    className={`btn rounded-xl font-semibold transition
                    ${
                      isJoined
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                    }
                  `}
                  >
                    {isJoined ? "Already Joined" : "Join Club"}
                  </button>
                )}

                <Link
                  to={`/events?clubId=${_id}`}
                  className="btn rounded-xl font-semibold
            border border-purple-400/40 text-purple-500
            hover:bg-purple-500/10 transition"
                >
                  View Events
                </Link>

                <button
                  onClick={() => navigate(-1)}
                  className="btn rounded-xl font-semibold
            border border-base-300 hover:bg-purple-400/20 transition"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        <PurchaseModal club={club} closeModal={closeModal} isOpen={isOpen} />
      </div>
    </>
  );
};

export default ClubDetails;
