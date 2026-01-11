import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import { 
  FaUsers, 
  FaChartLine, 
  FaCalendarAlt, 
  FaHeart, 
  FaLightbulb, 
  FaGlobe,
  FaArrowRight,
  FaStar,
  FaHandshake,
  FaRocket,
  FaShieldAlt,
  FaGift
} from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const WhyJoin = () => {
  const [activeReason, setActiveReason] = useState(0);

  const reasons = [
    {
      icon: FaUsers,
      title: "Real Connections",
      subtitle: "Build Meaningful Relationships",
      description: "Meet people who genuinely share your interests and passions. Form lasting friendships that extend beyond club activities.",
      benefits: ["Like-minded community", "Lasting friendships", "Networking opportunities", "Social support system"],
      color: "from-blue-500 to-purple-500",
      stats: "10K+ connections made"
    },
    {
      icon: FaChartLine,
      title: "Skill Growth",
      subtitle: "Accelerate Your Learning",
      description: "Learn faster through group experiences, mentorship, and hands-on activities. Develop both personal and professional skills.",
      benefits: ["Peer learning", "Expert mentorship", "Hands-on practice", "Skill certification"],
      color: "from-green-500 to-blue-500",
      stats: "500+ skills developed"
    },
    {
      icon: FaCalendarAlt,
      title: "Exclusive Events",
      subtitle: "Access Premium Experiences",
      description: "Access members-only meetups, workshops, and special events. Enjoy curated experiences you won't find anywhere else.",
      benefits: ["VIP access", "Expert workshops", "Networking events", "Special discounts"],
      color: "from-purple-500 to-pink-500",
      stats: "2K+ exclusive events"
    }
  ];

  const additionalBenefits = [
    {
      icon: FaLightbulb,
      title: "Discover New Interests",
      description: "Explore hobbies and activities you never knew you'd love"
    },
    {
      icon: FaGlobe,
      title: "Global Community",
      description: "Connect with people from around the world who share your passions"
    },
    {
      icon: FaHandshake,
      title: "Professional Growth",
      description: "Build your network and advance your career through meaningful connections"
    },
    {
      icon: FaRocket,
      title: "Personal Development",
      description: "Challenge yourself and grow through new experiences and activities"
    },
    {
      icon: FaShieldAlt,
      title: "Safe Environment",
      description: "Join a trusted community with verified members and moderated interactions"
    },
    {
      icon: FaGift,
      title: "Exclusive Perks",
      description: "Enjoy member benefits, discounts, and special offers from partner organizations"
    }
  ];

  const testimonialHighlights = [
    { text: "Found my best friends", author: "Sarah M." },
    { text: "Learned photography", author: "Mike C." },
    { text: "Started my own business", author: "Emma D." },
    { text: "Discovered my passion", author: "Alex R." }
  ];

  return (
    <section className="pt-24 bg-linear-to-b from-[#0F0B1E] via-[#12001f] to-[#0F0B1E] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6">
            <FaHeart className="text-purple-400" />
            <span className="text-sm text-purple-300">Join the Movement</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Join a <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Club</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the transformative power of community. Join thousands who have already found their passion, 
            built meaningful connections, and unlocked their potential through ClubSphere.
          </p>
        </motion.div>

        {/* Main Reasons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            const isActive = activeReason === i;
            
            return (
              <motion.div
                key={reason.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`bg-[#1A1433]/50 backdrop-blur-sm border rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-101 ${
                  isActive ? 'border-purple-400/60 ring-2 ring-purple-400/30' : 'border-purple-500/20 hover:border-purple-400/40'
                }`}
                onClick={() => setActiveReason(i)}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-r ${reason.color} flex items-center justify-center mb-6`}>
                  <Icon className="text-white text-2xl" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-white">{reason.title}</h3>
                <p className="text-purple-300 font-medium mb-4">{reason.subtitle}</p>
                <p className="text-gray-300 mb-6 leading-relaxed">{reason.description}</p>
                
                <div className="space-y-2 mb-6">
                  {reason.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-400 font-medium">{reason.stats}</span>
                  <FaArrowRight className={`text-purple-400 transition-transform duration-300 ${isActive ? 'translate-x-1' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Even More <span className="text-purple-400">Benefits</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-[#1A1433]/30 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <Icon className="text-2xl text-purple-400 mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 mb-16 border border-purple-500/30"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Real Success Stories</h3>
            <p className="text-gray-300">See what our community members have achieved</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {testimonialHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#1A1433]/50 rounded-xl p-4 mb-2">
                  <FaStar className="text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">"{highlight.text}"</p>
                </div>
                <p className="text-purple-300 text-xs">- {highlight.author}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyJoin;