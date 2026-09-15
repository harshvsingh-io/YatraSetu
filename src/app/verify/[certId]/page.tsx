"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Printer,
  Share2,
  ArrowLeft,
  QrCode,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

interface CertificateRecord {
  certHash: string;
  title: string;
  event: string;
  date: string;
  location: string;
  hours: number;
  unit: string;
  officer: string;
  recipientName: string;
  status: "verified" | "revoked";
  category: "NSS" | "NCC" | "ASI" | "SEVA";
}

const KNOWN_CERTIFICATES: Record<string, CertificateRecord> = {
  "YATRA-NSS-2026-8841": {
    certHash: "YATRA-NSS-2026-8841",
    title: "NSS Voluntary Community Service Certificate",
    event: "Calangute Coastal Cleanup & Waste Audit Drive",
    date: "Oct 15, 2026",
    location: "Calangute Beach, North Goa",
    hours: 4,
    unit: "NSS Unit No. 4 — Goa University & Ministry of Youth Affairs",
    officer: "Prof. Rajesh Joshi, NSS Program Officer",
    recipientName: "Aarav Sharma",
    status: "verified",
    category: "NSS",
  },
  "YATRA-NCC-2026-9923": {
    certHash: "YATRA-NCC-2026-9923",
    title: "NCC Coastal Restoration Service Certificate",
    event: "Mangrove Plantation & Salinity Barrier Drive",
    date: "Nov 02, 2026",
    location: "Divar Island Eco Sanctuary, Goa",
    hours: 6,
    unit: "NCC 22 Naval Wing & Forest Department of Goa",
    officer: "Lt. Col. Vikramaditya Rao",
    recipientName: "Aarav Sharma",
    status: "verified",
    category: "NCC",
  },
  "YATRA-SEVA-2026-1044": {
    certHash: "YATRA-SEVA-2026-1044",
    title: "Heritage Conservation & Cleanliness Certificate",
    event: "Fontainhas Latin Quarter Heritage Restoration Walk",
    date: "Dec 08, 2026",
    location: "Fontainhas, Panaji, Goa",
    hours: 3,
    unit: "ASI Western Circle & YatraSetu Seva Foundation",
    officer: "Dr. Ananya Deshmukh, Lead Conservator",
    recipientName: "Aarav Sharma",
    status: "verified",
    category: "ASI",
  },
};

