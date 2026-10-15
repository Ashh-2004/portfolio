"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import {
  FileText,
  Mail,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useReducedMotion } from "@/lib/use-mounted";

const STAT_COLORS = [
  "bg-lavender",
  "bg-mint-pop",
  "bg-sunburst",
  "bg-soft-mist",
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const easeCurve = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      className="relative w-full bg-sky-wash border-b border-carbon pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Meta Bar: Availability + Location + Academic Credentials */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-sans font-bold bg-paper-white text-carbon border border-carbon">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-pop opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mint-pop border border-carbon" />
            </span>
            <span>{portfolio.profile.availability}</span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-sans font-semibold bg-paper-white text-carbon border border-carbon">
            <MapPin className="w-3.5 h-3.5 text-carbon" />
            <span>{portfolio.profile.location}</span>
          </div>

          {/* Degree Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-sans font-semibold bg-paper-white text-carbon border border-carbon">
            <CheckCircle2 className="w-3.5 h-3.5 text-carbon" />
            <span>MCA &apos;27 (BIT Bengaluru) • BCA &apos;25 (SJU)</span>
          </div>
        </div>

        {/* Display Stacked Name with Electric Blue Ribbon & Hand-cut Stickers */}
        <div className="relative my-2 sm:my-4">
          {/* Inflated Electric Blue Ribbon Motif in Background */}
          <div
            className="absolute -top-10 -left-6 md:-top-12 md:left-20 w-[300px] sm:w-[480px] md:w-[620px] pointer-events-none -z-0 opacity-90"
            aria-hidden="true"
          >
            <Image
              src="/art/ribbon-hero.svg"
              alt=""
              width={800}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Sticker 1: Terminal Prompt */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeCurve }}
            className="absolute -top-8 right-4 sm:right-28 md:right-48 z-20 pointer-events-none hidden sm:block"
            aria-hidden="true"
          >
            <Image
              src="/art/sticker-terminal.svg"
              alt=""
              width={130}
              height={90}
              className="w-28 sm:w-32 h-auto"
            />
          </motion.div>

          {/* Sticker 2: AI Neural Chip */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 8 }}
            transition={{ duration: 0.5, delay: 0.25, ease: easeCurve }}
            className="absolute top-20 sm:top-14 right-2 sm:right-10 md:right-14 z-20 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/art/sticker-chip.svg"
              alt=""
              width={100}
              height={100}
              className="w-18 sm:w-24 h-auto"
            />
          </motion.div>

          {/* Sticker 3: Pop Sparkle */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ duration: 0.5, delay: 0.35, ease: easeCurve }}
            className="absolute -bottom-4 left-2 sm:left-10 z-20 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/art/sticker-sparkle.svg"
              alt=""
              width={70}
              height={70}
              className="w-12 sm:w-16 h-auto"
            />
          </motion.div>

          {/* Commanding Name Title (Tuned 15-20% for balanced hierarchy) */}
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="relative z-10 font-display font-normal text-carbon uppercase tracking-tighter leading-[0.9] text-[clamp(2.75rem,8vw,7.5rem)]"
          >
            <span className="block">M ASHISH</span>
            <span className="block text-carbon">RAMANA</span>
          </motion.h1>
        </div>

        {/* Content Row: Primary Headline + Supporting Description + CTAs */}
        <div className="mt-6 max-w-4xl">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeCurve }}
            className="space-y-4 text-left"
          >
            {/* Primary Career Headline (Explicitly as requested) */}
            <div className="inline-block">
              <h2 className="font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-carbon tracking-tight bg-paper-white px-4 py-1.5 rounded-pill border border-carbon inline-flex items-center gap-2">
                <span>AI/ML Engineer</span>
                <span className="text-carbon/40">|</span>
                <span className="text-carbon">Applied AI &amp; Data Science</span>
              </h2>
            </div>

            {/* Supporting Description (Explicitly as requested) */}
            <p className="font-sans font-medium text-base sm:text-lg text-carbon/90 leading-snug max-w-3xl">
              {portfolio.profile.tagline}
            </p>

            {/* Concise Bio */}
            <p className="text-sm sm:text-base text-carbon/80 max-w-3xl leading-relaxed font-sans">
              {portfolio.profile.bio}
            </p>

            {/* Action Buttons: Solid Black Primary + Outlined Secondary + Socials */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={portfolio.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-pill text-xs sm:text-sm font-sans font-bold bg-carbon text-paper-white border border-carbon hover:bg-carbon/90 active:scale-95 transition-transform duration-150"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume PDF</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-pill text-xs sm:text-sm font-sans font-bold bg-paper-white text-carbon border border-carbon hover:bg-soft-mist active:scale-95 transition-transform duration-150"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#ai-chat"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-pill text-xs sm:text-sm font-sans font-bold bg-lavender text-carbon border border-carbon hover:bg-lavender/80 active:scale-95 transition-transform duration-150"
              >
                <Sparkles className="w-4 h-4 text-carbon" />
                <span>Ask AI Assistant</span>
              </a>

              {/* Easy-to-Discover GitHub & LinkedIn Icons */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={portfolio.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-paper-white text-carbon hover:bg-carbon hover:text-paper-white border border-carbon transition-colors active:scale-95"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={portfolio.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-paper-white text-carbon hover:bg-carbon hover:text-paper-white border border-carbon transition-colors active:scale-95"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Core Stack Pill Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-carbon/70 mr-1">
                Core Stack:
              </span>
              {portfolio.heroStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-sans font-bold rounded-pill bg-paper-white text-carbon border border-carbon"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stat Cards Grid: 4 Credible, Benchmark-Labeled Metrics */}
        {portfolio.stats && portfolio.stats.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeCurve }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr"
          >
            {portfolio.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`h-full p-5 rounded-card border border-carbon flex flex-col justify-between text-left space-y-2 ${
                  STAT_COLORS[idx % STAT_COLORS.length]
                }`}
              >
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-carbon tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs font-sans font-bold uppercase tracking-wide text-carbon mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
                <div className="text-[11px] font-sans font-medium text-carbon/75 pt-1 border-t border-carbon/20">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
