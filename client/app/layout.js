import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "VITAVERSE | Luxury Wellness Wearable",
  description: "Luxury wearable intelligence for recovery, sleep, stress, and personalized wellness.",
  icons: {
    icon: "/img/vitaverse-hero.png",
    apple: "/img/vitaverse-hero.png"
  },
  openGraph: {
    title: "VITAVERSE | Luxury Wellness Wearable",
    description: "Luxury wearable intelligence for recovery, sleep, stress, and personalized wellness.",
    images: "/img/vitaverse-hero.png",
    type: "website"
  },
  twitter: {
    title: "VITAVERSE | Luxury Wellness Wearable",
    description: "Luxury wearable intelligence for recovery, sleep, stress, and personalized wellness.",
    images: "/img/vitaverse-hero.png",
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
