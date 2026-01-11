import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaSearch, FaUserPlus, FaCalendarCheck, FaChartLine } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Discover",
      description: "Browse clubs that match your interests and passions",
      icon: FaSearch,
      details: "Use filters to find the perfect community for you"
    },
    {
      title: "Join",
      description: "Become a member with secure payments or free registration",
      icon: FaUserPlus,
      details: "Simple signup process with instant access"
    },
    {
      title: "Participate",
      description: "Attend events, connect with members, and engage actively",
      icon: FaCalendarCheck,
      details: "Join discussions, events, and activities"
    },
    {
      title: "Grow",
      description: "Build lasting relationships and develop new skills",
      icon: FaChartLine,
      details: "Track your progress and expand your network"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#0F0B1E] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How ClubSphere Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting started is simple. Follow these four easy steps to join your community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center group"
              >
                {/* Step Number and Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 mx-auto bg-[#1A1433] rounded-full flex items-center justify-center border border-purple-500/30">
                    <Icon className="text-purple-400 text-lg" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl mb-3 text-white">{step.title}</h3>
                <p className="text-gray-300 text-sm mb-2 leading-relaxed">{step.description}</p>
                <p className="text-purple-400 text-xs">{step.details}</p>

                {/* Connection Line (except for last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-600/50 to-transparent transform translate-x-8"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Simple CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Ready to get started?</p>
          <Link 
            to="/clubs" 
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Start Exploring
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
