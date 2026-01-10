import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";

import { motion } from "framer-motion";

const EventCard = ({ event, index }) => {
  const {
    title,
    eventLocation,
    eventDate,
    description,
    bannerImage,
    _id,
    isPaid,
    maxAttendees,
    manager,
  } = event || {};
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
      className="hover:scale-[1.02] ease-in-out flex flex-col h-ful rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
    >
      <div className="h-40 min-h-40 overflow-hidden relative rounded-t-lg">
        <img
          src={bannerImage}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 bg-white flex flex-col -mt-2 rounded-b-lg shadow-md h-full">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-gray-600 mt-1 font-medium">{eventLocation}</p>
          <p className="text-gray-500 text-sm mt-1 italic">{eventDate}</p>
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className={`font-semibold text-green-500`}>
            {isPaid ? `$${maxAttendees}` : "Free"}
          </span>
          {/* <span className="text-sm text-gray-500 italic">
            Event Host: {manager.name}
          </span> */}
        </div>
        <div className="mt-auto">
          <Link
            to={`/events/${_id}`}
            className="btn w-full btn-sm border-none text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
