import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { 
  FaHiking, 
  FaCamera, 
  FaLaptopCode, 
  FaFootballBall
} from 'react-icons/fa';

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

  const categories = [
    {
      name: "Hiking",
      icon: FaHiking,
      description: "Explore nature trails and mountain adventures with fellow outdoor enthusiasts",
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Photography",
      icon: FaCamera,
      description: "Capture moments and improve your skills with passionate photographers",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Tech",
      icon: FaLaptopCode,
      description: "Connect with developers, designers, and tech innovators in your area",
      color: "from-purple-500 to-violet-600"
    },
    {
      name: "Sports",
      icon: FaFootballBall,
      description: "Join competitive leagues and casual games across various sports",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0c0016] to-[#0F0B1E] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover communities across diverse interests. From outdoor adventures to creative pursuits, 
            find your perfect match among active clubs.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, i) => {
            const Icon = category.icon;
            const params = new URLSearchParams(location.search);
            params.set("category", category.name);

            return (
              <motion.div
                key={category.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group h-full"
              >
                <Link
                  to={`/clubs?${params.toString()}`}
                  className="flex flex-col h-full bg-[#1A1433] border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-1">
                    {category.description}
                  </p>

                  {/* Explore Link */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                      Explore Clubs
                    </span>
                    <svg 
                      className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">
            Looking for something else? We have clubs for every interest.
          </p>
          <Link 
            to="/clubs" 
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse All Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCategories;
