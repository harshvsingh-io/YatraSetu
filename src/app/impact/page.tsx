"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import CountUp from "@/components/CountUp";
import StateImpactMap from "@/components/StateImpactMap";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  TreePine,
  Users,
  MapPin,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  Leaf,
  Target,
  Trophy,
  Globe2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const impactStats = [
  {
    icon: TreePine,
    value: 240000,
    suffix: "+",
    label: "kg waste collected",
    color: "bg-sage-50 text-sage-600 ring-sage-100",
    iconColor: "text-sage-500",
    format: "number" as const,
  },
  {
    icon: Users,
    value: 18400,
    suffix: "+",
    label: "volunteers joined",
    color: "bg-terra-50 text-terra-600 ring-terra-100",
    iconColor: "text-terra-500",
    format: "indian" as const,
  },
  {
    icon: MapPin,
    value: 342,
    suffix: "",
    label: "restoration sites",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
    iconColor: "text-amber-500",
    format: "number" as const,
  },
  {
    icon: Clock,
    value: 96000,
    suffix: "+",
    label: "volunteer hours",
    color: "bg-ink-50 text-ink-600 ring-ink-100",
    iconColor: "text-ink-500",
    format: "number" as const,
  },
];

const stateData = [
  { state: "Goa", sites: 48, waste: "42,000 kg", volunteers: 3200, trend: "+12%" },
  { state: "Kerala", sites: 36, waste: "38,000 kg", volunteers: 2800, trend: "+8%" },
  { state: "Maharashtra", sites: 52, waste: "55,000 kg", volunteers: 4100, trend: "+15%" },
  { state: "Karnataka", sites: 28, waste: "22,000 kg", volunteers: 1600, trend: "+5%" },
  { state: "Rajasthan", sites: 24, waste: "18,000 kg", volunteers: 1200, trend: "+10%" },
  { state: "Tamil Nadu", sites: 32, waste: "28,000 kg", volunteers: 2100, trend: "+7%" },
  { state: "West Bengal", sites: 18, waste: "14,000 kg", volunteers: 980, trend: "+3%" },
  { state: "Uttarakhand", sites: 22, waste: "16,000 kg", volunteers: 1100, trend: "+9%" },
];

const monthlyData = [
  { month: "Jan", waste: 12, events: 18, volunteers: 1200 },
  { month: "Feb", waste: 15, events: 22, volunteers: 1500 },
  { month: "Mar", waste: 22, events: 35, volunteers: 2400 },
  { month: "Apr", waste: 18, events: 28, volunteers: 1900 },
  { month: "May", waste: 10, events: 15, volunteers: 900 },
  { month: "Jun", waste: 8, events: 12, volunteers: 750 },
  { month: "Jul", waste: 20, events: 30, volunteers: 2100 },
  { month: "Aug", waste: 28, events: 42, volunteers: 3200 },
];

const recentEvents = [
  { name: "Juhu Beach Cleanup", date: "Sep 02, 2026", kg: "320 kg", volunteers: 86 },
  { name: "Mulki River Cleanup", date: "Aug 28, 2026", kg: "180 kg", volunteers: 42 },
  { name: "Fort Kochi Heritage Care", date: "Aug 25, 2026", kg: "95 kg", volunteers: 28 },
  { name: "Marina Beach Restoration", date: "Aug 22, 2026", kg: "450 kg", volunteers: 120 },
  { name: "Hawa Mahal Area Cleanup", date: "Aug 18, 2026", kg: "210 kg", volunteers: 55 },
];

export default function ImpactPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "states" | "monthly">("overview");

  const maxWaste = Math.max(...stateData.map((s) => parseInt(s.waste.replace(/,/g, ""))));

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 sm:pt-36 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-sage-50 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-sage-600" />
              Verified On-Chain & Geotagged Metrics
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Impact Dashboard
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg max-w-2xl">
              Real-time restoration progress across India. Audited from rotating QR check-ins and verified NSS volunteer hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Stats */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color} ring-4 mb-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
                  <CountUp target={stat.value} />
                  {stat.suffix}
                </div>
                <p className="mt-1 text-xs sm:text-sm font-medium text-ink-500 capitalize">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-earth-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: "overview" as const, label: "Overview" },
              { id: "states" as const, label: "Interactive State Map" },
              { id: "monthly" as const, label: "Monthly Trends" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative py-4 text-sm font-bold transition-colors",
                  activeTab === tab.id ? "text-amber-800" : "text-ink-400 hover:text-ink-700"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="impact-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Interactive State Map Preview */}
              <SectionReveal>
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold text-ink-900">
                    State-Wise Volunteer Footprint
                  </h3>
                  <p className="text-xs text-ink-500 mt-1">Hover over states to inspect active volunteers and verified waste collected</p>
                </div>
                <StateImpactMap />
              </SectionReveal>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Recent events */}
                <SectionReveal delay={0.1}>
                  <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      Recent Verified Seva Drives
                    </h3>
                    <div className="mt-4 space-y-3">
                      {recentEvents.map((event) => (
                        <div
                          key={event.name}
                          className="flex items-center justify-between rounded-2xl p-3 border border-earth-100 transition-colors hover:bg-earth-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-50 border border-sage-200">
                              <Leaf className="h-5 w-5 text-sage-600" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-ink-800">{event.name}</p>
                              <p className="text-xs text-ink-400">{event.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-sage-700">{event.kg}</p>
                            <p className="text-[11px] text-ink-400">{event.volunteers} volunteers</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                {/* Milestones - No raw emojis */}
                <SectionReveal delay={0.2}>
                  <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      National Milestones
                    </h3>
                    <div className="mt-4 space-y-3">
                      {[
                        {
                          icon: Target,
                          title: "2.4 Lakh kg Collected",
                          desc: "Waste collected milestone across coastal and alpine trails (Oct 2026)",
                          color: "bg-amber-50 text-amber-700 border-amber-200",
                        },
                        {
                          icon: Trophy,
                          title: "500+ Verified Drives",
                          desc: "Cleanups, mangrove plantations, and baori restorations completed",
                          color: "bg-sage-50 text-sage-700 border-sage-200",
                        },
                        {
                          icon: Globe2,
                          title: "28 States & UTs Covered",
                          desc: "Pan-India footprint with 342 active community restoration sites",
                          color: "bg-blue-50 text-blue-700 border-blue-200",
                        },
                      ].map((m) => (
                        <div
                          key={m.title}
                          className="flex items-start gap-3.5 rounded-2xl bg-earth-50/70 p-4 border border-earth-200"
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${m.color}`}>
                            <m.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-display text-base font-bold text-ink-900">{m.title}</p>
                            <p className="mt-0.5 text-xs text-ink-500 leading-relaxed">{m.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          )}

          {activeTab === "states" && (
            <SectionReveal>
              <StateImpactMap />
            </SectionReveal>
          )}

          {activeTab === "monthly" && (
            <SectionReveal>
              <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-ink-900">
                  Monthly Waste Collected (in 1,000 kg)
                </h3>
                <p className="text-xs text-ink-500 mt-1 mb-6">Aggregate collection growth tracked across certified event leads</p>
                <div className="grid grid-cols-8 gap-2 items-end h-64 border-b border-earth-200 pb-2">
                  {monthlyData.map((m) => (
                    <div key={m.month} className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] font-bold text-ink-700">{m.waste}k</span>
                      <div
                        style={{ height: `${(m.waste / 30) * 100}%` }}
                        className="w-full max-w-[36px] bg-gradient-to-t from-amber-500 to-terra-500 rounded-t-xl"
                      />
                      <span className="text-xs font-semibold text-ink-500">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
