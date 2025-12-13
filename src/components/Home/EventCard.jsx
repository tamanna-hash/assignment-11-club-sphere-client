import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";

const EventCard = ({ event}) => {
   const { name,eventLocation,eventDate, description, bannerImage, _id} = event||{};
  return (
    <div className="p-2 animate__animated animate__fadeInUp md:p-2 flex md:flex-row flex-col justify-between items-center border-b border-slate-300">
      <div className="flex items-center gap-4">
        <div className="">
          <img src={bannerImage} alt={"eventImage"} className="h-20 w-20 rounded-2xl" />
        </div>
        <div>
          <h1 className="text-lg font-bold mb-2">{name}</h1>
          <div className="md:flex gap-3">
            <p className="text-sm text-green-500 items-center ">
              Fee: Free
            </p>
            <p className="text-sm flex items-center">
              Location: {eventLocation}
            </p>
            <p className="">On:{eventDate}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center md:mt-0 mt-2 gap-2">
        <Link
          to={`/events/${_id}`}
          className="btn btn-outline outline-cyan-800 font-bold  hover:bg-cyan-100 btn-sm text-xs transition-transform"
        >
          View Details
        </Link>
       
      </div>
    </div>
  );
};

export default EventCard;
