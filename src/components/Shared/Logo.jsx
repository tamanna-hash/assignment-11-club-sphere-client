import { Link } from "react-router";
import { motion } from "framer-motion";
const Logo = ({ size = "text-2xl" }) => {
  return (
    <Link to="/">
      {/* <div>
       <motion.div
        whileHover={{ scale: 1.05 }}
        className={`font-bold tracking-wide ${size}`}
      >
        <span className="text-purple-400">Club</span>
        <span className="text-white">Sphere</span>
      </motion.div>
     </div> */}
      <div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`flex items-center m-2 gap-2 font-semibold tracking-wide ${size}`}
        >
          <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="px-2 py-1 rounded-lg bg-[#1A1433] text-[#9B8CFF] text-sm font-bold border border-[#2A2452]">
              CS
            </span>
          </div>

          {/* Brand Name */}
          <Link to={"/"}>
            <span className="text-[#EDEBFF]">
              Club<span className="text-purple-400">Sphere</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </Link>
  );
};

export default Logo;
