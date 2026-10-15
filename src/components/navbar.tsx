"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { Sparkles, ArrowUpRight, Plus } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Ask AI", href: "#ai-chat", id: "ai-chat" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Education", href: "#education", id: "education" },
  { name: "Contact", href: "#contact", id: "contact" },
];

function getElementDocumentTop(element: HTMLElement): number {
  let top = 0;
  let curr: HTMLElement | null = element;
  while (curr) {
    top += curr.offsetTop;
    curr = curr.offsetParent as HTMLElement | null;
  }
  return top;
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Robust scroll listener to track active section and scroll state
  useEffect(() => {
    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) return;
      isTicking = true;

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        setIsScrolled(scrollPosition > 20);

        // If at top of page
        if (scrollPosition < 120) {
          setActiveSection("hero");
          isTicking = false;
          return;
        }

        // If scrolled near bottom of page, activate contact
        if (scrollPosition + windowHeight >= documentHeight - 60) {
          setActiveSection("contact");
          isTicking = false;
          return;
        }

        // Find the section currently in view
        const targetOffset = scrollPosition + 140;
        let currentSection = "hero";

        for (const item of NAV_ITEMS) {
          const el = document.getElementById(item.id);
          if (el) {
            const top = getElementDocumentTop(el);
            const height = el.offsetHeight;
            if (targetOffset >= top && targetOffset < top + height) {
              currentSection = item.id;
              break;
            } else if (targetOffset >= top) {
              currentSection = item.id;
            }
          }
        }

        setActiveSection(currentSection);
        isTicking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler with exact floating navbar clearance offset
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActiveSection(id);
      setMobileMenuOpen(false);

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const navClearance = 84;
          const targetTop = Math.max(0, getElementDocumentTop(el) - navClearance);

          window.scrollTo({
            top: targetTop,
            behavior: shouldReduceMotion ? "auto" : "smooth",
          });

          window.history.pushState(null, "", `#${id}`);
        }
      }, 30);
    },
    [shouldReduceMotion]
  );

  return (
    <header
      className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none"
      role="banner"
    >
      {/* Floating Pill Container */}
      <motion.div
        initial={shouldReduceMotion ? false : { y: -16 }}
        animate={{ y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
        }
        className={`pointer-events-auto bg-paper-white border border-carbon rounded-pill transition-shadow duration-200 select-none ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* Desktop View: Centered Pill with 7 Nav Links + Resume Button */}
        <div className="hidden md:flex items-center gap-1.5 p-1.5">
          <nav
            className="flex items-center gap-1"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative px-3.5 lg:px-4 py-1.5 text-xs font-sans font-bold tracking-wide rounded-pill transition-colors duration-150 ${
                    isActive
                      ? "text-paper-white"
                      : "text-carbon hover:text-carbon/85 hover:bg-soft-mist/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-floating-pill"
                      className="absolute inset-0 bg-carbon rounded-pill z-0"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 450,
                              damping: 35,
                            }
                      }
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.name === "Ask AI" && (
                      <Sparkles
                        className={`w-3 h-3 ${
                          isActive
                            ? "text-electric-blue fill-electric-blue"
                            : "text-carbon fill-none"
                        }`}
                      />
                    )}
                    {item.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Thin vertical separator */}
          <div className="w-[1px] h-4 bg-carbon/25 mx-0.5" aria-hidden="true" />

          {/* Black Pill Resume Button */}
          <a
            href={portfolio.profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-sans font-bold bg-carbon text-paper-white hover:bg-carbon/90 active:scale-95 transition-transform"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile View: Compact Floating Header with Current Section & Toggle */}
        <div className="md:hidden flex items-center justify-between gap-3 px-3.5 py-1.5 min-w-[280px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-electric-blue" />
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-carbon">
              {NAV_ITEMS.find((i) => i.id === activeSection)?.name || "Navigation"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={portfolio.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-pill text-[11px] font-sans font-bold bg-carbon text-paper-white active:scale-95 transition-transform flex items-center gap-1"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full border border-carbon bg-paper-white flex items-center justify-center text-carbon active:scale-95 transition-transform"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Dropdown Card: Clean Floating Card directly below the pill */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
            className="pointer-events-auto mt-2 w-full max-w-[320px] bg-paper-white border border-carbon rounded-card p-2.5 shadow-lg space-y-1 md:hidden select-none"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`block px-3.5 py-2 rounded-pill text-xs font-sans font-bold border transition-colors ${
                    isActive
                      ? "bg-carbon text-paper-white border-carbon"
                      : "bg-paper-white text-carbon border-transparent hover:bg-soft-mist/60 hover:border-carbon/30"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {item.name === "Ask AI" && (
                        <Sparkles
                          className={`w-3.5 h-3.5 ${
                            isActive
                              ? "text-electric-blue fill-electric-blue"
                              : "text-carbon"
                          }`}
                        />
                      )}
                      {item.name}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                    )}
                  </span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
