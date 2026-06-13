/**
 * Auto-fills FISH_VOICES in src/lib/voice.ts by searching the Fish Audio
 * marketplace for each advisor's best voice clone.
 *
 * Usage:
 *   FISH_AUDIO_API_KEY=sk_... node scripts/fill-fish-voices.mjs
 *
 * Picks the most-liked public model matching each advisor's search term.
 * Review the result before committing — swap any ID manually if needed.
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const KEY = process.env.FISH_AUDIO_API_KEY;
if (!KEY) {
  console.error("❌ Set FISH_AUDIO_API_KEY first:\n   FISH_AUDIO_API_KEY=sk_... node scripts/fill-fish-voices.mjs");
  process.exit(1);
}

// Search term per advisor — tuned for the Fish Audio marketplace
const SEARCH = {
  elon: "Elon Musk",
  trump: "Donald Trump",
  jobs: "Steve Jobs",
  buffett: "Warren Buffett",
  naval: "Naval Ravikant",
  altman: "Sam Altman",
  jensen: "Jensen Huang",
  zuck: "Mark Zuckerberg",
  thiel: "Peter Thiel",
  hoffman: "Reid Hoffman",
  hormozi: "Alex Hormozi",
  garyv: "Gary Vaynerchuk",
  andreessen: "Marc Andreessen",
  pg: "Paul Graham",
  goggins: "David Goggins",
  huberman: "Andrew Huberman",
  "huberman-mind": "Andrew Huberman",
  arnold: "Arnold Schwarzenegger",
  tony: "Tony Robbins",
  attia: "Peter Attia",
  "bryan-johnson": "Bryan Johnson",
  jung: "Carl Jung",
  frankl: "Viktor Frankl",
  tolle: "Eckhart Tolle",
  brene: "Brene Brown",
  marcus: "Marcus Aurelius",
  seneca: "Seneca stoic",
  epictetus: "Epictetus",
  solomon: "wise king deep voice",
  joseph: "warm storyteller male",
  christ: "Jesus calm warm voice",
  "spiritual-mentor": "Dalai Lama",
  "emotional-mentor": "calm therapist male voice",
  "health-mentor": "energetic coach male",
  "business-mentor": "confident business male voice",
  "chief-advisor": "wise advisor calm male",
};

async function searchVoice(term) {
  const res = await fetch(
    `https://api.fish.audio/model?title=${encodeURIComponent(term)}&page_size=5&page_number=1`,
    { headers: { Authorization: `Bearer ${KEY}` } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const items = data.items ?? data.data ?? [];
  if (!items.length) return null;
  // Most liked first
  items.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
  return { id: items[0]._id ?? items[0].id, title: items[0].title, likes: items[0].like_count ?? 0 };
}

const voicePath = join(dirname(fileURLToPath(import.meta.url)), "../src/lib/voice.ts");
let src = readFileSync(voicePath, "utf-8");
const results = {};

for (const [advisorId, term] of Object.entries(SEARCH)) {
  try {
    const v = await searchVoice(term);
    if (v?.id) {
      results[advisorId] = v.id;
      console.log(`✓ ${advisorId.padEnd(18)} → "${v.title}" (${v.likes} likes) [${v.id}]`);
    } else {
      console.log(`– ${advisorId.padEnd(18)} → no match, keeps default voice`);
    }
  } catch (e) {
    console.log(`✗ ${advisorId.padEnd(18)} → error: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 250)); // be polite to the API
}

// Rewrite the FISH_VOICES block
const block = `export const FISH_VOICES: Record<string, string> = {\n${Object.entries({
  ...Object.fromEntries(Object.keys(SEARCH).map((k) => [k, ""])),
  ...results,
}).map(([k, v]) => `  ${k.includes("-") ? `"${k}"` : k}: "${v}",`).join("\n")}\n};`;

src = src.replace(/export const FISH_VOICES: Record<string, string> = \{[\s\S]*?\};/, block);
writeFileSync(voicePath, src);
console.log(`\n✅ Updated ${voicePath} with ${Object.keys(results).length} voice IDs.`);
console.log("   Review, then: npm run build && git commit && vercel deploy --prod");
