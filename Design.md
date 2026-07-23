---
version: "1.0.0"
name: "Aura AI Portfolio"
description: "Visual system for high-performance automation and AI engineering portfolios."
colors:
  background-primary: "#F3F3F1"
  background-canvas: "#D6D3D1"
  background-dark: "#08090A"
  text-primary: "#0A0A0A"
  text-secondary: "#6B7280"
  accent-blue: "#2563EB"
  accent-blue-soft: "#60A5FA"
  accent-emerald: "#10B981"
  border-subtle: "#E5E7EB"
  shadow-color: "rgba(107, 114, 128, 0.5)"
typography:
  display:
    family: "Inter"
    weight: 600
    line-height: "0.85"
    letter-spacing: "-0.05em"
  heading:
    family: "Inter"
    weight: 500
    line-height: "1.15"
    letter-spacing: "-0.025em"
  body:
    family: "Inter"
    weight: 400
    line-height: "1.6"
  label:
    family: "Inter"
    weight: 600
    size: "0.65rem"
    letter-spacing: "0.25em"
    case: "uppercase"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "80px"
rounded:
  small: "8px"
  medium: "12px"
  large: "24px"
  container: "40px"
  pill: "999px"
components:
  header:
    layout: "flex"
    padding: "32px 48px"
    z-index: 50
  hero:
    layout: "grid"
    columns: 2
    image-position: "absolute-fill"
  button-primary:
    bg: "#1A1A1A"
    text: "#FFFFFF"
    rounded: "pill"
    padding: "12px 24px"
  card-project:
    layout: "grid"
    gap: "48px"
    rounded: "40px"
  badge-floating:
    bg: "#000000"
    text: "#FFFFFF"
    rotation: "-2deg"
motion:
  hover-scale: "1.05"
  hover-rotate: "0deg"
  transition-standard: "all 0.3s ease"
  image-zoom: "scale-105"
---
## Overview
A sophisticated engineering-first aesthetic that balances brutalist high-contrast typography with soft, organic container shapes. Designed to convey precision and technological depth.

## Colors
The palette is anchored in off-white stone tones and deep blacks. Electric blue serves as the primary functional accent for AI-related highlights, while muted emerald and orange define secondary product identities.

## Typography
Relies heavily on 'Inter' to bridge technical documentation and marketing. High contrast is achieved through extreme scale differences—pairing massive tracking-tight display headers with tiny, widely-spaced labels.

## Spacing
A generous 8pt grid system. Page-level containers use aggressive internal padding (32px+) to create a sense of breathability and premium layout design.

## Layout
Uses a 'Main Container' philosophy where the entire application lives within a rounded parent frame nested inside the viewport. Utilizes 50/50 split grids for hero and project showcases.

## Elevation & Depth
Depth is created through large, soft shadows on primary containers and subtle backdrop-blurs on floating elements. High-contrast dark sections use radial gradients and noise overlays to imply depth without physical shadows.

## Shapes
Signature 40px (2.5rem) corner radii for containers and 999px pill shapes for interactive elements. This softens the high-contrast typography to feel approachable.

## Components
- **Nav**: Minimalist logo (3-bar variable height) with uppercase tracking links.
- **Hero**: Asymmetric layout with an absolute-positioned rotating badge.
- **Project Grid**: Alternating image-and-text stacks with 'inner-shadow' bg plates for mockups.
- **Dark Section**: High-impact quote area using grain noise and blue ambient glows.
- **Mockups**: Framed within device-inspired borders (8px thick) with subtle rotations.

## Motion
Micro-interactions focus on 'Scaling' and 'Rotation'. Buttons scale 105% on hover. Floating badges transition from -2deg to 0deg. Images use slow 700ms zooms on container hover.

## Do's and Don'ts
- **Do** use uppercase with 0.2em+ tracking for all small labels.
- **Do** use negative line-height values for display headers to stack them tightly.
- **Don't** use sharp corners for primary containers.
- **Don't** over-saturate backgrounds; keep them stone-based (#F3F3F1).

## Accessibility
Maintain 4.5:1 contrast for secondary gray text against stone backgrounds. Use 0.7rem as the absolute minimum font size for labels to ensure legibility despite uppercase tracking.