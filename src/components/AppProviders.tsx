"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import SOSButton from "@/components/SOSButton";
import AIChatConcierge from "@/components/AIChatConcierge";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <SOSButton />
        <AIChatConcierge />
      </ToastProvider>
    </AuthProvider>
  );
}
