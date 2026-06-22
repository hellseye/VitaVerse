import Link from "next/link";

export const metadata = {
  title: "VITAVERSE | Terms of Service",
  description: "VitaVerse Terms of Service."
};

export default function TermsOfService() {
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
          Terms of <em className="not-italic text-[#c9a96e]">Service</em>
        </h1>
        <p className="text-xs text-[#666] uppercase tracking-wider mb-12">
          Last Updated: June 2026
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          By accessing or using the VitaVerse platform, website, or wearable services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          2. Service Description
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          VitaVerse provides luxury wellness wearable technology and an associated digital platform for personal health tracking, including recovery analysis, sleep monitoring, stress management, and AI-powered wellness insights.
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          3. Waitlist & Early Access
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          Joining the VitaVerse waitlist does not constitute a purchase. Waitlist members will receive priority access and founding member pricing when the product launches. VitaVerse reserves the right to modify launch timelines.
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          4. User Responsibilities
        </h2>
        <ul className="text-[#999] list-disc list-inside mb-4 pl-4 space-y-2">
          <li>You are responsible for providing accurate registration information</li>
          <li>You agree not to misuse the platform or attempt unauthorized access</li>
          <li>Health insights provided are informational and not a substitute for professional medical advice</li>
        </ul>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          5. Intellectual Property
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          All content, branding, technology, and design elements of VitaVerse are the exclusive property of VitaVerse and are protected by applicable intellectual property laws.
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          6. Limitation of Liability
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          VitaVerse is a wellness tool and does not provide medical diagnoses. We are not liable for health decisions made based on data provided by our platform. Always consult a qualified healthcare professional.
        </p>

        <h2 className="font-display text-xl font-semibold text-[#c9a96e] mt-10 mb-4">
          7. Contact
        </h2>
        <p className="text-[#999] mb-4 leading-relaxed">
          For questions about these terms, contact us at{" "}
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
