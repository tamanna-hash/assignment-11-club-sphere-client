import { motion } from "framer-motion";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" },
  }),
};

const FeaturedSection = () => {
  const { data: clubs = [] } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/featured-clubs-newest`
      );
      return res.data;
    },
  });

  return (
    <section className="py-24 bg-[#0c0016] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Featured Communities
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clubs.map((club, i) => (
            <motion.div
              key={club.clubId}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-linear-to-br  from-[#200035] to-[#12001f]
              rounded-2xl overflow-hidden
              hover:scale-[1.04] transition"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={club.coverImage}
                  alt={club.clubName}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">
                  {club.clubName}
                </h3>

                <p className="text-sm text-gray-400 mb-3">
                  {club.category} • {club.totalMembers || 0} members
                </p>

                <Link
                  to={`/clubs/${club.clubId}`}
                  className="text-purple-400 hover:underline"
                >
                  Explore →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
