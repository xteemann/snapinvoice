"use client";

import React from "react";

/**
 * AdSlot — Reusable Google AdSense ad placement.
 *
 * In development: shows a subtle placeholder so you can see where ads go.
 * In production: renders real AdSense ad units once you replace the data-ad-slot.
 *
 * SETUP:
 * 1. Get approved for AdSense at https://adsense.google.com
 * 2. Create ad units for each size you need
 * 3. Replace the data-ad-slot values below with your real ad unit IDs
 * 4. Make sure the AdSense script is uncommented in app/layout.tsx
 */

type AdSize = "banner" | "sidebar" | "rectangle";

const AD_DIMENSIONS: Record<AdSize, { width: string; height: string; label: string }> = {
  banner: { width: "100%", height: "90px", label: "728×90 Banner" },
  sidebar: { width: "300px", height: "250px", label: "300×250 Sidebar" },
  rectangle: { width: "336px", height: "280px", label: "336×280 Rectangle" },
};

interface AdSlotProps {
  size: AdSize;
  className?: string;
}

export default function AdSlot({ size, className = "" }: AdSlotProps) {
  const { width, height, label } = AD_DIMENSIONS[size];
  const isProduction = process.env.NODE_ENV === "production";

  /* In production with AdSense configured, render the real ad unit */
  if (isProduction) {
    return (
      <div className={`flex justify-center ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width, height }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" /* ← Replace with your publisher ID */
          data-ad-slot="0000000000" /* ← Replace with your ad unit ID */
        />
      </div>
    );
  }

  /* Development placeholder */
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-xs font-medium select-none"
        style={{ width, height, maxWidth: "100%" }}
      >
        Ad — {label}
      </div>
    </div>
  );
}
