import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Placeholder for subscription logic
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-[#0F0B1E] py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#9B8CFF] mb-4">
          Stay Updated
        </h2>
        <p className="text-[#B7B3E6] mb-6">
          Subscribe to our newsletter and never miss new clubs, events, and updates.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:flex-1 p-3 rounded-lg border border-gray-600 bg-[#1A1433] text-[#EDEBFF] focus:outline-none focus:ring-2 focus:ring-[#9B8CFF]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
