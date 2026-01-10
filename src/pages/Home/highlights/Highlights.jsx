import { FaUsers, FaCalendarAlt, FaPlusCircle, FaShieldAlt, FaStar } from "react-icons/fa";

const Highlights = () => {
  const highlights = [
    {
      icon: <FaUsers className="text-[#9B8CFF] w-8 h-8" />,
      title: "Discover Clubs",
      description: "Find communities that match your hobbies and passions.",
    },
    {
      icon: <FaCalendarAlt className="text-[#9B8CFF] w-8 h-8" />,
      title: "Join Events",
      description: "Attend exciting events organized by local clubs.",
    },
    {
      icon: <FaPlusCircle className="text-[#9B8CFF] w-8 h-8" />,
      title: "Create Your Club",
      description: "Start your own club and invite members easily.",
    },
    {
      icon: <FaShieldAlt className="text-[#9B8CFF] w-8 h-8" />,
      title: "Safe & Verified",
      description: "All clubs and hosts are verified for a safe experience.",
    },
    {
      icon: <FaStar className="text-[#9B8CFF] w-8 h-8" />,
      title: "Community Stats",
      description: "500+ clubs • 2000+ events • 10,000+ members",
    },
  ];

  return (
    <section className="bg-[#0F0B1E] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-[#9B8CFF] mb-4">
          Highlights
        </h2>
        <p className="text-[#B7B3E6]">
          Why join ClubSphere? Here are some key reasons to start exploring.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="bg-[#1A1433] p-6 rounded-xl flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-[#EDEBFF] mb-2">
              {item.title}
            </h3>
            <p className="text-[#B7B3E6] text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
