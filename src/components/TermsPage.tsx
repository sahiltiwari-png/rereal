import React from 'react';

const brand = {
  primary: '#19233e',
  dark: '#0a1628',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-2">
    <div className="text-sm sm:text-base font-semibold" style={{ color: brand.primary }}>
      {title}
    </div>
    <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

const TermsPage: React.FC = () => {
  return (
    <main className="bg-white terms-page">
      {/* Header (white like screenshot) */}
      <section className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">Terms and Conditions</div>
          <p className="mt-2 text-sm text-gray-700">Terms and Conditions for Trivara Properties</p>
          <p className="mt-1 text-xs text-gray-600">Last Updated: July 22, 2023</p>

          {/* Breadcrumb centered below heading (single pill button) */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#19233e] text-white text-xs sm:text-sm">
              <a href="/" className="hover:underline">Home</a>
              <span className="opacity-70">/</span>
              <span className="font-semibold" aria-current="page">Terms &amp; Conditions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-left">
          <div className="space-y-6">
            <Section title="1. Acceptance of Terms">
              <p>
                Welcome to Trivara Properties ("Trivara", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use our website or services.
              </p>
            </Section>

            <Section title="2. Description of Services">
              <ul className="list-disc pl-5 space-y-1">
                <li>Providing real estate listings and related information.</li>
                <li>Facilitating property purchase, sale, and rental processes.</li>
                <li>Offering property management and investment advisory services.</li>
                <li>Publishing educational content, market insights, and news.</li>
              </ul>
            </Section>

            <Section title="3. Use of the Website">
              <ul className="list-disc pl-5 space-y-1">
                <li>You agree to use the website only for lawful purposes and in accordance with these Terms.</li>
                <li>You must not misuse the website or attempt to gain unauthorized access to any part of it.</li>
                <li>You agree not to post or transmit any material that is unlawful, harmful, defamatory, or otherwise objectionable.</li>
              </ul>
            </Section>

            <Section title="4. Property Listings and Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Property listings are for informational purposes only and do not constitute a legal offer to sell or rent.</li>
                <li>We do not guarantee the accuracy, completeness, or reliability of listing information. Please independently verify details.</li>
                <li>Any transaction will be governed by a formal sale or lease agreement.</li>
              </ul>
            </Section>

            <Section title="5. Intellectual Property Rights">
              <p>
                The website and its content, features, and functionality are owned by Trivara and its licensors and are protected by intellectual property laws. You may not copy, reproduce, distribute, modify, create derivative works, or publicly display any content without prior written consent.
              </p>
            </Section>

            <Section title="6. Third‑Party Links">
              <p>
                Our website may contain links to third‑party websites or services not owned or controlled by Trivara. We are not responsible for the content, privacy practices, or policies of any third‑party sites. Your use of third‑party sites is at your own risk.
              </p>
            </Section>

            <Section title="7. Disclaimer of Warranties">
              <p>
                The website is provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, express or implied. Trivara makes no warranties regarding the completeness, reliability, or availability of the website.
              </p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Trivara shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website.
              </p>
            </Section>

            <Section title="9. Indemnification">
              <p>
                You agree to defend, indemnify, and hold harmless Trivara, its affiliates, and employees from any claims, damages, liabilities, losses, and expenses arising from your use of the website or violation of these Terms.
              </p>
            </Section>

            <Section title="10. Governing Law and Jurisdiction">
              <p>
                These Terms and any disputes related to them shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any legal action shall be brought exclusively in the courts of Dubai, UAE.
              </p>
            </Section>

            <Section title="11. Changes to the Terms">
              <p>
                We may update these Terms from time to time. Changes take effect immediately upon posting. Your continued use of the website constitutes acceptance of the revised Terms.
              </p>
            </Section>

            <Section title="12. Contact Us">
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email: info@trivararealestate.com</li>
                <li>Address: Dubai, United Arab Emirates</li>
              </ul>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;