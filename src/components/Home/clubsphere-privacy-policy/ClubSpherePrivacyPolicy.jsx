const PrivacyPolicy = () => {
  return (
    <section className="bg-[#0F0B1E] min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#9B8CFF] mb-6">
          Privacy Policy
        </h1>

        <p className="text-[#B7B3E6] mb-8">
          Your privacy matters to us. This Privacy Policy explains how
          Clubsphere collects, uses, and protects your information.
        </p>

        {/* Section */}
        <div className="space-y-8 text-[#CFCBFF]">
          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-sm leading-relaxed">
              We may collect personal information such as your name, email
              address, and profile details when you register or interact with
              our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-sm leading-relaxed">
              We use your information to provide and improve our services,
              communicate updates, manage clubs and events, and ensure platform
              security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              3. Data Protection
            </h2>
            <p className="text-sm leading-relaxed">
              We implement reasonable security measures to protect your data.
              However, no online platform can guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              4. Third-Party Services
            </h2>
            <p className="text-sm leading-relaxed">
              Clubsphere may use trusted third-party services for analytics,
              authentication, or hosting. These services follow their own
              privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              5. Your Rights
            </h2>
            <p className="text-sm leading-relaxed">
              You may request access, updates, or deletion of your personal
              information by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              6. Updates to This Policy
            </h2>
            <p className="text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-12">
          Last updated: March 2026
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
