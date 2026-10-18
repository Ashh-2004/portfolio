/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * ==============================================================================
 */

export interface Screenshot {
  src: string;
  caption: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  demo?: string;
  caseStudy?: string;
}

export type ProjectCategory = "AI Agents" | "ML" | "Full-Stack" | "Data Analytics";

export interface Project {
  slug: string;
  name: string;
  year: string;
  tagline: string;
  problem: string;
  solution: string;
  description: string;
  category: ProjectCategory;
  logo?: string;
  screenshots: Screenshot[];
  techStack: string[];
  features: string[];
  plannedFeatures?: string[];
  evaluation?: {
    methodology: string;
    metrics: { label: string; value: string; note?: string }[];
    limitations?: string;
  };
  architectureWorkflow?: string[];
  highlights?: string[];
  links: ProjectLinks;
  featured: boolean;
}

export interface SkillGroup {
  group: string;
  icon: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  university?: string;
  period: string;
  score?: string;
  cgpa?: string;
  highlights?: string[];
}

export interface AchievementItem {
  title: string;
  detail: string;
  year: string;
}

export interface ChatbotConfig {
  enabled: boolean;
  assistantName: string;
  welcomeMessage: string;
  suggestedQuestions: string[];
  extraKnowledge: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  siteUrl: string;
  ogImage: string;
}

export interface StatItem {
  label: string;
  value: string;
  sublabel: string;
}

