"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast { id: number; type: ToastType; message: string; }
interface ToastContextValue { addToast: (type: ToastType, message: string) => void; }

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });
export function useToast() { return useContext(ToastContext); }

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-sage-500" />,
  error: <XCircle className="h-5 w-5 text-terra-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-ink-500" />,
};

const bgColorMap: Record<ToastType, string> = {
  success: "border-sage-200 bg-sage-50",
  error: "border-terra-200 bg-terra-50",
  warning: "border-amber-200 bg-amber-50",
  info: "border-earth-200 bg-earth-50",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(400px,calc(100vw-2rem))] flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div key={toast.id} initial={{ opacity: 0, y: -20, x: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, x: 0, scale: 1 }} exit={{ opacity: 0, x: 40, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn("pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm", bgColorMap[toast.type])}>
              <span className="mt-0.5 shrink-0">{iconMap[toast.type]}</span>
              <p className="flex-1 text-sm font-medium text-ink-800">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="shrink-0 rounded-lg p-1 text-ink-400 transition-colors hover:bg-earth-100 hover:text-ink-600">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
