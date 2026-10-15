# Portfolio Setup Guide

This guide explains:

- which APIs to configure;
- where to add your resume;
- where to add project screenshots; and
- how to add new projects.

## 1. Configure the APIs

Open [`.env.local`](./.env.local), or configure these values in your Vercel or Netlify dashboard under **Settings > Environment Variables**:

```env
# Google Gemini AI - powers the interactive portfolio AI chatbot
# Get a free key at https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key

# Resend - sends contact form messages to your inbox
# Get a key at https://resend.com
RESEND_API_KEY=your_resend_api_key
```

### What each API does

- **`GEMINI_API_KEY`** ([`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts))
  - Powers the interactive AI portfolio chatbot in the "Ask About Ashish" section.
  - Streams concise, grounded answers about your projects, metrics, and background.
  - **Quota & Bot Protection**: Extremely rate-limited (max 4 queries/min, 15 queries/hour per IP) and capped at a maximum of **10 chats per visitor session** with narrowed context windowing (~350 token prompt, 250 max output tokens) to preserve free tier API quota.
  - If it is empty or quota is exhausted, the app seamlessly serves its built-in verified factual fallback.

- **`RESEND_API_KEY`** ([`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts))
  - Sends contact form messages directly to `ashishramana1708@gmail.com`.
  - If it is empty, the contact form provides a one-click fallback that opens the visitor's mail client with the message pre-filled.

## 2. Add your resume

You have two options.

### Option A: Local PDF (recommended)

1. Export your resume as a PDF and name it `resume.pdf`.
2. Replace [`public/resume.pdf`](./public/resume.pdf).
3. Confirm that [`src/data/portfolio.ts`](./src/data/portfolio.ts#L151) contains:

   ```ts
   resumeUrl: "/resume.pdf",
   ```

### Option B: Google Drive or another hosted link

If you prefer to host your resume on Google Drive or Notion, update [`src/data/portfolio.ts`](./src/data/portfolio.ts#L151):

```ts
resumeUrl: "https://drive.google.com/file/d/your-resume-id/view?usp=sharing",
```

All **Resume** buttons in the Navbar, Hero banner, and Contact section use this URL automatically.

## 3. Add project screenshots

Place PNG, JPG, or WebP images in the [`public/projects/`](./public/projects/) directory:

```text
public/
└── projects/
    ├── loansense/
    │   ├── screenshot-1.png
    │   └── screenshot-2.png
    ├── employeemate/
    │   ├── screenshot-1.png
    │   └── screenshot-2.png
    ├── securepay/
    └── pathfinder/
```

Then connect the images to a project in [`src/data/portfolio.ts`](./src/data/portfolio.ts#L263-L272):

```ts
screenshots: [
  {
    src: "/projects/loansense/screenshot-1.png",
    caption: "Credit risk score prediction and borrower risk probability dashboard",
  },
  {
    src: "/projects/loansense/screenshot-2.png",
    caption: "SHAP explanation plot detailing influential risk factors for loan decisions",
  },
],
```

When visitors click a project card or **View Architecture & Metrics**, the modal displays these screenshots in a carousel with captions and interactive zoom.

## 4. Add a new project

All projects are managed in the `projects` array in [`src/data/portfolio.ts`](./src/data/portfolio.ts#L204).

Add a new object to `projects: [...]`:

```ts
{
  slug: "my-new-project",
  name: "DeepVision AI",
  year: "2025",
  tagline: "Real-Time Object Detection and Spatial Tracking Pipeline",
  problem: "High latency in standard vision models prevents real-time robotics deployment.",
  solution: "Engineered an edge-optimized YOLOv8 pipeline with TensorRT acceleration.",
  description: "An end-to-end computer vision pipeline optimized for real-time edge devices.",
  category: "ML", // Options: "AI Agents" | "ML" | "Full-Stack" | "Data Analytics"
  techStack: ["Python", "PyTorch", "YOLOv8", "FastAPI", "Docker", "OpenCV"],
  features: [
    "Fine-tuned YOLOv8 on custom annotated defect dataset",
    "Quantized weights with TensorRT achieving 3x inference acceleration",
    "WebSocket streaming backend built with FastAPI",
  ],
  architectureWorkflow: [
    "RTSP video stream frame ingestion",
    "Preprocessing and batch normalization",
    "TensorRT accelerated bounding box detection",
    "WebSocket broadcast to client UI",
  ],
  evaluation: {
    methodology: "Benchmarked on NVIDIA Jetson Orin Nano vs unquantized baseline.",
    metrics: [
      { label: "mAP@50", value: "89.4%", note: "+4.1% over base model" },
      { label: "Inference Latency", value: "14 ms", note: "Sub-30ms target" },
      { label: "FPS", value: "68 FPS", note: "Real-time stream" },
    ],
    limitations: "Sensitive to low-lighting conditions without infrared normalization.",
  },
  highlights: [
    "Sub-15ms edge inference latency",
    "89.4% mAP@50 accuracy",
  ],
  links: {
    github: "https://github.com/Ashh-2004/DeepVision-AI",
    live: "https://deepvision.example.com", // Optional
    demo: "https://youtu.be/...", // Optional
  },
  screenshots: [
    {
      src: "/projects/deepvision/screenshot-1.png",
      caption: "Real-time bounding box detection and confidence scores",
    },
  ],
  featured: true, // true shows it under Featured Highlights
},
```

### AI assistant integration

When you add a project to [`src/data/portfolio.ts`](./src/data/portfolio.ts), the AI assistant learns about it automatically. [`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts#L8-L19) builds its system prompt directly from the `portfolio.ts` data, so no additional chatbot code is required.
