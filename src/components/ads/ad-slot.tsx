"use client";

import { useEffect, useRef } from "react";

type AdSize = "horizontal" | "vertical" | "square" | "inline";

interface AdSlotProps {
  /** Unique identifier for this ad slot */
  id: string;
  /** Ad size/format */
  size?: AdSize;
  /** Additional CSS classes */
  className?: string;
  /** Show placeholder in development */
  showPlaceholder?: boolean;
}

const sizeClasses: Record<AdSize, string> = {
  horizontal: "min-h-[90px] md:min-h-[250px]",
  vertical: "min-h-[600px]",
  square: "min-h-[250px] max-w-[300px]",
  inline: "min-h-[250px]",
};

/**
 * Ad slot component for Raptive ads.
 *
 * Once approved by Raptive, add their script to the root layout:
 * <script async src="//www.raptive.com/ads.js"></script>
 *
 * Raptive will automatically detect these ad slots and fill them.
 * The data-ad-slot attribute helps Raptive identify placement locations.
 */
export function AdSlot({
  id,
  size = "inline",
  className = "",
  showPlaceholder = process.env.NODE_ENV === "development",
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Raptive auto-detects ad slots, but we can trigger a refresh if needed
    if (typeof window !== "undefined" && "raptive" in window) {
      // @ts-expect-error Raptive global
      window.raptive?.cmd?.push(() => {
        // @ts-expect-error Raptive global
        window.raptive?.refresh?.();
      });
    }
  }, []);

  return (
    <div
      ref={adRef}
      id={`ad-${id}`}
      data-ad-slot={id}
      className={`ad-slot no-print ${sizeClasses[size]} ${className}`}
    >
      {showPlaceholder && (
        <div className="w-full h-full min-h-[inherit] bg-gradient-to-br from-cream-100 to-cream-200 border-2 border-dashed border-cream-300 rounded-lg flex items-center justify-center">
          <div className="text-center text-cream-500 p-4">
            <p className="text-sm font-medium">Ad Placeholder</p>
            <p className="text-xs mt-1">{id}</p>
          </div>
        </div>
      )}
    </div>
  );
}
