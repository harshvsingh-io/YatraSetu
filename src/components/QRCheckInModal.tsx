"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Camera,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  X,
  ArrowRight,
  Award,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";

interface QRCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: number | string;
    title: string;
    location: string;
    organizer?: string;
  };
}

type CheckInStep = "qr" | "selfie" | "success";

export default function QRCheckInModal({ isOpen, onClose, event }: QRCheckInModalProps) {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<CheckInStep>("qr");
  const [timer, setTimer] = useState(15);
  const [qrHash, setQrHash] = useState("YS-TOTP-882194");
  const [geoStatus, setGeoStatus] = useState<"checking" | "verified">("checking");
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Rotating TOTP QR timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setQrHash(`YS-TOTP-${Math.floor(100000 + Math.random() * 900000)}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Geotag simulation
  useEffect(() => {
    if (step === "selfie") {
      setGeoStatus("checking");
      const t = setTimeout(() => {
        setGeoStatus("verified");
      }, 800);
      return () => clearTimeout(t);
    }
  }, [step]);

  const handleCapture = () => {
    setCapturedPhoto(true);
  };

  const handleCompleteCheckIn = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (user) {
        updateProfile({
          stats: {
            ...user.stats,
            eventsAttended: user.stats.eventsAttended + 1,
            volunteerHours: user.stats.volunteerHours + 4,
            stampsEarned: user.stats.stampsEarned + 1,
            karmaPoints: user.stats.karmaPoints + 200,
          },
        });
      }
      toast({
        title: "Seva Attendance Verified!",
        message: "+200 Green Karma & official stamp added to your passport.",
      });
      setStep("success");
    }, 1200);
  };

  const handleClose = () => {
    setStep("qr");
    setCapturedPhoto(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-earth-200"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-ink-400 hover:bg-earth-100 hover:text-ink-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Step 1: Rotating TOTP QR */}
        {step === "qr" && (
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              Dynamic Rotating TOTP QR
            </div>
            <h3 className="font-display text-xl font-bold text-ink-900">
              Event Attendance Check-In
            </h3>
            <p className="text-xs text-ink-500 mt-1 max-w-xs mx-auto">
              {event.title} · {event.location}
            </p>

            {/* Visual Dynamic QR Graphic */}
            <div className="relative mx-auto mt-6 flex h-52 w-52 items-center justify-center rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-4">
              <div className="flex flex-col items-center justify-center">
                <QrCode className="h-32 w-32 text-ink-900 animate-pulse" />
                <span className="font-mono text-[11px] font-bold text-ink-600 mt-2 bg-white px-2 py-0.5 rounded-md border border-earth-200">
                  {qrHash}
                </span>
              </div>

              {/* Countdown overlay */}
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-0.5 text-[10px] font-bold text-white">
                <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                <span>{timer}s</span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-ink-500">
              Lead QR refreshes every 15s to block forwarded screenshot fraud.
            </p>

            <button
              onClick={() => setStep("selfie")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-900 py-3.5 text-xs font-bold text-white shadow-lg hover:bg-ink-800 active:scale-95 transition-all"
            >
              <span>Scan QR & Proceed to Selfie Check</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Step 2: Geotag & Selfie Validation */}
        {step === "selfie" && (
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sage-200 bg-sage-50 px-3.5 py-1 text-xs font-bold text-sage-800 mb-3">
              <MapPin className="h-3.5 w-3.5 text-sage-600" />
              GPS Geofence: 200m Radius
            </div>
            <h3 className="font-display text-xl font-bold text-ink-900">
              Geo-Tagged Selfie Verification
            </h3>
            <p className="text-xs text-ink-500 mt-1">
              Verify your presence at {event.location}
            </p>

            {/* GPS Radius Check Status */}
            <div className="mt-4 rounded-2xl bg-earth-50 p-3 border border-earth-200 flex items-center justify-between text-xs">
              <span className="text-ink-600 font-medium">GPS Coordinates Check:</span>
              {geoStatus === "verified" ? (
                <span className="flex items-center gap-1 font-bold text-sage-700">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Inside Perimeter (42m away)
                </span>
              ) : (
                <span className="text-amber-700 font-semibold animate-pulse">
                  Acquiring GPS fix...
                </span>
              )}
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative mx-auto mt-4 flex h-52 w-full items-center justify-center rounded-2xl bg-ink-950 overflow-hidden border border-earth-300">
              {capturedPhoto ? (
                <div className="flex flex-col items-center justify-center text-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-500 text-white mb-2 shadow-lg">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <p className="text-xs font-bold">Selfie Captured & Geotagged</p>
                  <p className="text-[10px] text-white/60">Lat: 15.5218° N · Lng: 73.7421° E</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-white/80 p-4">
                  <Camera className="h-10 w-10 mb-2 opacity-80" />
                  <p className="text-xs font-semibold">Selfie Camera Simulator</p>
                  <p className="text-[10px] text-white/50 mt-0.5">Hold still with restoration background</p>
                  <button
                    onClick={handleCapture}
                    className="mt-4 rounded-xl bg-white/20 hover:bg-white/30 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md transition-all"
                  >
                    Snap Selfie
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleCompleteCheckIn}
              disabled={!capturedPhoto || submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-terra-500 py-3.5 text-xs font-bold text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <span>Verifying Cryptographic Attestation...</span>
              ) : (
                <>
                  <span>Submit Verified Check-In</span>
                  <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === "success" && (
          <div className="py-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600 shadow-md"
            >
              <Award className="h-8 w-8" />
            </motion.div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">
              Attendance Verified!
            </h3>
            <p className="mt-1 text-xs text-ink-600 max-w-xs mx-auto">
              Your service at <span className="font-bold">{event.title}</span> has been validated with zero-proxy cryptographic confirmation.
            </p>

            {/* Impact Reward Card */}
            <div className="my-6 rounded-2xl bg-earth-50 p-4 border border-earth-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-ink-500">Green Karma Earned:</span>
                <span className="font-bold text-amber-700">+200 Points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Volunteer Hours Logged:</span>
                <span className="font-bold text-ink-900">+4.0 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Official Seva Stamp:</span>
                <span className="font-bold text-sage-700">Issued to Passport</span>
              </div>
              <div className="flex justify-between border-t border-earth-200 pt-2">
                <span className="text-ink-500">Certificate Status:</span>
                <span className="font-bold text-ink-900">Ready for Download</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full rounded-2xl bg-ink-900 py-3.5 text-xs font-bold text-white hover:bg-ink-800 transition-colors"
            >
              Done & Return to Events
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
