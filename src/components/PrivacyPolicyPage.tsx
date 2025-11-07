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

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="bg-white privacy-page">
      {/* Header */}
      <section className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 text-left">Privacy Policy</div>
          <p className="mt-2 text-sm text-gray-700">Privacy Policy for Trivara Properties</p>
          <p className="mt-1 text-xs text-gray-600">Last Updated: July 22, 2023</p>

          {/* Breadcrumb centered below heading (single pill button) */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#19233e] text-white text-xs sm:text-sm">
              <a href="/" className="hover:underline">Home</a>
              <span className="opacity-70">/</span>
              <span className="font-semibold" aria-current="page">Privacy Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-left">
          <div className="space-y-6">
            <Section title="1. Information We Collect">
              <ul className="list-disc pl-5 space-y-1">
                <li>Personal information you provide (name, email, phone, etc.).</li>
                <li>Information collected automatically (device, IP address, usage data).</li>
                <li>Cookies and similar technologies to improve site performance and experience.</li>
                <li>Information from third parties where permitted by law.</li>
              </ul>
            </Section>

            <Section title="2. How We Use Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide, operate, and improve our website and services.</li>
                <li>Respond to inquiries, process requests, and deliver customer support.</li>
                <li>Personalize content, communications, and recommendations.</li>
                <li>Analyze usage, protect against fraudulent or illegal activity, and ensure security.</li>
              </ul>
            </Section>

            <Section title="3. Sharing Your Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>With service providers who assist in operating our services.</li>
                <li>With legal authorities when required by applicable law or regulation.</li>
                <li>In connection with business transfers subject to appropriate protections.</li>
                <li>With your consent or at your direction.</li>
              </ul>
            </Section>

            <Section title="4. Data Security">
              <p>
                We implement technical and organizational measures designed to protect your personal information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="5. Cookies and Similar Technologies">
              <p>
                We use cookies and similar technologies to remember preferences, analyze site performance, and improve your experience. You may control cookies through your browser settings, but doing so may affect certain features.
              </p>
            </Section>

            <Section title="6. Children’s Privacy">
              <p>
                Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us to request deletion.
              </p>
            </Section>

            <Section title="7. International Transfers">
              <p>
                Your information may be processed and stored in countries outside your own. We take steps to ensure appropriate safeguards are in place consistent with applicable law.
              </p>
            </Section>

            <Section title="8. Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated date and will be effective when posted.
              </p>
            </Section>

            <Section title="9. Contact Us">
              <p>
                If you have questions about this Privacy Policy or our data practices, contact us at:
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

export default PrivacyPolicyPage;