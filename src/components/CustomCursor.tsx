"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Position references for smooth 60/120fps physics
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device or environment without fine pointer
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant update on the sharp inner dot for zero perceived latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Dynamic hover target detector
    const checkHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isText = !!target.closest("input, textarea, [contenteditable='true']");
      setIsTextInput(isText);

      const interactive = target.closest(
        "a, button, [role='button'], label, summary, [tabindex]:not([tabindex='-1']), .interactive-hover, select"
      );
      setIsHovered(!!interactive && !isText);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", checkHoverTarget, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth physics loop for the magnetic trailing ring & ambient glow
    const renderLoop = () => {
      // Ring follows mouse with 0.18 lerp for a silky magnetic feel
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      // Subtle ambient glow follows with 0.08 lerp
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", checkHoverTarget);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  // Don't render on mobile / touch devices
  if (isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-200 ${
        isVisible && !isTextInput ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Subtle Ambient Light Bloom */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.035] blur-3xl will-change-transform"
      />

      {/* Trailing Magnetic Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out ${
          isHovered
            ? "h-12 w-12 border-2 border-amber-500/80 bg-amber-500/15 shadow-[0_0_24px_rgba(245,158,11,0.25)]"
            : isClicked
            ? "h-6 w-6 border border-amber-600/90 bg-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
            : "h-8 w-8 border border-amber-500/40 bg-amber-500/[0.04] shadow-[0_0_12px_rgba(245,158,11,0.1)]"
        }`}
      />

      {/* Sharp Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform transition-[transform,background-color,box-shadow] duration-150 ease-out ${
          isHovered
            ? "h-1.5 w-1.5 bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.9)]"
            : isClicked
            ? "h-2 w-2 bg-amber-700"
            : "h-1.5 w-1.5 bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]"
        }`}
      />
    </div>
  );
}
