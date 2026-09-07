"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User, Compass, Award, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickActions?: Array<{ label: string; href?: string; query?: string }>;
}

const KNOWLEDGE_BASE: Record<string, { reply: string; actions?: Array<{ label: string; href?: string; query?: string }> }> = {
  decongestion: {
    reply: "Our AI Decongestion Engine tracks rolling tourist pressure. Instead of overcrowded hotspots like Manali or North Goa, we recommend serene alternatives like Kasol, Tirthan Valley, or Agonda Beach. Booking an alternative earns you +250 Green Karma bonus points!",
    actions: [
      { label: "View Underrated Picks", href: "/discover" },
      { label: "Check Kasol", href: "/discover" },
    ],
  },
  restoration: {
    reply: "YatraSetu links travel with verified seva events! You can join coastal beach cleanups in Goa, wetland restoration in Kolkata, or river trail revivals in Parvati Valley. All verified on-site via dynamic QR + geo-tagged selfie.",
    actions: [
      { label: "Explore Events", href: "/events" },
      { label: "How We Verify", href: "/impact" },
    ],
  },
  rewards: {
    reply: "Every restoration event earns you 100–300 Green Karma points, digital collectible passport stamps, and a verifiable Certificate of Seva. Points can be redeemed for stay discounts, state transport passes, and ASI monument entry!",
    actions: [
      { label: "View Rewards", href: "/rewards" },
      { label: "My Certificates", href: "/certificates" },
    ],
  },
  qr: {
    reply: "Our fraud-proof check-in uses rotating dynamic QR codes generated on the event lead's device that change every 15 seconds, coupled with a geo-fenced selfie check. No proxy attendance possible!",
    actions: [
      { label: "Try Check-In Demo", href: "/events" },
    ],
  },
  sih: {
    reply: "YatraSetu is built for Smart India Hackathon 2026 (Problem Statement SIH26202, Travel & Tourism theme). It tackles over-tourism, heritage preservation, and sustainable community restoration through technology.",
    actions: [
      { label: "View Impact Metrics", href: "/impact" },
    ],
  },
};

export default function AIChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Namaste! 🙏 I'm your YatraSetu AI Concierge. Ask me about low-crowd alternative destinations, upcoming restoration drives, Green Karma rewards, or how to verify your Seva on-site!",
      timestamp: "Just now",
      quickActions: [
        { label: "Decongestion alternatives?", query: "decongestion" },
        { label: "How to earn rewards?", query: "rewards" },
        { label: "Find restoration events", query: "restoration" },
      ],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");

    // Generate intelligent response grounded on YatraSetu data
    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let match = KNOWLEDGE_BASE.sih;

      if (q.includes("crowd") || q.includes("decongest") || q.includes("alternative") || q.includes("bheed") || q.includes("underrated")) {
        match = KNOWLEDGE_BASE.decongestion;
      } else if (q.includes("reward") || q.includes("point") || q.includes("karma") || q.includes("stamp") || q.includes("voucher") || q.includes("redeem")) {
        match = KNOWLEDGE_BASE.rewards;
      } else if (q.includes("event") || q.includes("cleanup") || q.includes("drive") || q.includes("seva") || q.includes("volunteer")) {
        match = KNOWLEDGE_BASE.restoration;
      } else if (q.includes("qr") || q.includes("verify") || q.includes("fraud") || q.includes("check-in") || q.includes("selfie")) {
        match = KNOWLEDGE_BASE.qr;
      } else if (q.includes("hotel") || q.includes("stay") || q.includes("book")) {
        match = {
          reply: "You can book verified eco-homestays directly on /discover! When you book an offbeat alternative destination, you receive instant Green Karma points and an optional link to join local cleanups.",
          actions: [{ label: "Book a Homestay", href: "/discover" }],
        };
      }

      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: match.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions: match.actions,
      };

      setMessages((prev) => [...prev, botReply]);
    }, 450);
  };

  return (
    <>
      {/* Floating Concierge Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-terra-500 text-white shadow-xl shadow-amber-500/25 transition-all hover:shadow-2xl"
          aria-label="Open AI Concierge"
        >
          <Sparkles className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sage-500 border-2 border-white"></span>
          </span>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-22 right-6 z-50 flex h-[540px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-ink-900 to-ink-800 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500 shadow-sm">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold leading-tight">YatraSetu Concierge</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-sage-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage-400 animate-pulse"></span>
                    <span>AI Assistant · Grounded on Live Data</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-ink-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-earth-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-amber-600 text-white rounded-tr-none shadow-sm"
                        : "bg-white text-ink-800 border border-earth-200 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="mt-1 text-[10px] text-ink-400 px-1">{msg.timestamp}</span>

                  {/* Quick action buttons */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.quickActions.map((act, i) =>
                        act.href ? (
                          <Link
                            key={i}
                            href={act.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
                          >
                            <Compass className="h-3 w-3" />
                            {act.label}
                          </Link>
                        ) : (
                          <button
                            key={i}
                            onClick={() => handleSend(act.query || act.label)}
                            className="inline-flex items-center gap-1 rounded-lg bg-white border border-earth-300 px-2.5 py-1 text-[11px] font-medium text-ink-700 hover:bg-earth-100 hover:border-earth-400 transition-colors"
                          >
                            {act.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-earth-200 bg-white p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about events, decongestion, rewards..."
                  className="flex-1 rounded-xl border border-earth-300 bg-earth-50 px-3.5 py-2 text-xs text-ink-900 placeholder:text-ink-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white transition-all hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
