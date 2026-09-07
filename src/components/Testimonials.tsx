"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { Star, Quote, CheckCircle2, ShieldCheck, Heart } from "lucide-react";

const testimonials = [
  {
    name: "Priya Menon",
    role: "NSS Volunteer Lead · IIT Madras",
    location: "Mukurthi Trail & Ooty",
    quote: "I came to YatraSetu to book a trip to Ooty and ended up joining a trail restoration drive. The rotating QR check-in prevented any fake attendance, and our auto-generated certificate with official NSS metadata was accepted right on my placement resume.",
    karma: "1,450 Karma Earned",
    avatar: "PM",
    color: "bg-amber-600",
  },
  {
    name: "Rahul Deshmukh",
    role: "Community Restoration Lead",
    location: "Ganpatipule Beach, Maharashtra",
    quote: "As an NGO lead, our biggest headache was fraudulent attendance forms. With YatraSetu's geo-fenced selfie and 15s rotating codes, 200+ volunteers were validated in 8 minutes. Sponsoring CSR bodies get 100% verified audit trails.",
    karma: "22 Drives Organized",
    avatar: "RD",
    color: "bg-sage-600",
  },
  {
    name: "Ananya Sharma",
    role: "Solo Mindful Traveler",
    location: "Tirthan Valley & Chopta",
    quote: "The Offline Remote Pass was a literal lifesaver when our car lost all Airtel and Jio signal past Aut tunnel. We had our host's direct satellite phone, offline trail instructions, and zero-plastic guidelines ready without needing internet.",
    karma: "3 Verified Trips",
    avatar: "AS",
    color: "bg-terra-600",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-earth-50/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-terra-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-terra-800 border border-terra-200">
            <Heart className="h-3.5 w-3.5 text-terra-600" />
            Real Impact Stories
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Trusted by 18,400+ Volunteers & Mindful Travelers
          </h2>
          <p className="mt-4 text-base text-ink-500 sm:text-lg">
            From university NSS cadres to solo mountain trekkers across India.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <SectionReveal key={t.name} delay={idx * 0.1}>
              <div className="relative flex flex-col justify-between rounded-3xl border border-earth-200 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:border-earth-300 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="rounded-full bg-earth-100 px-2.5 py-0.5 text-[10px] font-bold text-ink-600">
                      {t.karma}
                    </span>
                  </div>

                  <blockquote className="mt-5 text-sm leading-relaxed text-ink-700">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 pt-5 border-t border-earth-100 flex items-center gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${t.color} text-xs font-bold text-white shadow-xs`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-bold text-ink-900">{t.name}</p>
                      <CheckCircle2 className="h-3.5 w-3.5 text-sage-600" />
                    </div>
                    <p className="text-xs text-ink-500">{t.role}</p>
                    <p className="text-[10px] text-amber-700 font-semibold">{t.location}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
