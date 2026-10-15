"use client";

import React from "react";
import { portfolio } from "@/data/portfolio";
import {
  Briefcase,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-paper-white border-b border-carbon w-full scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (15-20% tuned heading) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-sans font-bold bg-mint-pop text-carbon border border-carbon">
            <span className="w-2 h-2 rounded-full bg-carbon" />
            <span>ACADEMIC CAPSTONES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-carbon tracking-tight uppercase leading-[0.95]">
            PROJECT TIMELINE &amp; MILESTONES
          </h2>

          <p className="text-xs sm:text-sm text-carbon/80 font-sans max-w-xl mx-auto leading-relaxed">
            Applied technical capstones completed during MCA and BCA degree programs, focusing on production ML, RAG systems, and distributed rules engines.
          </p>
        </div>

        {/* Compact Timeline Rail */}
        <div className="relative pl-6 sm:pl-8 space-y-6">
          <div
            className="absolute left-0 top-3 bottom-3 w-0.5 bg-carbon"
            aria-hidden="true"
          />

          {portfolio.experience.map((exp, idx) => (
            <div key={idx} className="relative select-none">
              {/* Sticker Node on Rail */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-5 w-4 h-4 rounded-full bg-paper-white border-2 border-carbon flex items-center justify-center z-10"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-carbon" />
              </div>

              {/* Card Container */}
              <div className="p-5 sm:p-6 rounded-card bg-soft-mist/40 border border-carbon space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-sans font-bold text-carbon bg-paper-white px-3 py-0.5 rounded-pill border border-carbon">
                    {exp.period}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-carbon/70 font-sans font-bold">
                    <MapPin className="w-3.5 h-3.5 text-carbon" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg sm:text-xl text-carbon uppercase tracking-tight flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-carbon" />
                    <span>{exp.role}</span>
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-bold text-carbon/70 mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <ul className="space-y-2 pt-1 font-sans">
                  {exp.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-carbon leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-carbon flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
