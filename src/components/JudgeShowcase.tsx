"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import {
  Zap,
  ShieldCheck,
  QrCode,
  Award,
  CloudSun,
  Bot,
  AlertTriangle,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import QRCheckInModal from "@/components/QRCheckInModal";

export default function JudgeShowcase() {
  const { user, isLoggedIn, signInDemo } = useAuth();
  const [showQRModal, setShowQRModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "auth" | "anti-fraud" | "apis">("all");

  const showcaseItems = [
    {
      id: "auth",
      category: "auth",
      badge: "Dual Engine",
      badgeColor: "bg-sage-50 text-sage-700 border-sage-200",
      icon: ShieldCheck,
      iconColor: "text-sage-600 bg-sage-50",
      title: "1-Click Judge Auth & Profiles",
      description:
        "Persistent dual-engine session (Supabase Auth + LocalStorage). Test instant judge logins with real karma points, badges, and booking history.",
      actionLabel: isLoggedIn ? `Logged in: ${user?.name.split(" ")[0]}` : "Try 1-Click Login",
      actionType: "auth" as const,
    },
    {
      id: "qr",
      category: "anti-fraud",
      badge: "Anti-Fraud",
      badgeColor: "bg-terra-50 text-terra-700 border-terra-200",
      icon: QrCode,
      iconColor: "text-terra-600 bg-terra-50",
      title: "15s Rotating TOTP & Geofence",
      description:
        "Stops screenshot fraud with a 15-second dynamic QR hash, HTML5 camera scanner, and strict 200-meter GPS proximity verification.",
      actionLabel: "Launch QR Demo",
      actionType: "qr" as const,
    },
    {
      id: "cert",
      category: "anti-fraud",
      badge: "Verifiable",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      icon: Award,
      iconColor: "text-amber-600 bg-amber-50",
      title: "Verifiable Seva Certificates",
      description:
        "Auto-generated NSS/NCC voluntary service certificates with unique cryptographic hash IDs, hours completed, and instant download/print layout.",
      actionLabel: "View Certificates",
      href: "/certificates",
      actionType: "link" as const,
    },
    {
      id: "weather",
      category: "apis",
      badge: "Open-Meteo Live",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      icon: CloudSun,
      iconColor: "text-blue-600 bg-blue-50",
      title: "Free Live Weather & Decongestion",
      description:
        "Zero API keys required. Fetches live India weather, temperature, humidity, and crowd pressure indexes dynamically via Open-Meteo & Nominatim.",
      actionLabel: "Explore Decongestion",
      href: "/discover",
      actionType: "link" as const,
    },
    {
      id: "heritage",
      category: "apis",
      badge: "Web Speech TTS",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Headphones,
      iconColor: "text-purple-600 bg-purple-50",
      title: "AR Heritage Audio Storyteller",
      description:
        "Immersive audio narration and 3D heritage exploration powered by Wikipedia REST API summaries and native browser SpeechSynthesis.",
      actionLabel: "Launch Audio Tour",
      href: "/heritage/hampi",
      actionType: "link" as const,
    },
    {
      id: "ai",
      category: "apis",
      badge: "Grounded AI",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Bot,
      iconColor: "text-emerald-600 bg-emerald-50",
      title: "Setu Saathi AI Concierge",
      description:
        "Context-aware assistant grounded in SIH Problem Statement SIH26202 data. Answers questions on crowd hotspots, cleanups, and local transport.",
      actionLabel: "Chat in Bottom-Right",
      actionType: "chat" as const,
    },
  ];

  const filteredItems =
    activeTab === "all"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === activeTab);

  return (
    <section className="relative z-20 py-10 bg-gradient-to-b from-earth-100/60 via-white to-earth-50/80 border-y border-earth-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/90 px-3.5 py-1 text-xs font-bold text-amber-900 shadow-2xs mb-3">
              <Zap className="h-3.5 w-3.5 text-amber-600 fill-amber-500 animate-pulse" />
              <span>SIH 2026 Judge Innovation Control Center</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
              Every PS-Id SIH26202 Deliverable, Verified Live
            </h2>
            <p className="mt-1 text-sm text-ink-500 max-w-2xl">
              Inspect our real-time APIs, anti-fraud check-in pipeline, verifiable certificates, and persistent auth with zero friction.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-earth-100/80 border border-earth-200 self-start md:self-auto">
            {[
              { id: "all" as const, label: "All Features (6)" },
              { id: "anti-fraud" as const, label: "Anti-Fraud & Certs" },
              { id: "apis" as const, label: "Live Free APIs" },
              { id: "auth" as const, label: "Judge Auth" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-ink-900 shadow-xs border border-earth-200/80"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-earth-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-amber-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconColor} border border-earth-100`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-ink-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-earth-100">
                {item.actionType === "qr" && (
                  <button
                    onClick={() => setShowQRModal(true)}
                    className="flex w-full items-center justify-between rounded-xl bg-terra-50 px-3 py-2 text-xs font-bold text-terra-700 hover:bg-terra-100 transition-colors"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}

                {item.actionType === "auth" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => signInDemo("student-nss")}
                      className="flex-1 rounded-xl bg-sage-50 px-2.5 py-2 text-xs font-bold text-sage-700 hover:bg-sage-100 text-center transition-colors"
                      title="Login as Aarav Sharma"
                    >
                      NSS Student
                    </button>
                    <button
                      onClick={() => signInDemo("traveler")}
                      className="flex-1 rounded-xl bg-earth-100 px-2.5 py-2 text-xs font-bold text-ink-700 hover:bg-earth-200 text-center transition-colors"
                      title="Login as Priya Patel"
                    >
                      Traveler
                    </button>
                  </div>
                )}

                {item.actionType === "link" && item.href && (
                  <Link
                    href={item.href}
                    className="flex w-full items-center justify-between rounded-xl bg-earth-100 px-3 py-2 text-xs font-bold text-ink-800 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 transition-all"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}

                {item.actionType === "chat" && (
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                    <span>{item.actionLabel}</span>
                    <Bot className="h-4 w-4 text-emerald-600 animate-bounce" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Embedded QR Modal */}
      <QRCheckInModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        event={{
          id: 1,
          title: "Calangute Beach Cleanup Drive",
          location: "Calangute, Goa",
          organizer: "Goa Green Brigade & NSS",
        }}
      />
    </section>
  );
}
