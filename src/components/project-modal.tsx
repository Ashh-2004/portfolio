"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/portfolio";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Cpu,
  CheckCircle,
  TrendingUp,
  Calendar,
  Sparkles,
  GitBranch,
  AlertTriangle,
} from "lucide-react";
import { GithubIcon } from "./icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabType = "overview" | "architecture" | "evaluation" | "features" | "tech" | "links";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Reset slide, error and tab when project changes
  useEffect(() => {
    setCurrentSlide(0);
    setImageError(false);
    setActiveTab("overview");
  }, [project?.slug]);

  // Reset image error whenever slide changes
  useEffect(() => {
    setImageError(false);
  }, [currentSlide]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const screenshots = project.screenshots || [];

  const nextSlide = () => {
    if (screenshots.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length);
      setImageError(false);
    }
  };

  const prevSlide = () => {
    if (screenshots.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      setImageError(false);
    }
  };

  const initials = project.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-carbon/60 backdrop-blur-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-paper-white rounded-card-lg border-2 border-carbon overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-carbon flex items-center justify-between bg-paper-white">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 text-xs font-sans font-bold rounded-pill bg-lavender text-carbon border border-carbon">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-carbon/70 font-sans font-bold">
              <Calendar className="w-3.5 h-3.5 text-carbon" />
              <span>{project.year}</span>
            </div>
            {project.featured && (
              <span className="px-3 py-0.5 text-xs font-sans font-bold rounded-pill bg-sunburst text-carbon border border-carbon">
                ★ Flagship Capstone
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-carbon bg-paper-white flex items-center justify-center text-carbon hover:bg-carbon hover:text-paper-white transition-colors active:scale-95"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Screenshot Carousel */}
          {screenshots.length > 0 && (
            <div className="relative bg-soft-mist/40 border-b border-carbon aspect-[16/9] max-h-[300px] sm:max-h-[340px] w-full flex items-center justify-center overflow-hidden group">
              {!imageError && screenshots[currentSlide]?.src ? (
                <Image
                  src={screenshots[currentSlide].src}
                  alt={screenshots[currentSlide].caption || project.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  unoptimized
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-soft-mist/40 select-none">
                  <div className="w-14 h-14 rounded-card bg-sunburst border border-carbon flex items-center justify-center font-display text-2xl text-carbon mb-2">
                    {initials}
                  </div>
                  <div className="font-display text-base text-carbon uppercase">
                    {project.name}
                  </div>
                  <div className="text-xs text-carbon/70 max-w-sm mt-1 font-sans">
                    {screenshots[currentSlide]?.caption || "System Architecture & Interface Preview"}
                  </div>
                </div>
              )}

              {/* Prev / Next controls */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 w-9 h-9 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center hover:bg-carbon hover:text-paper-white transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-3 w-9 h-9 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center hover:bg-carbon hover:text-paper-white transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-paper-white border border-carbon px-2.5 py-1 rounded-pill">
                    {screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentSlide(idx);
                          setImageError(false);
                        }}
                        className={`h-2 rounded-pill transition-all ${
                          idx === currentSlide
                            ? "bg-carbon w-5"
                            : "bg-carbon/30 w-2 hover:bg-carbon/60"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Caption */}
              {!imageError && screenshots[currentSlide]?.caption && (
                <div className="absolute top-3 left-3 bg-paper-white border border-carbon text-carbon text-xs font-sans font-bold px-3 py-1 rounded-pill max-w-[85%] truncate">
                  {screenshots[currentSlide].caption}
                </div>
              )}
            </div>
          )}

          {/* Project Details Content */}
          <div className="p-5 sm:p-7 space-y-5">
            <div>
              <h3 id="modal-project-title" className="font-display text-2xl sm:text-3xl text-carbon uppercase tracking-tight">
                {project.name}
              </h3>
              <p className="text-xs sm:text-sm text-carbon/80 font-sans font-medium mt-1">
                {project.tagline}
              </p>
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-carbon gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: "overview", label: "Problem & Solution", icon: Layers },
                { id: "architecture", label: "Architecture", icon: GitBranch },
                { id: "evaluation", label: "Evaluation & Benchmarks", icon: TrendingUp },
                { id: "features", label: "Features", icon: CheckCircle },
                { id: "tech", label: "Tech Stack", icon: Cpu },
                { id: "links", label: "Links", icon: ExternalLink },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-sans font-bold whitespace-nowrap transition-colors border ${
                      isSelected
                        ? "bg-carbon text-paper-white border-carbon"
                        : "bg-paper-white text-carbon border-transparent hover:border-carbon"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Problem & Solution Overview */}
            {activeTab === "overview" && (
              <div className="space-y-4 text-xs sm:text-sm text-carbon leading-relaxed font-sans">
                <div className="p-4 rounded-card bg-soft-mist/40 border border-carbon space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-ember flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-ember" />
                    <span>Problem Statement</span>
                  </div>
                  <p className="text-carbon/90">{project.problem}</p>
                </div>

                <div className="p-4 rounded-card bg-mint-pop/30 border border-carbon space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-carbon" />
                    <span>Solution &amp; Implementation</span>
                  </div>
                  <p className="text-carbon/90">{project.solution}</p>
                </div>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="p-4 rounded-card bg-paper-white border border-carbon space-y-2">
                    <div className="text-xs font-sans font-bold uppercase tracking-wider text-carbon/70">
                      Key Engineering Takeaways
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-sans font-bold text-carbon"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-carbon" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: System Architecture & Workflow */}
            {activeTab === "architecture" && (
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon/70">
                  Data Pipeline &amp; System Execution Flow:
                </div>

                {project.architectureWorkflow && project.architectureWorkflow.length > 0 ? (
                  <div className="relative pl-6 space-y-3.5">
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-carbon" />
                    {project.architectureWorkflow.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-3">
                        <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-sunburst border border-carbon flex items-center justify-center font-bold text-[10px] text-carbon">
                          {idx + 1}
                        </div>
                        <div className="p-3 rounded-card bg-paper-white border border-carbon flex-1 text-carbon/90 font-medium">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-carbon/70">{project.description}</p>
                )}
              </div>
            )}

            {/* Tab 3: Evaluation & Benchmarks */}
            {activeTab === "evaluation" && (
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                {project.evaluation ? (
                  <>
                    <div className="p-4 rounded-card bg-lavender border border-carbon space-y-1.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-carbon">
                        Evaluation Methodology
                      </div>
                      <p className="text-carbon/90">{project.evaluation.methodology}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.evaluation.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-card bg-paper-white border border-carbon space-y-1"
                        >
                          <div className="text-[11px] font-bold text-carbon/70 uppercase">
                            {m.label}
                          </div>
                          <div className="font-display text-xl text-carbon">
                            {m.value}
                          </div>
                          {m.note && (
                            <div className="text-[11px] text-carbon/80 font-medium">
                              {m.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {project.evaluation.limitations && (
                      <div className="p-3.5 rounded-card bg-soft-mist/40 border border-carbon space-y-1 text-xs">
                        <span className="font-bold text-carbon">Technical Scope &amp; Limitations: </span>
                        <span className="text-carbon/80">{project.evaluation.limitations}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 rounded-card bg-soft-mist/40 border border-carbon text-carbon/80">
                    Evaluation benchmarks not yet quantitatively tabulated.
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Features (Implemented vs Planned) */}
            {activeTab === "features" && (
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-carbon">
                    Implemented Features:
                  </div>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-carbon">
                        <CheckCircle className="w-4 h-4 text-carbon flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.plannedFeatures && project.plannedFeatures.length > 0 && (
                  <div className="pt-3 border-t border-carbon space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-carbon/70">
                      Planned &amp; Roadmap Enhancements:
                    </div>
                    <ul className="space-y-2">
                      {project.plannedFeatures.map((pf, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-carbon/80">
                          <span className="w-4 h-4 rounded-full border border-carbon flex items-center justify-center text-[10px] font-bold text-carbon mt-0.5">
                            +
                          </span>
                          <span>{pf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab 5: Tech Stack */}
            {activeTab === "tech" && (
              <div className="space-y-3 font-sans">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon/70">
                  Technologies, Frameworks &amp; Tooling:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-pill text-xs font-bold bg-soft-mist/40 text-carbon border border-carbon"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Repository & Live Links */}
            {activeTab === "links" && (
              <div className="flex flex-wrap gap-3 pt-2 font-sans">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-pill bg-paper-white text-carbon border border-carbon hover:bg-carbon hover:text-paper-white text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                )}

                {(project.links.live || project.links.demo) && (
                  <a
                    href={project.links.live || project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-pill bg-carbon text-paper-white border border-carbon hover:bg-carbon/90 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo / Deployment</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-carbon bg-paper-white flex justify-between items-center font-sans">
          <div className="text-xs text-carbon/70 font-semibold">
            Press <kbd className="px-2 py-0.5 bg-soft-mist rounded border border-carbon text-[10px] font-mono font-bold text-carbon">Esc</kbd> to close
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-pill bg-carbon text-paper-white border border-carbon hover:bg-carbon/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
