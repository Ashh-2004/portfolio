"use client";

import React, { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import {
  Send,
  RotateCcw,
  Bot,
  User,
  ShieldCheck,
  Mail,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MAX_SESSION_CHATS = 10;

// Reactive listener pattern for sessionStorage synchronization
let sessionListeners: Array<() => void> = [];
function subscribeSession(listener: () => void) {
  sessionListeners.push(listener);
  return () => {
    sessionListeners = sessionListeners.filter((l) => l !== listener);
  };
}

function getSessionSnapshot(): number {
  if (typeof window === "undefined") return 0;
  const stored = sessionStorage.getItem("portfolio_chat_count");
  const count = parseInt(stored || "0", 10);
  return isNaN(count) ? 0 : count;
}

function getSessionServerSnapshot(): number {
  return 0;
}

function updateSessionStorageCount(count: number) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("portfolio_chat_count", String(count));
  }
  sessionListeners.forEach((l) => l());
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("portfolio_chat_session_id");
  if (!id) {
    id = "sess_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
    sessionStorage.setItem("portfolio_chat_session_id", id);
  }
  return id;
}

let messageCounter = 0;
function getNextId() {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: portfolio.chatbot.welcomeMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const sessionCount = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getSessionServerSnapshot
  );

  const isSessionExhausted = sessionCount >= MAX_SESSION_CHATS;
  const remainingChats = Math.max(0, MAX_SESSION_CHATS - sessionCount);

  // Scroll only the inner chat container, NEVER the window or page
  const scrollContainerToBottom = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  // Scroll internal feed when a new message is added
  useEffect(() => {
    scrollContainerToBottom();
  }, [messages.length]);

  // While streaming an answer, keep inner container scrolled to bottom only if user is already near bottom
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    if (isAtBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (userPrompt: string) => {
    const trimmed = userPrompt.trim();
    if (!trimmed || isLoading || isSessionExhausted) return;

    // Increment session chat count
    const nextCount = sessionCount + 1;
    updateSessionStorageCount(nextCount);

    const sessionId = getOrCreateSessionId();

    const userMessage: Message = {
      id: getNextId(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantMsgId = getNextId();
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({
          sessionId,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      // Update count from server header if present
      const serverCount = response.headers.get("x-session-count");
      if (serverCount) {
        const parsed = parseInt(serverCount, 10);
        if (!isNaN(parsed)) {
          updateSessionStorageCount(parsed);
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429 && errorData.reason === "SESSION_LIMIT") {
          updateSessionStorageCount(MAX_SESSION_CHATS);
        }
        throw new Error(errorData.error || "Failed to communicate with assistant");
      }

      if (!response.body) {
        throw new Error("No response body received from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: m.content + chunk } : m
          )
        );
      }
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error
          ? err.message
          : "An error occurred while answering your question.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: `⚠️ ${errMsg}`,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial",
        role: "assistant",
        content: portfolio.chatbot.welcomeMessage,
      },
    ]);
  };

  return (
    <section
      id="ai-chat"
      className="py-16 sm:py-20 bg-paper-white border-b border-carbon w-full scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill text-xs font-sans font-bold bg-lavender text-carbon border border-carbon">
            <span className="w-2 h-2 rounded-full bg-carbon" />
            <span>AI ASSISTANT</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-carbon tracking-tight uppercase">
            ASK ABOUT ASHISH
          </h2>

          <p className="text-sm sm:text-base text-carbon/80 font-sans max-w-xl mx-auto">
            Grounded directly on Ashish&apos;s verified production projects, architecture designs, and academic credentials.
          </p>

          {/* Sticker decoration */}
          <div
            className="absolute -top-4 right-4 sm:right-12 hidden sm:block pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/art/sticker-magnifier.svg"
              alt=""
              width={90}
              height={90}
              className="w-16 h-auto rotate-12"
            />
          </div>
        </div>

        {/* Chat Terminal Container */}
        <div className="rounded-card border border-carbon bg-paper-white overflow-hidden flex flex-col h-[540px] sm:h-[600px]">
          {/* Header Bar */}
          <div className="px-5 py-3.5 border-b border-carbon bg-paper-white flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-mint-pop border border-carbon flex items-center justify-center text-carbon flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-sans font-bold text-carbon">
                  {portfolio.chatbot.assistantName}
                </div>
                <div className="text-[11px] text-carbon/70 font-sans font-semibold">
                  Grounded on {portfolio.projects.length} verified projects • 0 hallucinations
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Session Budget Indicator */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-[11px] font-sans font-bold border border-carbon transition-colors ${
                  isSessionExhausted
                    ? "bg-rose-100 text-rose-800"
                    : sessionCount >= 7
                    ? "bg-amber-100 text-amber-900"
                    : "bg-soft-mist text-carbon"
                }`}
                title="Strict session chat budget to prevent rate exhaustion"
              >
                <Zap className="w-3 h-3" />
                <span>
                  {isSessionExhausted
                    ? "Session limit reached (10/10)"
                    : `${remainingChats} / ${MAX_SESSION_CHATS} chats left`}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-pill text-carbon bg-paper-white border border-carbon hover:bg-soft-mist transition-colors text-xs font-sans font-bold flex items-center gap-1.5"
                title="Reset Chat View"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-soft-mist/30"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-mint-pop border border-carbon flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Bot className="w-4 h-4 text-carbon" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-card px-4 py-3 text-sm leading-relaxed border border-carbon ${
                    msg.role === "user"
                      ? "bg-lavender text-carbon font-sans font-medium"
                      : "bg-paper-white text-carbon font-sans"
                  }`}
                >
                  {msg.content ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="flex items-center gap-2 py-1 text-carbon font-sans text-xs font-bold">
                      <span className="flex gap-1.5 items-center">
                        <span
                          className="w-2 h-2 rounded-full bg-carbon animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-carbon animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-carbon animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </span>
                      <span className="ml-2">Analyzing verified portfolio data...</span>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-paper-white text-carbon border border-carbon flex-shrink-0 flex items-center justify-center mt-0.5 font-display text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Session Exhaustion Notice */}
            {isSessionExhausted && (
              <div className="p-4 rounded-card border border-carbon bg-paper-white shadow-sm space-y-3 max-w-lg mx-auto text-center mt-4">
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-carbon/70">
                  Session Limit Reached (10 / 10 Chats)
                </div>
                <p className="text-xs sm:text-sm font-sans text-carbon leading-relaxed">
                  You have completed all 10 questions in this session. Ashish would love to discuss opportunities, metrics, or architecture with you directly!
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                  <a
                    href={`mailto:${portfolio.socials.email}?subject=Discussion%20from%20Portfolio`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-sans font-bold bg-mint-pop text-carbon border border-carbon hover:bg-mint-pop/80 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Ashish</span>
                  </a>
                  <a
                    href={portfolio.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-sans font-bold bg-lavender text-carbon border border-carbon hover:bg-lavender/80 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={portfolio.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-sans font-bold bg-paper-white text-carbon border border-carbon hover:bg-soft-mist transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Prompt Chips */}
          <div className="px-4 py-3 bg-paper-white border-t border-carbon">
            <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-carbon/70 mb-2">
              Suggested questions:
            </div>
            <div className="flex flex-wrap gap-2">
              {portfolio.chatbot.suggestedQuestions.map((q) => (
                <button
                  key={q}
                  disabled={isLoading || isSessionExhausted}
                  onClick={() => handleSubmit(q)}
                  className="text-left text-xs px-3 py-1.5 rounded-pill bg-paper-white text-carbon border border-carbon hover:bg-lavender active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed font-sans font-bold"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(input);
            }}
            className="p-3 bg-paper-white border-t border-carbon flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isSessionExhausted
                  ? "Session limit reached (10/10 questions asked) — please connect directly"
                  : `Ask about Ashish's ML models, RAG pipelines, metrics (${remainingChats} left)...`
              }
              disabled={isLoading || isSessionExhausted}
              className="flex-1 bg-soft-mist/40 text-carbon text-sm rounded-pill px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-voltage-violet border border-carbon placeholder:text-carbon/50 disabled:opacity-50 disabled:cursor-not-allowed font-sans font-medium"
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim() || isSessionExhausted}
              className="px-5 py-2.5 rounded-pill bg-carbon text-paper-white font-sans font-bold text-xs hover:bg-carbon/90 active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0 border border-carbon"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Security & Grounding Disclaimer */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-carbon/70 font-sans font-semibold text-center flex-wrap">
          <ShieldCheck className="w-4 h-4 text-carbon" />
          <span>Strictly rate-limited &amp; grounded on Ashish&apos;s verified project facts and academic records (max 10 chats/session).</span>
        </div>
      </div>
    </section>
  );
}
