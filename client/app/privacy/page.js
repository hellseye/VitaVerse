import Link from "next/link";

export const metadata = {
  title: "VITAVERSE | Privacy Policy",
  description: "VitaVerse Privacy Policy - Your data, your rules."
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans antialiased">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-[#2a2a2a]">
        <Link href="/" className="font-display text-xl font-bold tracking-widest uppercase text-white hover:opacity-90">
          VITA<span className="text-[#c9a96e]">VERSE</span>
        </Link>
        <Link href="/" className="text-xs uppercase tracking-wider text-[#999] hover:text-[#c9a96e] transition-colors">
          ← Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <div className="max-w-[720px] mx-auto px-8 py-16">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Privacy <em className="not-italic text-[#c9a96e]">Policy</em>
        </h1>
        <p className="text-xs text-[#666] uppercase tracking-wider mb-12">
          Last Updated: June 2026
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          1. Information We Collect
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          VitaVerse collects the following categories of information to deliver and improve our wellness services:
        </p>
        <ul className="text-[#999] list-disc list-inside mb-4 pl-4 space-y-2">
          <li>Account information (name, email, phone number, city)</li>
          <li>Health and biometric data (heart rate, HRV, sleep patterns, stress metrics)</li>
          <li>Device usage and interaction data</li>
        </ul>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          2. How We Use Your Data
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          Your data is used exclusively to:
        </p>
        <ul className="text-[#999] list-disc list-inside mb-4 pl-4 space-y-2">
          <li>Deliver personalized wellness insights and recommendations</li>
          <li>Generate doctor-ready health reports</li>
          <li>Improve AI model accuracy and user experience</li>
          <li>Communicate product updates and early access information</li>
        </ul>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          3. Data Protection
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          All health data is encrypted at rest and in transit using military-grade encryption standards. We implement strict access controls and regular security audits to protect your information.
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          4. Data Sharing
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          VitaVerse operates on a consent-based sharing model. We will never sell, trade, or monetize your personal data. Health data is shared only when you explicitly authorize it (e.g., sharing reports with your physician).
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          5. Your Rights
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          You have the right to access, modify, export, or delete your personal data at any time through your VitaVerse account settings.
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          6. Contact
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          For any privacy-related inquiries, please contact us at{" "}
          <a href="mailto:info.vitaverse.health@gmail.com" className="text-[#c9a96e] hover:underline">
            info.vitaverse.health@gmail.com
          </a>.
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[#2a2a2a] text-xs text-[#666]">
        © VITAVERSE 2026 · All rights reserved.
      </footer>
    </div>
  );
}
