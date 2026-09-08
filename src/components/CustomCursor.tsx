"use client";

import React, { useEffect, useRef, useState } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse & physics tracking
  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const prevPos = useRef({ x: -200, y: -200 });
  const vel = useRef({ x: 0, y: 0, speed: 0 });
  const angle = useRef(0);
  const rotation = useRef(0);

  // Interaction states
  const hover = useRef({
    active: false,
    label: "",
    progress: 0, // 0 (normal circle) to 1 (brackets)
  });
  const clickWave = useRef({ active: false, radius: 0, alpha: 0 });
  const isTextInput = useRef(false);

  const sparks = useRef<Spark[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch screens / mobile
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      setIsTouch(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Handle high-DPI (Retina) displays
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Spawn trail spark on rapid glide (max 25 active sparks)
      if (vel.current.speed > 5 && sparks.current.length < 25 && Math.random() > 0.4) {
        sparks.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5 - vel.current.x * 0.1,
          vy: (Math.random() - 0.5) * 1.5 - vel.current.y * 0.1,
          life: 0,
          maxLife: 20 + Math.random() * 15,
          size: 1.5 + Math.random() * 1.5,
          color: Math.random() > 0.4 ? "#F59E0B" : "#FBBF24",
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      clickWave.current = { active: true, radius: 10, alpha: 0.9 };

      // Emit 6 golden burst embers on click
      for (let i = 0; i < 6; i++) {
        const theta = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
        const burstSpeed = 1.8 + Math.random() * 2.2;
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(theta) * burstSpeed,
          vy: Math.sin(theta) * burstSpeed,
          life: 0,
          maxLife: 24 + Math.random() * 12,
          size: 2 + Math.random() * 1.5,
          color: i % 2 === 0 ? "#F59E0B" : "#FDE68A",
        });
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isText = !!target.closest("input, textarea, [contenteditable='true']");
      isTextInput.current = isText;

      const interactive = target.closest(
        "a, button, [role='button'], label, summary, [tabindex]:not([tabindex='-1']), select, .interactive-hover"
      );

      if (interactive && !isText) {
        hover.current.active = true;
        // Determine dynamic context label
        const href = interactive.getAttribute("href");
        const ariaLabel = interactive.getAttribute("aria-label");
        const btnText = interactive.textContent?.trim().toLowerCase() || "";

        if (href && (href.includes("discover") || href.includes("explore"))) {
          hover.current.label = "EXPLORE ↗";
        } else if (btnText.includes("book") || btnText.includes("join") || btnText.includes("seva")) {
          hover.current.label = "SEVA ✨";
        } else if (interactive.tagName === "BUTTON" || interactive.getAttribute("role") === "button") {
          hover.current.label = "SELECT";
        } else {
          hover.current.label = "VIEW ↗";
        }
      } else {
        hover.current.active = false;
        hover.current.label = "";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Main 120fps Canvas Render Loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smooth physics lerp
      pos.current.x += (mouse.current.x - pos.current.x) * 0.22;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.22;

      // Velocity calculation
      const dx = pos.current.x - prevPos.current.x;
      const dy = pos.current.y - prevPos.current.y;
      vel.current.x = dx;
      vel.current.y = dy;
      vel.current.speed = Math.hypot(dx, dy);

      prevPos.current.x = pos.current.x;
      prevPos.current.y = pos.current.y;

      // Motion angle smoothing
      if (vel.current.speed > 0.8) {
        const targetAngle = Math.atan2(dy, dx);
        // Shortest angle interpolation
        let angleDiff = targetAngle - angle.current;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        angle.current += angleDiff * 0.2;
      }

      // Compass slow idle orbit
      rotation.current += 0.015;

      // Hover interpolation (0 to 1)
      hover.current.progress += ((hover.current.active ? 1 : 0) - hover.current.progress) * 0.18;

      const px = pos.current.x;
      const py = pos.current.y;
      const hProg = hover.current.progress;

      // Draw active sparks
      for (let i = sparks.current.length - 1; i >= 0; i--) {
        const s = sparks.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life++;

        const lifeRatio = 1 - s.life / s.maxLife;
        if (lifeRatio <= 0) {
          sparks.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, lifeRatio * 0.8);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Click shockwave expansion
      if (clickWave.current.active) {
        clickWave.current.radius += 2.5;
        clickWave.current.alpha *= 0.9;
        if (clickWave.current.alpha < 0.03 || clickWave.current.radius > 50) {
          clickWave.current.active = false;
        } else {
          ctx.save();
          ctx.strokeStyle = `rgba(245, 158, 11, ${clickWave.current.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, clickWave.current.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // If hidden or typing in input, don't draw main reticle
      if (!isTextInput.current && px > -100 && py > -100) {
        ctx.save();

        // Ambient glow behind reticle
        const glowRadius = 32 + hProg * 12;
        const grad = ctx.createRadialGradient(px, py, 2, px, py, glowRadius);
        grad.addColorStop(0, `rgba(245, 158, 11, ${0.15 + hProg * 0.1})`);
        grad.addColorStop(1, "rgba(245, 158, 11, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // ─── STATE 1: Interactive Target Brackets ───
        if (hProg > 0.05) {
          const bSize = 16 + hProg * 12; // Bracket distance from center
          const bLen = 6 + hProg * 2; // Arm length
          ctx.strokeStyle = `rgba(245, 158, 11, ${hProg * 0.9})`;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";

          // Top-Left ⌜
          ctx.beginPath();
          ctx.moveTo(px - bSize, py - bSize + bLen);
          ctx.lineTo(px - bSize, py - bSize);
          ctx.lineTo(px - bSize + bLen, py - bSize);
          ctx.stroke();

          // Top-Right ⌝
          ctx.beginPath();
          ctx.moveTo(px + bSize - bLen, py - bSize);
          ctx.lineTo(px + bSize, py - bSize);
          ctx.lineTo(px + bSize, py - bSize + bLen);
          ctx.stroke();

          // Bottom-Right ⌟
          ctx.beginPath();
          ctx.moveTo(px + bSize, py + bSize - bLen);
          ctx.lineTo(px + bSize, py + bSize);
          ctx.lineTo(px + bSize - bLen, py + bSize);
          ctx.stroke();

          // Bottom-Left ⌞
          ctx.beginPath();
          ctx.moveTo(px - bSize + bLen, py + bSize);
          ctx.lineTo(px - bSize, py + bSize);
          ctx.lineTo(px - bSize, py + bSize - bLen);
          ctx.stroke();

          // Interactive Context Micro-Badge (EXPLORE / SEVA)
          if (hover.current.label && hProg > 0.6) {
            ctx.font = "bold 9px -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";
            const textWidth = ctx.measureText(hover.current.label).width;
            const badgeY = py - bSize - 12;

            ctx.fillStyle = "rgba(22, 18, 14, 0.88)";
            ctx.strokeStyle = "rgba(245, 158, 11, 0.5)";
            ctx.lineWidth = 1;

            // Rounded badge pill
            const padX = 6;
            const padY = 3;
            const rx = px - textWidth / 2 - padX;
            const ry = badgeY - 8;
            const rw = textWidth + padX * 2;
            const rh = 16;
            const r = 4;

            ctx.beginPath();
            ctx.roundRect(rx, ry, rw, rh, r);
            ctx.fill();
            ctx.stroke();

            // Gold text label
            ctx.fillStyle = "#FDE68A";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(hover.current.label, px, badgeY);
          }
        }

        // ─── STATE 2: Navigational Velocity Reticle (When not hovering) ───
        if (hProg < 0.95) {
          const reticleAlpha = (1 - hProg) * 0.85;
          const baseRadius = 13;

          // Aerodynamic velocity stretch
          const stretch = 1 + Math.min(vel.current.speed * 0.04, 0.9);
          const squash = 1 / Math.sqrt(stretch);

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle.current);
          ctx.scale(stretch, squash);

          // Outer Stretched Fluid Ring
          ctx.strokeStyle = `rgba(245, 158, 11, ${reticleAlpha * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();

          // Cardinal Compass Orbit Ticks (Rotate gently in rest)
          if (vel.current.speed < 2) {
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(rotation.current);
            ctx.fillStyle = `rgba(245, 158, 11, ${reticleAlpha * 0.75})`;

            for (let c = 0; c < 4; c++) {
              const cAngle = (Math.PI / 2) * c;
              const tx = Math.cos(cAngle) * (baseRadius + 4);
              const ty = Math.sin(cAngle) * (baseRadius + 4);
              ctx.beginPath();
              ctx.arc(tx, ty, 1, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        }

        // ─── Center Core Ruby/Amber Jewel Dot ───
        const dotRadius = hProg > 0.5 ? 2.5 : 2;
        ctx.fillStyle = "#D97706";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner glowing core
        ctx.fillStyle = "#FEF3C7";
        ctx.beginPath();
        ctx.arc(px, py, dotRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", checkHover);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}
