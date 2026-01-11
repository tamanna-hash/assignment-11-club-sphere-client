import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission delay
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="bg-[#0F0B1E] min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#9B8CFF] mb-4">
            Contact Us
          </h1>
          <p className="text-[#B7B3E6]">
            Have a question or feedback? We'd love to hear from you.
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
                clubsphere@gmail.com
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

            {/* Additional Contact Features */}
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <h3 className="text-lg font-medium text-[#EDEBFF] mb-3">
                What to expect:
              </h3>
              <ul className="space-y-2 text-sm text-[#B7B3E6]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Response within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Professional support team
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Detailed solutions provided
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-[#1A1433] rounded-2xl p-8 shadow-md space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm text-[#CFCBFF] mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg bg-[#0F0B1E] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-[#CFCBFF] mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-[#0F0B1E] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-[#CFCBFF] mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here... Tell us about your question, feedback, or how we can help you."
                className="w-full px-4 py-3 rounded-lg bg-[#0F0B1E] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#8b80d4] hover:bg-[#7C6CFF] hover:shadow-lg hover:shadow-purple-500/25'
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>

            <p className="text-xs text-[#B7B3E6] text-center mt-4">
              * Required fields. Your information will be kept confidential.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;