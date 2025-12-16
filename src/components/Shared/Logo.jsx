import { Link } from "react-router";
import { motion } from "framer-motion";

const Logo = ({ size = "text-2xl" }) => {
  return (
    <Link to="/">
     <div>
       <motion.div
        whileHover={{ scale: 1.05 }}
        className={`font-bold tracking-wide ${size}`}
      >
        <span className="text-purple-400">Club</span>
        <span className="text-white">Sphere</span>
      </motion.div>
     </div>
    </Link>
  );
};

export default Logo;