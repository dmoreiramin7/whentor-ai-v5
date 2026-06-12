/**
 * Whentor AI — User Memory Layer
 *
 * This is the "relationship brain" of the platform.
 * Every conversation, every emotion, every milestone is stored here.
 * Mentors read this to know who they're talking to.
 */

export type Emotion =
  | "anxious"
  | "sad"
  | "frustrated"
  | "lost"
  | "motivated"
  | "happy"
  | "confused"
  | "grateful"
  | "neutral";

export type LifeArea =
  | "spirituality"
  | "mental_health"
  | "relationships"
  | "fitness"
  | "business"
  | "leadership"
  | "finance"
  | "family"
  | "personal_growth";

export type EmotionalEntry = {
  emotion: Emotion;
  intensity: 1 | 2 | 3; // 1 = mild, 2 = moderate, 3 = strong
  context: string; // short summary of what triggered it
  mentorId: string;
  timestamp: number;
};

export type ConversationEntry = {
  mentorId: string;
  userMessage: string;
  mentorReply: string;
  emotion: Emotion;
  timestamp: number;
};

export type Milestone = {
  id: string;
  title: string;
  mentorId: string;
  area: LifeArea;
  message: string; // what the user said that became a milestone
  timestamp: number;
  shared: boolean;
};

export type UserMemory = {
  name: string;
  firstSeen: number;
  lastSeen: number;
  totalSessions: number;
  currentStreak: number;
  lastStreakDate: string; // YYYY-MM-DD

  // Emotional intelligence
  emotionalHistory: EmotionalEntry[];
  dominantEmotion: Emotion; // most frequent in last 7 days
  emotionalTrend: "improving" | "declining" | "stable";

  // Interests & focus areas
  topAreas: LifeArea[];
  mentorUsage: Record<string, number>; // mentorId → session count

  // Conversations
  conversations: ConversationEntry[];

  // Milestones & breakthroughs
  milestones: Milestone[];

  // Goals (user-stated)
  goals: string[];

  // Daily mood check-in
  todayMood: Emotion | null;
  todayMoodTimestamp: number | null;
};

const KEY = "whentor_user_memory";

const DEFAULT_MEMORY: UserMemory = {
  name: "Diogo M.",
  firstSeen: Date.now(),
  lastSeen: Date.now(),
  totalSessions: 1,
  currentStreak: 1,
  lastStreakDate: new Date().toISOString().slice(0, 10),

  emotionalHistory: [],
  dominantEmotion: "neutral",
  emotionalTrend: "stable",

  topAreas: [],
  mentorUsage: {},

  conversations: [],
  milestones: [],
  goals: [],

  todayMood: null,
  todayMoodTimestamp: null,
};

// ─── Read / Write ────────────────────────────────────────────────────────────

export function loadMemory(): UserMemory {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_MEMORY };
    const parsed = JSON.parse(raw) as UserMemory;
    return { ...DEFAULT_MEMORY, ...parsed };
  } catch {
    return { ...DEFAULT_MEMORY };
  }
}

export function saveMemory(mem: UserMemory): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(mem));
  } catch {
    // storage full or unavailable — fail silently
  }
}

// ─── Session tracking ────────────────────────────────────────────────────────

export function touchSession(mem: UserMemory): UserMemory {
  const today = new Date().toISOString().slice(0, 10);
  const isNewDay = mem.lastStreakDate !== today;
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const missedDay = mem.lastStreakDate !== yesterday && mem.lastStreakDate !== today;

  return {
    ...mem,
    lastSeen: Date.now(),
    totalSessions: mem.totalSessions + (isNewDay ? 1 : 0),
    currentStreak: missedDay ? 1 : isNewDay ? mem.currentStreak + 1 : mem.currentStreak,
    lastStreakDate: isNewDay ? today : mem.lastStreakDate,
  };
}

// ─── Emotion logging ─────────────────────────────────────────────────────────

