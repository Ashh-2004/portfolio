const fs = require("fs");
const path = require("path");

// 1. Create valid resume.pdf
const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 175 >>
stream
BT
/F1 22 Tf
50 720 Td
(M Ashish Ramana - AI/ML Engineer Resume) Tj
/F1 12 Tf
0 -30 Td
(Email: ashishramana1708@gmail.com  |  Phone: +91 9964700146) Tj
0 -25 Td
(Target Roles: AI/ML Engineer, Data Scientist, Data Analyst) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000226 00000 n 
0000000450 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
520
%%EOF`;

fs.writeFileSync(path.join(__dirname, "../public/resume.pdf"), pdfContent);
console.log("Created public/resume.pdf");

// Helper function to create stylish SVG UI mockups
function createMockupSVG(title, subtitle, metric, details) {
  return `<svg width="1200" height="750" viewBox="0 0 1200 750" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" rx="16" fill="#0E1118"/>
    <!-- Window Bar -->
    <rect width="1200" height="48" rx="16" fill="#181B26"/>
    <circle cx="28" cy="24" r="6" fill="#EF4444"/>
    <circle cx="48" cy="24" r="6" fill="#F59E0B"/>
    <circle cx="68" cy="24" r="6" fill="#10B981"/>
    <text x="100" y="28" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13" font-weight="500">${title.toLowerCase().replace(/\\s+/g, '-')}.local</text>
    
    <!-- Accent Top Line -->
    <rect y="48" width="1200" height="2" fill="url(#paint_accent)"/>
    
    <!-- Sidebar -->
    <rect x="0" y="50" width="220" height="700" fill="#131622"/>
    <rect x="24" y="80" width="170" height="36" rx="8" fill="#22283A"/>
    <text x="40" y="103" fill="#F97316" font-family="system-ui, sans-serif" font-size="14" font-weight="600">📊 Overview</text>
    <rect x="24" y="130" width="170" height="32" rx="8" fill="transparent"/>
    <text x="40" y="151" fill="#64748B" font-family="system-ui, sans-serif" font-size="14">⚙️ Model Parameters</text>
    <rect x="24" y="174" width="170" height="32" rx="8" fill="transparent"/>
    <text x="40" y="195" fill="#64748B" font-family="system-ui, sans-serif" font-size="14">📈 Performance</text>
    <rect x="24" y="218" width="170" height="32" rx="8" fill="transparent"/>
    <text x="40" y="239" fill="#64748B" font-family="system-ui, sans-serif" font-size="14">🔒 Guardrails</text>

    <!-- Main Content Area -->
    <text x="260" y="110" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="28" font-weight="700">${title}</text>
    <text x="260" y="140" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="16">${subtitle}</text>

    <!-- Metric Card 1 -->
    <rect x="260" y="170" width="280" height="130" rx="12" fill="#181B28" stroke="#2B3245" stroke-width="1.5"/>
    <text x="284" y="205" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="14">Primary Benchmark</text>
    <text x="284" y="255" fill="#F97316" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${metric}</text>
    <text x="284" y="280" fill="#10B981" font-family="system-ui, sans-serif" font-size="13">▲ Validated production metric</text>

    <!-- Metric Card 2 -->
    <rect x="560" y="170" width="280" height="130" rx="12" fill="#181B28" stroke="#2B3245" stroke-width="1.5"/>
    <text x="584" y="205" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="14">Execution Mode</text>
    <text x="584" y="255" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="32" font-weight="700">Real-Time</text>
    <text x="584" y="280" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13">Continuous pipeline monitoring</text>

    <!-- Metric Card 3 -->
    <rect x="860" y="170" width="280" height="130" rx="12" fill="#181B28" stroke="#2B3245" stroke-width="1.5"/>
    <text x="884" y="205" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="14">Status</text>
    <text x="884" y="255" fill="#10B981" font-family="system-ui, sans-serif" font-size="32" font-weight="700">Healthy</text>
    <text x="884" y="280" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13">0 Critical anomalies</text>

    <!-- Graph / Visual Dashboard -->
    <rect x="260" y="325" width="880" height="375" rx="14" fill="#161925" stroke="#262D40" stroke-width="1.5"/>
    <text x="290" y="365" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="18" font-weight="600">Model Evaluation &amp; Feature Attribution</text>
    <text x="290" y="390" fill="#64748B" font-family="system-ui, sans-serif" font-size="13">${details}</text>

    <!-- Chart visualization lines -->
    <path d="M 300 630 Q 420 540, 520 580 T 700 480 T 900 440 T 1100 410" fill="none" stroke="#F97316" stroke-width="4"/>
    <path d="M 300 630 Q 420 540, 520 580 T 700 480 T 900 440 T 1100 410 L 1100 650 L 300 650 Z" fill="url(#area_gradient)" opacity="0.3"/>
    
    <!-- Grid lines -->
    <line x1="300" y1="450" x2="1100" y2="450" stroke="#262D40" stroke-dasharray="4 4"/>
    <line x1="300" y1="520" x2="1100" y2="520" stroke="#262D40" stroke-dasharray="4 4"/>
    <line x1="300" y1="590" x2="1100" y2="590" stroke="#262D40" stroke-dasharray="4 4"/>

    <defs>
      <linearGradient id="paint_accent" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F97316"/>
        <stop offset="0.5" stop-color="#FB923C"/>
        <stop offset="1" stop-color="#E11D48"/>
      </linearGradient>
      <linearGradient id="area_gradient" x1="0" y1="410" x2="0" y2="650" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F97316" stop-opacity="0.8"/>
        <stop offset="1" stop-color="#F97316" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>`;
}

// 2. Create screenshots for all 4 projects
const assets = [
  {
    path: "../public/projects/loansense/screenshot-1.png",
    svg: createMockupSVG("LoanSense AI", "Explainable Credit Risk Platform", "51.56% Recall", "XGBoost Classifier vs Logistic Regression with confusion matrix analysis")
  },
  {
    path: "../public/projects/loansense/screenshot-2.png",
    svg: createMockupSVG("LoanSense AI - SHAP", "Global & Local Feature Explanations", "57.12% F1", "SHAP summary plots, waterfall values, and natural-language MySQL queries")
  },
  {
    path: "../public/projects/employeemate/screenshot-1.png",
    svg: createMockupSVG("EmployeeMate", "RAG & Agentic Employee Assistant", "CrossEncoder", "ChromaDB dense embeddings with multi-turn conversational memory")
  },
  {
    path: "../public/projects/employeemate/screenshot-2.png",
    svg: createMockupSVG("EmployeeMate - Agent Routing", "Policy Dispatcher & Security Guardrails", "JWT / RBAC", "Prompt-injection defenses and automated leave workflow routing")
  },
  {
    path: "../public/projects/pathfinder/screenshot-1.png",
    svg: createMockupSVG("PathFinder AI", "Resume Analysis & Competency Mapping", "spaCy NLP", "Unstructured PDF parsing into structured skill taxonomy")
  },
  {
    path: "../public/projects/pathfinder/screenshot-2.png",
    svg: createMockupSVG("PathFinder AI - Skill Gap", "Target Role Matching & Curriculum", "Instant Gap Score", "Visual gap radar chart and personalized learning path recommendations")
  },
  {
    path: "../public/projects/securepay/screenshot-1.png",
    svg: createMockupSVG("SecurePay", "Real-Time Banking Fraud Detection", "<1 ms Latency", "5 configurable fraud rule chains with high-concurrency evaluation")
  },
  {
    path: "../public/projects/securepay/screenshot-2.png",
    svg: createMockupSVG("SecurePay - GenAI Explanations", "Ollama & GLM-4 Anomaly Justification", "Tri-State Verdict", "Local model natural-language anomaly reports with zero cloud data leak")
  },
];

for (const item of assets) {
  const fullPath = path.join(__dirname, item.path);
  // Write SVG content directly to the file path
  fs.writeFileSync(fullPath, item.svg);
  console.log("Created " + item.path);
}

// 3. Create Avatar SVG
const avatarSVG = `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="avatar_bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop stop-color="#181B28"/>
      <stop offset="1" stop-color="#0B0D13"/>
    </linearGradient>
    <linearGradient id="accent_grad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F97316"/>
      <stop offset="1" stop-color="#FB923C"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="200" fill="url(#avatar_bg)"/>
  <circle cx="200" cy="200" r="195" stroke="url(#accent_grad)" stroke-width="4" stroke-dasharray="8 6"/>
  
  <!-- Silhouette Profile with AI nodes -->
  <circle cx="200" cy="150" r="55" fill="#2A3044"/>
  <path d="M 110 320 C 110 245, 150 225, 200 225 C 250 225, 290 245, 290 320 Z" fill="#2A3044"/>

  <!-- Neural Connection Nodes -->
  <circle cx="160" cy="135" r="4" fill="#F97316"/>
  <circle cx="240" cy="135" r="4" fill="#F97316"/>
  <circle cx="200" cy="170" r="4" fill="#F97316"/>
  <line x1="160" y1="135" x2="200" y2="170" stroke="#F97316" stroke-width="1.5" opacity="0.6"/>
  <line x1="240" y1="135" x2="200" y2="170" stroke="#F97316" stroke-width="1.5" opacity="0.6"/>

  <!-- Initials Badge -->
  <rect x="140" y="305" width="120" height="34" rx="17" fill="#F97316"/>
  <text x="200" y="328" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="1">M. ASHISH</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, "../public/avatar.jpg"), avatarSVG);
fs.writeFileSync(path.join(__dirname, "../public/avatar.svg"), avatarSVG);
console.log("Created public/avatar.jpg & public/avatar.svg");
