import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YatraSetu — Yatra Bane Seva",
  description:
    "Smart travel platform combining trip booking with community restoration. Book your journey, join clean-up events, earn rewards.",
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
  ],
  openGraph: {
    title: "YatraSetu — Yatra Bane Seva",
    description:
      "Let the journey become service. Book trips, join restoration events, earn rewards.",
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
      <body className="min-h-screen bg-earth-50 text-ink-800 antialiased">
        {children}
      </body>
    </html>
  );
}
