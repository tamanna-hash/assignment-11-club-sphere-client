import { motion } from "framer-motion";
import { Link } from "react-router";

const MyJoinedEventCard = ({ event }) => {
  const {
    title,
    eventLocation,
    maxAttendees,
    bannerImage,
    status,
    _id,
    registeredAt,
    cancelledAt,
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
      className="card shadow-xl bg-base-100 overflow-hidden border border-white"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <figure className="h-40">
        <img
          src={bannerImage}
          alt={"coverImage"}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold ">
          {title}
        </h2>

        <p className="text-sm ">Max Attendees: {maxAttendees}</p>

        <div className="flex justify-between items-center mt-2">
          <span className=" font-medium">Location: ${eventLocation}</span>
          <span className="badge badge-success badge-outline">{status}</span>
        </div>
        <p>Registered At: {new Date(registeredAt).toLocaleString()}</p>
        {status === "cancelled" && cancelledAt && (
          <p className="text-red-500">
            Cancelled At: {new Date(cancelledAt).toLocaleString()}
          </p>
        )}
        <Link to={`/events/${_id}`} className="btn bg-sky-300">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default MyJoinedEventCard;
