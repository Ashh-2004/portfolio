"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  Send,
  Loader2,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);
  const [statusBanner, setStatusBanner] = useState<{
    type: "success" | "warning" | "error";
    text: string;
  } | null>(null);

  const phoneVal = portfolio.socials.phone || "";
  const cleanPhone = phoneVal.replace(/[^0-9+]/g, "");
  const waNumber = phoneVal.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${waNumber}`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errs.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim() || formData.subject.length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please resolve form errors before sending.");
      return;
    }

    setIsSubmitting(true);
    setStatusBanner(null);
    setFallbackMailto(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Message sent successfully!");
        setStatusBanner({
          type: "success",
          text: data.message || "Your message has been delivered to Ashish's inbox!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        // Transparent fallback handling if backend email dispatch is unconfigured
        const fallback =
          data.mailtoFallback ||
          `mailto:${portfolio.socials.email}?subject=${encodeURIComponent(
            `Inquiry: ${formData.subject}`
          )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
          )}`;
        setFallbackMailto(fallback);
        setStatusBanner({
          type: data.deliveryStatus === "unconfigured" ? "warning" : "error",
          text:
            data.message ||
            "Direct transmission unavailable. Click below to send pre-filled email directly.",
        });
        toast.info("Please click the fallback button to send via your email client.");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to deliver message";
      const fallback = `mailto:${portfolio.socials.email}?subject=${encodeURIComponent(
        `Inquiry: ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      setFallbackMailto(fallback);
      setStatusBanner({
        type: "error",
        text: `${msg}. You can still send directly using your mail application below.`,
      });
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-sky-wash border-b border-carbon w-full scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill text-xs font-sans font-bold bg-paper-white text-carbon border border-carbon">
            <span className="w-2 h-2 rounded-full bg-electric-blue" />
            <span>DIRECT INQUIRIES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-carbon tracking-tight uppercase leading-[0.95]">
            GET IN TOUCH
          </h2>

          <p className="text-sm sm:text-base text-carbon/80 font-sans max-w-xl mx-auto">
            Discussing machine learning pipelines, production architectures, or AI/ML and Data roles? Send a direct message.
          </p>

          {/* Decorative Sticker */}
          <div className="absolute -top-4 right-2 sm:right-8 hidden md:block pointer-events-none" aria-hidden="true">
            <Image
              src="/art/sticker-shield.svg"
              alt=""
              width={90}
              height={90}
              className="w-16 h-auto rotate-6"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-card bg-paper-white border border-carbon space-y-5 select-none">
              <h3 className="font-display text-2xl text-carbon uppercase tracking-tight">
                Contact Channels
              </h3>

              {/* Email Card */}
              <a
                href={`mailto:${portfolio.socials.email}`}
                className="flex items-center gap-4 p-3.5 rounded-card bg-soft-mist/40 border border-carbon hover:bg-soft-mist transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-carbon" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-sans font-bold uppercase tracking-wider text-carbon/70">
                    Email
                  </div>
                  <div className="text-sm font-sans font-bold text-carbon truncate">
                    {portfolio.socials.email}
                  </div>
                </div>
              </a>

              {/* WhatsApp Card */}
              {portfolio.socials.showPhone && portfolio.socials.phone && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-card bg-mint-pop/20 border border-carbon hover:bg-mint-pop/35 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-bold uppercase tracking-wider text-carbon/70 flex items-center gap-1.5">
                      <span>WhatsApp Direct</span>
                      <ExternalLink className="w-3 h-3 text-carbon/60" />
                    </div>
                    <div className="text-sm font-sans font-bold text-carbon">
                      {portfolio.socials.phone}
                    </div>
                  </div>
                </a>
              )}

              {/* Phone Card */}
              {portfolio.socials.showPhone && portfolio.socials.phone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center gap-4 p-3.5 rounded-card bg-soft-mist/40 border border-carbon hover:bg-soft-mist transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-bold uppercase tracking-wider text-carbon/70">
                      Phone Call
                    </div>
                    <div className="text-sm font-sans font-bold text-carbon">
                      {portfolio.socials.phone}
                    </div>
                  </div>
                </a>
              )}

              {/* Location Card */}
              <div className="flex items-center gap-4 p-3.5 rounded-card bg-soft-mist/40 border border-carbon">
                <div className="w-10 h-10 rounded-full bg-paper-white text-carbon border border-carbon flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-carbon" />
                </div>
                <div>
                  <div className="text-xs font-sans font-bold uppercase tracking-wider text-carbon/70">
                    Location
                  </div>
                  <div className="text-sm font-sans font-bold text-carbon">
                    {portfolio.profile.location}
                  </div>
                </div>
              </div>

              {/* Resume CTA */}
              <div className="pt-2">
                <a
                  href={portfolio.profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-pill bg-carbon text-paper-white font-sans font-bold text-sm hover:bg-carbon/90 border border-carbon transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-carbon flex items-center justify-center gap-3">
                {portfolio.socials.github && (
                  <a
                    href={portfolio.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-paper-white text-carbon hover:bg-carbon hover:text-paper-white border border-carbon transition-colors active:scale-95"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
                {portfolio.socials.linkedin && (
                  <a
                    href={portfolio.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-paper-white text-carbon hover:bg-carbon hover:text-paper-white border border-carbon transition-colors active:scale-95"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Working Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-7 rounded-card bg-paper-white border border-carbon space-y-4"
            >
              <h3 className="font-display text-2xl text-carbon uppercase tracking-tight">
                Send a Direct Message
              </h3>

              {statusBanner && (
                <div
                  className={`p-3.5 rounded-card border text-xs font-sans leading-relaxed flex items-start gap-2.5 ${
                    statusBanner.type === "success"
                      ? "bg-mint-pop/20 border-carbon text-carbon font-semibold"
                      : statusBanner.type === "warning"
                      ? "bg-sunburst/25 border-carbon text-carbon"
                      : "bg-ember/15 border-carbon text-carbon"
                  }`}
                >
                  {statusBanner.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-carbon flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-carbon flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2 flex-1">
                    <p>{statusBanner.text}</p>
                    {fallbackMailto && (
                      <a
                        href={fallbackMailto}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-carbon text-paper-white font-sans font-bold text-xs hover:bg-carbon/90 border border-carbon transition-transform active:scale-95"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email Client (Pre-filled)</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-carbon">
                    Your Name <span className="text-ember">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Jane Doe"
                    className={`w-full px-4 py-3 rounded-card bg-soft-mist/40 text-carbon font-sans text-sm border focus:outline-none focus:ring-2 focus:ring-voltage-violet placeholder:text-carbon/50 ${
                      errors.name ? "border-ember" : "border-carbon"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-ember font-sans font-bold">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-carbon">
                    Email Address <span className="text-ember">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. jane@company.com"
                    className={`w-full px-4 py-3 rounded-card bg-soft-mist/40 text-carbon font-sans text-sm border focus:outline-none focus:ring-2 focus:ring-voltage-violet placeholder:text-carbon/50 ${
                      errors.email ? "border-ember" : "border-carbon"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-ember font-sans font-bold">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-carbon">
                  Subject <span className="text-ember">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. AI/ML Engineering Discussion"
                  className={`w-full px-4 py-3 rounded-card bg-soft-mist/40 text-carbon font-sans text-sm border focus:outline-none focus:ring-2 focus:ring-voltage-violet placeholder:text-carbon/50 ${
                    errors.subject ? "border-ember" : "border-carbon"
                  }`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-ember font-sans font-bold">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-carbon">
                  Message <span className="text-ember">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Hi Ashish, we reviewed your projects and would love to discuss..."
                  className={`w-full px-4 py-3 rounded-card bg-soft-mist/40 text-carbon font-sans text-sm border focus:outline-none focus:ring-2 focus:ring-voltage-violet resize-none placeholder:text-carbon/50 ${
                    errors.message ? "border-ember" : "border-carbon"
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-ember font-sans font-bold">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-pill bg-carbon text-paper-white font-sans font-bold text-sm hover:bg-carbon/90 border border-carbon transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-paper-white" />
                    <span>Delivering Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
