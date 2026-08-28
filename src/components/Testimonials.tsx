"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Menon",
    role: "NSS Volunteer, IIT Madras",
    quote: "I came to YatraSetu to book a trip to Ooty. Ended up joining a trail restoration drive at Mukurthi National Park. Met incredible people, earned stamps, and the certificate looks amazing on my resume.",
    rating: 5,
    avatar: "PM",
    color: "bg-amber-500",
  },
  {
    name: "Rahul Deshmukh",
    role: "Community Lead, Pune",
    quote: "As a community lead, the verified event system gives real credibility. Participants trust it, and the QR check-in means no ghost attendance. Our beach cleanup at Ganpatipule had 200+ verified participants.",
    rating: 5,
    avatar: "RD",
    color: "bg-sage-500",
  },
  {
    name: "Ananya Sharma",
    role: "Tourist, Delhi",
    quote: "The auto-fetched hotel and transport data saved me hours of research. I booked a homestay in Manali through the app and the weather forecast was spot-on. Already planning my next trip with a plantation event.",
    rating: 5,
    avatar: "AS",
    color: "bg-terra-500",
  },
  {
    name: "Vikram Patel",
    role: "NCC Cadet, Ahmedabad",
    quote: "The certificate generator is the best thing ever. Auto-generated NSS certificates with proper formatting. No more begging the unit officer for last-minute certificates before placement season.",
    rating: 5,
    avatar: "VP",
    color: "bg-ink-500",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-earth-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-terra-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-terra-700">
            Stories
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Real people, real impact
          </h2>
          <p className="mt-4 text-base text-ink-500 sm:text-lg">
            From students to community leaders — hear from our growing community.
          </p>
        </SectionReveal>

        <div className="relative mt-16">
          <div className="mx-auto max-w-3xl">
            <div className="relative min-h-[320px] sm:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-earth-200 bg-white p-6 sm:p-10 shadow-sm"
                >
                  <Quote className="mb-4 h-8 w-8 text-amber-200" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-base leading-relaxed text-ink-700 sm:text-lg">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${testimonials[current].color} text-xs font-bold text-white`}>
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-800">{testimonials[current].name}</p>
                      <p className="text-xs text-ink-500">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-earth-200 text-ink-600 transition-all hover:bg-earth-100 hover:scale-105 active:scale-95" aria-label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-amber-500" : "w-2 bg-earth-300 hover:bg-earth-400"}`} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-earth-200 text-ink-600 transition-all hover:bg-earth-100 hover:scale-105 active:scale-95" aria-label="Next testimonial">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
