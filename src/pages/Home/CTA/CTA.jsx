import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="bg-[#9B8CFF] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-[#0F0B1E]">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Join a ClubSphere Community?
        </h2>
        <p className="text-[#0F0B1E]/90 mb-6">
          Explore clubs, join events, and connect with people who share your passions.
        </p>
        <Link
          to="/clubs"
          className="inline-block px-8 py-4 bg-[#0F0B1E] hover:bg-[#1A1433] text-[#EDEBFF] font-semibold rounded-lg transition"
        >
          Explore Clubs Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;
