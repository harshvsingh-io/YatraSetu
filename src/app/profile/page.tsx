"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Globe,
  LogOut,
  ChevronRight,
  Camera,
  MapPin,
  Award,
  Calendar,
  Shield,
  Settings,
  Moon,
  Sun,
  Clock,
} from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Arjun Krishnamurthy");
  const [email, setEmail] = useState("arjun.k@email.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [role, setRole] = useState<"tourist" | "student-nss" | "community-lead">("student-nss");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  const stats = [
    { label: "Events Attended", value: "8", icon: Calendar },
    { label: "Volunteer Hours", value: "32", icon: Clock },
    { label: "Certificates", value: "3", icon: Award },
    { label: "Restoration Sites", value: "5", icon: MapPin },
  ];

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
              My Profile
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Profile header card */}
          <SectionReveal>
            <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white">
              {/* Banner */}
              <div className="h-24 bg-gradient-to-r from-ink-800 via-ink-700 to-ink-600">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-terra-500/10 blur-3xl" />
              </div>

              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="-mt-12 flex items-end justify-between">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-terra-400 to-terra-500 text-3xl font-bold text-white shadow-lg">
                      AK
                    </div>
                    <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-ink-800 text-white transition-colors hover:bg-ink-700">
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-lg bg-sage-50 px-3 py-1 text-xs font-semibold text-sage-700">
                    <Shield className="h-3.5 w-3.5" />
                    Student NSS
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="font-display text-2xl font-bold text-ink-900">
                    {name}
                  </h2>
                  <p className="text-sm text-ink-500">
                    NSS Volunteer · Goa University · Member since Aug 2024
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-earth-50 p-3 text-center"
                    >
                      <stat.icon className="mx-auto h-4 w-4 text-ink-400" />
                      <p className="mt-1 font-display text-lg font-bold text-ink-800">
                        {stat.value}
                      </p>
                      <p className="text-[11px] text-ink-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Edit form */}
          <SectionReveal delay={0.1}>
            <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink-800">
                Personal Information
              </h3>

              <div className="mt-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-ink-700">Full Name</label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 w-full rounded-xl border-2 border-ink-200 bg-white pl-10 pr-4 text-sm font-medium text-ink-800 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-ink-700">Email</label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 w-full rounded-xl border-2 border-ink-200 bg-white pl-10 pr-4 text-sm font-medium text-ink-800 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-ink-700">Phone</label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11 w-full rounded-xl border-2 border-ink-200 bg-white pl-10 pr-4 text-sm font-medium text-ink-800 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-medium text-ink-700">Role</label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {[
                      { id: "tourist" as const, label: "Tourist" },
                      { id: "student-nss" as const, label: "NSS/NCC" },
                      { id: "community-lead" as const, label: "Community Lead" },
                    ].map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={cn(
                          "rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-all",
                          role === r.id
                            ? "border-terra-400 bg-terra-50 text-terra-700"
                            : "border-ink-200 text-ink-600 hover:border-ink-300"
                        )}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="secondary"
                  loading={saving}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </SectionReveal>

          {/* Settings */}
          <SectionReveal delay={0.2}>
            <div className="mt-6 rounded-2xl border border-ink-100 bg-white divide-y divide-ink-100">
              {/* Language */}
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-ink-400" />
                  <div>
                    <p className="text-sm font-medium text-ink-800">Language</p>
                    <p className="text-xs text-ink-500">Choose your preferred language</p>
                  </div>
                </div>
                <div className="flex gap-1 rounded-lg border border-ink-200 p-0.5">
                  {[
                    { id: "en" as const, label: "EN" },
                    { id: "hi" as const, label: "हि" },
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setLanguage(lang.id)}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                        language === lang.id
                          ? "bg-ink-800 text-white"
                          : "text-ink-600 hover:bg-ink-50"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              {[
                { label: "Notifications", icon: Settings, href: "#" },
                { label: "Certificates", icon: Award, href: "/certificates" },
                { label: "Rewards Wallet", icon: Globe, href: "/rewards" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between p-5 transition-colors hover:bg-ink-50"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-5 w-5 text-ink-400" />
                    <span className="text-sm font-medium text-ink-800">
                      {link.label}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-400" />
                </a>
              ))}

              {/* Logout */}
              <button className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-terra-50">
                <LogOut className="h-5 w-5 text-terra-500" />
                <span className="text-sm font-medium text-terra-600">
                  Sign Out
                </span>
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