export function logEmotion(
  mem: UserMemory,
  emotion: Emotion,
  intensity: 1 | 2 | 3,
  context: string,
  mentorId: string,
): UserMemory {
  const entry: EmotionalEntry = { emotion, intensity, context, mentorId, timestamp: Date.now() };
  const history = [...mem.emotionalHistory, entry].slice(-100); // keep last 100

  // Dominant emotion in last 7 days
  const weekAgo = Date.now() - 7 * 86_400_000;
  const recent = history.filter((e) => e.timestamp > weekAgo);
  const counts: Partial<Record<Emotion, number>> = {};
  for (const e of recent) counts[e.emotion] = (counts[e.emotion] ?? 0) + 1;
  const dominant = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] as Emotion) ?? "neutral";

  // Trend: compare last 3 vs previous 3 — simplified valence scoring
  const valence: Record<Emotion, number> = {
    happy: 2, grateful: 2, motivated: 1, neutral: 0,
    confused: -0.5, lost: -1, anxious: -1, frustrated: -1, sad: -2,
  };
  const last3 = history.slice(-3).map((e) => valence[e.emotion]);
  const prev3 = history.slice(-6, -3).map((e) => valence[e.emotion]);
  const avg = (arr: number[]) => arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : 0;
  const diff = avg(last3) - avg(prev3);
  const trend: UserMemory["emotionalTrend"] = diff > 0.3 ? "improving" : diff < -0.3 ? "declining" : "stable";

  return { ...mem, emotionalHistory: history, dominantEmotion: dominant, emotionalTrend: trend };
}

// ─── Conversation logging ────────────────────────────────────────────────────

export function logConversation(
  mem: UserMemory,
  mentorId: string,
  userMessage: string,
  mentorReply: string,
  emotion: Emotion,
): UserMemory {
  const entry: ConversationEntry = { mentorId, userMessage, mentorReply, emotion, timestamp: Date.now() };
  const conversations = [...mem.conversations, entry].slice(-200);
  const usage = { ...mem.mentorUsage, [mentorId]: (mem.mentorUsage[mentorId] ?? 0) + 1 };

  // Update top areas from mentor usage
  const areaMap: Record<string, LifeArea> = {
    christ: "spirituality", spiritual: "spirituality",
    psychologist: "mental_health", psychoanalyst: "mental_health", therapist: "mental_health",
    relationship: "relationships", "mens-mentor": "relationships", "womens-mentor": "relationships",
    "stoic-emperor": "personal_growth", "stoic-statesman": "personal_growth", "stoic-sage": "personal_growth",
    philosopher: "personal_growth", mindset: "personal_growth",
    "roman-general": "leadership", "first-emperor": "leadership", orator: "leadership",
    negotiator: "leadership", leader: "leadership",
    visionary: "business", innovation: "business", startup: "business",
    fitwell: "fitness", nutrition: "fitness",
    finance: "finance",
    huberman: "fitness", jocko: "leadership", goggins: "fitness",
    peterson: "mental_health", naval: "business", clear: "personal_growth",
    ferriss: "business", brene: "relationships", dispenza: "mental_health", sinek: "leadership",
  };
  const area = areaMap[mentorId];
  const topAreas = area
    ? [area, ...mem.topAreas.filter((a) => a !== area)].slice(0, 5)
    : mem.topAreas;

  return { ...mem, conversations, mentorUsage: usage, topAreas };
}

// ─── Milestones ──────────────────────────────────────────────────────────────

export function addMilestone(
  mem: UserMemory,
  mentorId: string,
  area: LifeArea,
  message: string,
  title: string,
): UserMemory {
  const milestone: Milestone = {
    id: `${Date.now()}`,
    title,
    mentorId,
    area,
    message,
    timestamp: Date.now(),
    shared: false,
  };
  return { ...mem, milestones: [...mem.milestones, milestone] };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns a human-readable "how long ago" string */
export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/** Days since first seen */
export function daysSinceJoined(mem: UserMemory): number {
  return Math.floor((Date.now() - mem.firstSeen) / 86_400_000);
}

/** Last N conversations with a specific mentor */
export function getMentorHistory(mem: UserMemory, mentorId: string, n = 5): ConversationEntry[] {
  return mem.conversations.filter((c) => c.mentorId === mentorId).slice(-n);
}
