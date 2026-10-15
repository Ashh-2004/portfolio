# M Ashish Ramana - AI/ML & Data Engineer Portfolio

A production-grade, high-performance, single-page developer portfolio built for **AI/ML Engineers, Data Scientists, and Data Analysts** targeting product startups. Driven 100% by a single configuration file (`src/data/portfolio.ts`).

---

## 🚀 Key Features

- **Single Source of Truth (`src/data/portfolio.ts`)**: Update your bio, projects, metrics, skills, socials, education, and resume link without touching any component code.
- **Dynamic CSS Variable Theme Engine**: Supports 4 curated accent palettes (`orange`, `violet`, `emerald`, `blue`) and seamless Dark/Light modes.
- **Interactive AI Assistant ("Ask about me")**: Grounded directly on your portfolio data with streaming Gemini responses, rate limiting, and graceful fallback.
- **Projects Showcase & Interactive Drawer**: Filter by category (`AI Agents`, `ML`, `Full-Stack`, `Data Analytics`) with modal carousel, architecture breakdown, and impact highlights.
- **Validated Contact Form**: Client & server Zod validation, toast notifications, with support for Resend / Formspree.
- **Production Performance**: Zero layout shift, responsive at desktop (1440px), tablet (768px), and mobile (390px), WCAG AA accessible.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/) + TypeScript (strict)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand icons
- **AI Integration**: [Google Gemini API](https://aistudio.google.com/) via `@google/generative-ai`
- **Validation & Notifications**: [Zod](https://zod.dev/) + [Sonner](https://sonner.emilkowal.ski/)

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your free Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Get a free key in 30 seconds at [Google AI Studio](https://aistudio.google.com/app/apikey).)*

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 How to Update Your Portfolio

### Where to Put Assets
- **Avatar Photo**: Replace `/public/avatar.jpg` with your photo.
- **Resume PDF**: Drop your latest resume at `/public/resume.pdf`.
- **Project Screenshots**: Add images in `/public/projects/<project-slug>/screenshot-1.png`.

---

### How to Edit Your Bio, Roles, and Socials
Open `src/data/portfolio.ts` and modify the `profile` and `socials` sections:

```ts
export const portfolio = {
  profile: {
    name: "M Ashish Ramana",
    title: "AI/ML Engineer & Data Scientist",
    bio: "Your updated 2-3 line bio...",
    location: "Bengaluru, Karnataka, India",
    availability: "Open to Work • Immediate Onboarding",
    typedRoles: [
      "AI / Machine Learning Engineer",
      "Data Scientist & Modeler",
      "Data Analyst & BI Specialist",
    ],
  },
  socials: {
    email: "ashishramana1708@gmail.com",
    phone: "+91 9964700146",
    github: "https://github.com/Ashh-2004",
    linkedin: "https://linkedin.com/in/ashish-ramana-2ash4",
    twitter: "https://x.com/yourhandle",
    kaggle: "https://kaggle.com/yourprofile",
  },
  // ...
};
```

---

### How to Add a New Project
Simply add a new object to the `projects` array in `src/data/portfolio.ts`:

```ts
{
  slug: "my-new-project",
  name: "FraudShield Real-Time",
  year: "2026",
  tagline: "Sub-millisecond payment anomaly detection",
  description: "Detailed overview of the problem, algorithms used, and results...",
  category: "ML", // "AI Agents" | "ML" | "Full-Stack" | "Data Analytics"
  techStack: ["Python", "XGBoost", "FastAPI", "Docker"],
  features: [
    "High-throughput sliding window feature generation",
    "SHAP value explanations for audit trails",
  ],
  highlights: [
    "99.4% ROC-AUC score",
    "<1ms latency SLA",
  ],
  links: {
    github: "https://github.com/Ashh-2004/my-new-project",
    live: "https://my-demo-url.com",
  },
  screenshots: [
    { src: "/projects/my-new-project/screenshot-1.png", caption: "Dashboard overview" },
  ],
  featured: true, // true to display prominently
}
```

---

### How to Change the Theme & Accent Color
In `src/data/portfolio.ts`:

```ts
theme: {
  accent: "orange", // Choose from: "orange" | "violet" | "emerald" | "blue"
  defaultMode: "dark", // "dark" | "light" | "system"
}
```
*Tip: Visitors can also switch accents dynamically in real-time using the palette icon in the navigation bar!*

---

## 🚢 Step-by-Step Vercel Deployment Guide

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete developer portfolio"
   git branch -M main
   git remote add origin https://github.com/Ashh-2004/Portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **Add New...** -> **Project**.
   - Select your `Portfolio` repository and click **Import**.
   - Under **Environment Variables**, add:
     - `GEMINI_API_KEY`: *(your Gemini key)*
     - `RESEND_API_KEY`: *(optional, if using Resend email delivery)*
   - Click **Deploy**.

3. **Custom Domain (Optional)**:
   - Go to **Project Settings** -> **Domains**.
   - Add your custom domain (e.g. `ashishramana.dev`) and point your DNS records according to Vercel's instructions.

---

## 📄 License
MIT License. Created by M Ashish Ramana.