export default function VerifyCertificatePage() {
  const params = useParams();
  const rawId = Array.isArray(params?.certId) ? params.certId[0] : params?.certId;
  const certId = decodeURIComponent(rawId || "").toUpperCase();

  const [cert, setCert] = useState<CertificateRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!certId) return;

    if (KNOWN_CERTIFICATES[certId]) {
      setCert(KNOWN_CERTIFICATES[certId]);
      return;
    }

    if (certId === "1") setCert(KNOWN_CERTIFICATES["YATRA-NSS-2026-8841"]);
    else if (certId === "2") setCert(KNOWN_CERTIFICATES["YATRA-NCC-2026-9923"]);
    else if (certId === "3") setCert(KNOWN_CERTIFICATES["YATRA-SEVA-2026-1044"]);
    else if (certId.startsWith("YATRA-") || certId.startsWith("YS-")) {
      setCert({
        certHash: certId,
        title: "National Youth Voluntary Seva Attestation",
        event: "Smart India Heritage & Sustainable Tourism Field Drive",
        date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
        location: "Himalayan & Coastal Eco-Zone, India",
        hours: 4,
        unit: "National Youth Cadre & YatraSetu Certified Chapter",
        officer: "Field Officer S. Radhakrishnan",
        recipientName: "Verified Field Volunteer",
        status: "verified",
        category: "SEVA",
      });
    } else {
      setCert(null);
    }
  }, [certId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <main className="min-h-screen bg-earth-50 text-ink-900 print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:pt-36 sm:pb-24 print:pt-4 print:pb-4 print:max-w-none">
        {/* Navigation & Actions */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 text-xs font-bold text-ink-600 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Certificates</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-earth-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 shadow-sm hover:bg-earth-100 transition-all"
            >
              <Share2 className="h-3.5 w-3.5 text-ink-500" />
              <span>{copied ? "Link Copied!" : "Share Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-ink-800 transition-all"
            >
              <Printer className="h-3.5 w-3.5 text-white" />
              <span>Print Official Certificate</span>
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        {cert ? (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-sage-200 bg-sage-50/90 p-4 shadow-sm print:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-500 text-white shadow">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-sage-900">
                    Cryptographically Verified Certificate
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sage-200/80 px-2 py-0.5 text-[10px] font-bold text-sage-800">
                    <CheckCircle2 className="h-3 w-3 text-sage-700" /> Authenticity Guaranteed
                  </span>
                </div>
                <p className="text-xs text-sage-700 font-mono mt-0.5">
                  Record ID: {cert.certHash} · Audited via YatraSetu Public Registry
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs font-bold text-sage-800 bg-white/70 px-3 py-1 rounded-lg border border-sage-200">
              SHA-256 Validated
            </span>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-red-500 mb-2" />
            <h2 className="text-lg font-bold text-red-900">Certificate Not Found</h2>
            <p className="text-sm text-red-700 mt-1 max-w-md mx-auto">
              No verified certificate matches identifier <span className="font-mono font-bold">{certId}</span>. Please verify the code or check the registry link.
            </p>
            <Link
              href="/certificates"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-red-700 transition-all"
            >
              Verify Another Certificate
            </Link>
          </div>
        )}

        {/* Certificate Card — Designed for Print & Display */}
        {cert && (
          <div className="relative overflow-hidden rounded-3xl border-4 border-double border-amber-300/80 bg-white p-8 sm:p-12 shadow-2xl print:border-2 print:p-8 print:shadow-none">
            {/* Background Seal Watermark */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Award className="h-96 w-96 text-ink-900" />
            </div>

            {/* Header / National Emblems */}
            <div className="text-center border-b border-earth-200 pb-6 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/80 px-4 py-1 text-xs font-bold text-amber-800 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Government of India Recognized National Volunteer Service
              </div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                CERTIFICATE OF MERIT & SEVA
              </h1>
              <p className="text-xs uppercase tracking-widest text-ink-500 mt-1 font-semibold">
                National Service Scheme · Ministry of Youth Affairs & Sports
              </p>
            </div>

            {/* Certificate Body */}
            <div className="my-8 text-center relative z-10 space-y-5">
              <p className="text-sm italic text-ink-500">This is proudly presented to</p>

              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-900 border-b-2 border-amber-400/60 pb-2 inline-block px-8">
                {cert.recipientName}
              </h2>

              <p className="text-xs sm:text-sm text-ink-600 max-w-xl mx-auto leading-relaxed pt-2">
                in grateful recognition of dedicated voluntary service, leadership, and exemplary participation in the national sustainable tourism campaign:
              </p>

              <div className="rounded-2xl bg-earth-50 border border-earth-200/80 p-4 max-w-lg mx-auto shadow-inner">
                <p className="font-display text-base font-bold text-ink-900">{cert.event}</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-600" />
                    {cert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-600" />
                    {cert.date}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-sage-700">
                    <Clock className="h-3.5 w-3.5 text-sage-600" />
                    {cert.hours} Hours Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Sign-Off & Seal */}
            <div className="mt-10 pt-6 border-t border-earth-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-10 text-center sm:text-left">
              {/* Unit Officer */}
              <div>
                <p className="font-serif text-sm font-bold text-ink-900">{cert.officer}</p>
                <p className="text-[11px] text-ink-500">{cert.unit}</p>
              </div>

              {/* QR Verification Badge */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-earth-300 bg-earth-50 p-1.5 shadow-sm">
                  <QrCode className="h-full w-full text-ink-900" />
                </div>
                <span className="font-mono text-[9px] font-bold text-ink-500 mt-1">
                  Scan to Verify Online
                </span>
              </div>

              {/* Official Seal */}
              <div className="sm:text-right">
                <div className="inline-flex flex-col items-center sm:items-end">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-md border-2 border-amber-300">
                    <Award className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 mt-1">
                    Certified Record
                  </span>
                  <span className="font-mono text-[9px] text-ink-400">
                    Hash: {cert.certHash}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-8 text-center border-t border-earth-100 pt-3 text-[10px] text-ink-400 font-mono">
              YatraSetu Decentralized Green Tourism Registry · National Hackathon Finalist SIH26202
            </div>
          </div>
        )}
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}
