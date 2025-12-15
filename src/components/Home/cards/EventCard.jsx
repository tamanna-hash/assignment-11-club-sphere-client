import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";

import { motion } from "framer-motion";

const EventCard = ({ event, index }) => {
  const { title, eventLocation, eventDate, description, bannerImage, _id,isPaid,maxAttendees,manager } =
    event || {};
  return (
     <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
                duration: 0.75,
                ease: "easeInOut"
            }}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
            }}
        >
      <img
        src={bannerImage}
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-1">{eventLocation}</p>
        <p className="text-gray-500 text-sm mt-1">{eventDate}</p>
        <p className="text-gray-700 mt-2 line-clamp-2">{description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className={`font-semibold text-gray-800`}>
            {isPaid ? `$${maxAttendees}` : "Free"}
          </span>
          <span className="text-sm text-gray-500">{manager.name}</span>
        </div>

        <Link
          to={`/events/${_id}`}
          className="btn bg-cyan-600 outline-cyan-800 font-bold  hover:bg-cyan-700 btn-sm text-xs transition-transform"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
