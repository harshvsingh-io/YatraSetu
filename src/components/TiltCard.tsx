"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  disabled?: boolean;
}

export default function TiltCard({
  children,
  className,
  glareColor = "rgba(232, 93, 35, 0.08)",
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), springConfig);

  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig);
  const glareOpacity = useSpring(
    useTransform(
      [x, y],
      ([latestX, latestY]: number[]) =>
        Math.max(
          Math.abs(latestX - 0.5),
          Math.abs(latestY - 0.5)
        ) * 0.4
    ),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1200,
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-shadow duration-500",
        isHovered && "shadow-card-hover",
        !disabled && "cursor-pointer",
        className
      )}
    >
      {children}

      {/* Glare overlay */}
      {!disabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glareColor}, transparent 70%)`,
            opacity: isHovered ? glareOpacity : 0,
          }}
        />
      )}
    </motion.div>
  );
}
