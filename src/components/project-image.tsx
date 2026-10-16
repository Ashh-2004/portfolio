"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectImageProps {
  src?: string;
  alt: string;
  projectName: string;
  category: string;
  priority?: boolean;
  className?: string;
}

export function ProjectImage({
  src,
  alt,
  projectName,
  category,
  priority = false,
  className = "",
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Compute initials (e.g. "LoanSense AI" -> "LS", "SecurePay" -> "SP")
  const initials = projectName
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 bg-paper-white relative overflow-hidden select-none ${className}`}
      >
        {/* Decorative monogram emblem */}
        <div className="w-16 h-16 rounded-card bg-sunburst border border-carbon flex items-center justify-center font-display text-2xl text-carbon relative z-10 transition-transform group-hover:scale-105 duration-150">
          {initials}
        </div>

        <div className="mt-3 text-center relative z-10">
          <div className="font-display text-base text-carbon uppercase tracking-tight">
            {projectName}
          </div>
          <div className="text-[11px] font-sans font-bold text-carbon/70 uppercase tracking-wider mt-0.5">
            {category} System Architecture
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-paper-white overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top transition-transform duration-200 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        unoptimized
        onError={() => setHasError(true)}
      />
    </div>
  );
}
