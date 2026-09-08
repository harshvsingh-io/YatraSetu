"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import SignInBanner from "@/components/SignInBanner";
import { cn } from "@/lib/utils";

const SevaMedallion3D = dynamic(() => import("@/components/3d/SevaMedallion3D"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-48 animate-pulse rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
    </div>
  ),
});
import {
  Wallet,
  Ticket,
  Gift,
  Star,
  Hotel,
  Car,
  Landmark,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Waves,
  TreePine,
} from "lucide-react";

const userStamps = 12;
const totalStamps = 20;

const earnedRewards = [
  {
    id: 1,
    title: "Beach Cleanup Champion",
    description: "Completed 5 beach cleanup events",
    date: "Oct 15, 2026",
    icon: Waves,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    type: "stamp",
  },
  {
    id: 2,
    title: "Plantation Pioneer",
    description: "Planted 50+ trees across events",
    date: "Nov 1, 2026",
    icon: TreePine,
    color: "bg-sage-50 text-sage-600 border-sage-200",
    type: "stamp",
  },
  {
    id: 3,
    title: "Heritage Guardian",
    description: "Participated in 3 heritage care events",
    date: "Dec 6, 2026",
    icon: Landmark,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    type: "stamp",
  },
  {
    id: 4,
    title: "₹500 Hotel Voucher",
    description: "Redeemable at partner hotels in Goa",
    date: "Earned Oct 2026",
    icon: Hotel,
    color: "bg-terra-50 text-terra-600 border-terra-200",
    type: "coupon",
    expires: "Mar 31, 2027",
  },
  {
    id: 5,
    title: "Free Cab Ride",
    description: "₹200 Ola credit for event transport",
    date: "Earned Oct 2026",
    icon: Car,
    color: "bg-ink-50 text-ink-700 border-ink-200",
    type: "coupon",
    expires: "Feb 28, 2027",
  },
];

