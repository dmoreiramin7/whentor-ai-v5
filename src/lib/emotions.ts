/**
 * Whentor AI — Emotional Recognition Engine
 *
 * Detects what the user is feeling from their words.
 * This is what makes Whentor feel like a friend, not a search engine.
 * Every mentor reads this before crafting their response.
 */

import type { Emotion } from "./memory";

export type DetectedEmotion = {
  emotion: Emotion;
  intensity: 1 | 2 | 3;
  signals: string[]; // which words triggered the detection
};

// ─── Signal dictionaries ──────────────────────────────────────────────────────

const SIGNALS: Record<Emotion, string[]> = {
  anxious: [
    "anxious", "anxiety", "nervous", "worried", "worry", "scared", "fear", "panic",
    "overwhelmed", "stress", "stressed", "tense", "can't stop thinking", "what if",
    "racing thoughts", "heart racing", "can't breathe", "overthinking", "restless",
    "uneasy", "dread", "terrified", "fearing", "concerned", "insecure",
  ],
  sad: [
    "sad", "sadness", "depressed", "depression", "crying", "cried", "tears", "heartbroken",
    "broken", "devastated", "empty", "numb", "hopeless", "worthless", "alone", "lonely",
    "miss", "missing", "grief", "grieving", "lost someone", "hurt", "pain", "suffering",
    "darkness", "dark place", "don't see the point", "don't want to", "can't feel",
  ],
  frustrated: [
    "frustrated", "frustration", "angry", "anger", "furious", "rage", "mad", "annoyed",
    "irritated", "fed up", "sick of", "tired of", "can't take it", "had enough",
    "why won't", "nothing works", "keeps failing", "not fair", "unfair", "pissed",
    "hate this", "hate my", "stuck", "blocked",
  ],
  lost: [
    "lost", "confused about my life", "don't know what to do", "no direction", "no purpose",
    "meaningless", "what's the point", "don't know who i am", "identity", "purpose",
    "searching", "wandering", "don't belong", "nowhere to go", "starting over",
    "everything changed", "fell apart", "what now", "where do i go", "no path",
  ],
  motivated: [
    "motivated", "excited", "pumped", "ready", "let's go", "fired up", "inspired",
    "can't wait", "want to start", "going to", "going to change", "determined",
    "committed", "focused", "on fire", "crushing it", "killing it", "best version",
    "unstoppable", "momentum", "progress", "growing", "leveling up",
  ],
  happy: [
    "happy", "happiness", "great", "amazing", "fantastic", "wonderful", "blessed",
    "grateful", "thankful", "joy", "joyful", "content", "peaceful", "good day",
    "had a great", "feeling good", "positive", "love my life", "thriving",
  ],
  confused: [
    "confused", "don't understand", "not sure", "unsure", "unclear", "help me understand",
    "how do i", "what does", "what should i", "which is better", "can't figure out",
    "need clarity", "mixed up", "conflicted", "torn between", "don't know if",
  ],
  grateful: [
    "grateful", "thankful", "appreciate", "appreciation", "blessed", "so lucky",
    "thank you", "means a lot", "changed my life", "helped me so much", "forever grateful",
    "incredible", "transformed", "better because of", "made a difference",
  ],
  neutral: [], // default fallback
};

// ─── Intensity modifiers ──────────────────────────────────────────────────────

const HIGH_INTENSITY = [
  "extremely", "completely", "absolutely", "totally", "so much", "very", "really",
  "deeply", "badly", "terribly", "overwhelmingly", "utterly", "desperately",
  "can't handle", "breaking down", "falling apart", "at my worst",
];

const LOW_INTENSITY = [
  "a bit", "a little", "slightly", "kind of", "sort of", "somewhat",
  "maybe", "not sure if", "feel like", "a little bit",
];

// ─── Main detector ────────────────────────────────────────────────────────────

export function detectEmotion(text: string): DetectedEmotion {
  const lower = text.toLowerCase();
  const scores: Partial<Record<Emotion, number>> = {};
  const foundSignals: string[] = [];

  for (const [emotion, signals] of Object.entries(SIGNALS) as [Emotion, string[]][]) {
    for (const signal of signals) {
      if (lower.includes(signal)) {
        scores[emotion] = (scores[emotion] ?? 0) + 1;
        foundSignals.push(signal);
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topEmotion = (sorted[0]?.[0] as Emotion) ?? "neutral";

  // Determine intensity
  const hasHigh = HIGH_INTENSITY.some((w) => lower.includes(w));
  const hasLow = LOW_INTENSITY.some((w) => lower.includes(w));
  const rawScore = sorted[0]?.[1] ?? 0;

  let intensity: 1 | 2 | 3 = 2;
  if (hasHigh || rawScore >= 3) intensity = 3;
  else if (hasLow || rawScore === 1) intensity = 1;

  return { emotion: topEmotion, intensity, signals: foundSignals.slice(0, 5) };
}

// ─── Emotion metadata ─────────────────────────────────────────────────────────

export const EMOTION_META: Record<Emotion, { emoji: string; label: string; color: string }> = {
  anxious:   { emoji: "😰", label: "Anxious",    color: "oklch(0.75 0.15 60)"  },
  sad:       { emoji: "💙", label: "Sad",         color: "oklch(0.65 0.15 240)" },
  frustrated:{ emoji: "🔥", label: "Frustrated", color: "oklch(0.7 0.2 30)"   },
  lost:      { emoji: "🌫️", label: "Lost",        color: "oklch(0.6 0.05 280)" },
  motivated: { emoji: "⚡", label: "Motivated",  color: "var(--neon)"          },
  happy:     { emoji: "✨", label: "Happy",       color: "oklch(0.92 0.18 90)"  },
  confused:  { emoji: "🤔", label: "Confused",   color: "oklch(0.75 0.12 200)" },
  grateful:  { emoji: "🙏", label: "Grateful",   color: "oklch(0.85 0.15 150)" },
  neutral:   { emoji: "💬", label: "Neutral",    color: "oklch(0.7 0 0)"       },
};

// ─── Mood options for check-in ────────────────────────────────────────────────

export const MOOD_OPTIONS: { emotion: Emotion; emoji: string; label: string }[] = [
  { emotion: "motivated", emoji: "⚡", label: "Energized"  },
  { emotion: "happy",     emoji: "✨", label: "Good"       },
  { emotion: "neutral",   emoji: "😐", label: "Okay"       },
  { emotion: "anxious",   emoji: "😰", label: "Anxious"    },
  { emotion: "sad",       emoji: "💙", label: "Down"       },
  { emotion: "lost",      emoji: "🌫️", label: "Lost"       },
  { emotion: "frustrated",emoji: "🔥", label: "Frustrated" },
  { emotion: "grateful",  emoji: "🙏", label: "Grateful"   },
];
