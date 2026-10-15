"use client";

import React from "react";
import { portfolio } from "@/data/portfolio";

export function MarqueeStrip() {
  const items = portfolio.marquee;
  if (!items || items.length === 0) return null;

  // Duplicate items for continuous seamless loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div
      className="w-full bg-carbon text-paper-white py-3 overflow-hidden border-y border-carbon select-none"
      role="region"
      aria-label="Skill Highlights Marquee"
    >
      <div className="flex w-max animate-marquee">
        {displayItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span className="font-sans font-bold text-xs sm:text-sm tracking-widest uppercase">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-electric-blue inline-block" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
