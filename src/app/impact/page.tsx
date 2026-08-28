"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import CountUp from "@/components/CountUp";
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
  { name: "Juhu Beach Cleanup", date: "Aug 25", kg: "320 kg", volunteers: 86 },
  { name: "Mulki River Cleanup", date: "Aug 24", kg: "180 kg", volunteers: 42 },
  { name: "Fort Kochi Heritage Care", date: "Aug 23", kg: "95 kg", volunteers: 28 },
  { name: "Marina Beach Restoration", date: "Aug 22", kg: "450 kg", volunteers: 120 },
  { name: "Hawa Mahal Area Cleanup", date: "Aug 21", kg: "210 kg", volunteers: 55 },
];

export default function ImpactPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "states" | "monthly">("overview");

  const maxWaste = Math.max(...stateData.map((s) => parseInt(s.waste.replace(/,/g, ""))));

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-6 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-50 px-4 py-1 text-xs font-semibold text-sage-700">
              <BarChart3 className="h-3.5 w-3.5" />
              Live Impact Dashboard
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Our Impact So Far
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Real-time data from verified restoration events across India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {impactStats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                <div className="group rounded-2xl border border-ink-100 bg-white p-4 sm:p-6 transition-all hover:shadow-md">
                  <div className={cn("flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ring-4", stat.color)}>
                    <stat.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", stat.iconColor)} />
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      className="font-display text-2xl sm:text-3xl font-bold text-ink-800"
                    />
                    <p className="mt-0.5 text-xs sm:text-sm text-ink-500">{stat.label}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mt-4 py-4 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 rounded-xl border border-ink-200 bg-white p-1 w-fit">
            {[
              { id: "overview" as const, label: "Overview" },
              { id: "states" as const, label: "By State" },
              { id: "monthly" as const, label: "Monthly" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-ink-800 text-white shadow"
                    : "text-ink-600 hover:bg-ink-50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {activeTab === "overview" && (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Chart placeholder */}
              <SectionReveal>
                <div className="rounded-2xl border border-ink-100 bg-white p-6">
                  <h3 className="font-display text-lg font-bold text-ink-800">
                    Monthly Waste Collected (tons)
                  </h3>
                  <div className="mt-6 flex items-end gap-2 h-48">
                    {monthlyData.map((d, i) => (
                      <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.waste / 30) * 100}%` }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-sage-500 to-sage-400"
                        />
                        <span className="text-[10px] font-medium text-ink-500">
                          {d.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              {/* Recent events */}
              <SectionReveal delay={0.1}>
                <div className="rounded-2xl border border-ink-100 bg-white p-6">
                  <h3 className="font-display text-lg font-bold text-ink-800">
                    Recent Events
                  </h3>
                  <div className="mt-4 space-y-3">
                    {recentEvents.map((event, i) => (
                      <div
                        key={event.name}
                        className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-ink-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage-50">
                            <Leaf className="h-4 w-4 text-sage-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink-700">
                              {event.name}
                            </p>
                            <p className="text-xs text-ink-400">{event.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-sage-600">{event.kg}</p>
                          <p className="text-[11px] text-ink-400">
                            {event.volunteers} volunteers
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              {/* Milestones */}
              <SectionReveal delay={0.2} className="lg:col-span-2">
                <div className="rounded-2xl border border-ink-100 bg-white p-6">
                  <h3 className="font-display text-lg font-bold text-ink-800">
                    Milestones
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        icon: "🎯",
                        title: "1 Lakh kg",
                        desc: "Waste collected milestone — hit in July 2024",
                      },
                      {
                        icon: "🏆",
                        title: "500+ Events",
                        desc: "Verified events completed across 8 states",
                      },
                      {
                        icon: "🌍",
                        title: "28 States",
                        desc: "Pan-India coverage with 342 active restoration sites",
                      },
                    ].map((m) => (
                      <div
                        key={m.title}
                        className="flex items-start gap-3 rounded-xl bg-earth-50 p-4"
                      >
                        <span className="text-2xl">{m.icon}</span>
                        <div>
                          <p className="font-display text-lg font-bold text-ink-800">
                            {m.title}
                          </p>
                          <p className="mt-0.5 text-sm text-ink-500">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          )}

          {activeTab === "states" && (
            <SectionReveal>
              <div className="rounded-2xl border border-ink-100 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-ink-800">
                  State-wise Impact
                </h3>
                <div className="mt-6 space-y-4">
                  {stateData.map((state, i) => (
                    <motion.div
                      key={state.state}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="grid grid-cols-[120px_1fr_100px_100px_60px] items-center gap-4 rounded-xl p-3 transition-colors hover:bg-ink-50 sm:grid-cols-[140px_1fr_120px_120px_80px]"
                    >
                      <span className="font-semibold text-ink-800">
                        {state.state}
                      </span>
                      <div className="h-3 overflow-hidden rounded-full bg-ink-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(parseInt(state.waste.replace(/,/g, "")) / maxWaste) * 100}%`,
                          }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                          className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-500"
                        />
                      </div>
                      <span className="text-sm text-ink-600">{state.waste}</span>
                      <span className="text-sm text-ink-600">
                        {state.volunteers.toLocaleString("en-IN")} vol.
                      </span>
                      <span className="text-sm font-semibold text-sage-600">
                        {state.trend}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}

          {activeTab === "monthly" && (
            <SectionReveal>
              <div className="rounded-2xl border border-ink-100 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-ink-800">
                  Monthly Breakdown
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {monthlyData.map((d, i) => (
                    <motion.div
                      key={d.month}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-ink-100 p-4 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-ink-800">
                          {d.month}
                        </span>
                        <Calendar className="h-4 w-4 text-ink-400" />
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-ink-500">Waste</span>
                          <span className="font-semibold text-sage-600">{d.waste} tons</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-ink-500">Events</span>
                          <span className="font-semibold text-ink-700">{d.events}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-ink-500">Volunteers</span>
                          <span className="font-semibold text-terra-600">
                            {d.volunteers.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
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
