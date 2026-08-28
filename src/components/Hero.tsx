"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import dynamic from "next/dynamic";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const IndiaMap3D = dynamic(() => import("@/components/IndiaMap3D"), { ssr: false, loading: () => <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-900 via-ink-800 to-earth-900 rounded-2xl"><div className="text-center"><div className="animate-pulse text-4xl mb-2">🗺️</div><p className="text-sm text-ink-400">Loading 3D map...</p></div></div> });
import Link from "next/link";

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
  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const floatCard1Ref = useRef<HTMLDivElement>(null);
  const floatCard2Ref = useRef<HTMLDivElement>(null);

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
          scrub: 1.5,
        },
      });
      gsap.to(orb3Ref.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Visual card parallax (slower scroll = floating feel)
      gsap.to(visualRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Floating stat cards — counter-directional parallax
      gsap.to(floatCard1Ref.current, {
        y: -30,
        x: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(floatCard2Ref.current, {
        y: -40,
        x: -15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] overflow-hidden bg-earth-50 grain">
      {/* Background — warm layered gradients with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={orb1Ref} className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-amber-200/25 blur-[120px]" />
        <div ref={orb2Ref} className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-terra-200/20 blur-[120px]" />
        <div ref={orb3Ref} className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-sage-200/15 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #312C24 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16 pt-32 pb-16 lg:min-h-[85vh]">
          {/* Left — Text */}
          <div className="flex flex-col gap-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700">
                <Sparkles className="h-3.5 w-3.5" />
                Smart India Hackathon 2024
              </span>
            </motion.div>

            <div className="space-y-1">
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ink-900">
                Every Journey
                <br />
                Becomes{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-amber-500 via-amber-600 to-terra-500 bg-clip-text text-transparent">Seva</span>
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 left-0 right-0 h-3 -rotate-1 bg-amber-200/70 sm:bottom-2 sm:h-4 origin-left" />
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
                className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] text-ink-500 italic">
                यात्रा बने सेवा
              </motion.p>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
              Book your next trip, join verified restoration events at your destination, earn rewards — and help keep India beautiful.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }} className="flex flex-wrap gap-4">
              <Link href="/discover">
                <Button size="lg" variant="warm">Explore Destinations <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline"><Play className="h-4 w-4 fill-current" /> Join an Event</Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {["bg-amber-500", "bg-terra-500", "bg-sage-500", "bg-ink-500"].map((bg, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full ${bg} border-2 border-earth-50 ring-2 ring-white/80`} />
                ))}
              </div>
              <p className="text-xs text-ink-500">
                <span className="font-semibold text-ink-800">4,200+</span> volunteers active this week
              </p>
            </motion.div>
          </div>

          {/* Right — Visual with GSAP parallax */}
          <div ref={visualRef} className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <div className="relative rounded-3xl border border-earth-200 bg-white p-2 shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 via-ink-800 to-earth-900">
                  <IndiaMap3D className="absolute inset-0 h-full w-full" />
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/10 p-3 backdrop-blur-md z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-white/70">Active Site</p>
                        <p className="text-sm font-semibold text-white">Goa Beach Cleanup</p>
                      </div>
                      <div className="rounded-lg bg-sage-500/80 px-2.5 py-1 text-xs font-bold text-white">Live</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Floating cards — counter-directional GSAP parallax */}
            <motion.div ref={floatCard1Ref} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="absolute -left-4 top-8 rounded-xl border border-earth-200 bg-white p-3 shadow-xl sm:-left-8">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-50"><span className="text-sm">🌿</span></div>
                <div><p className="text-xs font-bold text-ink-800">+342</p><p className="text-[10px] text-ink-500">sites restored</p></div>
              </div>
            </motion.div>

            <motion.div ref={floatCard2Ref} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="absolute -bottom-4 right-4 rounded-xl border border-earth-200 bg-white p-3 shadow-xl sm:-right-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50"><span className="text-sm">🏆</span></div>
                <div><p className="text-xs font-bold text-ink-800">8,400+</p><p className="text-[10px] text-ink-500">rewards earned</p></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }}
          className="relative -mt-8 mb-8 overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col items-center gap-1 px-4 py-6 sm:px-8 sm:py-8 ${i < heroStats.length - 1 ? "border-r border-earth-200" : ""} ${i < 2 ? "border-b md:border-b-0 border-earth-200" : ""}`}>
                <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                  className="font-display text-2xl font-bold text-ink-800 sm:text-3xl">{stat.value}</motion.span>
                <span className="text-xs font-medium text-ink-500 sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
