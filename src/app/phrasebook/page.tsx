import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DialectPhrasebook from "@/components/DialectPhrasebook";
import { Languages, Volume2, Sparkles, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Local Dialect & Eco-Etiquette Audio Guide | YatraSetu",
  description: "Pronunciation audio guide and sacred cultural eco-taboos for Himachal, Ladakh, Uttarakhand, Konkan, Kerala, and Rajasthan.",
};

export default function PhrasebookPage() {
  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      <section className="pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800 mb-4">
              <Languages className="h-3.5 w-3.5 text-amber-600" />
              <span>Mindful Cultural Connection</span>
            </div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              Local Dialect & Eco-Etiquette Guide
            </h1>

            <p className="mt-4 text-base text-ink-600 sm:text-lg">
              When traveling through remote Indian valleys and ancestral coastal hamlets, speaking two words in the local tongue breaks barriers instantly. Learn phonetic pronunciation and sacred ecological taboos honored by elders.
            </p>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-ink-500">
              <span className="flex items-center gap-1">
                <Volume2 className="h-4 w-4 text-amber-600" /> Web Speech Audio Pronunciation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-sage-600" /> Sacred Devta & Forest Rules
              </span>
            </div>
          </div>

          {/* Interactive Dialect Explorer */}
          <DialectPhrasebook initialDestination="Himachal" />

          <div className="mt-12 text-center">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 rounded-xl border border-earth-300 bg-white px-5 py-2.5 text-xs font-bold text-ink-700 hover:bg-earth-100 transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Discover Destinations</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