const redemptionCatalog = [
  {
    id: 1,
    title: "Hotel Discount — 15% Off",
    description: "Applicable at partner hotels across India",
    cost: 5,
    icon: Hotel,
    color: "bg-terra-50 text-terra-600",
  },
  {
    id: 2,
    title: "Free Cab Ride — ₹200",
    description: "Ola/Uber credit for local transport",
    cost: 8,
    icon: Car,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: 3,
    title: "Monument Entry Pass",
    description: "Free entry to ASI-protected monuments",
    cost: 10,
    icon: Landmark,
    color: "bg-sage-50 text-sage-600",
  },
  {
    id: 4,
    title: "Homestay Night — Free",
    description: "One free night at partner homestays",
    cost: 15,
    icon: MapPin,
    color: "bg-ink-50 text-ink-600",
  },
  {
    id: 5,
    title: "Premium Impact T-shirt",
    description: "Limited edition YatraSetu merch",
    cost: 12,
    icon: Gift,
    color: "bg-terra-50 text-terra-600",
  },
  {
    id: 6,
    title: "NSS/NCC Certificate Frame",
    description: "Professional frame for your certificates",
    cost: 3,
    icon: Ticket,
    color: "bg-amber-50 text-amber-600",
  },
];

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<"wallet" | "catalog">("wallet");
  const [redeemed, setRedeemed] = useState<Set<number>>(new Set());

  const handleRedeem = (id: number, cost: number) => {
    if (userStamps < cost) return;
    setRedeemed((prev) => new Set(prev).add(id));
  };

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      <section className="pt-28 pb-6 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Rewards Wallet
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Earn stamps from verified events, redeem for real rewards
            </p>
          </motion.div>

          <div className="mt-4">
            <SignInBanner />
          </div>

          {/* 3D Seva Medallion & Stamp Progress Spatial Card */}
          <SectionReveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-earth-900 via-earth-950 to-ink-950 p-6 sm:p-8 text-white shadow-2xl relative">
              {/* Background glowing gradient orbs */}
              <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left side: Stats & Tier info */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-bold text-amber-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      Gold Seva Tier
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-earth-200">
                      15s Anti-Fraud Verified
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Verified Seva Medallion & Passport
                  </h2>
                  <p className="mt-1 text-sm text-earth-300 max-w-xl">
                    Every volunteer hour at partner shrines and trails mints immutable Green Karma onto your 3D digital medallion.
                  </p>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5">
                      <p className="text-[11px] font-bold text-earth-400 uppercase tracking-wider">Green Karma</p>
                      <p className="mt-1 text-2xl font-black text-amber-400">1,450</p>
                      <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">+250 this month</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5">
                      <p className="text-[11px] font-bold text-earth-400 uppercase tracking-wider">Seva Stamps</p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">{userStamps}</span>
                        <span className="text-xs text-earth-400">/ {totalStamps}</span>
                      </div>
                      <p className="text-[10px] text-earth-300 mt-0.5">8 to Platinum Tier</p>
                    </div>

                    <div className="col-span-2 sm:col-span-1 rounded-2xl bg-white/5 border border-white/10 p-3.5">
                      <p className="text-[11px] font-bold text-earth-400 uppercase tracking-wider">Unlocked Perk</p>
                      <p className="mt-1 text-xs font-bold text-white leading-snug">Free ASI Monument Pass</p>
                      <p className="text-[10px] text-amber-300 mt-0.5">Ready to redeem</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs text-earth-300 mb-2 font-medium">
                      <span>Tier Progress</span>
                      <span className="font-bold text-amber-400">{Math.round((userStamps / totalStamps) * 100)}% to Platinum</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/10 border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(userStamps / totalStamps) * 100}%` }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Right side: Interactive 3D Seva Medallion */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  <div className="relative h-60 w-60 sm:h-64 sm:w-64 flex items-center justify-center">
                    <SevaMedallion3D karma={1450} className="h-full w-full" />
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-amber-300/80">
                    <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: "8s" }} />
                    <span>Interactive 3D Seva Coin · Drag to Rotate</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 rounded-xl border border-ink-200 bg-white p-1 w-fit">
            {[
              { id: "wallet" as const, label: "My Rewards", icon: Wallet },
              { id: "catalog" as const, label: "Redeem", icon: Gift },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-ink-800 text-white shadow"
                    : "text-ink-600 hover:bg-ink-50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {activeTab === "wallet" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {earnedRewards.map((reward, i) => (
                <SectionReveal key={reward.id} delay={i * 0.06}>
                  <div className="group rounded-2xl border border-ink-100 bg-white p-5 transition-all hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border", reward.color)}>
                        <reward.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-base font-bold text-ink-800">
                            {reward.title}
                          </h3>
                          <span
                            className={cn(
                              "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase",
                              reward.type === "stamp"
                                ? "bg-sage-50 text-sage-600"
                                : "bg-amber-50 text-amber-600"
                            )}
                          >
                            {reward.type}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-ink-500">
                          {reward.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-ink-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {reward.date}
                          </span>
                          {reward.expires && (
                            <span className="text-terra-400">
                              Expires {reward.expires}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          {activeTab === "catalog" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {redemptionCatalog.map((item, i) => {
                const canRedeem = userStamps >= item.cost;
                const isRedeemed = redeemed.has(item.id);

                return (
                  <SectionReveal key={item.id} delay={i * 0.06}>
                    <div
                      className={cn(
                        "rounded-2xl border bg-white p-5 transition-all",
                        canRedeem && !isRedeemed
                          ? "border-ink-100 hover:shadow-md"
                          : "border-ink-100 opacity-70"
                      )}
                    >
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", item.color)}>
                        <item.icon className="h-6 w-6" />
                      </div>

                      <h3 className="mt-3 font-display text-base font-bold text-ink-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-500">
                        {item.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: item.cost }).map((_, j) => (
                            <Star
                              key={j}
                              className={cn(
                                "h-3 w-3",
                                j < userStamps
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-ink-200"
                              )}
                            />
                          ))}
                          <span className="ml-1 text-xs font-semibold text-ink-600">
                            {item.cost} stamps
                          </span>
                        </div>

                        {isRedeemed ? (
                          <span className="flex items-center gap-1 rounded-lg bg-sage-50 px-3 py-1.5 text-xs font-semibold text-sage-600">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Redeemed
                          </span>
                        ) : (
                          <Button
                            variant={canRedeem ? "secondary" : "outline"}
                            size="sm"
                            disabled={!canRedeem}
                            onClick={() => handleRedeem(item.id, item.cost)}
                          >
                            {canRedeem ? "Redeem" : "Need more"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}

              {/* Funding note */}
              <SectionReveal delay={0.4} className="sm:col-span-2 lg:col-span-3">
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                  <p className="text-sm text-amber-700">
                    <Sparkles className="mr-1 inline h-4 w-4" />
                    Rewards are funded through CSR partnerships and state tourism
                    board sponsorships — not from your booking fees.
                  </p>
                </div>
              </SectionReveal>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
