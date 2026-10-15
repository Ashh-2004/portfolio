// In-memory rate and session limiter for portfolio AI Chat assistant
// Designed for strict quota preservation and protection against bot scraping.

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

interface SessionRecord {
  count: number;
  lastActive: number;
}

export const MAX_CHATS_PER_SESSION = 10;
export const MAX_BURST_PER_MINUTE = 4; // Extremely rate limited: max 4 requests per minute
export const MAX_REQUESTS_PER_HOUR = 15; // Hourly budget limit per IP

const ipBurstMap = new Map<string, RateLimitRecord>();
const ipHourlyMap = new Map<string, RateLimitRecord>();
const sessionMap = new Map<string, SessionRecord>();

// Periodic garbage collection for memory efficiency
function cleanupExpiredRecords(now: number) {
  if (ipBurstMap.size > 500) {
    for (const [key, val] of ipBurstMap.entries()) {
      if (val.resetTime < now) ipBurstMap.delete(key);
    }
  }
  if (ipHourlyMap.size > 500) {
    for (const [key, val] of ipHourlyMap.entries()) {
      if (val.resetTime < now) ipHourlyMap.delete(key);
    }
  }
  // Expire sessions older than 4 hours
  if (sessionMap.size > 500) {
    const sessionExpiry = 4 * 60 * 60 * 1000;
    for (const [key, val] of sessionMap.entries()) {
      if (now - val.lastActive > sessionExpiry) sessionMap.delete(key);
    }
  }
}

export interface ChatRateLimitResult {
  allowed: boolean;
  reason?: "SESSION_LIMIT" | "RATE_LIMIT_BURST" | "RATE_LIMIT_HOURLY";
  message?: string;
  sessionRemaining: number;
  sessionCount: number;
  retryAfterSeconds?: number;
}

/**
 * Validates both IP-level rate limits (minute burst and hourly budget)
 * and session-level maximum chat limits (max 10 chats per session).
 */
export function checkChatLimits(ip: string, sessionId: string): ChatRateLimitResult {
  const now = Date.now();
  cleanupExpiredRecords(now);

  // 1. Check Session Limit (Max 10 chats per session)
  const sessionRecord = sessionMap.get(sessionId) || { count: 0, lastActive: now };
  if (sessionRecord.count >= MAX_CHATS_PER_SESSION) {
    return {
      allowed: false,
      reason: "SESSION_LIMIT",
      message: `Session chat limit reached (${MAX_CHATS_PER_SESSION}/${MAX_CHATS_PER_SESSION} questions used). Please connect with Ashish directly via email or LinkedIn.`,
      sessionRemaining: 0,
      sessionCount: MAX_CHATS_PER_SESSION,
    };
  }

  // 2. Check Minute Burst Limit (Max 4 requests per 60 seconds)
  const burstRecord = ipBurstMap.get(ip);
  if (burstRecord && burstRecord.resetTime > now) {
    if (burstRecord.count >= MAX_BURST_PER_MINUTE) {
      const retryAfter = Math.ceil((burstRecord.resetTime - now) / 1000);
      return {
        allowed: false,
        reason: "RATE_LIMIT_BURST",
        message: `Rate limit exceeded: Maximum ${MAX_BURST_PER_MINUTE} questions per minute. Please wait ${retryAfter}s before asking again.`,
        sessionRemaining: Math.max(0, MAX_CHATS_PER_SESSION - sessionRecord.count),
        sessionCount: sessionRecord.count,
        retryAfterSeconds: retryAfter,
      };
    }
  }

  // 3. Check Hourly Budget Limit (Max 15 requests per 60 minutes)
  const hourlyRecord = ipHourlyMap.get(ip);
  if (hourlyRecord && hourlyRecord.resetTime > now) {
    if (hourlyRecord.count >= MAX_REQUESTS_PER_HOUR) {
      const retryAfter = Math.ceil((hourlyRecord.resetTime - now) / 1000);
      return {
        allowed: false,
        reason: "RATE_LIMIT_HOURLY",
        message: `Hourly question limit reached (${MAX_REQUESTS_PER_HOUR}/hour). Please wait or contact Ashish directly at ashishramana1708@gmail.com.`,
        sessionRemaining: Math.max(0, MAX_CHATS_PER_SESSION - sessionRecord.count),
        sessionCount: sessionRecord.count,
        retryAfterSeconds: retryAfter,
      };
    }
  }

  // Record allowed request
  // Update burst
  if (!burstRecord || burstRecord.resetTime <= now) {
    ipBurstMap.set(ip, { count: 1, resetTime: now + 60 * 1000 });
  } else {
    burstRecord.count += 1;
  }

  // Update hourly
  if (!hourlyRecord || hourlyRecord.resetTime <= now) {
    ipHourlyMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
  } else {
    hourlyRecord.count += 1;
  }

  // Update session
  sessionRecord.count += 1;
  sessionRecord.lastActive = now;
  sessionMap.set(sessionId, sessionRecord);

  return {
    allowed: true,
    sessionRemaining: MAX_CHATS_PER_SESSION - sessionRecord.count,
    sessionCount: sessionRecord.count,
  };
}

// Retain generic helper for backwards compatibility
export function checkRateLimit(
  ip: string,
  limit: number = 20,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = ipBurstMap.get(ip);

  if (!record || record.resetTime < now) {
    ipBurstMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count };
}
