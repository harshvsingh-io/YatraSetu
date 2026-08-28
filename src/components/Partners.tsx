"use client";

import SectionReveal from "@/components/SectionReveal";

const partners = [
  { name: "Ministry of Tourism", abbr: "MoT" },
  { name: "National Service Scheme", abbr: "NSS" },
  { name: "NCC", abbr: "NCC" },
  { name: "ASERI", abbr: "ASERI" },
  { name: "IRCTC", abbr: "IRCTC" },
  { name: "Incredible India", abbr: "II" },
  { name: "Swachh Bharat", abbr: "SB" },
  { name: "Google for India", abbr: "GfI" },
];

export default function Partners() {
  return (
    <section className="relative border-y border-earth-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-center text-sm font-medium uppercase tracking-wider text-ink-400">
            Trusted by leading organizations
          </p>
        </SectionReveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {partners.map((partner, i) => (
            <SectionReveal key={partner.name} delay={i * 0.05}>
              <div className="group flex flex-col items-center gap-2 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-earth-200 bg-earth-50 font-display text-lg font-bold text-ink-600 transition-colors group-hover:border-amber-200 group-hover:bg-amber-50 group-hover:text-amber-700">
                  {partner.abbr}
                </div>
                <span className="text-[11px] font-medium text-ink-400">{partner.name}</span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
