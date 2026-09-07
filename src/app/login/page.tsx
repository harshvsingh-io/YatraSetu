"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";
import { cn } from "@/lib/utils";
import {
  Mountain,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Compass,
} from "lucide-react";

type PhoneStep = "enter" | "otp";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function OTPInput({ length = 6, value, onChange }: { length?: number; value: string; onChange: (val: string) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const focusInput = (index: number) => inputs.current[index]?.focus();

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) focusInput(index - 1);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    focusInput(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            const nv = value.split("");
            nv[i] = val;
            onChange(nv.join("").slice(0, length));
            if (val && i < length - 1) focusInput(i + 1);
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          autoFocus={i === 0}
          className={cn(
            "h-13 w-10 sm:h-14 sm:w-12 rounded-xl border-2 bg-white text-center font-display text-xl font-bold text-ink-900 transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-100 focus:outline-none shadow-sm",
            value[i] ? "border-amber-500 bg-amber-50/20" : "border-earth-300"
          )}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoggedIn, signInWithPhone, signInWithGoogle, signInDemo, signOut } = useAuth();
  const { toast } = useToast();

  const [phoneStep, setPhoneStep] = useState<PhoneStep>("enter");
  const [phone, setPhone] = useState("9876543210");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState("");

  const redirectAfterAuth = (message: string) => {
    toast({ title: "Welcome to YatraSetu!", message });
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const target = params?.get("returnTo") || "/profile";
    
    // Guaranteed instant browser redirect to profile or returnTo destination
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = target;
      } else {
        router.push(target);
      }
    }, 250);
  };

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const res = await signInWithGoogle();
    setLoading(false);
    if (res.success) {
      redirectAfterAuth("Successfully signed in via Google account. Redirecting...");
    } else {
      setError(res.error || "Failed to sign in with Google.");
    }
  };

  const handleSendOTP = async () => {
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setPhoneStep("otp");
      setOtp("123456"); // Pre-fill mock OTP for effortless judge demo
      setResendTimer(30);
      toast({ title: "OTP Sent!", message: "Demo OTP 123456 sent to +91 " + phone });
    }, 400);
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await signInWithPhone(phone, otp, "student-nss");
    setLoading(false);
    if (res.success) {
      redirectAfterAuth("Welcome to YatraSetu. Verified session active.");
    } else {
      setError(res.error || "Invalid OTP code.");
    }
  };

  const handleQuickDemo = (role: "volunteer" | "traveler") => {
    signInDemo(role);
    redirectAfterAuth(`Demo profile active as ${role === "volunteer" ? "Arjun (NSS Volunteer)" : "Rohan (Traveler)"}. Loading dashboard...`);
  };

  return (
    <div className="relative flex min-h-screen bg-earth-50">
      {/* Left decorative branding panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-ink-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0">
          <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-sage-500/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #FAF8F5 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500 shadow-glow-amber">
              <Mountain className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-white">YatraSetu</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">यात्रा बने सेवा</span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Smart India Hackathon 2026 · PS SIH26202
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-white">
            Travel without crowds. <br />
            Restore with <span className="text-amber-400">purpose.</span>
          </h2>
          <p className="mt-5 text-ink-400 leading-relaxed text-sm">
            Join 18,000+ travelers, students, and community leads who are routing away from tourist congestion and reviving India's natural ecosystems.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink-800 pt-8">
            <div>
              <p className="font-display text-2xl font-bold text-white">340+</p>
              <p className="text-xs text-ink-500">Restoration Sites</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">28</p>
              <p className="text-xs text-ink-500">States Covered</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">2.4L kg</p>
              <p className="text-xs text-ink-500">Waste Restored</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-ink-600">
          © 2026 YatraSetu. Verified Seva Architecture.
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500 shadow-glow-amber">
                <Mountain className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold text-ink-900">YatraSetu</span>
            </Link>
          </div>

          {/* If already signed in, provide quick direct dashboard navigation or switch account */}
          {isLoggedIn && user && (
            <div className="mb-6 rounded-2xl border border-sage-300 bg-sage-50/90 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-600 text-white font-bold text-sm shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[11px] font-bold text-sage-700 uppercase tracking-wider">Active Session</p>
                  </div>
                  <p className="text-sm font-bold text-ink-900 truncate">{user.name}</p>
                  <p className="text-xs text-ink-500 truncate">
                    {user.role === "student-nss" ? "NSS Volunteer" : "Traveler"} · {user.stats.karmaPoints} Green Karma
                  </p>
                </div>
              </div>
              <div className="mt-3.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    const target = params.get("returnTo") || "/profile";
                    window.location.href = target;
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-sage-700 py-2.5 px-3 text-xs font-bold text-white hover:bg-sage-800 active:scale-95 transition-all shadow-xs"
                >
                  <span>Go to My Profile</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    toast({ title: "Signed Out", message: "You have signed out. You can now log in with a new account." });
                  }}
                  className="rounded-xl border border-earth-200 bg-white px-3 py-2 text-xs font-semibold text-ink-600 hover:bg-earth-100 transition-colors"
                >
                  Switch Account
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Judge Login Bar */}
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Judge / Demo 1-Click Access</span>
            </div>
            <p className="text-xs text-amber-800/80 mb-3">
              Instant login for testing all features without waiting for an SMS:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("volunteer")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-3 py-2 text-xs font-bold text-white hover:bg-amber-700 active:scale-95 transition-all shadow-sm"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                NSS Volunteer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("traveler")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-ink-900 px-3 py-2 text-xs font-bold text-white hover:bg-ink-800 active:scale-95 transition-all shadow-sm"
              >
                <Compass className="h-3.5 w-3.5" />
                Traveler Profile
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold text-ink-900">
              {phoneStep === "enter" ? "Sign In / Register" : "Verify Phone"}
            </h1>
            <p className="mt-1.5 text-sm text-ink-500">
              {phoneStep === "enter"
                ? "Enter your phone or Google account to continue"
                : `Enter the 6-digit code sent to +91 ${phone}`}
            </p>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {phoneStep === "enter" ? (
            <div className="space-y-4">
              {/* Google OAuth button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-earth-300 bg-white py-3 px-4 text-sm font-bold text-ink-800 shadow-sm transition-all hover:bg-earth-100 hover:border-earth-400 active:scale-[0.99]"
              >
                <GoogleIcon className="h-5 w-5" />
                <span>Continue with Google</span>
              </button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-earth-200"></div>
                </div>
                <span className="relative bg-earth-50 px-4 text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Or phone OTP
                </span>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center gap-1 text-sm font-bold text-ink-600 border-r border-earth-300 pr-2.5">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98765 43210"
                    className="w-full rounded-2xl border border-earth-300 bg-white py-3.5 pl-24 pr-4 text-sm font-semibold text-ink-900 placeholder:text-ink-300 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 shadow-sm"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading || phone.length < 10}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-terra-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <OTPInput length={6} value={otp} onChange={setOtp} />
                <p className="mt-3 text-center text-xs text-ink-500">
                  Demo code auto-filled: <span className="font-bold text-amber-700">123456</span>
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length < 6}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-900 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-ink-800 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-sage-400" />
                      <span>Verify & Enter YatraSetu</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPhoneStep("enter")}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold text-ink-600 hover:text-ink-900"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Change Phone Number
                </button>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-ink-400">
            By signing in, you agree to our Terms of Service and Privacy Policy. Built for India.
          </p>
        </div>
      </div>
    </div>
  );
}
