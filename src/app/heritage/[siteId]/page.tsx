"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import {
  Play,
  Pause,
  Volume2,
  Globe,
  MapPin,
  Landmark,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface HeritageSite {
  id: string;
  destination_name: string;
  name: string;
  lat: number;
  lng: number;
  wikipedia_slug: string;
  category: string;
}

export default function HeritageStoryPage() {
  const params = useParams();
  const siteId = params?.siteId as string;
  const [site, setSite] = useState<HeritageSite | null>(null);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [language, setLanguage] = useState("en");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!siteId) return;
    setLoading(true);
    fetch(`/api/heritage?siteId=${siteId}&lang=${language}`)
      .then((r) => r.json())
      .then((d) => {
        setSite(d.site);
        setStory(d.story);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteId, language]);

  const handlePlayPause = () => {
    if (!story) return;

    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(story);
    utterance.lang = language === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    const targetLang = language === "hi" ? "hi" : "en";
    const voice = voices.find((v) => v.lang.startsWith(targetLang));
    if (voice) utterance.voice = voice;

    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const categoryIcons: Record<string, string> = {
    fort: "🏰",
    temple: "🕉️",
    palace: "👑",
    monument: "🗿",
    natural: "🌿",
  };

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      <section className="pt-28 pb-6 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/discover"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Discover
          </Link>

          {loading ? (
            <div className="mt-8 space-y-4">
              <div className="h-8 w-48 animate-pulse rounded-lg bg-ink-100" />
              <div className="h-4 w-32 animate-pulse rounded bg-ink-100" />
              <div className="mt-8 h-64 animate-pulse rounded-2xl bg-ink-100" />
            </div>
          ) : site ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl">
                    {categoryIcons[site.category] || "📍"}
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-700 capitalize">
                    {site.category}
                  </span>
                </div>
                <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
                  {site.name}
                </h1>
                <div className="mt-2 flex items-center gap-3 text-sm text-ink-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {site.destination_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Landmark className="h-3.5 w-3.5" />
                    Heritage Site
                  </span>
                </div>
              </motion.div>

              {/* Story Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white"
              >
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-ink-100 bg-earth-50 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-ink-500" />
                    <span className="text-sm font-semibold text-ink-700">
                      AI Heritage Story
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-ink-400" />
                    <select
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        window.speechSynthesis.cancel();
                        setPlaying(false);
                      }}
                      className="rounded-lg border border-ink-200 bg-white px-2 py-1 text-xs font-medium text-ink-600 focus:outline-none"
                    >
                      <option value="en">English</option>
                      <option value="hi">हिन्दी</option>
                    </select>
                  </div>
                </div>

                {/* Story content */}
                <div className="p-6">
                  {story ? (
                    <p className="text-base leading-relaxed text-ink-600">
                      {story}
                    </p>
                  ) : (
                    <p className="text-sm text-ink-400 italic">
                      Story not available for this site yet.
                    </p>
                  )}
                </div>

                {/* Play controls */}
                <div className="border-t border-ink-100 bg-earth-50 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePlayPause}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl active:scale-95"
                    >
                      {playing ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="ml-0.5 h-5 w-5" />
                      )}
                    </button>
                    <div>
                      <p className="text-sm font-semibold text-ink-700">
                        {playing ? "Playing story..." : "Tap to listen"}
                      </p>
                      <p className="text-xs text-ink-500">
                        {language === "hi"
                          ? "AI-generated tour guide narrative"
                          : "90-second AI-guided heritage narration"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <div className="mt-12 text-center">
              <p className="text-lg font-semibold text-ink-600">
                Heritage site not found
              </p>
              <Link href="/discover">
                <Button variant="secondary" className="mt-4">
                  Browse Destinations
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
