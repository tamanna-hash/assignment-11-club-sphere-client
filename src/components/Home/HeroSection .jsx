import { motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import bgImg from "../../assets/textbg.jpeg"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#0a0015] via-[#1a0033] to-[#0f001a] text-white overflow-hidden">
      {/* Enhanced Animated SVG Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="radial1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Large floating orbs */}
          <motion.circle
            cx="150"
            cy="120"
            r="100"
            fill="url(#radial1)"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.circle
            cx="900"
            cy="180"
            r="140"
            fill="url(#grad2)"
            animate={{
              y: [0, 25, 0],
              x: [0, -25, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.circle
            cx="1100"
            cy="550"
            r="80"
            fill="url(#grad1)"
            animate={{
              y: [0, -35, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Flowing wave paths */}
          <motion.path
            d="M0,350 Q200,250 400,350 T800,350 Q1000,300 1200,350"
            stroke="url(#grad1)"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.path
            d="M0,450 Q300,320 600,450 T1200,450"
            stroke="url(#grad2)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          {/* Geometric elements */}
          <motion.polygon
            points="700,80 750,130 700,180 650,130"
            fill="url(#grad1)"
            opacity="0.4"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          <motion.rect
            x="250"
            y="550"
            width="80"
            height="80"
            fill="url(#grad2)"
            opacity="0.3"
            rx="15"
            animate={{
              rotate: [0, -360],
              y: [550, 530, 550],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced particle system */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1200}
              cy={Math.random() * 800}
              r={Math.random() * 3 + 1}
              fill={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#3b82f6" : "#06b6d4"}
              opacity="0.7"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/20"></div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 max-w-6xl text-center px-6"
      >
        {/* Enhanced heading with better typography */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight"
          variants={fadeUp}
          custom={1}
        >
          <span
            className="text-transparent bg-clip-text animate-bgMove block"
            style={{
              backgroundImage: `linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)`,
              backgroundSize: "300% 300%",
              animation: "gradientShift 6s ease infinite",
            }}
          >
            Discover Communities.
          </span>
          <span className="block text-white mt-2">
            Belong Anywhere.
          </span>
        </motion.h1>

        {/* Enhanced subtitle */}
        <motion.p 
          className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-light"
          variants={fadeUp}
          custom={2}
        >
          ClubSphere connects people through meaningful clubs and events — from
          <span className="text-purple-300 font-medium"> hiking trails</span> to 
          <span className="text-blue-300 font-medium"> tech talks</span>.
        </motion.p>

        {/* Enhanced CTA buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={fadeUp}
          custom={3}
        >
          <Link
            to={user ? "/clubs" : "/login"}
            className="group relative px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 font-semibold text-base"
          >
            <span className="relative z-10">Join a Club</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>

          <Link
            to={user ? "/events" : "/login"}
            className="group relative px-8 py-3 rounded-2xl border-2 border-purple-400 text-purple-200 hover:bg-purple-600/20 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transform hover:scale-105 font-semibold text-base"
          >
            <span className="relative z-10">Join an Event</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center items-center gap-6 opacity-60"
          variants={fadeUp}
          custom={4}
        >
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>1000+ Active Members</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>50+ Communities</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>200+ Events Monthly</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-purple-400 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
