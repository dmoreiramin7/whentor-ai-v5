/**
 * Whentor AI — Conversation layer
 *
 * Priority:
 *   1. Real AI (Claude via /api/chat) — intelligent, infinitely varied,
 *      shaped by each advisor's persona. Requires ANTHROPIC_API_KEY on server.
 *   2. Built-in scripted personality engine — always works, no key needed.
 *
 * The UI calls getReply() and never has to know which engine answered.
 */

import { getPersonality } from "./personalities";
import { getAdvisor } from "./advisors";
import type { DetectedEmotion } from "./emotions";

export type ChatTurn = { role: "user" | "assistant"; content: string };

// Once /api/chat returns 503 (no key) we stop trying for the session.
let aiAvailable: boolean | null = null;

export function isAIConfigured(): boolean {
  return aiAvailable === true;
}

function localReply(
  advisorId: string,
  userMessage: string,
  emotion: DetectedEmotion,
  memoryCtx: string[],
): string {
  const personality = getPersonality(advisorId);
  const emotionalPre =
    emotion.intensity >= 2 ? personality.emotionalResponses[emotion.emotion] ?? "" : "";
  const main = personality.respond(userMessage, emotion, memoryCtx);
  return emotionalPre ? `${emotionalPre}\n\n${main}` : main;
}

/**
 * Get an advisor's reply. Tries real AI first, falls back to scripted engine.
 * Always resolves with a string — never throws.
 */
export async function getReply(params: {
  advisorId: string;
  userMessage: string;
  emotion: DetectedEmotion;
  history: ChatTurn[];        // prior turns (not including the current user message)
  userName: string;
  memorySummary?: string;
}): Promise<string> {
  const { advisorId, userMessage, emotion, history, userName, memorySummary } = params;
  const memoryCtx = history.filter((h) => h.role === "user").slice(-3).map((h) => h.content);

  // If we already know AI is unavailable, go straight to local.
  if (aiAvailable === false) {
    return localReply(advisorId, userMessage, emotion, memoryCtx);
  }

  const advisor = getAdvisor(advisorId);
  const personality = getPersonality(advisorId);

  // Chief Advisor is virtual (no advisor row) — synthesize persona.
  const persona = advisor
    ? {
        name: advisor.name,
        title: advisor.title,
        bio: advisor.bio,
        essence: advisor.essence,
        topics: advisor.topics,
        speakingStyle: personality.speakingStyle,
        signaturePhrases: personality.signaturePhrases,
      }
    : {
        name: "Chief Advisor",
        title: "Your Personal Guide",
        bio: "The mentor who knows your whole journey — every conversation, every growth area, every season. Warm, wise, and always pointing you toward your next step.",
        essence: "Information gives answers. Guidance changes lives.",
        topics: ["Growth", "Direction", "Reflection", "Purpose"],
        speakingStyle: personality.speakingStyle,
        signaturePhrases: personality.signaturePhrases,
      };

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        persona,
        userName,
        emotion: emotion.emotion,
        emotionIntensity: emotion.intensity,
        memorySummary,
        history: [...history, { role: "user", content: userMessage }],
      }),
    });

    if (res.status === 503) {
      aiAvailable = false;
      return localReply(advisorId, userMessage, emotion, memoryCtx);
    }
    if (!res.ok) {
      // transient error — fall back for this turn but keep AI enabled
      return localReply(advisorId, userMessage, emotion, memoryCtx);
    }

    const data = (await res.json()) as { text?: string };
    if (data?.text) {
      aiAvailable = true;
      return data.text;
    }
    return localReply(advisorId, userMessage, emotion, memoryCtx);
  } catch {
    return localReply(advisorId, userMessage, emotion, memoryCtx);
  }
}

/** Build a short memory summary string for the AI from the user's memory. */
export function buildMemorySummary(opts: {
  streak: number;
  totalSessions: number;
  topAreas: string[];
  dominantEmotion: string;
  lastTopics: string[];
}): string {
  const parts: string[] = [];
  if (opts.totalSessions > 1) parts.push(`${opts.totalSessions} prior sessions, ${opts.streak}-day streak`);
  if (opts.topAreas.length) parts.push(`focused lately on ${opts.topAreas.slice(0, 2).join(" and ")}`);
  if (opts.dominantEmotion && opts.dominantEmotion !== "neutral") parts.push(`recently feeling ${opts.dominantEmotion}`);
  if (opts.lastTopics.length) parts.push(`last talked about "${opts.lastTopics[0]}"`);
  return parts.join("; ");
}
