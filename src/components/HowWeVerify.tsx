"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Camera,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  RefreshCw,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function HowWeVerify() {
  const [countdown, setCountdown] = useState(15);
  const [tokenSeed, setTokenSeed] = useState("YS-GOA-7821");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setTokenSeed(`YS-SEED-${Math.floor(1000 + Math.random() * 9000)}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Rotating Dynamic QR Code",
      desc: "Event leaders generate a cryptographically time-seeded QR code that refreshes every 15 seconds on-site. Static screenshots and forwarded codes are rejected instantly.",
      icon: QrCode,
      tag: "Fraud-Proof Check-in",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      num: "02",
      title: "Geo-Fenced & Time-Stamped Selfie",
      desc: "Upon scanning, the volunteer snaps an instant selfie. The browser's native Geolocation API verifies that coordinates match strictly within 200m of the restoration perimeter.",
      icon: Camera,
      tag: "GPS Perimeter Match",
      color: "bg-terra-50 text-terra-700 border-terra-200",
    },
    {
      num: "03",
      title: "Tamper-Proof Digital Credential",
      desc: "Once validated, Green Karma points and an auditable Certificate of Seva (issued with Ministry of Tourism & NSS metadata) are deposited directly into the traveler's passport.",
      icon: ShieldCheck,
      tag: "Instant Karma & Cert",
      color: "bg-sage-50 text-sage-700 border-sage-200",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-earth-100/60 py-24 sm:py-32 border-y border-earth-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-sage-50 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-sage-600" />
            Zero Proxy Attendance Architecture
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl"
          >
            How We Verify Every Act of Seva
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-ink-600 sm:text-lg max-w-2xl mx-auto"
          >
            Built specifically to eliminate fake attendance and ensure corporate CSR sponsors, NGOs, and government bodies get 100% auditable impact metrics.
          </motion.p>
        </div>

        {/* Interactive Live Dynamic QR Preview Banner */}
        <div className="mt-12 max-w-3xl mx-auto rounded-3xl border border-amber-200 bg-white p-5 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-earth-50 border border-earth-200">
                <QrCode className="h-10 w-10 text-ink-900" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                  {countdown}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Live Anti-Fraud Engine
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.2 text-[10px] font-mono font-bold text-amber-900">
                    Token: {tokenSeed}
                  </span>
                </div>
                <p className="text-xs text-ink-600 mt-1">
                  Rotating dynamic seed refreshes every 15s • Screenshot proof active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-sage-800 bg-sage-50 px-3 py-1.5 rounded-xl border border-sage-200 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-sage-600" />
                <span>200m Geo-Fenced</span>
              </div>
              <Link
                href="/events"
                className="rounded-xl bg-ink-900 px-4 py-2 text-xs font-bold text-white hover:bg-ink-800 transition-colors"
              >
                Test Simulator
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col justify-between rounded-3xl border border-earth-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-bold text-amber-500/40 group-hover:text-amber-500 transition-colors">
                    {s.num}
                  </span>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${s.color}`}>
                    {s.tag}
                  </span>
                </div>

                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-earth-50 border border-earth-200 text-ink-800 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:text-amber-700">
                  <s.icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-ink-900 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-earth-100 flex items-center gap-2 text-xs font-semibold text-amber-700">
                <ShieldCheck className="h-4 w-4" />
                <span>Audited for SIH26202 Standards</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Demo Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-2xl bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-ink-800 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Try the Interactive QR Check-In Simulation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
