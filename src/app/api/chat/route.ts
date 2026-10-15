import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolio } from "@/data/portfolio";
import { checkChatLimits, MAX_CHATS_PER_SESSION } from "@/lib/rate-limit";

// Highly compact, grounded knowledge context (~350 tokens) to minimize Gemini token usage & latency
function getNarrowedSystemPrompt(): string {
  return `
You are ${portfolio.chatbot.assistantName}, the AI assistant representing ${portfolio.profile.name} on his developer portfolio.

OBJECTIVE: Answer recruiter and engineering hiring questions about Ashish's background, skills, metrics, and projects accurately.

STRICT GROUNDING & BREVITY RULES:
1. Concise answers only: Maximum 2 to 3 sentences or short bullet points. Never write lengthy essays or filler.
2. Grounding: Answer ONLY using the facts below. If asked off-topic (coding tests, general trivia, politics, poems), decline politely in one sentence: "I am specifically tuned to answer questions about Ashish Ramana's AI/ML projects and qualifications."
3. If a detail about Ashish is not listed, say: "I don't have that specific detail. Feel free to contact Ashish directly at ${portfolio.socials.email}."
4. Emphasize verified engineering metrics whenever applicable.

CANDIDATE FACTS:
- Name: ${portfolio.profile.name} | Location: ${portfolio.profile.location}
- Status: MCA student at Bangalore Institute of Technology (BIT, expected 2027, CGPA: 8.57); BCA from St. Joseph's University (2022-2025, CGPA: 7.2).
- Goal: Seeking AI/ML Engineer, Applied AI, and Data Science roles / internships (available for immediate onboarding).
- Core Skills: Python, SQL, Java, Scikit-learn, XGBoost, SHAP, RAG (LangChain, ChromaDB, CrossEncoder reranking), FastAPI, Spring Boot, React, Next.js, Docker.
- Contact: Email: ${portfolio.socials.email} | Phone: ${portfolio.socials.phone} | GitHub: ${portfolio.socials.github} | LinkedIn: ${portfolio.socials.linkedin}

VERIFIED PROJECTS & METRICS:
1. LoanSense AI (ML Flagship, 2025): Explainable credit risk classifier using XGBoost & SHAP. Evaluated vs Logistic Regression: achieved 51.56% recall (+3.53 pp over 48.03% baseline) and 57.12% F1 score (reduced FN from 382 to 356). FastAPI backend with NL-to-SQL query capability.
2. EmployeeMate (AI Agents Flagship, 2025): Enterprise RAG HR assistant. 2-stage retrieval with dense embeddings and CrossEncoder reranker (ms-marco-MiniLM-L-6-v2), ChromaDB, conversation memory, prompt injection guardrails, FastAPI + React + local Ollama.
3. SecurePay (Full-Stack, 2024): Java/Spring Boot banking fraud detection engine. Evaluated at sub-1 ms in-memory rule engine latency across 5 deterministic rules, with local Ollama explanations.
4. PathFinder AI (ML, 2024): spaCy NLP resume parser extracting 50+ normalized skills from PDFs with visual skill-gap mapping against target roles.
`.trim();
}

// Fallback response generator if GEMINI_API_KEY is not configured or rate-limited
function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("loan") || q.includes("credit") || q.includes("risk") || q.includes("shap")) {
    return (
      "LoanSense AI is an explainable credit risk classification system built with Python, XGBoost, and SHAP. " +
      "It achieved 51.56% recall (a 3.53 pp increase over the 48.03% baseline) and a 57.12% F1 score (reducing false negatives from 382 to 356). " +
      "Repository: " +
      (portfolio.projects.find((p) => p.slug === "loansense-ai")?.links.github || "https://github.com/Ashh-2004/LoanSense-AI")
    );
  }

  if (q.includes("employee") || q.includes("rag") || q.includes("agent") || q.includes("chroma")) {
    return (
      "EmployeeMate is an enterprise RAG HR assistant built with FastAPI, React, LangChain, ChromaDB, and Docker. " +
      "It implements a 2-stage retrieval pipeline using dense sentence embeddings and CrossEncoder reranking (ms-marco-MiniLM-L-6-v2) with prompt injection guardrails."
    );
  }

  if (q.includes("pathfinder") || q.includes("resume") || q.includes("spacy") || q.includes("nlp")) {
    return (
      "PathFinder AI is an NLP-driven resume intelligence app built with Python, spaCy, and Streamlit. " +
      "It extracts competencies across 50+ normalized skills from PDF resumes and maps skill gaps against target roles."
    );
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("python")) {
    return (
      "Ashish's core technical stack spans: Python, SQL, Java, Machine Learning (Scikit-learn, XGBoost, SHAP), Generative AI (RAG, LangChain, ChromaDB, CrossEncoder reranking), Backend (FastAPI, Spring Boot), and Deployment (Docker, Linux CLI)."
    );
  }

  if (q.includes("fraud") || q.includes("securepay") || q.includes("spring") || q.includes("java")) {
    return (
      "SecurePay is a banking fraud detection engine built with Java and Spring Boot. " +
      "It achieves sub-1 ms in-memory evaluation latency across 5 deterministic fraud rules with local Ollama compliance explanations."
    );
  }

  if (q.includes("role") || q.includes("hire") || q.includes("open") || q.includes("available") || q.includes("job") || q.includes("intern")) {
    return (
      `Ashish is pursuing roles and internships in AI/ML Engineering, Applied AI, and Data Science. ` +
      `He is based in Bengaluru, Karnataka, India and available for immediate onboarding. Contact: ${portfolio.socials.email} or ${portfolio.socials.phone}.`
    );
  }

  return (
    `M Ashish Ramana is an AI/ML Engineer pursuing his MCA at Bangalore Institute of Technology (BIT, expected 2027) with a BCA from St. Joseph's University. ` +
    `He specializes in practical ML pipelines (XGBoost, SHAP), RAG architectures (ChromaDB, CrossEncoder reranking), and high-performance backend systems (FastAPI, Spring Boot). ` +
    `Ask about LoanSense AI, EmployeeMate, SecurePay, or PathFinder AI!`
  );
}

