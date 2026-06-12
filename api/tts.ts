/**
 * Whentor AI — Fish Audio TTS proxy (Vercel serverless function)
 *
 * Keeps FISH_AUDIO_API_KEY server-side. The client sends text + the
 * advisor's Fish Audio reference_id; we stream back MP3.
 *
 * Set FISH_AUDIO_API_KEY in Vercel → Project → Settings → Environment Variables.
 */

const FISH_AUDIO_URL = "https://api.fish.audio/v1/tts";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.FISH_AUDIO_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Fish Audio not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { text, referenceId } = (await req.json()) as { text?: string; referenceId?: string };
    if (!text?.trim()) {
      return new Response(JSON.stringify({ error: "Missing text" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body: Record<string, unknown> = {
      text: text.slice(0, 1000),
      format: "mp3",
      mp3_bitrate: 128,
      normalize: true,
      latency: "normal",
      streaming: true,
    };
    // Only pass reference_id when a real Fish Audio voice ID is set
    if (referenceId && referenceId.length > 10) {
      body.reference_id = referenceId;
    }

    const res = await fetch(FISH_AUDIO_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        model: "speech-1-hd",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Fish Audio error:", res.status, err.slice(0, 200));
      return new Response(JSON.stringify({ error: "TTS failed" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(res.body, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-cache" },
    });
  } catch (err) {
    console.error("TTS error:", err);
    return new Response(JSON.stringify({ error: "TTS failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = { runtime: "edge" };
