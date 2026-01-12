import { useState } from 'react';
import { Link } from "react-router";
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaGlobe, 
  FaHeart, 
  FaRocket, 
  FaShieldAlt, 
  FaLightbulb,
  FaHandshake,
  FaStar,
  FaArrowRight,
  FaPlay
} from 'react-icons/fa';

const About = () => {
  const [activeValue, setActiveValue] = useState(0);

  const stats = [
    { number: '10K+', label: 'Active Members', icon: FaUsers },
    { number: '500+', label: 'Active Clubs', icon: FaGlobe },
    { number: '2K+', label: 'Events Hosted', icon: FaCalendarAlt },
    { number: '50+', label: 'Categories', icon: FaHeart }
  ];

  const values = [
    {
      icon: FaUsers,
      title: 'Community First',
      description: 'We believe in the power of bringing people together through shared interests and meaningful connections.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: FaShieldAlt,
      title: 'Trust & Safety',
      description: 'Creating a safe, inclusive environment where everyone feels welcome and respected.',
      color: 'from-green-500 to-blue-500'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge features and user-centric design.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FaHandshake,
      title: 'Accessibility',
      description: 'Making club discovery and community building accessible to everyone, everywhere.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const features = [
    {
      icon: FaGlobe,
      title: 'Discover Clubs',
      description: 'Explore thousands of clubs across various interests including travel, food, books, sports, photography, and more.',
      benefits: ['Advanced search filters', 'Personalized recommendations', 'Category-based browsing']
    },
    {
      icon: FaCalendarAlt,
      title: 'Join Events',
      description: 'Attend public or private events hosted by clubs and connect with people who share your passion.',
      benefits: ['Real-time event updates', 'Easy registration process', 'Event reminders']
    },
    {
      icon: FaRocket,
      title: 'Create Communities',
      description: 'Start your own club, organize events, and build a welcoming community around your interests.',
      benefits: ['Club management tools', 'Member analytics', 'Event planning features']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Photography Club Member',
      content: 'ClubSphere helped me find an amazing photography community. I\'ve made lifelong friends and improved my skills tremendously.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Book Club Manager',
      content: 'Managing our book club has never been easier. The platform provides all the tools we need to organize events and engage members.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Hiking Enthusiast',
      content: 'I discovered so many hiking groups in my area. The event system makes it simple to join adventures and meet fellow hikers.',
      rating: 5
    }
  ];

  return (
    <section className="bg-[#0F0B1E] text-[#EDEBFF] min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6">
              <FaHeart className="text-purple-400" />
              <span className="text-sm text-purple-300">Building Communities Since 2024</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#9B8CFF] mb-6">
              About <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">ClubSphere</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-[#B7B3E6] leading-relaxed">
              ClubSphere is a community-driven platform designed to bring people together through shared interests, 
              passions, and meaningful connections that last a lifetime.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-[#1A1433]/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 text-center hover:bg-[#1A1433]/70 transition-all duration-300">
                  <Icon className="text-3xl text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-[#EDEBFF] mb-1">{stat.number}</div>
                  <div className="text-sm text-[#B7B3E6]">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#9B8CFF]">
            Our Mission
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-[#B7B3E6] leading-relaxed">
            Our mission is to make it easy for people to discover communities, join meaningful clubs, 
            and participate in events that inspire connection, learning, and real-world experiences. 
            We believe everyone deserves to find their tribe.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-12 text-[#9B8CFF]">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className={`bg-[#1A1433] border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300 cursor-pointer ${
                    activeValue === index ? 'ring-2 ring-purple-400/50' : ''
                  }`}
                  onClick={() => setActiveValue(index)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#EDEBFF] mb-3">{value.title}</h4>
                  <p className="text-[#B7B3E6] leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#1A1433]/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#9B8CFF]">
              What Makes Us Special
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-[#B7B3E6]">
              Discover the features that make ClubSphere the perfect platform for building and joining communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#1A1433] border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#EDEBFF] mb-4">{feature.title}</h3>
                  <p className="text-[#B7B3E6] mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-[#CFCBFF]">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#9B8CFF]">
            What Our Community Says
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-[#B7B3E6]">
            Real stories from real people who found their communities through ClubSphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#1A1433] border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-[#B7B3E6] mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-[#EDEBFF]">{testimonial.name}</div>
                <div className="text-sm text-purple-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Safety */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <FaShieldAlt className="text-5xl text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#9B8CFF]">
              Built on Trust & Safety
            </h2>
            <p className="text-xl text-[#B7B3E6] mb-8 leading-relaxed">
              ClubSphere promotes respectful interaction, clear community guidelines, and active moderation 
              to ensure a safe and inclusive environment for everyone. Your safety and privacy are our top priorities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1A1433]/50 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-semibold text-[#EDEBFF] mb-2">Community Guidelines</h4>
                <p className="text-sm text-[#B7B3E6]">Clear rules that promote respect and inclusivity</p>
              </div>
              <div className="bg-[#1A1433]/50 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-semibold text-[#EDEBFF] mb-2">Active Moderation</h4>
                <p className="text-sm text-[#B7B3E6]">24/7 monitoring to maintain a safe environment</p>
              </div>
              <div className="bg-[#1A1433]/50 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-semibold text-[#EDEBFF] mb-2">Privacy Protection</h4>
                <p className="text-sm text-[#B7B3E6]">Your data is secure and never shared without consent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Find Your Community?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already discovered their passion and built meaningful connections through ClubSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/clubs" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              Explore Clubs
              <FaArrowRight />
            </Link>
            <Link 
              to="/signup" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            >
              Join ClubSphere
              <FaPlay />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
