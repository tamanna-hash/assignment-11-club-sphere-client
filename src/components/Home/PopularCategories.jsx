import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};

const PopularCategories = () => {
  const location = useLocation();

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
          Popular Categories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg;gap-2 gap-6">
          {["Hiking", "Photography", "Tech", "Sports"].map((category, i) => {
            // Build a robust URL preserving other query params if needed
            const params = new URLSearchParams(location.search);
            params.set("category", category);

            return (
              <motion.div
                key={category}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-linear-to-br from-[#1a002b] to-[#12001f] rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition"
              >
                <h3 className="text-xl font-semibold mb-2">{category} Clubs</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Explore curated {category.toLowerCase()} communities actively
                  organizing events and welcoming new members.
                </p>
                <Link
                  to={`/clubs?${params.toString()}`} // dynamically sets category
                  className="text-purple-400 hover:underline"
                >
                  Explore →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
