"use client";

import SectionReveal from "@/components/SectionReveal";
import { Search, Calendar, QrCode, Gift } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description: "Search any destination in India. Get live hotel, transport, weather, and attraction data — all auto-fetched, zero manual entry.",
    color: "amber",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Book & RSVP",
    description: "Book your stay, then optionally RSVP to a verified restoration event near your destination — beach cleanups, plantation drives.",
    color: "terra",
  },
  {
    icon: QrCode,
    number: "03",
    title: "Participate & Verify",
    description: "Show up, scan your rotating QR code for fraud-proof check-in, snap a geo-tagged selfie. Attendance verified on the spot.",
    color: "sage",
  },
  {
    icon: Gift,
    number: "04",
    title: "Earn & Redeem",
    description: "Collect stamps and rewards after each verified event. Redeem on your next hotel, local transport, monument tickets, and more.",
    color: "amber",
  },
];

const colorClasses: Record<string, { bg: string; text: string; ring: string }> = {
  amber: { bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100" },
  terra: { bg: "bg-terra-50", text: "text-terra-600", ring: "ring-terra-100" },
  sage: { bg: "bg-sage-50", text: "text-sage-600", ring: "ring-sage-100" },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            How It Works
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Your trip. Your impact.
          </h2>
          <p className="mt-4 text-base text-ink-500 sm:text-lg">
            Four simple steps from booking a trip to making a real difference.
          </p>
        </SectionReveal>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent lg:block" />

          {steps.map((step, i) => {
            const colors = colorClasses[step.color];
            return (
              <SectionReveal key={step.number} delay={i * 0.12}>
                <div className="group relative flex flex-col items-start rounded-2xl border border-earth-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative mb-5">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} ring-4 ${colors.ring} transition-transform duration-300 group-hover:scale-110`}>
                      <step.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[10px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
