"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { HERITAGE_SITES } from "@/lib/seed-data";
import {
  Headphones,
  Sparkles,
  MapPin,
  Volume2,
  Landmark,
  ArrowRight,
  Shield,
  Compass,
  Play,
  Globe2,
} from "lucide-react";

export default function HeritageHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Sites (12)" },
    { id: "temple", label: "Temples" },
    { id: "fort", label: "Forts" },
    { id: "palace", label: "Palaces" },
    { id: "monument", label: "Monuments" },
    { id: "natural", label: "Natural Wonders" },
  ];

  const filteredSites =
    selectedCategory === "all"
      ? HERITAGE_SITES
      : HERITAGE_SITES.filter((s) => s.category === selectedCategory);

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 sm:pt-32 sm:pb-12 bg-gradient-to-b from-earth-100/60 via-white to-earth-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-900 mb-3 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
              <span>SIH 2026 AI Storyteller & AR Heritage</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              AR Heritage Audio Storyteller
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg max-w-2xl">
              AI-narrated historical walkthroughs and cultural stories for India's treasured monuments, powered by Wikipedia REST API and Web Speech synthesis.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-ink-900 text-white shadow-xs"
                    : "bg-white text-ink-600 border border-earth-200 hover:bg-earth-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Sites Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSites.map((site, i) => (
              <SectionReveal key={site.id} delay={i * 0.05}>
                <Link
                  href={`/heritage/${site.id}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-earth-200 bg-white p-6 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-all">
                        <Landmark className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-earth-100 px-3 py-1 text-[10px] font-bold text-ink-700 capitalize">
                        {site.category}
                      </span>
                    </div>

                    <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      {site.destination_name}
                    </p>
                    <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-amber-700 transition-colors mt-0.5">
                      {site.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                      <MapPin className="h-3.5 w-3.5 text-ink-400" />
                      <span>Wikipedia: {site.wikipedia_slug.replace(/_/g, " ")}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-earth-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                      <Headphones className="h-3.5 w-3.5" />
                      <span>Audio Tour Ready</span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-900 text-white group-hover:bg-amber-600 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
