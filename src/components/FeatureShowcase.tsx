"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import Link from "next/link";
import {
  WifiOff,
  Languages,
  ShieldAlert,
  Trash2,
  ArrowRight,
  Sparkles,
  Volume2,
  PhoneCall,
  Navigation,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    id: "offline-pass",
    title: "Offline Remote Travel Pass",
    badge: "Zero-Network Himalayan Shield",
    desc: "Traveling through high Spiti, Ladakh, or deep forest trails with 0% cellular network? Your tamper-proof boarding pass, direct emergency dialers (112, 1078), and eco-host contacts remain accessible 100% offline.",
    icon: WifiOff,
    href: "/offline-pass",
    cta: "Test Airplane Mode Pass",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    accent: "text-amber-700 bg-amber-50 border-amber-200",
    visual: {
      tag: "100% Airplane Mode Ready",
      metric: "0% 4G/5G Required",
      detail: "Cached in browser storage with SHA-256 checkpoint token.",
    },
  },
  {
    id: "phrasebook",
    title: "Local Dialect & Eco-Etiquette Guide",
    badge: "Voice Audio & Sacred Rules",
    desc: "Speak the language of village elders across Himachal, Ladakh, Uttarakhand, Konkan, Kerala, and Rajasthan. Pronounced aloud via speech audio, with strict Devta and sacred grove conservation taboos.",
    icon: Languages,
    href: "/phrasebook",
    cta: "Listen to Audio Phrases",
    gradient: "from-terra-500/10 via-terra-500/5 to-transparent",
    accent: "text-terra-700 bg-terra-50 border-terra-200",
    visual: {
      tag: "6 Regional Dialects",
      metric: "Web Speech Audio",
      detail: "Julley, Dev Borem Korum, Khamma Ghani, and village Devta rules.",
    },
  },
  {
    id: "safety-radar",
    title: "Live Mountain & Coastal Safety Radar",
    badge: "Real-Time Hazard Indexing",
    desc: "Real-time meteorological risk calculation using live Open-Meteo feeds. Automatically alerts travelers of landslide susceptibility, saturated trail soils, sub-zero frost, and coastal high tides.",
    icon: ShieldAlert,
    href: "/discover",
    cta: "Check Live Trail Radar",
    gradient: "from-sage-500/10 via-sage-500/5 to-transparent",
    accent: "text-sage-700 bg-sage-50 border-sage-200",
    visual: {
      tag: "Live Weather API",
      metric: "Dynamic Hazard Badging",
      detail: "Acclimatization tips & direct hardware dialing for NDRF & SDRF.",
    },
  },
  {
    id: "swachh-yatra",
    title: "Swachh Yatra: Citizen Trail Reporter",
    badge: "Community Action & +50 Karma",
    desc: "Spotted garbage dumps on a remote trekking pass? Snap a camera photo, fetch instant GPS coordinates with 1 tap, and dispatch a verified cleanup ticket to university NSS units for +50 Green Karma.",
    icon: Trash2,
    href: "/report-litter",
    cta: "Report a Trek Trail",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    accent: "text-emerald-800 bg-emerald-50 border-emerald-200",
    visual: {
      tag: "Auto-GPS Geotagging",
      metric: "+50 Karma Reward",
      detail: "Directly mobilizes 42+ university NSS units across Indian trails.",
    },
  },
];

export default function FeatureShowcase() {
  return (
    <section className="relative overflow-hidden bg-earth-50/50 py-24 sm:py-32 border-b border-earth-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Built for Real-World Indian Travel Challenges</span>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Thoughtfully Engineered Superpowers
          </h2>

          <p className="mt-4 text-base text-ink-600 sm:text-lg">
            From zero mobile connectivity in the Himalayas to cultural respect in sacred groves — four purpose-built tools solving tourism problems on the ground.
          </p>
        </SectionReveal>

        {/* 4-Card Designer Feature Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feat, idx) => (
            <SectionReveal key={feat.id} delay={idx * 0.1}>
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-earth-200 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:border-earth-300 hover:shadow-xl hover:-translate-y-1">
                {/* Subtle top ambient glow */}
                <div className={`absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br ${feat.gradient} blur-2xl transition-opacity group-hover:opacity-100`} />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${feat.accent} transition-transform duration-300 group-hover:scale-110`}>
                      <feat.icon className="h-6 w-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${feat.accent}`}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 mt-5">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-ink-600 mt-2.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Visual Micro-Card */}
                <div className="mt-6 rounded-2xl border border-earth-100 bg-earth-50/70 p-4 transition-colors group-hover:bg-earth-50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ink-900">{feat.visual.tag}</span>
                    <span className="font-mono font-bold text-amber-700">{feat.visual.metric}</span>
                  </div>
                  <p className="text-[11px] text-ink-500 mt-1 leading-snug">
                    {feat.visual.detail}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-earth-100 flex items-center justify-between">
                  <Link
                    href={feat.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors group-hover:underline"
                  >
                    <span>{feat.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="text-[11px] text-ink-400 font-medium">
                    Verified Free Service
                  </span>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
