"use client";

import SectionReveal from "@/components/SectionReveal";
import { Search, Calendar, QrCode, Gift, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover Underrated Gems",
    description: "Explore crowd-free alternatives with live weather, safety advisories, and authentic homestays — auto-fetched with zero manual fluff.",
    color: "amber",
    tag: "Smart Routing",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Book & RSVP to Seva",
    description: "Book verified local stays, save your offline remote pass, and optionally RSVP to weekend restoration drives near your route.",
    color: "terra",
    tag: "Offline Pass Ready",
  },
  {
    icon: QrCode,
    number: "03",
    title: "Participate & Verify",
    description: "Scan the rotating 15-second QR code on-site and snap a geo-fenced selfie. No ghost attendance, 100% auditable proof.",
    color: "sage",
    tag: "Fraud-Proof QR",
  },
  {
    icon: Gift,
    number: "04",
    title: "Earn & Redeem Karma",
    description: "Collect verified certificates of seva and Green Karma stamps. Redeem for discounts on future homestays, trains, and monuments.",
    color: "amber",
    tag: "Verifiable Certs",
  },
];

const colorClasses: Record<string, { bg: string; text: string; ring: string; border: string }> = {
  amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-100", border: "border-amber-200" },
  terra: { bg: "bg-terra-50", text: "text-terra-700", ring: "ring-terra-100", border: "border-terra-200" },
  sage: { bg: "bg-sage-50", text: "text-sage-700", ring: "ring-sage-100", border: "border-sage-200" },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800 border border-amber-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Simple 4-Step Journey
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            From Mindful Booking to Measurable Impact
          </h2>
          <p className="mt-4 text-base text-ink-500 sm:text-lg">
            A frictionless loop designed for responsible travelers, student volunteers, and community hosts.
          </p>
        </SectionReveal>

        <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent lg:block" />

          {steps.map((step, i) => {
            const colors = colorClasses[step.color];
            return (
              <SectionReveal key={step.number} delay={i * 0.1}>
                <div className="group relative flex flex-col justify-between rounded-3xl border border-earth-200 bg-white p-7 shadow-xs transition-all duration-300 hover:border-earth-300 hover:shadow-xl hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} ring-4 ${colors.ring} border ${colors.border} transition-transform duration-300 group-hover:scale-110`}>
                        <step.icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 font-mono text-xs font-bold text-white shadow-xs">
                        {step.number}
                      </span>
                    </div>

                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-1">
                      {step.tag}
                    </span>

                    <h3 className="font-display text-lg font-bold text-ink-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
