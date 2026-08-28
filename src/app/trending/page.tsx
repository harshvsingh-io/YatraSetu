"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import { useToast } from "@/components/Toast";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Camera,
  MapPin,
  Upload,
  CheckCircle2,
  TrendingUp,
  Clock,
} from "lucide-react";

const recentAlerts = [
  {
    id: 1,
    location: "Baga Beach, Goa",
    type: "Overcrowding",
    reportedBy: "Priya M.",
    time: "2 hours ago",
    status: "verified",
  },
  {
    id: 2,
    location: "Marine Drive, Mumbai",
    type: "Waste Overflow",
    reportedBy: "Rahul D.",
    time: "5 hours ago",
    status: "pending",
  },
  {
    id: 3,
    location: "Hawa Mahal, Jaipur",
    type: "Overcrowding",
    reportedBy: "Ananya S.",
    time: "1 day ago",
    status: "resolved",
  },
];

export default function TrendingPage() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState<"overcrowding" | "waste" | "damage" | "">("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!location || !type) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
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
            <span className="inline-flex items-center gap-2 rounded-full bg-terra-50 px-4 py-1 text-xs font-semibold text-terra-700">
              <TrendingUp className="h-3.5 w-3.5" />
              Crowd Alert System
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Trending Spot Alert
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Flag an overwhelmed site to help us respond before it gets worse
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Report form */}
            <SectionReveal>
              <div className="rounded-2xl border border-ink-100 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-ink-800">
                  Report a Spot
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Help us keep popular destinations clean and safe
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
                      <CheckCircle2 className="h-8 w-8 text-sage-500" />
                    </div>
                    <h4 className="mt-4 font-display text-xl font-bold text-ink-800">
                      Alert Submitted!
                    </h4>
                    <p className="mt-2 text-sm text-ink-500">
                      Our team will verify and respond within 2 hours.
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-4"
                      onClick={() => {
                        setSubmitted(false);
                        setLocation("");
                        setType("");
                        setDescription("");
                        setPhoto(null);
                      }}
                    >
                      Report Another
                    </Button>
                  </motion.div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {/* Location */}
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Location / Spot Name *
                      </label>
                      <div className="relative mt-1.5">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <input
                          type="text"
                          placeholder="e.g. Baga Beach, Goa"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="h-11 w-full rounded-xl border-2 border-ink-200 bg-white pl-10 pr-4 text-sm font-medium text-ink-800 placeholder:text-ink-300 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Type */}
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Issue Type *
                      </label>
                      <div className="mt-1.5 grid grid-cols-3 gap-2">
                        {[
                          { id: "overcrowding" as const, label: "Overcrowding", emoji: "👥" },
                          { id: "waste" as const, label: "Waste Overflow", emoji: "🗑️" },
                          { id: "damage" as const, label: "Damage Report", emoji: "⚠️" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setType(t.id)}
                            className={cn(
                              "flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all",
                              type === t.id
                                ? "border-terra-400 bg-terra-50 text-terra-700"
                                : "border-ink-200 text-ink-600 hover:border-ink-300"
                            )}
                          >
                            <span className="text-xl">{t.emoji}</span>
                            <span className="text-xs">{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Description
                      </label>
                      <textarea
                        placeholder="Describe what you're seeing..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-800 placeholder:text-ink-300 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Photo upload */}
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Photo (optional)
                      </label>
                      <div className="mt-1.5 rounded-xl border-2 border-dashed border-ink-200 p-6 text-center transition-colors hover:border-terra-300 hover:bg-terra-50/30 cursor-pointer">
                        <Camera className="mx-auto h-8 w-8 text-ink-300" />
                        <p className="mt-2 text-sm text-ink-500">
                          Click to upload a photo
                        </p>
                        <p className="mt-1 text-xs text-ink-400">
                          JPG, PNG up to 5MB
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      className="w-full"
                      size="lg"
                      loading={submitting}
                      disabled={!location || !type}
                      onClick={handleSubmit}
                    >
                      Submit Alert
                    </Button>
                  </div>
                )}
              </div>
            </SectionReveal>

            {/* Recent alerts sidebar */}
            <SectionReveal delay={0.1}>
              <div className="rounded-2xl border border-ink-100 bg-white p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-800">
                  <AlertTriangle className="h-5 w-5 text-terra-500" />
                  Recent Alerts
                </h3>
                <div className="mt-4 space-y-3">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="rounded-xl border border-ink-100 p-3 transition-colors hover:bg-ink-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-ink-700">
                            {alert.location}
                          </p>
                          <p className="text-xs text-ink-500">
                            {alert.type} · by {alert.reportedBy}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold",
                            alert.status === "verified"
                              ? "bg-sage-50 text-sage-600"
                              : alert.status === "resolved"
                              ? "bg-ink-50 text-ink-500"
                              : "bg-amber-50 text-amber-600"
                          )}
                        >
                          {alert.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-ink-400">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
