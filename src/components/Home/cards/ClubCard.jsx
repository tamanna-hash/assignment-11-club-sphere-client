import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClubCard = ({ club }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    clubName,
    clubLocation,
    category,
    description,
    coverImage,
    _id,
    membershipFee,
  } = club || {};

  // Fetch user wishlist
  const { data: wishlist = [] } = useQuery({
    queryKey: ["my-wishlist", user?.email],
    queryFn: async () => {
      if (!user) return [];
      const res = await axiosSecure.get("/my-wishlist");
      return res.data;
    },
    enabled: !!user, // only run if user exists
  });

  // Derived state: check if this club is in the wishlist
  const isInWishlist = user
    ? wishlist.some((item) => item.clubId === _id)
    : false;

  // Add to wishlist mutation
  const addMutation = useMutation({
    mutationFn: async (wishlistData) => {
      const res = await axiosSecure.post("/my-wishlist", wishlistData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-wishlist", user.email] });
      toast.success("Added to wishlist");
    },
    onError: () => {
      toast.error("Failed to add to wishlist");
    },
  });

  // Remove from wishlist mutation
  const deleteMutation = useMutation({
    mutationFn: async ({ userEmail, clubId }) => {
      const res = await axiosSecure.delete("/my-wishlist", {
        data: { userEmail, clubId },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-wishlist", user.email] });
      toast.success("Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove from wishlist");
    },
  });

  // Handle heart click
  const handleWishlistClick = () => {
    if (!user) return toast.error("Please login to manage wishlist");

    if (isInWishlist) {
      deleteMutation.mutate({ userEmail: user.email, clubId: _id });
    } else {
      addMutation.mutate({
        userEmail: user.email,
        clubId: _id,
        clubName,
        addedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      className="hover:scale-[1.02] ease-in-out flex flex-col h-ful rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
    >
      <div className="h-40 min-h-40 overflow-hidden relative rounded-t-lg">
        <img
          src={coverImage}
          alt={clubName}
          className="h-full w-full object-cover"
        />

        {/* Heart / Wishlist button with pop animation */}
        <motion.button
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/50 transition"
          onClick={handleWishlistClick}
          whileTap={{ scale: 1.3 }}
        >
          {isInWishlist ? (
            <motion.div
              key="filled"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FaHeart size={22} className="text-red-500 transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="outline"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FaRegHeart size={22} className="text-white transition-colors" />
            </motion.div>
          )}
        </motion.button>
      </div>

      <div className="p-4 bg-white flex flex-col -mt-2 rounded-b-lg shadow-md h-full">
        <h3 className="text-lg font-semibold text-gray-800">{clubName}</h3>
        <p className="text-gray-500 text-sm mt-1">{clubLocation}</p>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{description}</p>

        <div className="mt-3 mb-1 flex justify-between items-center">
          <span
            className=
            // "text-purple-500 font-semibold"
            {`
              ${
              membershipFee === 0 ? "text-green-500" : "text-purple-500"
            }
             font-semibold`}
          >
            {membershipFee === 0 ? "Free" : `$ ${membershipFee}`}
          </span>
          <span className="text-sm px-2 py-0.5 rounded-full border border-purple-300 text-purple-500">
            {category}
          </span>
        </div>

        <div className="mt-auto">
          <Link
            to={`/clubs/${_id}`}
            className="btn w-full btn-sm border-none text-white bg-purple-600 hover:bg-purple-700 transition"
            // btn w-full btn-sm border-none text-white bg-purple-600/90 hover:bg-purple-600/70
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubCard;
