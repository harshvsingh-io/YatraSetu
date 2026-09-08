"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import SignInBanner from "@/components/SignInBanner";
import { useAuth } from "@/lib/auth-context";

const SevaMedallion3D = dynamic(() => import("@/components/3d/SevaMedallion3D"), {
  ssr: false,
  loading: () => (
    <div className="h-16 w-16 animate-pulse rounded-full bg-amber-500/10 flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
    </div>
  ),
});
import { useToast } from "@/components/Toast";
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
  ShieldCheck,
  Search,
  Printer,
  X,
  Sparkles,
  QrCode,
} from "lucide-react";

interface Certificate {
  id: string;
  certHash: string;
  title: string;
  event: string;
  date: string;
  location: string;
  hours: number;
  verified: boolean;
  unit: string;
  officer: string;
  status: "ready" | "processing";
  recipientName: string;
}

const baseCertificates: Certificate[] = [
  {
    id: "1",
    certHash: "YATRA-NSS-2026-8841",
    title: "NSS Voluntary Community Service Certificate",
    event: "Calangute Coastal Cleanup & Waste Audit Drive",
    date: "Oct 15, 2026",
    location: "Calangute Beach, North Goa",
    hours: 4,
    verified: true,
    unit: "NSS Unit No. 4 — Goa University & Ministry of Youth Affairs",
    officer: "Prof. Rajesh Joshi, NSS Program Officer",
    status: "ready",
    recipientName: "Aarav Sharma",
  },
  {
    id: "2",
    certHash: "YATRA-NCC-2026-9923",
    title: "NCC Coastal Restoration Service Certificate",
    event: "Mangrove Plantation & Salinity Barrier Drive",
    date: "Nov 02, 2026",
    location: "Divar Island Eco Sanctuary, Goa",
    hours: 6,
    verified: true,
    unit: "NCC 22 Naval Wing & Forest Department of Goa",
    officer: "Lt. Col. Vikramaditya Rao",
    status: "ready",
    recipientName: "Aarav Sharma",
  },
  {
    id: "3",
    certHash: "YATRA-SEVA-2026-1044",
    title: "Heritage Conservation & Cleanliness Certificate",
    event: "Fontainhas Latin Quarter Heritage Restoration Walk",
    date: "Dec 08, 2026",
    location: "Fontainhas, Panaji, Goa",
    hours: 3,
    verified: true,
    unit: "ASI Western Circle & YatraSetu Seva Foundation",
    officer: "Dr. Ananya Deshmukh, Lead Conservator",
    status: "processing",
    recipientName: "Aarav Sharma",
  },
];

