import { useState } from "react";
import { Link } from "react-router"; // Ensure you have react-router-dom

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Clubsphere?",
      answer:
        "Clubsphere is a platform that connects people through clubs and communities based on shared interests and hobbies.",
    },
    {
      question: "How do I join a club?",
      answer:
        "Simply browse clubs, click on the club you like, and hit 'Join'. Some clubs may require approval from the club host.",
    },
    {
      question: "Are there any fees to join?",
      answer:
        "Some clubs are free, while others may charge a membership fee. The fee is displayed on each club’s page.",
    },
    {
      question: "Can I create my own club?",
      answer:
        "Yes! You can create a club by clicking 'Create Club' and filling in the details. Your club will be visible to other users.",
    },
    {
      question: "How can I attend events?",
      answer:
        "Each club lists their events. Click 'View Details' on an event and follow the instructions to RSVP or join.",
    },
  ];

  return (
    <section className="bg-[#0F0B1E] text-[#EDEBFF] py-16 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-[#9B8CFF] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-[#B7B3E6]">
          Here are answers to some common questions about Clubsphere. Learn
          more on our Help page.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1A1433] rounded-xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <h3 className="text-lg font-semibold text-[#9B8CFF] flex justify-between items-center">
              {faq.question}
              <span className="ml-2">{openIndex === index ? "−" : "+"}</span>
            </h3>
            {openIndex === index && (
              <p className="mt-2 text-[#B7B3E6] text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* See All FAQs Link */}
      <div className="mt-8 text-center">
        <Link
          to="/help"
          className="inline-block text-[#9B8CFF] font-semibold hover:text-[#7C6CFF] transition-colors"
        >
          See All FAQs →
        </Link>
      </div>
    </section>
  );
};

export default HomeFAQ;
