const Contact = () => {
  return (
    <section className="bg-[#0F0B1E] min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#9B8CFF] mb-4">
            Contact Us
          </h1>
          <p className="text-[#B7B3E6]">
            Have a question or feedback? We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-[#1A1433] rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-[#EDEBFF] mb-4">
              Get in Touch
            </h2>
            <p className="text-sm text-[#B7B3E6] mb-6">
              Reach out to us anytime. Our team will get back to you as soon as
              possible.
            </p>

            <div className="space-y-4 text-sm text-[#CFCBFF]">
              <p>
                <span className="text-purple-400 font-medium">Email:</span>{" "}
                support@clubsphere.com
              </p>
              <p>
                <span className="text-purple-400 font-medium">Platform:</span>{" "}
                Clubsphere Community
              </p>
              <p>
                <span className="text-purple-400 font-medium">Availability:</span>{" "}
                24/7 Support
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-[#1A1433] rounded-2xl p-8 shadow-md space-y-5">
            <div>
              <label className="text-sm text-[#CFCBFF]">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full mt-2 px-4 py-2 rounded-lg bg-[#0F0B1E] text-white outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="text-sm text-[#CFCBFF]">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full mt-2 px-4 py-2 rounded-lg bg-[#0F0B1E] text-white outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="text-sm text-[#CFCBFF]">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-2 px-4 py-2 rounded-lg bg-[#0F0B1E] text-white outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8b80d4] hover:bg-[#7C6CFF] text-white font-semibold py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
