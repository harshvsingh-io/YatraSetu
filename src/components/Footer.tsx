import Link from "next/link";
import { Mountain, Github, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Discover & Book", href: "/discover" },
    { label: "Restoration Events", href: "/events" },
    { label: "Rewards", href: "/rewards" },
    { label: "Impact Dashboard", href: "/impact" },
  ],
  Community: [
    { label: "Community Leads", href: "/community-apply" },
    { label: "Trending Spots", href: "/trending" },
    { label: "Certificates", href: "/certificates" },
    { label: "Volunteer Stories", href: "/impact" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Safety Guidelines", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-earth-200 bg-ink-950 text-ink-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500">
                <Mountain className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl leading-tight text-white">YatraSetu</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-amber-400">यात्रा बने सेवा</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-500">
              Bridging tourism and restoration across India. Every journey
              becomes an opportunity to give back to the places we love to visit.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 text-ink-600 transition-all hover:border-ink-600 hover:text-amber-400">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white">{category}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ink-500 transition-colors hover:text-amber-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-800 py-6 sm:flex-row">
          <p className="text-xs text-ink-600">© 2024 YatraSetu. All rights reserved. Built with ❤ for India.</p>
          <p className="text-xs text-ink-700">Smart India Hackathon — Yatra Bane Seva</p>
        </div>
      </div>
    </footer>
  );
}
