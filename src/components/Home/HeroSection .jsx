import { motion } from "framer-motion";
import { Link } from "react-router";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};


const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center bg-linear-to-br from-[#12001f] via-[#1b0033] to-black text-white overflow-hidden">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="max-w-5xl text-center px-6"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        Discover Communities.
        <span className="block text-purple-400">Belong Anywhere.</span>
      </h1>
      <p className="text-gray-300 text-lg md:text-xl mb-10">
        ClubSphere connects people through meaningful clubs and events — from
        hiking trails to tech talks. Join communities, manage memberships, and
        grow together.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/clubs"
          className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition shadow-lg"
        >
          Join a Club
        </Link>
        <Link
          to="/events"
          className="px-8 py-3 rounded-xl border border-purple-500 text-purple-300 hover:bg-purple-600/10 transition"
        >
          Join an Event
        </Link>
      </div>
    </motion.div>
  </section>
);
export default HeroSection;