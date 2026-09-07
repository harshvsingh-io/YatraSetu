"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  MapPin,
  Star,
  ArrowLeft,
  Copy,
} from "lucide-react";
import Button from "@/components/Button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: {
    name: string;
    location: string;
    priceRange: string;
    rating: number;
    image: string;
  };
}

type Step = "dates" | "guests" | "payment" | "confirmation";

export default function BookingModal({
  isOpen,
  onClose,
  hotel,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>("dates");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [processing, setProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const id = `YS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      setBookingId(id);
      setProcessing(false);
      setStep("confirmation");
    }, 2000);
  };

  const resetAndClose = () => {
    setStep("dates");
    setCheckIn("");
    setCheckOut("");
    setGuests(2);
    setBookingId("");
    onClose();
  };

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-ink-100 p-5">
              <div className="flex items-center gap-3">
                {step !== "dates" && step !== "confirmation" && (
                  <button
                    onClick={() =>
                      setStep(step === "guests" ? "dates" : "guests")
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-ink-800">
                    {step === "dates"
                      ? "Select Dates"
                      : step === "guests"
                      ? "Guest Details"
                      : step === "payment"
                      ? "Confirm & Pay"
                      : "Booking Confirmed!"}
                  </h3>
                  <p className="text-sm text-ink-500">{hotel.name}</p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Step indicator */}
              {step !== "confirmation" && (
                <div className="mt-4 flex gap-1.5">
                  {(["dates", "guests", "payment"] as Step[]).map((s, i) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        (["dates", "guests", "payment"] as Step[]).indexOf(
                          step
                        ) >= i
                          ? "bg-amber-500"
                          : "bg-ink-100"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {/* Step 1: Dates */}
                {step === "dates" && (
                  <motion.div
                    key="dates"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Check-in Date
                      </label>
                      <div className="relative mt-1.5">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="h-11 w-full rounded-xl border-2 border-ink-200 pl-10 pr-4 text-sm font-medium text-ink-800 transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-100 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Check-out Date
                      </label>
                      <div className="relative mt-1.5">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          min={checkIn || new Date().toISOString().split("T")[0]}
                          className="h-11 w-full rounded-xl border-2 border-ink-200 pl-10 pr-4 text-sm font-medium text-ink-800 transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-100 focus:outline-none"
                        />
                      </div>
                    </div>
                    {checkIn && checkOut && (
                      <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                        {nights} night{nights > 1 ? "s" : ""} · Est.{" "}
                        <span className="font-bold">
                          ₹
                          {(
                            parseInt(hotel.priceRange.replace(/[^0-9]/g, "")) *
                            nights
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    <Button
                      variant="warm"
                      className="w-full"
                      onClick={() => setStep("guests")}
                      disabled={!checkIn || !checkOut}
                    >
                      Continue
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Guests */}
                {step === "guests" && (
                  <motion.div
                    key="guests"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium text-ink-700">
                        Number of Guests
                      </label>
                      <div className="mt-1.5 flex items-center gap-4">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink-200 text-lg font-bold text-ink-600 transition-all hover:border-ink-300"
                        >
                          −
                        </button>
                        <span className="font-display text-2xl font-bold text-ink-800 w-12 text-center">
                          {guests}
                        </span>
                        <button
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink-200 text-lg font-bold text-ink-600 transition-all hover:border-ink-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="rounded-xl bg-earth-50 p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-ink-800">
                            {hotel.name}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-ink-500">
                            <MapPin className="h-3 w-3" />
                            {hotel.location}
                            <span className="text-ink-300">·</span>
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {hotel.rating}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between border-t border-ink-200 pt-3 text-sm">
                        <span className="text-ink-500">
                          {hotel.priceRange} × {nights} nights
                        </span>
                        <span className="font-bold text-ink-800">
                          ₹
                          {(
                            parseInt(hotel.priceRange.replace(/[^0-9]/g, "")) *
                            nights
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="warm"
                      className="w-full"
                      onClick={() => setStep("payment")}
                    >
                      Continue to Payment
                    </Button>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="rounded-xl border border-ink-200 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100">
                          <CreditCard className="h-5 w-5 text-ink-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-ink-800">
                            Mock Payment
                          </p>
                          <p className="text-xs text-ink-500">
                            No real payment — this is a demo flow
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-earth-50 p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-500">
                          {hotel.name} ({nights} night{nights > 1 ? "s" : ""})
                        </span>
                        <span className="font-semibold text-ink-700">
                          ₹
                          {(
                            parseInt(hotel.priceRange.replace(/[^0-9]/g, "")) *
                            nights
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-500">Service fee</span>
                        <span className="font-semibold text-ink-700">₹199</span>
                      </div>
                      <div className="flex justify-between border-t border-ink-200 pt-2 text-sm font-bold">
                        <span className="text-ink-800">Total</span>
                        <span className="text-ink-800">
                          ₹
                          {(
                            parseInt(
                              hotel.priceRange.replace(/[^0-9]/g, "")
                            ) *
                              nights +
                            199
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="warm"
                      className="w-full"
                      loading={processing}
                      onClick={handlePayment}
                    >
                      {processing ? "Processing..." : "Pay Now (Demo)"}
                    </Button>
                    <p className="text-center text-xs text-ink-400">
                      This is a simulated payment for demo purposes
                    </p>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {step === "confirmation" && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-50"
                    >
                      <CheckCircle2 className="h-8 w-8 text-sage-500" />
                    </motion.div>
                    <h4 className="mt-4 font-display text-xl font-bold text-ink-800">
                      Booking Confirmed!
                    </h4>
                    <p className="mt-1 text-sm text-ink-500">
                      {hotel.name} · {checkIn} to {checkOut}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ink-50 px-4 py-2">
                      <span className="text-xs text-ink-500">Booking ID:</span>
                      <span className="font-mono text-sm font-bold text-ink-800">
                        {bookingId}
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(bookingId)}
                        className="text-ink-400 hover:text-ink-600"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <Button
                      variant="secondary"
                      className="mt-6"
                      onClick={resetAndClose}
                    >
                      Done
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
