"use client";

import React from "react";
import { portfolio } from "@/data/portfolio";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phoneVal = portfolio.socials.phone || "";
  const cleanPhone = phoneVal.replace(/[^0-9+]/g, "");
  const waNumber = phoneVal.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${waNumber}`;

  return (
    <footer className="w-full bg-carbon text-paper-white border-t border-carbon py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="text-center md:text-left space-y-1">
          <div className="font-display text-lg text-paper-white tracking-tight uppercase flex items-center justify-center md:justify-start gap-2">
            <span>{portfolio.profile.name}</span>
            <span className="text-[10px] font-sans font-bold tracking-widest text-carbon bg-electric-blue px-2 py-0.5 rounded-pill">
              AI / ML
            </span>
          </div>
          <p className="text-xs text-paper-white/70 font-sans">
            © 2026 {portfolio.profile.name}. All rights reserved.
          </p>
        </div>

        {/* Social Links as white outlined pills */}
        <div className="flex items-center gap-3">
          {portfolio.socials.github && (
            <a
              href={portfolio.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-transparent text-paper-white hover:bg-paper-white hover:text-carbon border border-paper-white transition-colors duration-150 active:scale-95"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {portfolio.socials.linkedin && (
            <a
              href={portfolio.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-transparent text-paper-white hover:bg-paper-white hover:text-carbon border border-paper-white transition-colors duration-150 active:scale-95"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}

          {portfolio.socials.email && (
            <a
              href={`mailto:${portfolio.socials.email}`}
              className="p-2.5 rounded-full bg-transparent text-paper-white hover:bg-paper-white hover:text-carbon border border-paper-white transition-colors duration-150 active:scale-95"
              aria-label="Send Email"
              title={portfolio.socials.email}
            >
              <Mail className="w-4 h-4" />
            </a>
          )}

          {portfolio.socials.showPhone && phoneVal && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-transparent text-paper-white hover:bg-paper-white hover:text-carbon border border-paper-white transition-colors duration-150 active:scale-95"
              aria-label="WhatsApp Chat"
              title={`WhatsApp: ${phoneVal}`}
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          )}

          {portfolio.socials.showPhone && phoneVal && (
            <a
              href={`tel:${cleanPhone}`}
              className="p-2.5 rounded-full bg-transparent text-paper-white hover:bg-paper-white hover:text-carbon border border-paper-white transition-colors duration-150 active:scale-95"
              aria-label="Call phone"
              title={`Call: ${phoneVal}`}
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Back to Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-pill text-xs font-sans font-bold bg-transparent text-paper-white hover:bg-paper-white hover:text-carbon border border-paper-white transition-colors duration-150 active:scale-95"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
