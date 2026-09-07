"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import InteractiveMap from "@/components/InteractiveMap";
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
  const floatCard1Ref = useRef<HTMLDivElement>(null);
  const floatCard2Ref = useRef<HTMLDivElement>(null);

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

      // Float cards counter-motion
      gsap.to(floatCard1Ref.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(floatCard2Ref.current, {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
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
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Smart India Hackathon 2026 · PS SIH26202
              </span>
            </motion.div>

            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.05] tracking-tight text-ink-900 font-bold"
              >
                Every Journey
                <br />
                Becomes{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-amber-500 via-amber-600 to-terra-500 bg-clip-text text-transparent">
                    Seva
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-1 left-0 right-0 h-3 -rotate-1 bg-amber-200/70 sm:bottom-2 sm:h-4 origin-left"
                  />
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.1] text-amber-800/80 italic font-semibold"
              >
                यात्रा बने सेवा, बिना भीड़ के
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-lg text-sm sm:text-base leading-relaxed text-ink-600 font-normal"
            >
              India's first smart travel platform that reroutes tourism away from saturated hotspots, guides you with AI heritage storytelling, and lets you restore local ecosystems while earning verified rewards.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3.5"
            >
              <Link href="/discover">
                <Button size="lg" variant="warm">
                  Explore Destinations <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline">
                  <Play className="h-4 w-4 fill-current text-amber-600" />
                  Join an Event
                </Button>
              </Link>
            </motion.div>

            {/* Quick-Search Widget */}
            <motion.form
              onSubmit={handleQuickSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-2 flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-earth-300 bg-white p-2 shadow-md sm:max-w-lg"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 w-full sm:w-auto flex-1">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                <input
                  type="text"
                  value={quickDest}
                  onChange={(e) => setQuickDest(e.target.value)}
                  placeholder="e.g. Kasol, Goa, Munnar..."
                  className="w-full text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none bg-transparent"
                />
              </div>
              <div className="hidden sm:block h-6 w-px bg-earth-200" />
              <div className="flex items-center gap-2 px-3 py-1.5 w-full sm:w-auto">
                <Calendar className="h-4 w-4 text-ink-400 shrink-0" />
                <span className="text-xs text-ink-600 font-medium whitespace-nowrap">{quickMonth}</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-ink-800 transition-colors"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
              </button>
            </motion.form>

            {/* Volunteer counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4 pt-1"
            >
              <div className="flex -space-x-2">
                {["bg-amber-500", "bg-terra-500", "bg-sage-500", "bg-ink-700"].map((bg, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full ${bg} border-2 border-earth-50 ring-1 ring-black/10 flex items-center justify-center text-[10px] font-bold text-white`}>
                    {["AK", "AS", "RV", "PM"][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-600">
                <span className="font-bold text-ink-900">4,200+</span> active volunteers restoring India this week
              </p>
            </motion.div>
          </div>

          {/* Right Column — Live Interactive Map */}
          <div ref={visualRef} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative rounded-3xl border border-earth-300 bg-white p-2.5 shadow-2xl">
                <div className="relative aspect-[4/3] min-h-[380px] sm:min-h-[440px] overflow-hidden rounded-2xl bg-ink-950">
                  <InteractiveMap className="absolute inset-0 h-full w-full" />
                </div>
              </div>
            </motion.div>

            {/* Floating badge 1 (Sites restored) - No raw emojis */}
            <motion.div
              ref={floatCard1Ref}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-4 top-10 rounded-2xl border border-earth-200 bg-white p-3.5 shadow-xl sm:-left-8 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-50 border border-sage-200 text-sage-700">
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-900">+342</p>
                  <p className="text-[10px] text-ink-500 font-medium">active sites restored</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge 2 (Rewards earned) - No raw emojis */}
            <motion.div
              ref={floatCard2Ref}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-5 right-4 rounded-2xl border border-earth-200 bg-white p-3.5 shadow-xl sm:-right-4 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-900">8,400+</p>
                  <p className="text-[10px] text-ink-500 font-medium">Green Karma rewards issued</p>
                </div>
              </div>
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
