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

  const springConfig = { stiffness: 200, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);
  const scale = useSpring(isHovered ? 1.025 : 1, springConfig);

  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig);
  const glareOpacity = useSpring(
    useTransform(
      [x, y],
      ([latestX, latestY]: number[]) =>
        Math.max(
          Math.abs(latestX - 0.5),
          Math.abs(latestY - 0.5)
        ) * 0.5
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
        scale: !disabled && isHovered ? scale : 1,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-300",
        isHovered && "shadow-[0_20px_45px_rgba(0,0,0,0.12)] border-amber-300/80",
        !disabled && "cursor-pointer",
        className
      )}
    >
      <div style={{ transform: "translateZ(0px)" }}>
        {children}
      </div>

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
