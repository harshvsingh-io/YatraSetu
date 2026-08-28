"use client";

import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "warm";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading = false, icon, children, disabled, onClick, ...props },
    ref
  ) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !loading ? { scale: 1.03 } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "btn-ripple relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300",
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-11 px-6 text-sm",
          size === "lg" && "h-13 px-8 text-base",
          variant === "primary" && "bg-ink-900 text-white shadow-lg hover:bg-ink-800 hover:shadow-xl",
          variant === "secondary" && "bg-amber-500 text-ink-950 shadow-lg hover:bg-amber-400 hover:shadow-glow-amber font-bold",
          variant === "warm" && "bg-gradient-to-r from-amber-500 to-terra-500 text-white shadow-lg hover:shadow-glow-amber",
          variant === "ghost" && "text-ink-700 hover:bg-earth-100",
          variant === "outline" && "border-2 border-earth-300 text-ink-700 hover:border-earth-400 hover:bg-earth-50",
          (disabled || loading) && "cursor-not-allowed opacity-50 hover:scale-100 hover:shadow-none",
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...(props as any)}
      >
        {ripples.map((ripple) => (
          <span key={ripple.id} className="ripple" style={{ left: ripple.x, top: ripple.y, width: 20, height: 20, marginLeft: -10, marginTop: -10 }} />
        ))}
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon ? <span className="shrink-0">{icon}</span> : null}
        <span className={cn("relative z-10", loading && "opacity-80")}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
