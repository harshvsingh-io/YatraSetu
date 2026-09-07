"use client";

import { cn } from "@/lib/utils";
import { getCrowdColor, type DestinationMetric } from "@/lib/seed-data";
import { getCrowdLevel } from "@/lib/seed-data";

interface CrowdBadgeProps {
  crowdScore: number;
  size?: "sm" | "md";
  className?: string;
}

export default function CrowdBadge({ crowdScore, size = "md", className }: CrowdBadgeProps) {
  const level = getCrowdLevel(crowdScore);
  const colors = getCrowdColor(level);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        colors.bg,
        colors.text,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
      {colors.label}
    </span>
  );
}