export interface PortfolioData {
  marquee?: string[];
  profile: {
    name: string;
    title: string;
    subtitle: string;
    tagline: string;
    bio: string;
    location: string;
    availability: string;
    avatar?: string;
    resumeUrl: string;
    typedPhrases?: string[];
  };
  socials: {
    email: string;
    phone?: string;
    showPhone: boolean;
    github: string;
    linkedin: string;
    twitter?: string;
    kaggle?: string;
    medium?: string;
  };
  heroStack: string[];
  stats: StatItem[];
  projects: Project[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  chatbot: ChatbotConfig;
  seo: SEOConfig;
}

export const portfolio: PortfolioData = {
  marquee: [
    "OPEN TO AI/ML & DATA ROLES",
    "BENGALURU, INDIA",
    "PYTHON • SQL • FASTAPI • XGBOOST • RAG",
    "PREDICTIVE MODELING & EXPLAINABLE AI (SHAP)",
    "CHROMADB • LANGCHAIN • SPACY • DOCKER",
  ],

  profile: {
    name: "M Ashish Ramana",
    title: "AI/ML Engineer | Applied AI & Data Science",
    subtitle: "AI/ML • Applied AI • Data Science",
    tagline:
      "Building practical machine learning systems, retrieval-augmented generation applications, and data-driven solutions using Python, SQL, and modern backend technologies.",
    bio: "Applied AI and Machine Learning developer with practical capstone experience engineering predictive classification models, RAG document pipelines, and high-throughput transaction evaluation systems. Currently pursuing MCA at Bangalore Institute of Technology, focused on delivering explainable, benchmarked software architectures.",
    location: "Bengaluru, Karnataka, India",
    availability: "Open to AI/ML & Data Roles & Internships (Immediate, Bengaluru / Remote)",
    avatar: "/avatar.jpg",
    resumeUrl: "/resume.pdf",
    typedPhrases: [
      "explainable machine learning models",
      "agentic AI & RAG assistants",
      "data analytics & BI dashboards",
      "real-time backend APIs",
      "predictive risk classifiers",
    ],
  },

  socials: {
    email: "ashishramana1708@gmail.com",
    phone: "+91 9964700146",
    showPhone: true,
    github: "https://github.com/Ashh-2004",
    linkedin: "https://linkedin.com/in/ashish-ramana-2ash4",
  },

  heroStack: [
    "Python",
    "FastAPI",
    "XGBoost",
    "Scikit-Learn",
    "RAG / LangChain",
    "ChromaDB",
    "SQL",
    "Docker",
    "Power BI",
  ],

  stats: [
    {
      value: "4",
      label: "Core Capstone Projects",
      sublabel: "End-to-end ML, RAG & system architectures",
    },
    {
      value: "<1 ms",
      label: "Fraud Engine Latency",
      sublabel: "In-memory rule evaluation benchmark (Spring Boot)",
    },
    {
      value: "+3.53 pp",
      label: "XGBoost Recall Uplift",
      sublabel: "51.56% vs 48.03% baseline on credit risk test set",
    },
    {
      value: "50+",
      label: "Extracted Competencies",
      sublabel: "Taxonomy-backed spaCy resume parsing dictionary",
    },
  ],

  projects: [
    {
      slug: "loansense-ai",
      name: "LoanSense AI",
      year: "May 2026",
      tagline: "Explainable Credit Risk & Scoring Platform with Natural Language SQL",
      problem:
        "Credit underwriting teams frequently struggle with false negatives in borrower evaluation—where credit default risks are missed by rigid scorecards or hidden inside opaque black-box models.",
      solution:
        "Engineered an end-to-end credit risk assessment system with an XGBoost classifier tuned for high default recall, paired with SHAP TreeExplainer for decision transparency and a Natural-Language-to-SQL query interface over financial databases.",
      description:
        "An applied machine learning credit risk assessment system built with XGBoost, featuring explainable AI via SHAP and natural language querying capabilities over financial databases to assist loan officers.",
      category: "ML",
      techStack: [
        "Python",
        "XGBoost",
        "Scikit-learn",
        "SHAP",
        "FastAPI",
        "MySQL",
        "Pandas",
        "NumPy",
      ],
      features: [
        "Trained and evaluated an XGBoost credit-risk classifier benchmarked against baseline Logistic Regression",
        "Addressed severe credit default class imbalance using scale_pos_weight optimization",
        "Integrated SHAP (SHapley Additive exPlanations) TreeExplainer for global feature rankings and individual borrower waterfall plots",
        "Developed a Natural-Language-to-SQL interface allowing non-technical analysts to interrogate MySQL loan books",
        "Implemented data validation and categorical encoding pipelines with automated Pydantic schema verification",
      ],
      architectureWorkflow: [
        "Borrower applicant data ingested via FastAPI REST endpoint with Pydantic validation",
        "Feature transformation: categorical encoding, outlier clipping, and missing value imputation",
        "XGBoost classification model generates borrower default probability score",
        "SHAP TreeExplainer computes exact feature contribution values for local decision transparency",
        "FastAPI returns JSON payload with risk score, triage recommendation, and top contributing risk factors",
      ],
      evaluation: {
        methodology:
          "Evaluated on a historical credit dataset with an 80/20 stratified train/test split. Benchmarked against a standard Logistic Regression baseline.",
        metrics: [
          { label: "Recall (Default Detection)", value: "51.56%", note: "+3.53 pp over 48.03% baseline" },
          { label: "F1 Score", value: "57.12%", note: "Improved from 55.11% baseline" },
          { label: "False Negatives", value: "356", note: "Reduced from 382 missed defaults" },
          { label: "Defaults Detected", value: "379", note: "Increased from 353 baseline" },
        ],
        limitations:
          "Recall gain was prioritized to minimize high-cost default misses; precision trade-offs require threshold tuning based on institutional risk appetite.",
      },
      highlights: [
        "Recall enhanced: 48.03% to 51.56% (+3.53 pp)",
        "F1 score improved: 55.11% to 57.12%",
        "False negatives reduced from 382 to 356",
        "Defaults detected: 353 to 379",
      ],
      links: {
        github: "https://github.com/Ashh-2004/loansense-AI",
        demo: "https://github.com/Ashh-2004/loansense-AI",
      },
      screenshots: [
        {
          src: "/projects/loansense/screenshot-1.png",
          caption: "XGBoost Classifier confusion matrix & performance metrics (51.56% Recall, 57.12% F1)",
        },
        {
          src: "/projects/loansense/screenshot-2.png",
          caption: "Baseline Logistic Regression evaluation & confusion matrix benchmark",
        },
        {
          src: "/projects/loansense/screenshot-3.png",
          caption: "Natural-Language-to-SQL query assistant translating English queries into SQL",
        },
      ],
      featured: true,
    },
    {
      slug: "employeemate",
      name: "EmployeeMate",
      year: "Sept 2026",
      tagline: "RAG & Agentic Employee Assistant with Vector Memory and Guardrails",
      problem:
        "Employees waste substantial time searching dense multi-document company handbooks, benefit policies, and internal guides, while standard LLMs suffer from hallucinations or ungrounded responses.",
      solution:
        "Built a full-stack applied AI assistant using retrieval-augmented generation (RAG) with ChromaDB dense embeddings, CrossEncoder reranking for precision relevance, conversational session memory, and local Ollama inference.",
      description:
        "A full-stack applied AI assistant utilizing retrieval-augmented generation (RAG), conversational memory, and prompt-injection guardrails to automate internal handbook queries and HR operations.",
      category: "AI Agents",
      techStack: [
        "Python",
        "FastAPI",
        "React",
        "LangChain",
        "ChromaDB",
        "Ollama",
        "Docker",
      ],
      features: [
        "Document ingestion pipeline chunking PDFs and policy documents with RecursiveCharacterTextSplitter",
        "Dense semantic vector storage and similarity search using ChromaDB embeddings",
        "CrossEncoder reranking (ms-marco-MiniLM-L-6-v2) to filter top-k retrieved chunks before generation",
        "Multi-turn sliding window conversational memory preserving query context across questions",
        "Input sanitization and prompt-injection defense guardrails preventing prompt jailbreaking",
        "Retrieval confidence thresholding: politely declines or flags ungrounded queries",
      ],
      plannedFeatures: [
        "Multi-tenant role-based access control (RBAC) per organizational tier",
        "Direct enterprise Slack bot integration with live webhook triggers",
      ],
      architectureWorkflow: [
        "HR policy manuals chunked into 500-token segments with 50-token overlap",
        "Embeddings generated and indexed in ChromaDB vector store",
        "User question embedded; top-10 candidate chunks retrieved via cosine similarity",
        "CrossEncoder reranks candidates to top-3 highest-relevance passages",
        "Local Ollama LLM synthesizes concise answer strictly citing source handbook sections",
      ],
      evaluation: {
        methodology:
          "Internal validation over representative HR handbook question-answer test suites assessing retrieval accuracy and hallucination rates.",
        metrics: [
          { label: "Retrieval Architecture", value: "2-Stage RAG", note: "Dense retrieval + CrossEncoder rerank" },
          { label: "Execution Environment", value: "Local LLM", note: "Ollama / zero external cloud data transfer" },
          { label: "Containerization", value: "Docker", note: "Isolated backend & vector store" },
        ],
        limitations:
          "Inference latency is dependent on host machine GPU/CPU specifications when running local quantized LLM weights.",
      },
      highlights: [
        "Multi-stage RAG pipeline with CrossEncoder reranking",
        "Local LLM inference via Ollama with zero external data leak",
        "Session conversational memory & prompt-injection guardrails",
      ],
      links: {
        github: "https://github.com/Ashh-2004/EmployeeMate",
        live: "https://frontend-sooty-xi-27.vercel.app",
      },
      screenshots: [
        {
          src: "/projects/employeemate/screenshot-1.png",
          caption: "Knowledge Agent RAG interface answering HR queries with source citations",
        },
        {
          src: "/projects/employeemate/screenshot-2.png",
          caption: "HR Specialist Agent executing automated leave application workflows",
        },
        {
          src: "/projects/employeemate/screenshot-3.png",
          caption: "Security portal authentication with role-based JWT access control",
        },
      ],
      featured: true,
    },
    {
      slug: "securepay-fraud-detection",
      name: "SecurePay",
      year: "June 2026",
      tagline: "Banking Fraud Detection Engine (5 Rules Evaluated in <1 ms Benchmark)",
      problem:
        "High-volume financial transaction gateways require instantaneous screening for suspicious card activity without incurring network latency overhead or sending sensitive raw cardholder data to third-party APIs.",
      solution:
        "Engineered a high-performance rule-based fraud detection engine in Java and Spring Boot that executes 5 hierarchical security rules in under 1 ms in an in-memory benchmark, augmented with local Ollama for compliance explanation.",
      description:
        "A banking fraud detection engine developed with Java and Spring Boot that evaluates incoming financial transactions under 1 ms in-memory and explains flagged anomalies using local Ollama LLMs.",
      category: "Full-Stack",
      techStack: [
        "Java",
        "Spring Boot",
        "Ollama",
        "Docker",
        "REST APIs",
        "JUnit",
      ],
      features: [
        "Rule 1 - Velocity check: detects abnormal transaction frequency exceeding predefined rate limits",
        "Rule 2 - High-amount anomaly: flags single charges exceeding 3x historical account baseline",
        "Rule 3 - Cross-border / Geovelocity: flags transactions in conflicting geographies within unrealistic travel times",
        "Rule 4 - Blacklist check: immediate matching against known malicious accounts and merchant IDs",
        "Rule 5 - Rapid succession check: detects duplicate micro-charges placed within seconds",
        "Tri-state verdict generation: APPROVED, SUSPICIOUS (requires 2FA), or REJECTED/FRAUD",
        "Local Ollama integration to generate natural language audit explanations without external network transmission",
      ],
      architectureWorkflow: [
        "Transaction payload received via Spring Boot REST endpoint (POST /api/v1/transactions/evaluate)",
        "In-memory rule engine pipeline sequentially evaluates the 5 hierarchical fraud heuristics",
        "Decision engine aggregates rule triggers and outputs tri-state verdict",
        "Flagged anomalies dispatched to local Ollama LLM for natural language compliance summarization",
        "Audit log committed with rule trigger timestamps and explanation verdict",
      ],
      evaluation: {
        methodology:
          "Benchmarked in-memory rule engine execution on a local single-node Spring Boot environment with simulated transaction payloads.",
        metrics: [
          { label: "Rule Engine Latency", value: "<1 ms", note: "In-memory rule execution benchmark (not network latency)" },
          { label: "Rule Coverage", value: "5 Heuristics", note: "Velocity, Amount, Geo, Blacklist, Succession" },
          { label: "Verdict Logic", value: "Tri-State", note: "Approved, Suspicious, Fraud" },
        ],
        limitations:
          "The sub-1 ms result measures in-memory rule execution on a single node; end-to-end production transaction latency would include network round-trips and persistent database writes.",
      },
      highlights: [
        "5 rules evaluated in under 1 ms per transaction (in-memory benchmark)",
        "5 modular fraud rules with automated anomaly classification",
        "Local Ollama LLM reasoning with zero external data transmission",
      ],
      links: {
        github: "https://github.com/Ashh-2004/securepay-fraud-detection",
      },
      screenshots: [
        {
          src: "/projects/securepay/screenshot-1.png",
          caption: "Real-time banking transaction stream and rule-trigger evaluation dashboard",
        },
        {
          src: "/projects/securepay/screenshot-2.png",
          caption: "Ollama generated anomaly justification report for compliance review",
        },
        {
          src: "/projects/securepay/screenshot-3.png",
          caption: "Transaction telemetry, GLM-4/Ollama anomaly reasoning, and risk engine execution trace",
        },
      ],
      featured: false,
    },
    {
      slug: "pathfinder-ai",
      name: "PathFinder AI",
      year: "May 2026",
      tagline: "Resume Analysis & Skill-Gap Mapping with Automated Recommendations",
      problem:
        "Job seekers and students lack structured visibility into missing technical skills when tailoring unstructured resumes to specific target software or data roles.",
      solution:
        "Built an NLP-based resume intelligence application in Python using spaCy to parse PDF resumes, match skills against a 50+ technical competency taxonomy, compute skill-gap scores, and generate curated learning recommendations.",
      description:
        "A career intelligence platform that parses unstructured resume PDFs, extracts technical competencies with spaCy NLP pipelines, and maps candidate profiles against target job specifications.",
      category: "ML",
      techStack: [
        "Python",
        "spaCy",
        "FastAPI",
        "React",
        "Tailwind CSS",
        "REST APIs",
      ],
      features: [
        "Unstructured PDF resume ingestion and text normalization using PyMuPDF and regex pipelines",
        "spaCy NLP EntityRuler and Matcher pipeline scanning for technical skills across a 50+ competency taxonomy",
        "Automated skill-gap score calculation comparing applicant competency overlap against target role profiles",
        "Curated, personalized learning roadmap generation to bridge identified skill deficiencies",
        "FastAPI backend paired with an intuitive React dashboard with visual skill distribution breakdown",
      ],
      architectureWorkflow: [
        "Candidate uploads resume PDF via React frontend",
        "FastAPI backend extracts and normalizes raw text",
        "spaCy pipeline tokenizes and extracts matching technical competencies",
        "Gap scoring module compares extracted skills with selected target job description",
        "Dashboard displays match percentage, identified strengths, missing competencies, and recommended courses",
      ],
      evaluation: {
        methodology:
          "Tested across sample resumes spanning Software Engineering, Data Analysis, and ML roles to measure entity extraction accuracy.",
        metrics: [
          { label: "Competency Taxonomy", value: "50+ Skills", note: "Curated dictionary of languages, tools & frameworks" },
          { label: "Parsing Engine", value: "spaCy NLP", note: "Rule-based entity matcher" },
          { label: "Backend API", value: "FastAPI", note: "Asynchronous processing" },
        ],
        limitations:
          "Extraction accuracy is sensitive to non-standard resume layouts, multi-column tables, or atypical skill nomenclature.",
      },
      highlights: [
        "50+ technical competencies extracted from unstructured resume PDFs",
        "Rule-based spaCy NLP parsing pipeline with entity visualization",
        "Visual gap scoring and personalized curriculum recommendations",
      ],
      links: {
        live: "https://ashh-2004.github.io/Pathfinder-AI/",
        github: "https://github.com/Ashh-2004/Pathfinder-AI",
      },
      screenshots: [
        {
          src: "/projects/pathfinder/screenshot-1.png",
          caption: "Resume and job description intake interface powered by spaCy NLP",
        },
        {
          src: "/projects/pathfinder/screenshot-2.png",
          caption: "Candidate alignment profile, 77% match score, and requirement matching",
        },
        {
          src: "/projects/pathfinder/screenshot-3.png",
          caption: "AI recommendations, upskilling roadmap, and credential verification",
        },
      ],
      featured: false,
    },
  ],

  skills: [
    {
      group: "Programming & Databases",
      icon: "Code2",
      items: ["Python", "SQL", "Java", "R"],
    },
    {
      group: "Machine Learning & Data Science",
      icon: "Brain",
      items: [
        "Scikit-learn",
        "XGBoost",
        "Pandas",
        "NumPy",
        "Feature Engineering",
        "Model Validation",
        "SHAP (Explainable AI)",
      ],
    },
    {
      group: "Generative AI & NLP",
      icon: "Sparkles",
      items: [
        "RAG Architectures",
        "LangChain",
        "ChromaDB",
        "spaCy",
        "CrossEncoder Reranking",
        "Ollama (Local LLMs)",
        "Hugging Face",
      ],
    },
    {
      group: "Data Analytics & BI",
      icon: "BarChart3",
      items: [
        "Power BI",
        "Tableau",
        "R Markdown",
        "Exploratory Data Analysis (EDA)",
        "Statistical Testing",
        "Data Visualization",
      ],
    },
    {
      group: "Backend & System APIs",
      icon: "Server",
      items: [
        "FastAPI",
        "Spring Boot",
        "REST APIs",
        "MySQL",
      ],
    },
    {
      group: "Frontend Development",
      icon: "Layout",
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Streamlit",
        "Taipy",
      ],
    },
    {
      group: "Tools & Deployment",
      icon: "Cpu",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Linux CLI",
      ],
    },
  ],

  experience: [
    {
      role: "MCA Applied AI & ML Capstone Projects",
      company: "Bangalore Institute of Technology",
      period: "2025 – Present",
      location: "Bengaluru, India",
      points: [
        "LoanSense AI (May 2026): Trained XGBoost credit risk classifier achieving 51.56% recall (+3.53 pp over baseline) with SHAP explainability and Natural Language SQL querying.",
        "PathFinder AI (May 2026): Engineered NLP resume analyzer parsing unstructured PDFs and extracting 50+ technical competencies using spaCy Matcher pipelines.",
        "SecurePay (June 2026): Developed high-performance banking fraud engine in Java/Spring Boot evaluating 5 configurable rules in <1 ms (in-memory benchmark) with local Ollama explanations.",
        "EmployeeMate (Sept 2026): Built full-stack RAG assistant utilizing ChromaDB, CrossEncoder reranking (ms-marco-MiniLM-L-6-v2), conversational memory, and local Ollama inference.",
      ],
    },
    {
      role: "BCA Data Analytics, AI & Research Projects",
      company: "St. Joseph's University",
      period: "2022 – 2025",
      location: "Bengaluru, India",
      points: [
        "AI Mental Health Therapist Chatbot (Apr 2025): Developed empathetic AI companion fine-tuned on MentalChat16k & Reddit datasets with dual-model inference (Local + Gemini API), crisis triage, and Taipy interface.",
        "Research Paper Author (May 2024): Authored 'Sustainable Development through ML, AI & IoT' evaluating predictive environmental models, smart agriculture, and real-time IoT sensor architectures.",
        "Data Analytics & BI Solutions: Built Startup India interactive Power BI dashboard with R preprocessing analyzing national funding patterns; Telecom Customer Churn predictive modeling on 7,043 customer accounts; and Bangalore vehicle accident severity analysis.",
      ],
    },
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Bangalore Institute of Technology (BIT), Bengaluru",
      period: "Expected 2027",
      score: "Pursuing",
      cgpa: "8.57",
      highlights: [
        "Core coursework in Machine Learning, Database Management Systems, and Algorithm Design",
        "Engineered 4 MCA capstones: LoanSense AI (May 2026), PathFinder AI (May 2026), SecurePay (June 2026), and EmployeeMate (Sept 2026)",
      ],
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "St. Joseph's University, Bengaluru",
      period: "2022 – 2025",
      score: "Completed",
      cgpa: "7.2",
      highlights: [
        "Rigorous foundation in Data Structures, Object-Oriented Programming (Java), SQL Databases, and Statistics",
        "Authored academic research paper: 'Sustainable Development through ML, AI & IoT' (May 2024)",
        "Built AI Mental Health Chatbot and Power BI / Python data analytics projects",
      ],
    },
  ],

  achievements: [
    {
      title: "Author: Research Paper on ML, AI & IoT for Sustainable Development",
      detail:
        "Authored and submitted academic research paper analyzing the integration of Machine Learning, AI algorithms, and IoT sensor telemetry to accelerate sustainable development across smart agriculture, energy conservation, and environmental monitoring.",
      year: "May 2024",
    },
  ],

  chatbot: {
    enabled: true,
    assistantName: "Ashish AI",
    welcomeMessage:
      "Hello! I am Ashish's AI assistant. Ask me anything about his AI/ML projects, skills, metrics, or availability for roles!",
    suggestedQuestions: [
      "What are Ashish's strongest ML skills?",
      "Tell me about the LoanSense AI credit risk metrics",
      "How was SecurePay's latency evaluated?",
      "Tell me about Ashish's research paper and BCA projects",
    ],
    extraKnowledge: `
M Ashish Ramana is an AI/ML Engineer and Data Scientist based in Bengaluru, Karnataka, India.
Education:
- Master of Computer Applications (MCA) at Bangalore Institute of Technology (BIT), Bengaluru, expected 2027 (CGPA: 8.57).
- Bachelor of Computer Applications (BCA) at St. Joseph's University, Bengaluru (2022-2025, CGPA: 7.2).

Core Technical Stack:
- Programming: Python, SQL, Java, R
- Machine Learning & Data Science: Scikit-learn, XGBoost, Pandas, NumPy, Feature Engineering, Model Validation, SHAP (Explainable AI)
- GenAI & NLP: RAG Architectures, LangChain, ChromaDB, spaCy, CrossEncoder Reranking, Ollama, Hugging Face Transformers
- Data Analytics & BI: Power BI, Tableau, R Markdown, Exploratory Data Analysis (EDA), Statistical Testing, Data Visualization
- Backend & APIs: FastAPI, Spring Boot, REST APIs, MySQL
- Frontend: React, Next.js, Tailwind CSS, Streamlit, Taipy
- Tools & Deployment: Git, GitHub, Docker, Linux CLI

MCA Flagship Projects (Bangalore Institute of Technology):
1. LoanSense AI (ML Flagship, May 2026): Explainable credit risk classifier using XGBoost and SHAP. Improved recall to 51.56% (+3.53 pp over 48.03% baseline) and F1 score to 57.12% (false negatives reduced from 382 to 356). Features a natural-language-to-SQL interface.
2. EmployeeMate (AI Agents Flagship, Sept 2026): Full-stack RAG assistant with FastAPI, React, LangChain, ChromaDB, CrossEncoder reranking (ms-marco-MiniLM-L-6-v2), conversational memory, prompt-injection guardrails, and local Ollama inference.
3. SecurePay (Full-Stack, June 2026): Java/Spring Boot banking fraud detection engine with 5 configurable rules evaluated in under 1 ms per transaction in an in-memory benchmark (single-node Spring Boot) and local Ollama anomaly explanations.
4. PathFinder AI (ML, May 2026): NLP-based resume analyzer using spaCy extracting 50+ competencies for skill-gap mapping and curriculum recommendations.

BCA Projects & Research (St. Joseph's University):
5. AI Mental Health Therapist Chatbot (AI Agents / NLP, April 2025): Empathetic conversational companion fine-tuned on MentalChat16k and Reddit datasets with dual-model inference (Local Transformer + Gemini API), crisis triage, and Taipy interface.
6. Research Paper: Sustainable Development through ML, AI & IoT (May 2024): Author of paper on ML algorithms and IoT telemetry for smart agriculture, energy conservation, and environmental sustainability.
7. Startup India Interactive Dashboard (Data Analytics, May 2025): Power BI dashboard with automated R preprocessing analyzing investment trends, sector distributions, and startup density across India.
8. Telecom Customer Churn Analysis (Data Analytics & ML, 2025): Full-stack data science workflow on 7,043 subscriber accounts statistically proving customer satisfaction as primary churn driver over billing.

Availability:
Ashish is actively seeking AI/ML Engineer, Applied AI, and Data Science roles and internships (immediate onboarding, Bengaluru / remote).
Contact:
Email: ashishramana1708@gmail.com
Phone: +91 9964700146
GitHub: https://github.com/Ashh-2004
LinkedIn: https://linkedin.com/in/ashish-ramana-2ash4
    `.trim(),
  },

  seo: {
    title: "M Ashish Ramana | AI/ML Engineer • Applied AI & Data Science Portfolio",
    description:
      "Portfolio of M Ashish Ramana - AI/ML Engineer and Data Scientist specializing in predictive modeling, RAG architectures, explainable AI (SHAP), and high-throughput backend systems.",
    siteUrl: "https://ashish-ramana.vercel.app",
    ogImage: "/avatar.jpg",
  },
};
