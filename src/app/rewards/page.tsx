"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

const userStamps = 12;
const totalStamps = 20;

const earnedRewards = [
  {
    id: 1,
    title: "Beach Cleanup Champion",
    description: "Completed 5 beach cleanup events",
    date: "Aug 20, 2024",
    icon: "🏖️",
    type: "stamp",
  },
  {
    id: 2,
    title: "Plantation Pioneer",
    description: "Planted 50+ trees across events",
    date: "Aug 15, 2024",
    icon: "🌳",
    type: "stamp",
  },
  {
    id: 3,
    title: "Heritage Guardian",
    description: "Participated in 3 heritage care events",
    date: "Aug 10, 2024",
    icon: "🏛️",
    type: "stamp",
  },
  {
    id: 4,
    title: "₹500 Hotel Voucher",
    description: "Redeemable at partner hotels in Goa",
    date: "Earned Aug 20",
    icon: "🏨",
    type: "coupon",
    expires: "Nov 30, 2024",
  },
  {
    id: 5,
    title: "Free Cab Ride",
    description: "₹200 Ola credit for event transport",
    date: "Earned Aug 15",
    icon: "🚕",
    type: "coupon",
    expires: "Oct 31, 2024",
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

          {/* Stamp progress */}
          <SectionReveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">Your stamps</p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-ink-800">
                      {userStamps}
                    </span>
                    <span className="text-lg text-ink-400">
                      / {totalStamps}
                    </span>
                  </div>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-ink-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(userStamps / totalStamps) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-terra-400"
                />
              </div>

              <p className="mt-2 text-xs text-ink-500">
                {totalStamps - userStamps} more stamps to unlock the next reward tier
              </p>
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
                      <span className="text-3xl">{reward.icon}</span>
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
