"use client";

import React, { useEffect } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import SOSButton from "@/components/SOSButton";
import AIChatConcierge from "@/components/AIChatConcierge";
import CustomCursor from "@/components/CustomCursor";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // Registered
        })
        .catch(() => {
          // Graceful ignore
        });
    }
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <CustomCursor />
        {children}
        <SOSButton />
        <AIChatConcierge />
      </ToastProvider>
    </AuthProvider>
  );
}
