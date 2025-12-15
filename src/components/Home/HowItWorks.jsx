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
const HowItWorks = () => (
  <section className="py-24 bg-black text-white">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-3xl md:text-4xl font-bold mb-16 text-center"
      >
        How ClubSphere Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {["Discover", "Join", "Participate", "Grow"].map((step, i) => (
          <motion.div
            key={step}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-600 flex items-center justify-center font-bold text-lg">
              {i + 1}
            </div>
            <h3 className="font-semibold text-lg mb-2">{step}</h3>
            <p className="text-gray-400 text-sm">
              {step === "Discover" && "Find clubs that match your interests."}
              {step === "Join" && "Become a member with secure payments."}
              {step === "Participate" && "Attend events and connect."}
              {step === "Grow" && "Build long-term communities."}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default HowItWorks;
