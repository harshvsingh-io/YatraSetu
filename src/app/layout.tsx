import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import AppProviders from "@/components/AppProviders";

export const metadata: Metadata = {
  title: "YatraSetu — Yatra Bane Seva, Bina Bheed Ke",
  description:
    "India's first smart decongestion and community restoration travel platform for Smart India Hackathon 2026. Book offbeat journeys, restore ecosystems, and earn Green Karma.",
  keywords: [
    "travel",
    "restoration",
    "India",
    "booking",
    "community",
    "NSS",
    "NCC",
    "clean-up",
    "rewards",
    "decongestion",
    "heritage",
  ],
  openGraph: {
    title: "YatraSetu — Yatra Bane Seva, Bina Bheed Ke",
    description:
      "Smart travel platform rerouting tourism pressure, preserving heritage with AI storytelling, and turning trips into verified restoration acts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-earth-50 text-ink-800 antialiased font-sans selection:bg-amber-100 selection:text-amber-900">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
