import { motion } from "framer-motion";
import { Link } from "react-router";

const MyJoinedClubCard = ({ club }) => {
  const { name, category,joined_at, clubId, image, fee, status } = club || {};
  console.log(club);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      className="card shadow-xl bg-base-100 overflow-hidden"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <figure className="h-40">
        <img
          src={image}
          alt={"coverImage"}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold ">{name}</h2>

        <p className="text-sm ">Category: {category}</p>
        <p className="text-sm">Joined at{new Date(joined_at).toLocaleString()}</p>

        <div className="flex justify-between items-center mt-2">
          <span className=" font-medium">Fee: ${fee}</span>
          <span className="badge badge-success badge-outline">{status}</span>
        </div>
        <div className="  text-sm ">
          <Link
          to={`/clubs/${clubId}`}
          className="btn w-full text-white bg-purple-500 hover:bg-purple-400"
        >
          View Details
        </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default MyJoinedClubCard;
