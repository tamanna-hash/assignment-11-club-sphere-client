import { useState } from 'react';
import { FaShieldAlt, FaUserShield, FaLock, FaEye, FaDatabase, FaCog, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FaDatabase,
      content: {
        intro: 'We collect information to provide you with the best club management experience.',
        details: [
          {
            subtitle: 'Personal Information',
            items: [
              'Name, email address, and profile information',
              'Club membership details and preferences',
              'Event registration and participation data',
              'Payment information (processed securely through Stripe)'
            ]
          },
          {
            subtitle: 'Usage Information',
            items: [
              'Platform interaction data and navigation patterns',
              'Device information and browser details',
              'IP address and location data (for security)',
              'Cookies and similar tracking technologies'
            ]
          }
        ]
      }
    },
    {
      id: 'information-usage',
      title: 'How We Use Your Information',
      icon: FaCog,
      content: {
        intro: 'Your information helps us deliver personalized and secure services.',
        details: [
          {
            subtitle: 'Service Delivery',
            items: [
              'Managing your club memberships and event registrations',
              'Processing payments and membership fees',
              'Sending notifications about club activities and updates',
              'Providing customer support and assistance'
            ]
          },
          {
            subtitle: 'Platform Improvement',
            items: [
              'Analyzing usage patterns to enhance user experience',
              'Developing new features based on user needs',
              'Maintaining platform security and preventing fraud',
              'Conducting research and analytics for service optimization'
            ]
          }
        ]
      }
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Security',
      icon: FaLock,
      content: {
        intro: 'We implement industry-standard security measures to protect your data.',
        details: [
          {
            subtitle: 'Security Measures',
            items: [
              'End-to-end encryption for sensitive data transmission',
              'Secure authentication using Firebase Auth',
              'Regular security audits and vulnerability assessments',
              'Access controls and employee data handling training'
            ]
          },
          {
            subtitle: 'Data Storage',
            items: [
              'Data stored in secure, encrypted databases',
              'Regular backups with encryption at rest',
              'Compliance with international data protection standards',
              'Limited data retention periods based on necessity'
            ]
          }
        ]
      }
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      icon: FaUserShield,
      content: {
        intro: 'We partner with trusted services to enhance your experience.',
        details: [
          {
            subtitle: 'Service Providers',
            items: [
              'Firebase (Google) - Authentication and database services',
              'Stripe - Secure payment processing',
              'Vercel/Netlify - Hosting and content delivery',
              'Email service providers for notifications'
            ]
          },
          {
            subtitle: 'Data Sharing',
            items: [
              'We never sell your personal information to third parties',
              'Data shared only with essential service providers',
              'All partners bound by strict data protection agreements',
              'You can opt-out of non-essential data sharing'
            ]
          }
        ]
      }
    },
    {
      id: 'user-rights',
      title: 'Your Privacy Rights',
      icon: FaEye,
      content: {
        intro: 'You have full control over your personal information.',
        details: [
          {
            subtitle: 'Access & Control',
            items: [
              'View and download all your personal data',
              'Update or correct your information anytime',
              'Delete your account and associated data',
              'Control notification preferences and privacy settings'
            ]
          },
          {
            subtitle: 'Legal Rights',
            items: [
              'Right to data portability and export',
              'Right to object to data processing',
              'Right to restrict processing in certain circumstances',
              'Right to lodge complaints with data protection authorities'
            ]
          }
        ]
      }
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      icon: FaCalendarAlt,
      content: {
        intro: 'We use cookies to improve your browsing experience.',
        details: [
          {
            subtitle: 'Cookie Types',
            items: [
              'Essential cookies for platform functionality',
              'Performance cookies for analytics and optimization',
              'Preference cookies to remember your settings',
              'Marketing cookies (with your consent)'
            ]
          },
          {
            subtitle: 'Cookie Management',
            items: [
              'Control cookie preferences in your browser settings',
              'Opt-out of non-essential cookies anytime',
              'Clear cookies to reset your preferences',
              'Use private browsing mode to limit tracking'
            ]
          }
        ]
      }
    }
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <section className="bg-[#0F0B1E] min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaShieldAlt className="text-4xl text-[#9B8CFF]" />
            <h1 className="text-4xl font-bold text-[#9B8CFF]">
              Privacy Policy
            </h1>
          </div>
          <p className="text-[#B7B3E6] text-lg max-w-3xl mx-auto">
            Your privacy is our priority. This comprehensive policy explains how ClubSphere 
            collects, uses, protects, and respects your personal information.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-[#1A1433] px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-[#CFCBFF]">Last updated: January 2026</span>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-[#1A1433] rounded-2xl p-8 mb-12 border border-purple-500/20">
          <h2 className="text-2xl font-semibold text-[#EDEBFF] mb-4 flex items-center gap-2">
            <FaEye className="text-purple-400" />
            Privacy at a Glance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaLock className="text-purple-400" />
              </div>
              <h3 className="font-medium text-[#EDEBFF] mb-2">Secure by Design</h3>
              <p className="text-sm text-[#B7B3E6]">End-to-end encryption and industry-standard security</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUserShield className="text-purple-400" />
              </div>
              <h3 className="font-medium text-[#EDEBFF] mb-2">Your Control</h3>
              <p className="text-sm text-[#B7B3E6]">Full access, update, and deletion rights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaShieldAlt className="text-purple-400" />
              </div>
              <h3 className="font-medium text-[#EDEBFF] mb-2">No Data Sales</h3>
              <p className="text-sm text-[#B7B3E6]">We never sell your personal information</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div key={section.id} className="bg-[#1A1433] rounded-2xl border border-purple-500/20 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-purple-500/5 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#EDEBFF]">
                          {index + 1}. {section.title}
                        </h3>
                        <p className="text-[#B7B3E6] text-sm mt-1">
                          {section.content.intro}
                        </p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {isActive && (
                  <div className="px-6 pb-6 border-t border-purple-500/10">
                    <div className="pt-6 space-y-6">
                      {section.content.details.map((detail, detailIndex) => (
                        <div key={detailIndex}>
                          <h4 className="font-medium text-[#EDEBFF] mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            {detail.subtitle}
                          </h4>
                          <ul className="space-y-2 ml-4">
                            {detail.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-[#CFCBFF] text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20">
          <div className="text-center">
            <FaEnvelope className="text-3xl text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#EDEBFF] mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-[#B7B3E6] mb-6 max-w-2xl mx-auto">
              We're committed to transparency. If you have any questions about this privacy policy 
              or how we handle your data, don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/contact" 
                className="bg-[#8b80d4] hover:bg-[#7C6CFF] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Contact Us
              </a>
              <span className="text-[#B7B3E6] text-sm">
                Email: clubsphere@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-purple-500/20 text-center">
          <p className="text-sm text-[#B7B3E6]">
            This privacy policy is effective as of January 12, 2026 and will remain in effect except with respect to any changes in its provisions in the future.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2026 ClubSphere. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
