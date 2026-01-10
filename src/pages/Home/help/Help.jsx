import { useState } from "react";
import { Link } from "react-router";

const faqs = [
  {
    question: "How do I join a club?",
    answer:
      "Browse the Clubs page, select a club that matches your interest, and click Join. Some clubs may require approval.",
  },
  {
    question: "Is ClubSphere free to use?",
    answer:
      "Yes, ClubSphere is free to join. Some events may have fees set by organizers.",
  },
  {
    question: "Can I create my own club?",
    answer:
      "Once logged in, you can create a club from your dashboard and start building your community.",
  },
  {
    question: "How do events work?",
    answer:
      "Clubs can host events with clear details such as date, time, and location. Members can RSVP directly.",
  },
  {
    question: "Can I attend events without joining a club?",
    answer:
      "Some events are public and open to everyone. Private events require club membership.",
  },
];

const Help = () => {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0B1E] text-[#EDEBFF] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#9B8CFF]">
            Help Center
          </h1>
          <p className="mt-3 text-[#B7B3E6]">
            Find answers, learn how things work, and get support.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help topics..."
            className="input input-bordered w-full bg-[#1A1433] border-[#2A2452] text-[#EDEBFF] placeholder-[#B7B3E6]"
          />
        </div>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[#9B8CFF]">
            Frequently Asked Questions
          </h2>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow bg-[#1A1433] border border-[#2A2452]"
                >
                  <input type="checkbox" />
                  <div className="collapse-title font-medium">
                    {faq.question}
                  </div>
                  <div className="collapse-content text-[#B7B3E6]">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#B7B3E6] mt-6">
              No results found. Try a different keyword.
            </p>
          )}
        </section>

        {/* Getting Started */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[#9B8CFF]">
            Getting Started
          </h2>
          <ul className="steps steps-vertical md:steps-horizontal w-full">
            <li className="step step-primary">Create account</li>
            <li className="step step-primary">Complete profile</li>
            <li className="step step-primary">Explore clubs</li>
            <li className="step step-primary">Join events</li>
            <li className="step step-primary">Connect</li>
          </ul>
        </section>

        {/* Safety */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#9B8CFF]">
            Safety & Community
          </h2>
          <div className="bg-[#1A1433] border border-[#2A2452] rounded-xl p-6 text-[#B7B3E6]">
            Respect others, follow community guidelines, and report inappropriate
            behavior. We actively moderate content to keep ClubSphere safe.
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-3 text-[#9B8CFF]">
            Contact Support
          </h2>
          <p className="text-[#B7B3E6] mb-4">
            Still need help? Our support team usually replies within 24 hours.
          </p>
          <Link to={"/contact"} className="btn bg-[#7C6CFF] hover:bg-[#9B8CFF] text-black border-none">
            Contact Support
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Help;
