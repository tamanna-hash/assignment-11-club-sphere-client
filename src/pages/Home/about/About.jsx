import { Link } from "react-router";

const About = () => {
  return (
    <section className="bg-[#0F0B1E] text-[#EDEBFF] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-[#9B8CFF]">
            About ClubSphere
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-[#B7B3E6]">
            ClubSphere is a community-driven platform designed to bring people
            together through shared interests, passions, and activities.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#9B8CFF]">
            Our Mission
          </h2>
          <p className="max-w-4xl mx-auto text-[#B7B3E6]">
            Our mission is to make it easy for people to discover communities,
            join meaningful clubs, and participate in events that inspire
            connection, learning, and real-world experiences.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#1A1433] border border-[#2A2452] rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-[#9B8CFF] mb-3">
              Discover Clubs
            </h3>
            <p className="text-[#B7B3E6]">
              Explore clubs across various interests including travel, food,
              books, sports, photography, and more.
            </p>
          </div>

          <div className="bg-[#1A1433] border border-[#2A2452] rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-[#9B8CFF] mb-3">
              Join Events
            </h3>
            <p className="text-[#B7B3E6]">
              Attend public or private events hosted by clubs and connect with
              people who share your passion.
            </p>
          </div>

          <div className="bg-[#1A1433] border border-[#2A2452] rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-[#9B8CFF] mb-3">
              Create Communities
            </h3>
            <p className="text-[#B7B3E6]">
              Start your own club, organize events, and build a welcoming
              community around your interests.
            </p>
          </div>
        </div>

        {/* Trust */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#9B8CFF]">
            Built on Trust & Safety
          </h2>
          <p className="max-w-4xl mx-auto text-[#B7B3E6]">
            ClubSphere promotes respectful interaction, clear community
            guidelines, and active moderation to ensure a safe and inclusive
            environment for everyone.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#9B8CFF]">
            Be Part of the Community
          </h2>
          <p className="text-[#B7B3E6] mb-6">
            Discover new interests, meet like-minded people, and grow together
            through shared experiences.
          </p>
          <Link to={"/clubs"} className="btn bg-[#7C6CFF] hover:bg-[#9B8CFF] text-black border-none px-8">
            Explore Clubs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
