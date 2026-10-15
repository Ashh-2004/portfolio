"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolio, Project } from "@/data/portfolio";
import { ProjectModal } from "./project-modal";
import { ProjectImage } from "./project-image";
import {
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Layers,
} from "lucide-react";
import { GithubIcon } from "./icons";

const CARD_BG_COLORS = [
  "bg-lavender",
  "bg-mint-pop",
  "bg-sky-wash",
  "bg-paper-white",
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive categories from verified portfolio projects
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(portfolio.projects.map((p) => p.category))
    );
    return ["All", ...uniqueCats];
  }, []);

  // Filter projects with Flagship first
  const filteredProjects = useMemo(() => {
    let list = portfolio.projects;
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    return [...list].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-20 bg-concrete-gray border-b border-carbon w-full scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (15-20% smaller heading for balanced hierarchy) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5 relative">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-sans font-bold bg-paper-white text-carbon border border-carbon">
              <span className="w-2 h-2 rounded-full bg-electric-blue" />
              <span>CAPSTONE SHOWCASE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-carbon tracking-tight uppercase leading-[0.95]">
              PROJECTS &amp; CASE STUDIES
            </h2>

            <p className="text-xs sm:text-sm text-carbon/85 font-sans max-w-xl leading-relaxed">
              Applied machine learning systems, retrieval-augmented generation architectures, and high-throughput transaction evaluation rule engines.
            </p>
          </div>

          {/* Decorative Sticker */}
          <div className="absolute top-0 right-0 hidden lg:block pointer-events-none" aria-hidden="true">
            <Image
              src="/art/sticker-chart.svg"
              alt=""
              width={90}
              height={80}
              className="w-18 h-auto -rotate-6"
            />
          </div>

          {/* Category Filter Tabs with Sliding Pill */}
          <div className="flex items-center gap-1 p-1 bg-paper-white rounded-pill border border-carbon overflow-x-auto max-w-full flex-nowrap scrollbar-none z-10">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-1.5 rounded-pill text-xs font-sans font-bold whitespace-nowrap flex-shrink-0 transition-colors duration-150 ${
                    isSelected ? "text-paper-white" : "text-carbon hover:text-carbon/80"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="project-tab-pill"
                      className="absolute inset-0 bg-carbon rounded-pill -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Equal Height Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {filteredProjects.map((project, idx) => {
            const mainScreenshot =
              project.screenshots && project.screenshots[0]
                ? project.screenshots[0].src
                : undefined;

            const remainingTech = project.techStack.slice(5).join(", ");
            const cardBg = CARD_BG_COLORS[idx % CARD_BG_COLORS.length];

            return (
              <div
                key={project.slug}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-card ${cardBg} border border-carbon transition-transform duration-150 active:scale-[0.99] overflow-hidden flex flex-col justify-between h-full select-none`}
              >
                {/* Image Preview Container */}
                <div className="relative aspect-[16/10] w-full bg-paper-white border-b border-carbon overflow-hidden">
                  <ProjectImage
                    src={mainScreenshot}
                    alt={project.name}
                    projectName={project.name}
                    category={project.category}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-20">
                    <span className="px-3 py-1 text-xs font-sans font-bold rounded-pill bg-paper-white text-carbon border border-carbon">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="px-3 py-1 text-xs font-sans font-bold rounded-pill bg-sunburst text-carbon border border-carbon">
                        ★ Flagship
                      </span>
                    )}
                  </div>

                  {/* Metric Highlight Badge */}
                  {project.highlights && project.highlights[0] && (
                    <div className="absolute bottom-3 left-3 bg-paper-white px-3 py-1 rounded-pill border border-carbon flex items-center gap-1.5 text-xs font-sans font-bold text-carbon z-20">
                      <TrendingUp className="w-3.5 h-3.5 text-carbon" />
                      <span>{project.highlights[0]}</span>
                    </div>
                  )}
                </div>

                {/* Card Text Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-xl sm:text-2xl text-carbon group-hover:underline flex items-center gap-1.5 uppercase tracking-tight">
                        <span>{project.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-carbon opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <span className="text-xs font-sans font-bold px-2.5 py-0.5 rounded-pill bg-paper-white border border-carbon text-carbon">
                        {project.year}
                      </span>
                    </div>

                    {/* Problem / Solution Summary */}
                    <p className="text-xs sm:text-sm text-carbon/80 font-sans line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-sans font-bold rounded-pill bg-paper-white text-carbon border border-carbon"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span
                        title={remainingTech}
                        className="px-2.5 py-1 text-[11px] font-sans font-bold rounded-pill bg-paper-white text-carbon/70 border border-carbon"
                      >
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Row: Action Links */}
                  <div className="pt-3 border-t border-carbon flex items-center justify-between">
                    <span className="text-xs font-sans font-bold text-carbon underline flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Inspect Architecture &amp; Benchmarks →</span>
                    </span>

                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-paper-white text-carbon hover:bg-carbon hover:text-paper-white border border-carbon transition-colors"
                          title="GitHub Repository"
                          aria-label={`${project.name} GitHub Repository`}
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {(project.links.live || project.links.demo) && (
                        <a
                          href={project.links.live || project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-carbon text-paper-white hover:bg-carbon/80 border border-carbon transition-colors"
                          title="Live Demo"
                          aria-label={`${project.name} Live Demo`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal Drawer */}
      <ProjectModal
        key={selectedProject?.slug || "none"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
