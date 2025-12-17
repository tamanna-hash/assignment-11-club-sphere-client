import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";

import { motion } from "framer-motion";

const ClubCard = ({ club, index }) => {
  const {
    clubName,
    clubLocation,
    category,
    description,
    coverImage,
    _id,
    membershipFee,
  } = club || {};

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      className=" hover:scale-[1.02] ease-in-out rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={coverImage}
          alt={clubName}
          className="h-40 w-full object-cover"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800">{clubName}</h3>
        <p className="text-gray-500 text-sm mt-1">{clubLocation}</p>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span
            className={`${
              membershipFee === 0 && "text-purple-600"
            } text-gray-700 font-medium`}
          >
            ${membershipFee === 0 ? "Free" : membershipFee}
          </span>
          <span className="text-sm badge badge-outline badge-info outline-purple-400 ">
            {category}
          </span>
        </div>
        <Link
          to={`/clubs/${_id}`}
          className="btn w-full mt-2 text-white bg-purple-600/90 hover:bg-purple-600/70"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};
export default ClubCard;