function streamTextResponse(text: string, extraHeaders: Record<string, string> = {}) {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const words = text.split(" ");
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      ...extraHeaders,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const headerSessionId = req.headers.get("x-session-id");

    const body = await req.json().catch(() => ({}));
    const { messages, sessionId: bodySessionId } = body;

    const sessionId = (headerSessionId || bodySessionId || ip).slice(0, 64);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Server-side validation of session chat count
    const userMessageCount = messages.filter(
      (m: { role: string }) => m && m.role === "user"
    ).length;

    if (userMessageCount > MAX_CHATS_PER_SESSION) {
      return NextResponse.json(
        {
          error: `Session chat limit exceeded (maximum ${MAX_CHATS_PER_SESSION} messages per session). Please connect directly with Ashish at ${portfolio.socials.email}.`,
          reason: "SESSION_LIMIT",
          sessionRemaining: 0,
        },
        { status: 429 }
      );
    }

    // Check extreme rate limit and session limits
    const limitResult = checkChatLimits(ip, sessionId);
    if (!limitResult.allowed) {
      return NextResponse.json(
        {
          error: limitResult.message,
          reason: limitResult.reason,
          sessionRemaining: limitResult.sessionRemaining,
        },
        {
          status: 429,
          headers: limitResult.retryAfterSeconds
            ? { "Retry-After": String(limitResult.retryAfterSeconds) }
            : undefined,
        }
      );
    }

    const latestMessage = messages[messages.length - 1];
    // Narrow down user prompt length to 400 chars to avoid token inflation
    const userPrompt = (latestMessage?.content || "").trim().slice(0, 400);

    if (!userPrompt) {
      return NextResponse.json({ error: "Empty message content" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is not configured, stream grounded fallback
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
      const fallbackText = getLocalFallbackResponse(userPrompt);
      return streamTextResponse(fallbackText, {
        "x-session-remaining": String(limitResult.sessionRemaining),
        "x-session-count": String(limitResult.sessionCount),
      });
    }

    // Call Gemini API with narrowed context and token conservation parameters
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.GEMINI_MODEL || "gemini-3.5-flash";
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: getNarrowedSystemPrompt(),
      generationConfig: {
        maxOutputTokens: 250, // Keep responses short and bounded
        temperature: 0.2, // Low temperature for high factual precision
        topP: 0.8,
      },
    });

    // Narrow down conversation history to at most the last 2 turns (max 4 messages)
    // Truncate each historical message to 250 characters to minimize token usage
    const recentHistory = messages
      .slice(0, -1)
      .slice(-4)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: (m.content || "").slice(0, 250) }],
      }));

    try {
      const chat = model.startChat({
        history: recentHistory.length > 0 ? recentHistory : undefined,
      });

      const result = await chat.sendMessageStream(userPrompt);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const chunkText = chunk.text();
              if (chunkText) {
                controller.enqueue(encoder.encode(chunkText));
              }
            }
            controller.close();
          } catch (err) {
            controller.error(err);
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
          "x-session-remaining": String(limitResult.sessionRemaining),
          "x-session-count": String(limitResult.sessionCount),
        },
      });
    } catch (geminiError: unknown) {
      console.warn("Gemini API call failed or quota reached, falling back to local grounded response:", geminiError);
      // If Gemini quota/rate limit error (429 / RESOURCE_EXHAUSTED), deliver local response gracefully
      const fallbackText = getLocalFallbackResponse(userPrompt);
      return streamTextResponse(fallbackText, {
        "x-session-remaining": String(limitResult.sessionRemaining),
        "x-session-count": String(limitResult.sessionCount),
        "x-fallback-reason": "quota_or_gemini_error",
      });
    }
  } catch (error: unknown) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while communicating with the AI assistant.",
      },
      { status: 500 }
    );
  }
}
