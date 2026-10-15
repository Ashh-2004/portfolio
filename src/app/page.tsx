import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MarqueeStrip } from "@/components/marquee-strip";
import { AIChat } from "@/components/ai-chat";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-paper-white text-carbon">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <AIChat />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

