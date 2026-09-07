"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import HeroJourneyShowcase from "@/components/HeroJourneyShowcase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Play,
  Sparkles,
  Sprout,
  Trophy,
  Search,
  Calendar,
  MapPin,
  Compass,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const heroStats = [
  { value: "2.4L+", label: "kg waste collected" },
  { value: "18K+", label: "volunteers joined" },
  { value: "340+", label: "restoration sites" },
  { value: "28", label: "states covered" },
];

export default function Hero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Quick search state
  const [quickDest, setQuickDest] = useState("");
  const [quickMonth, setQuickMonth] = useState("October 2026");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickDest.trim()) {
      router.push(`/discover?q=${encodeURIComponent(quickDest.trim())}`);
    } else {
      router.push("/discover");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background orbs
      gsap.to(orb1Ref.current, {
        y: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(orb2Ref.current, {
        y: -80,
        x: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] overflow-hidden bg-earth-50">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={orb1Ref} className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-amber-200/25 blur-[120px]" />
        <div ref={orb2Ref} className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-terra-200/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #312C24 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14 pt-32 pb-12 lg:min-h-[85vh]">
          {/* Left Column — Content */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-earth-300/80 bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-ink-800 shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>India&apos;s 1st Mindful Travel & Seva Platform</span>
              </span>
            </motion.div>

            <div className="space-y-1.5">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display text-[clamp(2.6rem,5.2vw,4.4rem)] leading-[1.04] tracking-tight text-ink-950 font-extrabold"
              >
                Where Every Journey
                <br />
                Becomes{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-amber-600 via-terra-500 to-amber-700 bg-clip-text text-transparent">
                    Seva
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-1 left-0 right-0 h-3 -rotate-1 bg-amber-200/80 sm:bottom-2 sm:h-4 origin-left"
                  />
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display text-[clamp(1.3rem,2.6vw,2rem)] leading-snug text-amber-900/80 font-semibold tracking-tight"
              >
                यात्रा बने सेवा · Sustainable, Verified & Crowd-Free
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-lg text-sm sm:text-base leading-relaxed text-ink-600 font-normal"
            >
              Discover serene, offbeat destinations across India. Restore fragile ecosystems alongside verified NGOs, immerse in AI heritage storytelling, and earn redeemable Green Karma rewards.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <Link href="/discover">
                <Button size="lg" variant="warm" className="shadow-lg shadow-amber-500/20">
                  Explore Destinations <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline" className="border-earth-300 bg-white/80 hover:bg-white">
                  <Play className="h-3.5 w-3.5 fill-amber-600 text-amber-600 mr-1.5" />
                  Upcoming Seva Drives
                </Button>
              </Link>
            </motion.div>

            {/* High-Craft Floating Search Pill */}
            <motion.form
              onSubmit={handleQuickSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-1 flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-earth-300/90 bg-white/95 p-2 shadow-xl backdrop-blur-md sm:max-w-lg"
            >
              <div className="flex items-center gap-2.5 px-3 py-1.5 w-full sm:w-auto flex-1">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                <div className="flex flex-col w-full text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-ink-400">Where to?</span>
                  <input
                    type="text"
                    value={quickDest}
                    onChange={(e) => setQuickDest(e.target.value)}
                    placeholder="e.g. Kasol, Goa, Spiti, Munnar..."
                    className="w-full text-xs font-semibold text-ink-900 placeholder:text-ink-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-earth-200" />
              <div className="flex items-center gap-2 px-3 py-1.5 w-full sm:w-auto">
                <Calendar className="h-4 w-4 text-ink-400 shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-ink-400">Season</span>
                  <span className="text-xs text-ink-700 font-bold whitespace-nowrap">{quickMonth}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-5 py-3 text-xs font-bold text-white hover:bg-amber-600 transition-all shadow-md shrink-0"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
              </button>
            </motion.form>

            {/* Social Proof & Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-3 pt-1"
            >
              <div className="flex -space-x-2 overflow-hidden">
                {["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop"].map((avatar, idx) => (
                  <img
                    key={idx}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src={avatar}
                    alt="Active Volunteer"
                  />
                ))}
              </div>
              <p className="text-xs text-ink-600 font-medium">
                <strong className="font-bold text-ink-900">18,400+ volunteers</strong> from NSS & mindful travelers active
              </p>
            </motion.div>
          </div>

          {/* Right Column — Live Interactive Trip & Seva Showcase */}
          <div ref={visualRef} className="relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroJourneyShowcase />
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="relative -mt-4 mb-12 overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-1 px-4 py-6 sm:px-8 sm:py-7 ${
                  i < heroStats.length - 1 ? "border-r border-earth-200" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-earth-200" : ""}`}
              >
                <span className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-ink-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
