import Link from "next/link";

export const metadata = {
  title: "VITAVERSE | Thank You",
  description: "Thank you for joining the VitaVerse waitlist."
};

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans flex items-center justify-center p-8 antialiased">
      <div className="max-w-[560px] text-center">
        <div className="font-display text-xl font-bold tracking-widest uppercase mb-12 text-white">
          VITA<span className="text-[#c9a96e]">VERSE</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-6">
          Thank You for<br />Joining the <em className="not-italic text-[#c9a96e]">Future.</em>
        </h1>
        <p className="text-[#999] text-base leading-relaxed mb-10">
          Your spot has been reserved. We'll be in touch with exclusive founding member details, early access information, and updates on our launch.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-8 py-4 bg-[#c9a96e] text-[#0a0a0a] rounded-[2px] transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(201,169,110,0.25)]"
        >
          Back to Home →
        </Link>
      </div>
    </div>
  );
}
