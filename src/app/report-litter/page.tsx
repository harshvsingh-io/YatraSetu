"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReportLitterModal from "@/components/ReportLitterModal";
import {
  Trash2,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Camera,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const initialCommunityReports = [
  {
    id: "SW-2026-8912",
    location: "Parvati Riverbank Trail, Kasol",
    coordinates: "32.0102° N, 77.3148° E",
    category: "Plastic Bottles & Snack Wrappers",
    volume: "12 kg",
    reporter: "Aarav Sharma (NSS Lead)",
    date: "Sep 06, 2026",
    status: "Assigned to HP NSS Unit 2",
    photo: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop",
  },
  {
    id: "SW-2026-8401",
    location: "Chopta Tungnath Ascending Trail",
    coordinates: "30.4854° N, 79.2152° E",
    category: "Camping Gear & Poly Bags",
    volume: "8 kg",
    reporter: "Priya Menon",
    date: "Sep 04, 2026",
    status: "Restored & Verified",
    photo: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&h=400&fit=crop",
  },
  {
    id: "SW-2026-7920",
    location: "Morjim Beach Turtle Nesting Dune",
    coordinates: "15.6310° N, 73.7381° E",
    category: "Broken Glass & Beer Bottles",
    volume: "18 kg",
    reporter: "Goa Coastal Guardians",
    date: "Aug 29, 2026",
    status: "Restored & Verified",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  },
  {
    id: "SW-2026-7512",
    location: "Triund Ridge Base Camp, Dharamshala",
    coordinates: "32.2590° N, 76.3530° E",
    category: "Instant Noodle Cups & Plastic",
    volume: "22 kg",
    reporter: "Himachal Eco Trekkers",
    date: "Aug 25, 2026",
    status: "Assigned to Kangra Unit",
    photo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
  },
];

export default function ReportLitterPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [reports, setReports] = useState(initialCommunityReports);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("yatrasetu_litter_reports");
      if (stored) {
        const parsed = JSON.parse(stored);
        setReports([...parsed, ...initialCommunityReports]);
      }
    } catch (e) {
      // ignore
    }
  }, [modalOpen]);

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      <section className="pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-earth-200 bg-gradient-to-br from-ink-900 via-amber-950 to-terra-950 p-8 sm:p-12 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Swachh Yatra Citizen Action</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Spot Litter on a Trail?
                <br />
                Report & Mobilize NSS Crews.
              </h1>

              <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                Himalayan ridgelines and remote heritage temples often have zero municipal waste collection. Snap a photo, capture auto-GPS coordinates, and alert university student volunteers to restore the trail.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-terra-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Camera className="h-4 w-4" />
                  <span>Report Litter Now (+50 Karma)</span>
                </button>

                <Link
                  href="/events"
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  Join an Existing Cleanup
                </Link>
              </div>
            </div>

            {/* Impact Stats Strip in Banner */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-amber-400">
                  3,480 kg
                </span>
                <p className="text-[11px] text-white/70">Plastic & Debris Cleared</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-sage-400">
                  128 Trails
                </span>
                <p className="text-[11px] text-white/70">Audited & Cleaned</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-terra-400">
                  42 Units
                </span>
                <p className="text-[11px] text-white/70">Active NSS University Squads</p>
              </div>
            </div>
          </div>

          {/* Live Community Reports Feed */}
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  Live Trail Restoration Feed
                </h2>
                <p className="text-xs text-ink-500 mt-0.5">
                  Real-time reports geo-tagged by travelers and dispatched to volunteer coordinators
                </p>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="self-start sm:self-auto rounded-xl border border-earth-300 bg-white px-4 py-2 text-xs font-bold text-ink-700 hover:bg-earth-100 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5 text-amber-600" />
                <span>Submit New Report</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reports.map((r, idx) => (
                <div
                  key={`${r.id}-${idx}`}
                  className="flex flex-col justify-between overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-xs transition-all hover:border-amber-300 hover:shadow-md"
                >
                  <div>
                    <div className="relative h-36 w-full overflow-hidden bg-earth-100">
                      <img
                        src={r.photo}
                        alt={r.location}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <span
                        className={`absolute bottom-2 left-2 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
                          r.status.includes("Restored")
                            ? "bg-sage-900/80 text-sage-200"
                            : "bg-amber-900/80 text-amber-200"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-[10px] text-ink-400 font-medium">
                        <span>{r.id}</span>
                        <span>{r.date}</span>
                      </div>

                      <h3 className="font-display text-sm font-bold text-ink-900 mt-1 line-clamp-1">
                        {r.location}
                      </h3>

                      <p className="text-xs text-ink-600 mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-ink-400 shrink-0" />
                        <span className="truncate">{r.coordinates}</span>
                      </p>

                      <div className="mt-3 flex items-center justify-between border-t border-earth-100 pt-2 text-[11px]">
                        <span className="text-ink-500">{r.category}</span>
                        <span className="font-bold text-ink-800">{r.volume}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-earth-50 px-4 py-2.5 border-t border-earth-100 flex items-center justify-between text-[10px]">
                    <span className="text-ink-500">Reporter: {r.reporter}</span>
                    <span className="font-bold text-amber-700">+50 Karma</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReportLitterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
