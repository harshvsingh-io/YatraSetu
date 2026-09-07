import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OfflineTravelPass from "@/components/OfflineTravelPass";
import { WifiOff, ShieldCheck, Download, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Offline Remote Travel Pass | YatraSetu",
  description: "Tamper-proof offline boarding pass with direct emergency dialers and zero-network resilience for high Himalayan and Western Ghats travel.",
};

export default function OfflinePassPage() {
  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      <section className="pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800 mb-4">
              <WifiOff className="h-3.5 w-3.5 text-amber-600" />
              <span>Real-World Himalayan Problem Solved</span>
            </div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              Offline Remote Travel Pass
            </h1>

            <p className="mt-4 text-base text-ink-600 sm:text-lg">
              No 4G/5G mobile tower in Spiti, Ladakh, or deep forest trails? Your verifiable stay credentials, direct satellite emergency numbers, and host contacts remain 100% accessible right in your pocket.
            </p>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-ink-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-sage-600" /> Tamper-Proof Cryptographic Token
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4 text-amber-600" /> Auto-Cached in Device Storage
              </span>
            </div>
          </div>

          {/* Offline Pass Viewer */}
          <OfflineTravelPass />

          {/* Quick FAQ / Guidance strip */}
          <div className="mx-auto max-w-4xl mt-12 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-earth-200 bg-white p-5 shadow-xs">
              <p className="font-display text-sm font-bold text-ink-900">How does it work offline?</p>
              <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                When you load or book a trip, your verified token and host details are cached securely in browser localStorage and ready to display in Airplane Mode.
              </p>
            </div>
            <div className="rounded-2xl border border-earth-200 bg-white p-5 shadow-xs">
              <p className="font-display text-sm font-bold text-ink-900">Do forest checkpoints accept it?</p>
              <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                Yes. The cryptographic token code matches the offline pre-registration hash verified with local forest departments and NSS unit coordinators.
              </p>
            </div>
            <div className="rounded-2xl border border-earth-200 bg-white p-5 shadow-xs">
              <p className="font-display text-sm font-bold text-ink-900">Emergency 112 & Satellite Dialing</p>
              <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                Emergency telephone buttons trigger hardware GSM/Satellite dialers even with mobile data completely disabled.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
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
