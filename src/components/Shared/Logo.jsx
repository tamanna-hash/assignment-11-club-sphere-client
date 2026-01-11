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
          className={`flex items-center gap-2 font-semibold tracking-wide ${size}`}
        >
          
          <span className="px-2 py-1 rounded-lg bg-[#1A1433] text-[#9B8CFF] text-sm font-bold border border-[#2A2452]">
            CS
          </span>

          {/* Brand Name */}
          <span className="text-[#EDEBFF]">
            Club<span className="text-purple-400">Sphere</span>
          </span>
        </motion.div>
      </div>
    </Link>
  );
};

export default Logo;
