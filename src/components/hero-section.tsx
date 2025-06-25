"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full">
      <div className="container mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 md:px-6">
        <div className="text-center">
          <h1
            className={cn(
              "font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl transition-opacity duration-1000 ease-in",
              isMounted ? "opacity-100" : "opacity-0"
            )}
          >
            Hi, I’m <span className="text-primary">Ashish</span> — a Data Analyst
          </h1>
          <p
            className={cn(
              "mt-4 font-headline text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl transition-opacity duration-1000 ease-in delay-300",
              isMounted ? "opacity-100" : "opacity-0"
            )}
          >
            passionate about decoding data into decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
