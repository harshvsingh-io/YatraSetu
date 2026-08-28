"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  Shield,
  Upload,
  CheckCircle2,
  Clock,
  FileText,
  Building2,
  GraduationCap,
  Landmark,
  AlertCircle,
} from "lucide-react";

const affiliations = [
  { id: "ngo", label: "NGO / Non-Profit", icon: Building2 },
  { id: "municipal", label: "Municipal Body", icon: Landmark },
  { id: "college", label: "College NSS/NCC Cell", icon: GraduationCap },
  { id: "tourism", label: "Tourism Dept. Nodal Officer", icon: Landmark },
];

export default function CommunityApplyPage() {
  const [affiliation, setAffiliation] = useState("");
  const [orgName, setOrgName] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!affiliation || !orgName) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

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
              Community Lead Application
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Apply to create and manage verified restoration events
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <SectionReveal>
              <div className="rounded-2xl border border-ink-100 bg-white p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                  <Clock className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink-800">
                  Application Submitted
                </h3>
                <p className="mt-2 text-ink-500">
                  Your application is being reviewed. You&apos;ll receive an update
                  within 48 hours. Your status will show as{" "}
                  <span className="font-semibold text-amber-600">
                    Pending Approval
                  </span>{" "}
                  until verified.
                </p>
                <div className="mt-6 rounded-xl bg-amber-50 p-4 text-left">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                    <div className="text-sm text-amber-700">
                      <p className="font-semibold">While you wait</p>
                      <p className="mt-0.5 text-amber-600">
                        You can still participate in existing verified events as a
                        volunteer. Only create events once your lead status is
                        approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ) : (
            <>
              {/* Benefits */}
              <SectionReveal>
                <div className="rounded-2xl border border-ink-100 bg-white p-6">
                  <h3 className="font-display text-lg font-bold text-ink-800">
                    What Community Leads Can Do
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      { title: "Create Events", desc: "Set up verified cleanup and plantation drives" },
                      { title: "Manage Volunteers", desc: "Review RSVPs, scan QR check-ins, track attendance" },
                      { title: "Verified Badge", desc: "Your events show a trusted Verified ✅ badge" },
                      { title: "Impact Dashboard", desc: "Track your site's restoration metrics in real-time" },
                    ].map((b) => (
                      <div
                        key={b.title}
                        className="flex items-start gap-3 rounded-xl bg-earth-50 p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
                        <div>
                          <p className="text-sm font-semibold text-ink-700">{b.title}</p>
                          <p className="text-xs text-ink-500">{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              {/* Application form */}
              <SectionReveal delay={0.1}>
                <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6">
                  <h3 className="font-display text-lg font-bold text-ink-800">
                    Application Form
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Community Lead status requires verified affiliation — not
                    self-granted
                  </p>

                  <div className="mt-6 space-y-4">
                    {/* Affiliation type */}
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Affiliation Type *
                      </label>
                      <div className="mt-1.5 grid grid-cols-2 gap-2">
                        {affiliations.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => setAffiliation(a.id)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all",
                              affiliation === a.id
                                ? "border-terra-400 bg-terra-50"
                                : "border-ink-200 hover:border-ink-300"
                            )}
                          >
                            <a.icon className={cn(
                              "h-5 w-5 shrink-0",
                              affiliation === a.id ? "text-terra-500" : "text-ink-400"
                            )} />
                            <span className={cn(
                              "text-sm font-medium",
                              affiliation === a.id ? "text-terra-700" : "text-ink-600"
                            )}>
                              {a.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Organization name */}
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Organization / Body Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Goa Coastal Restoration Network"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-xl border-2 border-ink-200 bg-white px-4 text-sm font-medium text-ink-800 placeholder:text-ink-300 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none"
                      />
                    </div>

                    {/* Upload proof */}
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Affiliation Proof (optional)
                      </label>
                      <p className="mt-0.5 text-xs text-ink-400">
                        Upload an ID card, authorization letter, or official document
                      </p>
                      <div className="mt-2 rounded-xl border-2 border-dashed border-ink-200 p-6 text-center transition-colors hover:border-terra-300 hover:bg-terra-50/30 cursor-pointer">
                        <Upload className="mx-auto h-8 w-8 text-ink-300" />
                        <p className="mt-2 text-sm text-ink-500">
                          Click to upload document
                        </p>
                        <p className="mt-1 text-xs text-ink-400">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="secondary"
                      loading={submitting}
                      disabled={!affiliation || !orgName}
                      onClick={handleSubmit}
                    >
                      Submit Application
                    </Button>
                  </div>
                </div>
              </SectionReveal>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
