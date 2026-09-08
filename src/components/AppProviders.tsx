"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import SOSButton from "@/components/SOSButton";
import AIChatConcierge from "@/components/AIChatConcierge";
import CustomCursor from "@/components/CustomCursor";

export default function AppProviders({ children }: { children: React.ReactNode }) {
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
