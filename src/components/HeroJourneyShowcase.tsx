"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Sun,
  CheckCircle2,
  TreePine,
  Waves,
  Mountain,
} from "lucide-react";
import Link from "next/link";

interface JourneyOption {
  id: string;
  tabLabel: string;
  icon: any;
  destination: string;
  state: string;
  tagline: string;
  crowdScore: number;
  crowdLabel: string;
  temp: string;
  weather: string;
  hotelName: string;
  pricePerNight: string;
  image: string;
  eventTitle: string;
  eventTime: string;
  eventKarma: number;
  volunteersJoined: number;
  volunteerAvatars: string[];
}

const journeyOptions: JourneyOption[] = [
  {
    id: "tirthan",
    tabLabel: "Tirthan Alpine",
    icon: TreePine,
    destination: "Tirthan Valley",
    state: "Himachal Pradesh",
    tagline: "Great Himalayan National Park Buffer Trail",
    crowdScore: 14,
    crowdLabel: "Serene & Uncrowded",
    temp: "19°C",
    weather: "Crisp Alpine Air",
    hotelName: "Riverside Cedar Eco-Homestay",
    pricePerNight: "₹2,200/night",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=520&fit=crop",
    eventTitle: "River Tirthan Trail & Stream Clean",
    eventTime: "This Saturday · 7:30 AM",
    eventKarma: 250,
    volunteersJoined: 42,
    volunteerAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    ],
  },
  {
    id: "gokarna",
    tabLabel: "Gokarna Coast",
    icon: Waves,
    destination: "Gokarna & Kudle",
    state: "Karnataka",
    tagline: "Low-density alternative to North Goa",
    crowdScore: 18,
    crowdLabel: "Calm Beachside",
    temp: "29°C",
    weather: "Breezy Shoreline",
    hotelName: "Kudle Cliff Coconut Grove",
    pricePerNight: "₹2,600/night",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=520&fit=crop",
    eventTitle: "Olive Ridley Coastal Dune Restoration",
    eventTime: "Sunday · 6:30 AM",
    eventKarma: 300,
    volunteersJoined: 68,
    volunteerAvatars: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    ],
  },
  {
    id: "chopta",
    tabLabel: "Chopta Meadows",
    icon: Mountain,
    destination: "Chopta & Tungnath",
    state: "Uttarakhand",
    tagline: "The Mini Switzerland of India",
    crowdScore: 11,
    crowdLabel: "Pristine Alpine Bugyal",
    temp: "14°C",
    weather: "Clear Mountain View",
    hotelName: "Monal Eco-Nest Wooden Cabin",
    pricePerNight: "₹2,400/night",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=520&fit=crop",
    eventTitle: "Tungnath Sacred Trail Plastic Sweep",
    eventTime: "Oct 12 · 7:00 AM",
    eventKarma: 250,
    volunteersJoined: 36,
    volunteerAvatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    ],
  },
];

export default function HeroJourneyShowcase() {
  const [activeTab, setActiveTab] = useState<string>("tirthan");

  const current = journeyOptions.find((j) => j.id === activeTab) || journeyOptions[0];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Outer Card Container with clean warm drop-shadow */}
      <div className="relative overflow-hidden rounded-[2rem] border border-earth-300/80 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(49,44,36,0.12)]">
        {/* Destination Tabs Header */}
        <div className="flex items-center justify-between gap-1 rounded-2xl bg-earth-100/70 p-1 mb-3 border border-earth-200/60">
          <div className="flex items-center gap-1 w-full">
            {journeyOptions.map((opt) => {
              const isActive = opt.id === activeTab;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveTab(opt.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-white text-ink-950 shadow-xs scale-[1.02]"
                      : "text-ink-600 hover:text-ink-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-amber-600" : "text-ink-400"}`} />
                  <span className="truncate">{opt.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Image & Live Meta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Visual Photography Container */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl bg-earth-200">
              <img
                src={current.image}
                alt={current.destination}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

              {/* Top Floating Pills */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/15">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{current.crowdScore}% Crowd Pressure</span>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-ink-900 shadow-xs">
                  <Sun className="h-3 w-3 text-amber-500" />
                  <span>{current.temp} · {current.weather}</span>
                </div>
              </div>

              {/* Bottom Image Info */}
              <div className="absolute bottom-3 inset-x-3.5 flex items-end justify-between text-white">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{current.destination}, {current.state}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                    {current.hotelName}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-white/70 block">Verified Stay</span>
                  <span className="font-bold text-sm sm:text-base text-amber-300">{current.pricePerNight}</span>
                </div>
              </div>
            </div>

            {/* Linked Restoration / Seva Action Box */}
            <div className="mt-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-earth-50 p-3.5 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-glow-amber">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-sage-100 px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider text-sage-800">
                        Linked Seva Drive
                      </span>
                      <span className="text-xs font-bold text-amber-900">
                        +{current.eventKarma} Green Karma
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-ink-900 mt-0.5">
                      {current.eventTitle}
                    </h4>
                    <p className="text-[11px] text-ink-500 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="h-3 w-3 text-ink-400" />
                      {current.eventTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-earth-200/60">
                  {/* Volunteer Avatars */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-2">
                      {current.volunteerAvatars.map((av, i) => (
                        <img
                          key={i}
                          src={av}
                          alt="Volunteer"
                          className="h-6 w-6 rounded-full ring-2 ring-white object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-ink-700">
                      {current.volunteersJoined} joined
                    </span>
                  </div>

                  {/* 1-Click Action Link */}
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1 rounded-xl bg-ink-950 px-3.5 py-2 text-xs font-bold text-white hover:bg-amber-600 transition-colors shadow-xs"
                  >
                    <span>RSVP</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Micro-Trust Strip: Zero-Proxy Dynamic QR Guarantee */}
            <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] text-ink-500">
              <span className="flex items-center gap-1 font-medium">
                <QrCode className="h-3.5 w-3.5 text-amber-700" />
                <span>15s Dynamic QR Anti-Fraud Check-In</span>
              </span>
              <span className="flex items-center gap-1 font-semibold text-sage-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>NSS & Tourism Certified</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Accent Card: Live Environmental Metric (Top-Left) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="hidden sm:flex absolute -left-6 top-8 items-center gap-2.5 rounded-2xl border border-earth-200 bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-xl z-20"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage-50 text-sage-700 border border-sage-200">
          <TreePine className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-ink-900">340+ Trails Restored</p>
          <p className="text-[10px] text-ink-500 font-medium">Zero plastic buffer active</p>
        </div>
      </motion.div>

      {/* Floating Accent Card: Karma Passports (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="hidden sm:flex absolute -right-4 -bottom-4 items-center gap-2.5 rounded-2xl border border-earth-200 bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-xl z-20"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-ink-900">+250 Green Karma</p>
          <p className="text-[10px] text-amber-800 font-semibold">Credited to Seva Passport</p>
        </div>
      </motion.div>
    </div>
  );
}
