"use client";

import React from "react";
import SectionReveal from "@/components/SectionReveal";
import { ShieldCheck, Award, Landmark, Sparkles } from "lucide-react";

const partners = [
  {
    name: "Ministry of Tourism",
    subtitle: "Incredible India / Dekho Apna Desh",
    abbr: "MoT",
    badge: "Govt. of India",
    icon: Landmark,
  },
  {
    name: "National Service Scheme",
    subtitle: "Youth Affairs & Sports (NSS Units)",
    abbr: "NSS",
    badge: "Seva Partner",
    icon: Award,
  },
  {
    name: "Swachh Bharat Mission",
    subtitle: "Urban & Rural Cleanliness Drive",
    abbr: "SBM",
    badge: "Eco Framework",
    icon: Sparkles,
  },
  {
    name: "IRCTC & Indian Railways",
    subtitle: "Eco-Rail & Decongested Transit",
    abbr: "IRCTC",
    badge: "Transit Ecosystem",
    icon: Landmark,
  },
  {
    name: "National Cadet Corps",
    subtitle: "Disaster Preparedness & Heritage Guard",
    abbr: "NCC",
    badge: "Youth Cadre",
    icon: ShieldCheck,
  },
  {
    name: "UNEP Sustainable Tourism",
    subtitle: "Zero Carbon & Plastic-Free Trails",
    abbr: "UNEP",
    badge: "Global Standards",
    icon: Award,
  },
];

export default function Partners() {
  return (
    <section className="relative border-y border-earth-200 bg-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-800">
              National Ecosystem Alignment
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 mt-1">
              Engineered to Support India’s Sustainable Tourism & Seva Framework
            </h3>
          </div>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, i) => (
            <SectionReveal key={partner.name} delay={i * 0.05}>
              <div className="group relative flex flex-col items-center text-center rounded-2xl border border-earth-200 bg-earth-50/50 p-4 transition-all duration-300 hover:border-amber-300 hover:bg-white hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-earth-200 text-ink-700 shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-300 group-hover:text-amber-700">
                  <partner.icon className="h-5 w-5" />
                </div>

                <span className="mt-3 text-xs font-bold text-ink-900 leading-tight">
                  {partner.name}
                </span>

                <span className="text-[10px] text-ink-400 leading-tight mt-1">
                  {partner.subtitle}
                </span>

                <span className="mt-2 inline-block rounded-full bg-earth-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-600 group-hover:bg-amber-50 group-hover:text-amber-800 transition-colors">
                  {partner.badge}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
