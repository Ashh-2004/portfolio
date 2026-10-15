"use client";

import React from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import {
  Code2,
  Brain,
  Sparkles,
  BarChart3,
  Server,
  Layout,
  Cpu,
} from "lucide-react";

const GROUP_CARD_COLORS = [
  "bg-paper-white",
  "bg-lavender",
  "bg-mint-pop",
  "bg-sunburst",
  "bg-soft-mist",
  "bg-paper-white",
  "bg-sky-wash",
];

function getSkillIcon(iconName: string) {
  switch (iconName.toLowerCase()) {
    case "code2":
      return Code2;
    case "brain":
      return Brain;
    case "sparkles":
      return Sparkles;
    case "barchart3":
      return BarChart3;
    case "server":
      return Server;
    case "layout":
      return Layout;
    case "cpu":
    default:
      return Cpu;
  }
}

export function SkillsSection() {
  const topTier = portfolio.skills.slice(0, 3); // 3 Core AI/ML & Programming pillars
  const bottomTier = portfolio.skills.slice(3); // 4 Supporting Engineering disciplines

  return (
    <section id="skills" className="py-20 bg-sky-wash border-b border-carbon w-full scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (15-20% smaller heading for balanced hierarchy) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-sans font-bold bg-paper-white text-carbon border border-carbon">
            <span className="w-2 h-2 rounded-full bg-electric-blue" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-carbon tracking-tight uppercase leading-[0.95]">
            SKILLS &amp; CORE COMPETENCIES
          </h2>

          <p className="text-xs sm:text-sm text-carbon/80 font-sans max-w-xl mx-auto leading-relaxed">
            Technical competencies verified across capstone projects: predictive machine learning, applied RAG architectures, and scalable backend services.
          </p>

          {/* Decorative Sticker */}
          <div className="absolute -top-6 right-2 sm:right-12 hidden md:block pointer-events-none" aria-hidden="true">
            <Image
              src="/art/sticker-branch.svg"
              alt=""
              width={80}
              height={80}
              className="w-16 h-auto rotate-12"
            />
          </div>
        </div>

        {/* Balanced Grid: Row 1 has 3 Core Pillars (lg:col-span-4), Row 2 has 4 Engineering Pillars (lg:col-span-3) */}
        <div className="space-y-4 select-none">
          {/* Top Tier: 3 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topTier.map((group, idx) => {
              const Icon = getSkillIcon(group.icon);
              const cardBg = GROUP_CARD_COLORS[idx % GROUP_CARD_COLORS.length];

              return (
                <div
                  key={group.group}
                  className={`p-5 rounded-card ${cardBg} border border-carbon flex flex-col justify-start space-y-3`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-carbon" />
                    </div>
                    <h3 className="font-display text-sm sm:text-base text-carbon uppercase tracking-tight">
                      {group.group}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-pill text-xs font-sans font-bold bg-paper-white text-carbon border border-carbon hover:bg-carbon hover:text-paper-white transition-colors duration-150"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Tier: 4 Supporting Disciplines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottomTier.map((group, idx) => {
              const Icon = getSkillIcon(group.icon);
              const cardBg = GROUP_CARD_COLORS[(idx + 3) % GROUP_CARD_COLORS.length];

              return (
                <div
                  key={group.group}
                  className={`p-5 rounded-card ${cardBg} border border-carbon flex flex-col justify-start space-y-3`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-carbon" />
                    </div>
                    <h3 className="font-display text-xs sm:text-sm text-carbon uppercase tracking-tight">
                      {group.group}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-pill text-[11px] font-sans font-bold bg-paper-white text-carbon border border-carbon hover:bg-carbon hover:text-paper-white transition-colors duration-150"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
