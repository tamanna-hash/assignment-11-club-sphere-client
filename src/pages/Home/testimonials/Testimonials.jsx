import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Talha Tarique",
      role: "Photography Enthusiast",
      text: "ClubSphere helped me discover amazing photography clubs in my city. The community is friendly, and the events are well-organized.",
    },
    {
      name: "Jhankar Mahbub",
      role: "Hiking Lover",
      text: "I joined a hiking club through ClubSphere and met like-minded people instantly. The platform makes discovering clubs effortless!",
    },
    {
      name: "Shakil Ahmed Atik",
      role: "Foodie Explorer",
      text: "The events and meetups are amazing. I love how ClubSphere connects people with shared interests in such a seamless way.",
    },
  ];

  return (
    <section className="bg-[#0F0B1E] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-[#9B8CFF] mb-4">
          What Our Members Say
        </h2>
        <p className="text-[#B7B3E6]">
          Hear from our community members and see how ClubSphere connects people through shared passions.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#1A1433] p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
          >
            <div className="mb-4">
              <div className="flex items-start mb-2">
                <FaQuoteLeft className="text-[#9B8CFF] w-5 h-5 mr-2" />
                <p className="text-[#EDEBFF] text-sm">{item.text}</p>
              </div>
              <div className="flex justify-end">
                <FaQuoteRight className="text-[#9B8CFF] w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-[#EDEBFF] font-semibold">{item.name}</h3>
              <p className="text-[#B7B3E6] text-sm">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
