const TermsOfUse = () => {
  return (
    <section className="bg-[#0F0B1E] min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#9B8CFF] mb-6">
          Terms of Use
        </h1>

        <p className="text-[#B7B3E6] mb-10">
          Welcome to Clubsphere. By accessing or using our platform, you agree
          to follow these Terms of Use. Please read them carefully.
        </p>

        {/* Content */}
        <div className="space-y-8 text-[#CFCBFF] text-sm leading-relaxed">
          {/* Section */}
          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              1. About Clubsphere
            </h2>
            <p>
              Clubsphere is a community platform that allows users to discover,
              create, and participate in clubs and events based on shared
              interests.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              2. Eligibility
            </h2>
            <p>
              You must be at least 13 years old to use Clubsphere. By using the
              platform, you confirm that the information you provide is accurate
              and up to date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              3. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account. Any activity that occurs under your account is your
              responsibility.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              4. Clubs & Events
            </h2>
            <p>
              Clubsphere provides a platform for clubs and events but does not
              directly manage or supervise them. Club organizers are
              responsible for their content, events, and member interactions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              5. Acceptable Use
            </h2>
            <p>
              You agree not to misuse the platform. This includes posting
              harmful, misleading, or illegal content, attempting to disrupt
              services, or impersonating others.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              6. Payments & Fees
            </h2>
            <p>
              Some clubs or events may require payment. Clubsphere is not
              responsible for disputes related to payments unless otherwise
              stated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              7. Intellectual Property
            </h2>
            <p>
              All branding, logos, and platform content belong to Clubsphere.
              You may not copy or reuse any materials without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              8. Account Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these Terms or misuse the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              9. Limitation of Liability
            </h2>
            <p>
              Clubsphere is not liable for any damages, losses, or disputes that
              arise from participation in clubs or events hosted on the
              platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              10. Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Use at any time. Continued use of the
              platform means you accept any updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us via
              the Contact page.
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

export default TermsOfUse;
