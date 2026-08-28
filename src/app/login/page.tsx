"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Mountain, Phone, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

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
    <div className="flex gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={(el) => { inputs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1}
          value={value[i] || ""}
          onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); const nv = value.split(""); nv[i] = val; onChange(nv.join("").slice(0, length)); if (val && i < length - 1) focusInput(i + 1); }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          autoFocus={i === 0}
          className={cn("h-14 w-11 sm:h-16 sm:w-13 rounded-xl border-2 bg-white text-center font-display text-xl font-bold text-ink-800 transition-all duration-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 focus:outline-none", value[i] ? "border-earth-300" : "border-earth-200")}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("enter");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((prev) => { if (prev <= 1) { clearInterval(interval); return 0; } return prev - 1; }), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Google OAuth — real Supabase flow
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Phone OTP — send code
  const handleSendOTP = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      phone: `+91${phone}`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      setPhoneStep("otp");
      setResendTimer(30);
    }
  };

  // Phone OTP — verify code
  const handleVerifyOTP = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token: otp,
      type: "sms",
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/profile");
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Left decorative panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-ink-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0">
          <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-sage-500/8 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #FAF8F5 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500">
              <Mountain className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl text-white">YatraSetu</span>
          </Link>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight text-white">
            Your journey starts with <span className="text-amber-400">purpose.</span>
          </h2>
          <p className="mt-6 text-ink-400 leading-relaxed">
            Join 18,000+ travelers and volunteers who are making every trip count.
          </p>
          <div className="mt-10 flex gap-8">
            {[{ val: "340+", label: "Sites" }, { val: "28", label: "States" }, { val: "2.4L", label: "kg collected" }].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-white">{s.val}</p>
                <p className="text-xs text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500">
                <Mountain className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl text-ink-900">YatraSetu</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-ink-900">Welcome back</h1>
            <p className="mt-2 text-ink-500">Sign in to continue your journey</p>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-4 rounded-xl border border-terra-200 bg-terra-50 p-3 text-sm text-terra-700">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google OAuth */}
          <button onClick={handleGoogleSignIn} disabled={loading}
            className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl border-2 border-earth-300 bg-white font-semibold text-ink-700 transition-all duration-200 hover:border-earth-400 hover:bg-earth-50 hover:shadow-md active:scale-[0.98] disabled:opacity-50">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon className="h-5 w-5" />}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-earth-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-earth-50 px-4 text-ink-400">or</span></div>
          </div>

          {/* Phone OTP */}
          <AnimatePresence mode="wait">
            {phoneStep === "enter" ? (
              <motion.div key="enter" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex h-13 w-20 items-center justify-center rounded-xl border-2 border-earth-200 bg-earth-100 text-sm font-semibold text-ink-700">+91 🇮🇳</div>
                  <input type="tel" inputMode="numeric" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} maxLength={10}
                    className="flex-1 rounded-xl border-2 border-earth-200 bg-white px-4 text-lg font-medium text-ink-800 placeholder:text-ink-300 transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-100 focus:outline-none" />
                </div>
                <Button onClick={handleSendOTP} loading={loading} disabled={phone.length < 10} variant="secondary" className="w-full" size="lg">
                  Send OTP <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <button onClick={() => { setPhoneStep("enter"); setOtp(""); setError(""); }} className="flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-800 transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <div>
                  <p className="text-sm text-ink-500">Enter the 6-digit code sent to</p>
                  <p className="font-semibold text-ink-800">+91 {phone}</p>
                </div>
                <OTPInput value={otp} onChange={setOtp} />
                <Button onClick={handleVerifyOTP} loading={loading} disabled={otp.length < 6} variant="secondary" className="w-full" size="lg">
                  Verify & Sign In <CheckCircle2 className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-ink-400">Resend OTP in <span className="font-semibold text-ink-600">{resendTimer}s</span></p>
                  ) : (
                    <button onClick={handleSendOTP} className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">Resend OTP</button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-10 text-center text-xs text-ink-400">
            By continuing, you agree to our <a href="#" className="underline hover:text-ink-600">Terms</a> and <a href="#" className="underline hover:text-ink-600">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