export default function CertificatesPage() {
  const { user, isLoggedIn } = useAuth();
  const { toast } = useToast();

  const [searchHash, setSearchHash] = useState("");
  const [verifiedResult, setVerifiedResult] = useState<Certificate | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const hash = params.get("hash");
      if (hash) {
        setSearchHash(hash);
        handleVerify(hash);
      }
    }
  }, []);

  const certificates = baseCertificates.map((c) => ({
    ...c,
    recipientName: isLoggedIn && user ? user.name : c.recipientName,
  }));

  const handleVerify = (hashToTest?: string) => {
    const query = (hashToTest || searchHash).trim().toUpperCase();
    if (!query) return;

    setVerifying(true);
    setVerifiedResult(null);

    setTimeout(() => {
      const match = certificates.find((c) => c.certHash.toUpperCase() === query);
      if (match) {
        setVerifiedResult(match);
        toast({
          title: "Certificate Verified!",
          message: `Valid record found: ${match.title}`,
        });
      } else {
        toast({
          title: "Invalid Certificate ID",
          message: "No matching record on YatraSetu verification registry.",
          variant: "destructive",
        });
      }
      setVerifying(false);
    }, 600);
  };

  const handlePrint = (cert: Certificate) => {
    setPreviewCert(cert);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleCopyLink = (hash: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://yatra-setu-black.vercel.app";
    const url = `${origin}/certificates?hash=${encodeURIComponent(hash)}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      message: "Verifiable credential link copied to clipboard.",
    });
  };

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-6 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage-300 bg-sage-50 px-3 py-1 text-xs font-bold text-sage-800 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-sage-600" />
              <span>SIH PS-Id SIH26202 Verifiable Credentials</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Verifiable Seva Certificates
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Official NSS, NCC, and ASI recognized credentials earned through geotagged restoration drives
            </p>
          </motion.div>

          <div className="mt-4">
            {isLoggedIn && user ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sage-200 bg-sage-50/80 px-4 py-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-white font-bold text-sm shadow-xs">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-sage-900">
                      Active Credentials for {user.name}
                    </p>
                    <p className="text-[11px] text-sage-700">
                      {user.role === "student-nss" ? "NSS Volunteer Registry" : "Verified Traveler"} · {user.stats.volunteerHours} Service Hours Logged · {user.stats.karmaPoints} Karma Points
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sage-200/80 px-2.5 py-1 text-[11px] font-bold text-sage-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Verified Citizen Registry
                  </span>
                </div>
              </div>
            ) : (
              <SignInBanner message="Sign in with your student profile to view and download your verified service credentials." />
            )}
          </div>

          {/* Interactive Hash Verification Tool for Judges */}
          <div className="mt-8 rounded-3xl border border-earth-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-base font-bold text-ink-900">
                  Online Certificate Registry & Verification
                </h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  Institutions & hackathon judges can authenticate certificate credentials instantly via cryptographic ID.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSearchHash("YATRA-NSS-2026-8841");
                    handleVerify("YATRA-NSS-2026-8841");
                  }}
                  className="rounded-xl border border-earth-200 bg-earth-50 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-earth-100 transition-colors"
                >
                  Demo Hash #1
                </button>
                <button
                  onClick={() => {
                    setSearchHash("YATRA-NCC-2026-9923");
                    handleVerify("YATRA-NCC-2026-9923");
                  }}
                  className="rounded-xl border border-earth-200 bg-earth-50 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-earth-100 transition-colors"
                >
                  Demo Hash #2
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  type="text"
                  value={searchHash}
                  onChange={(e) => setSearchHash(e.target.value)}
                  placeholder="Enter Certificate ID (e.g. YATRA-NSS-2026-8841)"
                  className="w-full rounded-2xl border border-earth-200 bg-earth-50/50 py-2.5 pl-10 pr-4 text-xs font-mono font-medium text-ink-900 placeholder:text-ink-400 focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>
              <button
                onClick={() => handleVerify()}
                disabled={verifying}
                className="rounded-2xl bg-ink-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-amber-600 transition-colors shrink-0 disabled:opacity-50"
              >
                {verifying ? "Checking Registry..." : "Verify Credential"}
              </button>
            </div>

            {/* Verification Result Card */}
            {verifiedResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-sage-300 bg-sage-50/60 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sage-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-sage-900">
                        Official Record Authenticated • 100% Genuine
                      </p>
                      <p className="text-[11px] text-sage-700">
                        Issued to: <span className="font-bold">{verifiedResult.recipientName}</span> ({verifiedResult.hours} voluntary service hours logged)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewCert(verifiedResult)}
                    className="rounded-xl bg-sage-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-sage-800 transition-colors"
                  >
                    View Certificate
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => (
              <SectionReveal key={cert.id} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-3xl border border-earth-200 bg-white transition-all hover:shadow-lg hover:border-amber-300">
                  {/* Certificate Preview Header */}
                  <div className="relative border-b border-earth-100 bg-gradient-to-br from-amber-500/5 via-earth-50 to-orange-500/5 p-6 text-center">
                    <div className="rounded-2xl border border-earth-200/80 bg-white p-5 shadow-xs">
                      <Award className="mx-auto h-8 w-8 text-amber-600" />
                      <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-amber-800">
                        Certificate of Voluntary Service
                      </p>
                      <div className="mx-auto my-2 h-0.5 w-12 bg-gradient-to-r from-amber-400 to-terra-500 rounded-full" />
                      <p className="font-display text-sm font-bold text-ink-900">
                        {cert.title}
                      </p>
                      <p className="mt-1 text-[10px] text-ink-500">
                        Conferred upon <span className="font-bold text-ink-800">{cert.recipientName}</span>
                      </p>
                      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono text-ink-400">
                        <span>ID: {cert.certHash}</span>
                      </div>
                    </div>

                    {cert.status === "processing" ? (
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                        <Clock className="h-3 w-3" />
                        Verification in Progress
                      </div>
                    ) : (
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-sage-100 px-2.5 py-0.5 text-[10px] font-bold text-sage-800">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-6">
                    <h3 className="font-display text-base font-bold text-ink-900">
                      {cert.event}
                    </h3>
                    <div className="mt-3 space-y-1.5 text-xs text-ink-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-ink-400" />
                        <span>{cert.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-ink-400" />
                        <span>{cert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-ink-400" />
                        <span className="font-bold text-ink-900">{cert.hours} Hours Logged</span>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-ink-500 border-t border-earth-100 pt-3">
                      Authority: <span className="font-semibold text-ink-700">{cert.unit}</span>
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-earth-100 pt-4 gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewCert(cert)}
                          className="rounded-xl border border-earth-200 bg-earth-50 px-3 py-1.5 text-xs font-bold text-ink-800 hover:bg-earth-100 hover:border-earth-300 transition-colors"
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyLink(cert.certHash)}
                          className="rounded-xl border border-earth-200 bg-earth-50 px-2.5 py-1.5 text-xs font-semibold text-ink-600 hover:bg-earth-100 hover:text-ink-900 transition-colors"
                          title="Copy Verifiable Credential Link"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {cert.status === "ready" ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handlePrint(cert)}
                          className="rounded-xl"
                        >
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download PDF
                        </Button>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                          Auditing record...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Official Certificate Full Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl border-8 border-earth-100 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewCert(null)}
                className="absolute right-4 top-4 rounded-xl p-2 text-ink-400 hover:bg-earth-100 hover:text-ink-600"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Certificate Canvas */}
              <div className="border-4 border-double border-amber-400 p-8 rounded-2xl bg-gradient-to-b from-[#fffdfa] to-white text-center">
                <div className="flex items-center justify-between border-b-2 border-earth-200 pb-4 mb-6">
                  <div className="text-left">
                    <p className="text-[11px] font-black uppercase tracking-widest text-amber-800">
                      Smart India Hackathon 2026
                    </p>
                    <p className="text-[9px] text-ink-500">Ministry of Tourism & NSS Initiative</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-terra-500 text-white font-bold">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono font-bold text-ink-700">
                      ID: {previewCert.certHash}
                    </p>
                    <p className="text-[9px] text-sage-700 font-bold">VERIFIED AUTHENTIC</p>
                  </div>
                </div>

                <p className="font-serif text-xs font-bold uppercase tracking-widest text-ink-500">
                  Certificate of Voluntary Seva
                </p>

                <h2 className="font-serif text-2xl font-bold text-ink-900 mt-2">
                  This is proudly presented to
                </h2>

                <p className="font-display text-3xl font-extrabold text-amber-900 underline decoration-amber-300 decoration-2 underline-offset-8 mt-4">
                  {previewCert.recipientName}
                </p>

                <p className="text-sm text-ink-600 max-w-xl mx-auto mt-6 leading-relaxed">
                  for dedicated and exemplary community service in the{" "}
                  <span className="font-bold text-ink-900">"{previewCert.event}"</span> conducted at{" "}
                  <span className="font-semibold text-ink-800">{previewCert.location}</span> on{" "}
                  <span className="font-semibold text-ink-800">{previewCert.date}</span>, completing{" "}
                  <span className="font-bold text-amber-800">{previewCert.hours} verified hours</span> of ecological restoration.
                </p>

                {/* Signatures & Seal */}
                <div className="mt-10 pt-6 border-t border-earth-200 grid grid-cols-3 items-end gap-4">
                  <div className="text-left">
                    <p className="font-serif italic text-sm text-ink-800 font-bold">
                      {previewCert.officer}
                    </p>
                    <p className="text-[10px] text-ink-500 mt-0.5">Program Officer & Authorized Signatory</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="h-20 w-20 flex items-center justify-center">
                      <SevaMedallion3D karma={previewCert.hours * 100} className="h-full w-full" />
                    </div>
                    <p className="text-[9px] font-black uppercase text-amber-900 tracking-tighter mt-1">
                      ★ 3D Seva Credential Seal ★
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="inline-block p-1.5 rounded-lg border border-earth-200 bg-white">
                      <QrCode className="h-10 w-10 text-ink-800" />
                    </div>
                    <p className="text-[9px] text-ink-400 font-mono mt-1">Scan to Verify Record</p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyLink(previewCert.certHash)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-earth-200 bg-earth-50 px-3.5 py-2 text-xs font-semibold text-ink-700 hover:bg-earth-100 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Copy Registry Link
                </button>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={() => setPreviewCert(null)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handlePrint(previewCert)}>
                    <Printer className="h-4 w-4 mr-1.5" />
                    Print / Save PDF
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
