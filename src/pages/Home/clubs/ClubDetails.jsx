import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PurchaseModal from "../../../components/Modal/PurchaseModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegStar } from "react-icons/fa";
import ClubCard from "../../../components/Home/cards/ClubCard";

const ClubDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [sameCategory, setSameCategory] = useState({});
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/clubs?category=${club?.category}`)
      .then((res) => {
        setSameCategory(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [club?.category]);
  const isJoined =
    myMemberships?.some((membership) => membership.clubId === _id) || false;
  const closeModal = () => {
    setIsOpen(false);
  };
  if (isLoading || membershipLoading || loading) return <LoadingSpinner />;
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
                    <p
                      className={`${
                        membershipFee === 0
                          ? "text-green-500"
                          : "text-purple-600"
                      } font-semibold text-lg`}
                    >
                      ${membershipFee === 0 ? "Free" : membershipFee}
                    </p>
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
        <div className="mt-5">
          <h2 className="text-xl mb-5 font-semibold text-purple-500 flex items-center gap-2">
            <FaRegStar /> You Might Also Enjoy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-2">
            {sameCategory.length > 0 ? (
              sameCategory.map((club, index) => (
                <ClubCard key={club._id} club={club} index={index} />
              ))
            ) : (
              <p className="col-span-full text-lg text-base-content/30 font-semibold">
                No Clubs Found At That Moment
              </p>
            )}
          </div>
        </div>
        <PurchaseModal club={club} closeModal={closeModal} isOpen={isOpen} />
      </div>
    </>
  );
};

export default ClubDetails;
