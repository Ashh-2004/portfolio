"use client";

import React from "react";
import { portfolio } from "@/data/portfolio";
import { GraduationCap, Calendar, CheckCircle } from "lucide-react";

const EDU_CARD_BG = ["bg-paper-white", "bg-lavender"];

export function EducationSection() {
  return (
    <section id="education" className="py-16 sm:py-20 bg-concrete-gray border-b border-carbon w-full scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill text-xs font-sans font-bold bg-paper-white text-carbon border border-carbon">
            <span className="w-2 h-2 rounded-full bg-electric-blue" />
            <span>ACADEMIC FOUNDATIONS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-carbon tracking-tight uppercase leading-[0.95]">
            FORMAL EDUCATION
          </h2>

          <p className="text-sm sm:text-base text-carbon/80 font-sans max-w-xl mx-auto">
            Rigorous foundations in computer science, distributed algorithms, databases, and applied machine learning.
          </p>
        </div>

        {/* 2 Education Cards with 40px Radius */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto auto-rows-fr select-none">
          {portfolio.education.map((edu, idx) => (
            <div
              key={idx}
              className={`h-full p-6 sm:p-7 rounded-card-lg ${
                EDU_CARD_BG[idx % EDU_CARD_BG.length]
              } border border-carbon flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-carbon" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold px-3 py-1 rounded-pill bg-paper-white text-carbon border border-carbon">
                    <Calendar className="w-3.5 h-3.5 text-carbon" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl text-carbon uppercase tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-sans font-bold text-carbon mt-1">
                    {edu.institution}
                  </div>
                  {edu.university && (
                    <div className="text-xs text-carbon/70 font-sans font-semibold mt-0.5">
                      Affiliated to {edu.university}
                    </div>
                  )}
                </div>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="space-y-2 pt-3 border-t border-carbon font-sans">
                    {edu.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-carbon leading-relaxed"
                      >
                        <CheckCircle className="w-4 h-4 text-carbon flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Status / CGPA */}
              <div className="pt-4 border-t border-carbon flex items-center justify-between text-xs font-sans font-bold">
                <span className="text-carbon/70">Academic Standing</span>
                <span className="text-carbon bg-sunburst px-3.5 py-1 rounded-pill border border-carbon">
                  {edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.score || "In Progress"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
