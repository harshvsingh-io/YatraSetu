"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Compass,
  Award,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickActions?: Array<{ label: string; href?: string; query?: string }>;
}

export default function AIChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Namaste! 🙏 I'm Setu Saathi, your YatraSetu AI concierge. Ask me anything about crowd-free offbeat destinations, weekend restoration cleanups, or how to redeem Green Karma!",
      timestamp: "Just now",
      quickActions: [
        { label: "Crowd-free destinations?", query: "crowd-free offbeat destinations" },
        { label: "Weekend cleanups?", query: "weekend restoration cleanups" },
        { label: "How to redeem Green Karma?", query: "how to redeem karma points" },
      ],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (customQuery?: string) => {
    const textToSend = (customQuery || input).trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customQuery) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || "Namaste! I am here to help you travel mindfully across India.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions: data.actions,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "I'm having trouble connecting right now, but you can explore verified offbeat stays directly on /discover or view upcoming restoration events on /events!",
        timestamp: "Just now",
        quickActions: [
          { label: "Discover Stays", href: "/discover" },
          { label: "View Events", href: "/events" },
        ],
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Concierge Launcher Pill */}
      <div className="fixed bottom-5 right-5 z-50">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 rounded-full bg-ink-950 px-4 py-2.5 text-white shadow-2xl border border-amber-400/40 hover:border-amber-400 transition-all duration-300 group ring-4 ring-black/5"
          aria-label="Open Setu Saathi AI Concierge"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-terra-500 text-white font-bold shadow-xs">
            <Bot className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
            </span>
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-xs font-bold leading-tight text-white flex items-center gap-1">
              Setu Saathi
              <Sparkles className="h-3 w-3 text-amber-400 fill-amber-400" />
            </span>
            <span className="text-[10px] text-amber-300 font-medium">Gemini AI Assistant</span>
          </div>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 flex h-[520px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-ink-950 via-ink-900 to-amber-950 px-5 py-3.5 text-white border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500 shadow-sm">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold leading-tight">Setu Saathi</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AI Concierge · Gemini Live</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-earth-50/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-ink-900 text-white rounded-tr-none shadow-xs"
                        : "bg-white text-ink-800 border border-earth-200 rounded-tl-none shadow-xs"
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

              {loading && (
                <div className="flex items-center gap-2 text-xs text-ink-500 bg-white border border-earth-200 rounded-2xl px-3.5 py-2 w-fit">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-600" />
                  <span>Thinking...</span>
                </div>
              )}

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
                  placeholder="Ask about offbeat stays, drives, karma..."
                  className="flex-1 rounded-xl border border-earth-300 bg-earth-50 px-3.5 py-2 text-xs text-ink-900 placeholder:text-ink-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-white transition-all hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
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
