"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  Award,
  Download,
  FileText,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "NSS Voluntary Service Certificate",
    event: "Calangute Beach Cleanup Drive",
    date: "Aug 18, 2024",
    location: "Calangute, Goa",
    hours: 4,
    verified: true,
    unit: "NSS Unit — Goa University",
    status: "ready" as const,
  },
  {
    id: 2,
    title: "NCC Community Service Certificate",
    event: "Mangrove Plantation — Divar Island",
    date: "Aug 11, 2024",
    location: "Divar Island, Goa",
    hours: 6,
    verified: true,
    unit: "NCC 22 Goa Naval Unit",
    status: "ready" as const,
  },
  {
    id: 3,
    title: "NSS Voluntary Service Certificate",
    event: "Heritage Walk — Fontainhas",
    date: "Aug 4, 2024",
    location: "Panaji, Goa",
    hours: 3,
    verified: true,
    unit: "NSS Unit — Goa University",
    status: "processing" as const,
  },
];

export default function CertificatesPage() {
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
              My Certificates
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Auto-generated NSS/NCC certificates from verified events
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => (
              <SectionReveal key={cert.id} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all hover:shadow-md">
                  {/* Certificate preview */}
                  <div className="relative border-b border-ink-100 bg-gradient-to-br from-earth-100 to-earth-50 p-6">
                    <div className="rounded-xl border border-ink-200 bg-white p-4 shadow-sm">
                      {/* Certificate mini preview */}
                      <div className="text-center">
                        <Award className="mx-auto h-6 w-6 text-terra-400" />
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                          Certificate of Service
                        </p>
                        <div className="mx-auto mt-2 h-px w-16 bg-amber-300" />
                        <p className="mt-2 font-display text-xs font-bold text-ink-700">
                          {cert.title}
                        </p>
                        <p className="mt-1 text-[9px] text-ink-500">
                          {cert.unit}
                        </p>
                        <div className="mx-auto mt-2 flex items-center justify-center gap-4 text-[8px] text-ink-400">
                          <span>{cert.hours} hours</span>
                          <span>•</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>

                    {cert.status === "processing" && (
                      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
                        <Clock className="h-3 w-3" />
                        Processing
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold text-ink-800">
                      {cert.event}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-ink-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {cert.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {cert.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {cert.hours} volunteer hours
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                      {cert.verified && (
                        <span className="flex items-center gap-1 text-xs font-medium text-sage-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      )}
                      {cert.status === "ready" ? (
                        <Button variant="secondary" size="sm">
                          <Download className="h-3.5 w-3.5" />
                          Download PDF
                        </Button>
                      ) : (
                        <span className="text-xs text-ink-400">
                          Ready in 24hrs
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {certificates.length === 0 && (
            <div className="py-20 text-center">
              <FileText className="mx-auto h-12 w-12 text-ink-300" />
              <p className="mt-4 text-lg font-semibold text-ink-600">
                No certificates yet
              </p>
              <p className="mt-1 text-sm text-ink-400">
                Complete verified events to earn NSS/NCC certificates
              </p>
              <Button variant="secondary" className="mt-6">
                Browse Events
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
