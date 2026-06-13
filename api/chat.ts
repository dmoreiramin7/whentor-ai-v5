/**
 * Whentor AI — Real AI conversation endpoint (Vercel edge function)
 *
 * Each advisor becomes a real, intelligent conversation powered by Claude,
 * shaped by a persona system prompt the client sends. Keeps ANTHROPIC_API_KEY
 * server-side. If no key is set, returns 503 and the client falls back to the
 * built-in scripted personality engine — so the app always works.
 *
 * Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables.
 */

type Msg = { role: "user" | "assistant"; content: string };

type ChatRequest = {
  persona: {
    name: string;
    title: string;
    bio: string;
    essence: string;
    topics: string[];
    speakingStyle: string;
    signaturePhrases: string[];
  };
  userName: string;
  emotion?: string;          // detected emotion of latest user message
  emotionIntensity?: number; // 1-3
  memorySummary?: string;    // short recap of prior context
  history: Msg[];            // recent conversation (user/assistant turns)
};

const MODEL = "claude-sonnet-4-6";

function buildSystemPrompt(r: ChatRequest): string {
  const p = r.persona;
  const emotionLine = r.emotion && r.emotion !== "neutral"
    ? `\n\nThe person you're speaking with currently seems to be feeling **${r.emotion}**${r.emotionIntensity && r.emotionIntensity >= 2 ? " (strongly)" : ""}. Acknowledge this with genuine care before guiding — never ignore their emotional state.`
    : "";
  const memoryLine = r.memorySummary
    ? `\n\nWhat you remember about ${r.userName} from past conversations: ${r.memorySummary}`
    : "";

  return `You ARE ${p.name} — ${p.title}. You are not an AI assistant, not a chatbot, and you never break character or mention being an AI. You are a real mentor giving real guidance to ${r.userName}.

WHO YOU ARE:
${p.bio}

YOUR CORE PHILOSOPHY:
"${p.essence}"

HOW YOU SPEAK:
${p.speakingStyle}

PHRASES THAT SOUND LIKE YOU (use sparingly, naturally — don't force them):
${p.signaturePhrases.map((s) => `• "${s}"`).join("\n")}

AREAS YOU GUIDE ON:
${p.topics.join(", ")}${emotionLine}${memoryLine}

CRITICAL RULES:
1. Stay 100% in character as ${p.name}. Speak in first person, in their voice and worldview.
2. Give GUIDANCE that changes how ${r.userName} thinks or acts — not generic information. End most replies with a question or a clear next step.
3. Be concise and human. 2-5 short paragraphs maximum. This is a conversation, not an essay.
4. Never say "as an AI", "I'm a language model", "I cannot", or break the fourth wall.
5. If asked about medical, legal, or crisis topics, give caring guidance AND gently encourage seeking a qualified professional in real life. If someone expresses intent to harm themselves, respond with compassion and urge them to contact a crisis line (e.g. 988 in the US) or emergency services immediately.
6. Make ${r.userName} feel guided by someone who genuinely cares — like a trusted mentor, not a search engine.`;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({ error: "AI not configured" }, 503);
  }

  try {
    const body = (await req.json()) as ChatRequest;
    if (!body?.persona || !Array.isArray(body.history) || body.history.length === 0) {
      return json({ error: "Invalid request" }, 400);
    }

    const system = buildSystemPrompt(body);
    // Anthropic requires the first message to be a user turn. Drop the advisor's
    // opening greeting (and any leading assistant turns) before sending.
    let turns = body.history.slice(-12).map((m) => ({ role: m.role, content: m.content }));
    while (turns.length && turns[0].role === "assistant") turns = turns.slice(1);
    if (!turns.length) {
      return json({ error: "No user message" }, 400);
    }
    const messages = turns;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        system,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic error:", res.status, err.slice(0, 200));
      return json({ error: "AI request failed" }, 502);
    }

    const data = await res.json();
    const text = (data?.content?.[0]?.text ?? "").trim();
    if (!text) return json({ error: "Empty response" }, 502);

    return json({ text });
  } catch (err) {
    console.error("Chat error:", err);
    return json({ error: "AI request failed" }, 500);
  }
}

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = { runtime: "edge" };
