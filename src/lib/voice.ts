/**
 * Whentor AI — Voice Engine
 *
 * Three modes of communication:
 *   1. Text  — default chat
 *   2. Voice — mentor speaks back to you (TTS)
 *   3. Call  — continuous voice conversation (STT + TTS loop)
 *
 * TTS priority:
 *   - ElevenLabs (premium, unique per mentor) when VITE_ELEVENLABS_API_KEY is set
 *   - Browser speechSynthesis (free, works immediately, no key needed)
 *
 * STT:
 *   - Web Speech API (free, browser-native, Chrome/Edge/Safari)
 */

// ─── ElevenLabs voice IDs — one per mentor personality ───────────────────────
// Each voice was chosen to match the mentor's real-world persona.
// Get your free key at elevenlabs.io → add as VITE_ELEVENLABS_API_KEY in .env

export const MENTOR_VOICES: Record<string, { elevenLabsId: string; displayName: string; browserVoiceHint: string }> = {
  christ:          { elevenLabsId: "ErXwobaYiN019PkySvjV", displayName: "Antoni",  browserVoiceHint: "Daniel"  }, // warm, gentle
  spiritual:       { elevenLabsId: "ErXwobaYiN019PkySvjV", displayName: "Antoni",  browserVoiceHint: "Daniel"  },
  psychologist:    { elevenLabsId: "onwK4e9ZLuTAKqWW03F9", displayName: "Daniel",  browserVoiceHint: "Arthur"  }, // deep, philosophical
  psychoanalyst:   { elevenLabsId: "onwK4e9ZLuTAKqWW03F9", displayName: "Daniel",  browserVoiceHint: "Arthur"  },
  therapist:       { elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", displayName: "Liam",    browserVoiceHint: "Aaron"   }, // calm, safe
  relationship:    { elevenLabsId: "XrExE9yKIg1WjnnlVkGX", displayName: "Matilda", browserVoiceHint: "Samantha"}, // warm female
  "womens-mentor": { elevenLabsId: "XrExE9yKIg1WjnnlVkGX", displayName: "Matilda", browserVoiceHint: "Samantha"},
  "mens-mentor":   { elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", displayName: "Liam",    browserVoiceHint: "Aaron"   },
  visionary:       { elevenLabsId: "pNInz6obpgDQGcFmaJgB", displayName: "Adam",    browserVoiceHint: "Fred"    }, // direct, american
  innovation:      { elevenLabsId: "pNInz6obpgDQGcFmaJgB", displayName: "Adam",    browserVoiceHint: "Fred"    },
  startup:         { elevenLabsId: "IKne3meq5aSn9XLyUdCD", displayName: "Charlie", browserVoiceHint: "Aaron"   },
  goggins:         { elevenLabsId: "VR6AewLTigWG4xSOukaG", displayName: "Arnold",  browserVoiceHint: "Fred"    }, // strong, intense
  jocko:           { elevenLabsId: "VR6AewLTigWG4xSOukaG", displayName: "Arnold",  browserVoiceHint: "Fred"    },
  "stoic-emperor": { elevenLabsId: "ZQe5CZNOzWyzPSCn5a3c", displayName: "James",   browserVoiceHint: "Alex"    }, // wise, measured
  "stoic-statesman":{ elevenLabsId:"ZQe5CZNOzWyzPSCn5a3c", displayName: "James",   browserVoiceHint: "Alex"    },
  "stoic-sage":    { elevenLabsId: "ZQe5CZNOzWyzPSCn5a3c", displayName: "James",   browserVoiceHint: "Alex"    },
  philosopher:     { elevenLabsId: "onwK4e9ZLuTAKqWW03F9", displayName: "Daniel",  browserVoiceHint: "Arthur"  },
  mindset:         { elevenLabsId: "TxGEqnHWrfWFTfGW9XjX", displayName: "Josh",    browserVoiceHint: "Fred"    }, // powerful
  negotiator:      { elevenLabsId: "nPczCjzI2devNBz1zQrb", displayName: "Brian",   browserVoiceHint: "Tom"     },
  leader:          { elevenLabsId: "pNInz6obpgDQGcFmaJgB", displayName: "Adam",    browserVoiceHint: "Fred"    },
  "roman-general": { elevenLabsId: "VR6AewLTigWG4xSOukaG", displayName: "Arnold",  browserVoiceHint: "Fred"    },
  "first-emperor": { elevenLabsId: "ZQe5CZNOzWyzPSCn5a3c", displayName: "James",   browserVoiceHint: "Alex"    },
  orator:          { elevenLabsId: "onwK4e9ZLuTAKqWW03F9", displayName: "Daniel",  browserVoiceHint: "Arthur"  },
  huberman:        { elevenLabsId: "IKne3meq5aSn9XLyUdCD", displayName: "Charlie", browserVoiceHint: "Aaron"   }, // articulate
  peterson:        { elevenLabsId: "nPczCjzI2devNBz1zQrb", displayName: "Brian",   browserVoiceHint: "Tom"     }, // deep, thoughtful
  naval:           { elevenLabsId: "N2lVS1w4EtoT3dr4eOWO", displayName: "Callum",  browserVoiceHint: "Alex"    }, // calm, wise
  clear:           { elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", displayName: "Liam",    browserVoiceHint: "Aaron"   },
  ferriss:         { elevenLabsId: "bVMeCyTHy58xNoL34h3p", displayName: "Jeremy",  browserVoiceHint: "Aaron"   },
  brene:           { elevenLabsId: "XrExE9yKIg1WjnnlVkGX", displayName: "Matilda", browserVoiceHint: "Samantha"},
  dispenza:        { elevenLabsId: "GBv7mTt0atIp3Br8iCZE", displayName: "Thomas",  browserVoiceHint: "Daniel"  },
  sinek:           { elevenLabsId: "ErXwobaYiN019PkySvjV", displayName: "Antoni",  browserVoiceHint: "Daniel"  },
  fitwell:         { elevenLabsId: "iP95p4xoKVk53GoZ742B", displayName: "Chris",   browserVoiceHint: "Aaron"   }, // casual, energetic
  nutrition:       { elevenLabsId: "IKne3meq5aSn9XLyUdCD", displayName: "Charlie", browserVoiceHint: "Aaron"   },
  finance:         { elevenLabsId: "nPczCjzI2devNBz1zQrb", displayName: "Brian",   browserVoiceHint: "Tom"     },
  // ── V5 advisors ──
  joseph:            { elevenLabsId: "ErXwobaYiN019PkySvjV", displayName: "Antoni",  browserVoiceHint: "Daniel"  },
  solomon:           { elevenLabsId: "ZQe5CZNOzWyzPSCn5a3c", displayName: "James",   browserVoiceHint: "Alex"    },
  marcus:            { elevenLabsId: "ZQe5CZNOzWyzPSCn5a3c", displayName: "James",   browserVoiceHint: "Alex"    },
  epictetus:         { elevenLabsId: "ZQe5CZNOzWyzPSCn5a3c", displayName: "James",   browserVoiceHint: "Alex"    },
  seneca:            { elevenLabsId: "onwK4e9ZLuTAKqWW03F9", displayName: "Daniel",  browserVoiceHint: "Arthur"  },
  "spiritual-mentor":{ elevenLabsId: "ErXwobaYiN019PkySvjV", displayName: "Antoni",  browserVoiceHint: "Daniel"  },
  jung:              { elevenLabsId: "onwK4e9ZLuTAKqWW03F9", displayName: "Daniel",  browserVoiceHint: "Arthur"  },
  frankl:            { elevenLabsId: "GBv7mTt0atIp3Br8iCZE", displayName: "Thomas",  browserVoiceHint: "Daniel"  },
  tolle:             { elevenLabsId: "N2lVS1w4EtoT3dr4eOWO", displayName: "Callum",  browserVoiceHint: "Alex"    },
  "huberman-mind":   { elevenLabsId: "IKne3meq5aSn9XLyUdCD", displayName: "Charlie", browserVoiceHint: "Aaron"   },
  "emotional-mentor":{ elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", displayName: "Liam",    browserVoiceHint: "Aaron"   },
  "bryan-johnson":   { elevenLabsId: "IKne3meq5aSn9XLyUdCD", displayName: "Charlie", browserVoiceHint: "Aaron"   },
  arnold:            { elevenLabsId: "VR6AewLTigWG4xSOukaG", displayName: "Arnold",  browserVoiceHint: "Fred"    },
  tony:              { elevenLabsId: "TxGEqnHWrfWFTfGW9XjX", displayName: "Josh",    browserVoiceHint: "Fred"    },
  attia:             { elevenLabsId: "IKne3meq5aSn9XLyUdCD", displayName: "Charlie", browserVoiceHint: "Aaron"   },
  "health-mentor":   { elevenLabsId: "iP95p4xoKVk53GoZ742B", displayName: "Chris",   browserVoiceHint: "Aaron"   },
  elon:              { elevenLabsId: "pNInz6obpgDQGcFmaJgB", displayName: "Adam",    browserVoiceHint: "Fred"    },
  jobs:              { elevenLabsId: "pNInz6obpgDQGcFmaJgB", displayName: "Adam",    browserVoiceHint: "Fred"    },
  buffett:           { elevenLabsId: "nPczCjzI2devNBz1zQrb", displayName: "Brian",   browserVoiceHint: "Tom"     },
  altman:            { elevenLabsId: "IKne3meq5aSn9XLyUdCD", displayName: "Charlie", browserVoiceHint: "Aaron"   },
  jensen:            { elevenLabsId: "bVMeCyTHy58xNoL34h3p", displayName: "Jeremy",  browserVoiceHint: "Aaron"   },
  zuck:              { elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", displayName: "Liam",    browserVoiceHint: "Aaron"   },
  pg:                { elevenLabsId: "N2lVS1w4EtoT3dr4eOWO", displayName: "Callum",  browserVoiceHint: "Alex"    },
  andreessen:        { elevenLabsId: "nPczCjzI2devNBz1zQrb", displayName: "Brian",   browserVoiceHint: "Tom"     },
  thiel:             { elevenLabsId: "onwK4e9ZLuTAKqWW03F9", displayName: "Daniel",  browserVoiceHint: "Arthur"  },
  hoffman:           { elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", displayName: "Liam",    browserVoiceHint: "Aaron"   },
  hormozi:           { elevenLabsId: "TxGEqnHWrfWFTfGW9XjX", displayName: "Josh",    browserVoiceHint: "Fred"    },
  garyv:             { elevenLabsId: "TxGEqnHWrfWFTfGW9XjX", displayName: "Josh",    browserVoiceHint: "Fred"    },
  "business-mentor": { elevenLabsId: "nPczCjzI2devNBz1zQrb", displayName: "Brian",   browserVoiceHint: "Tom"     },
  "chief-advisor":   { elevenLabsId: "N2lVS1w4EtoT3dr4eOWO", displayName: "Callum",  browserVoiceHint: "Alex"    },
  trump:             { elevenLabsId: "pNInz6obpgDQGcFmaJgB", displayName: "Adam",    browserVoiceHint: "Fred"    },
  psychiatrist:      { elevenLabsId: "GBv7mTt0atIp3Br8iCZE", displayName: "Thomas",  browserVoiceHint: "Daniel"  },
  "relationship-therapist": { elevenLabsId: "XrExE9yKIg1WjnnlVkGX", displayName: "Matilda", browserVoiceHint: "Samantha" },
};

const DEFAULT_VOICE = { elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", displayName: "Liam", browserVoiceHint: "Aaron" };

export function getMentorVoice(mentorId: string) {
  return MENTOR_VOICES[mentorId] ?? DEFAULT_VOICE;
}

// ─── Audio state ──────────────────────────────────────────────────────────────

let currentAudio: HTMLAudioElement | null = null;
// eslint-disable-next-line prefer-const
let _utteranceRef: { current: SpeechSynthesisUtterance | null } = { current: null };

export function stopAllVoice() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (window.speechSynthesis?.speaking) {
    window.speechSynthesis.cancel();
    _utteranceRef.current = null;
  }
}

// ─── ElevenLabs TTS ───────────────────────────────────────────────────────────

const ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;

export function hasElevenLabsKey(): boolean {
  return !!ELEVENLABS_KEY && ELEVENLABS_KEY.length > 10;
}

async function speakElevenLabs(
  text: string,
  voiceId: string,
  onStart: () => void,
  onEnd: () => void,
  onError: (e: string) => void,
): Promise<void> {
  stopAllVoice();

  // Trim to 600 chars to save API credits on long responses
  const trimmed = text.replace(/\*\*/g, "").slice(0, 600);

  try {
    onStart();
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: trimmed,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      onError(`ElevenLabs error: ${res.status} — ${err.slice(0, 100)}`);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      onEnd();
    };
    audio.onerror = () => {
      onError("Audio playback failed");
      onEnd();
    };

    await audio.play();
  } catch (e) {
    onError(String(e));
    onEnd();
  }
}

// ─── Browser speechSynthesis fallback ────────────────────────────────────────

function speakBrowser(
  text: string,
  browserVoiceHint: string,
  onStart: () => void,
  onEnd: () => void,
): void {
  stopAllVoice();

  const synth = window.speechSynthesis;
  if (!synth) { onEnd(); return; }

  // Strip markdown formatting
  const clean = text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\n+/g, " ").slice(0, 500);

  const utterance = new SpeechSynthesisUtterance(clean);
_utteranceRef.current = utterance;

  // Voice selection — explicit male voice priority, never match "female"
  const voices = synth.getVoices();
  const lower = (s: string) => s.toLowerCase();
  const isFemale = (v: SpeechSynthesisVoice) =>
    /female|samantha|victoria|karen|moira|tessa|fiona|kate|susan|allison|ava|zoe|nicky|serena/.test(lower(v.name));
  const MALE_NAMES = ["daniel", "aaron", "fred", "alex", "arthur", "tom", "oliver", "gordon", "reed", "rocko", "eddy", "ralph", "jacques", "bruce", "lee", "james", "rishi"];

  const preferred =
    // 1. Exact hint match (e.g. "Daniel")
    voices.find((v) => lower(v.name).includes(lower(browserVoiceHint)) && v.lang.startsWith("en")) ??
    // 2. Any known male en voice
    voices.find((v) => MALE_NAMES.some((n) => lower(v.name).includes(n)) && v.lang.startsWith("en")) ??
    // 3. Any en-US voice that is not female
    voices.find((v) => v.lang.startsWith("en-US") && !isFemale(v)) ??
    // 4. Any en voice that is not female
    voices.find((v) => v.lang.startsWith("en") && !isFemale(v));
  if (preferred) utterance.voice = preferred;

  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  utterance.onstart = onStart;
  utterance.onend = () => { _utteranceRef.current = null; onEnd(); };
  utterance.onerror = () => { _utteranceRef.current = null; onEnd(); };

  synth.speak(utterance);
}

// ─── Fish Audio TTS (primary — celebrity voice clones) ───────────────────────
// Per-advisor Fish Audio reference IDs. Your partner fills these in from
// fish.audio → Voices → copy the model/reference ID. Empty = default voice.

export const FISH_VOICES: Record<string, string> = {
  christ: "", joseph: "", solomon: "", marcus: "", epictetus: "", seneca: "",
  "spiritual-mentor": "", jung: "", frankl: "", brene: "", tolle: "",
  "huberman-mind": "", "emotional-mentor": "", "bryan-johnson": "", goggins: "",
  huberman: "", arnold: "", tony: "", attia: "", "health-mentor": "",
  elon: "", jobs: "", buffett: "", naval: "", altman: "", jensen: "",
  zuck: "", pg: "", andreessen: "", thiel: "", hoffman: "", hormozi: "",
  garyv: "", "business-mentor": "", "chief-advisor": "", trump: "",
  therapist: "", psychologist: "", psychiatrist: "", psychoanalyst: "", "relationship-therapist": "",
};

// Session cache: once /api/tts returns 503 (no key configured) we stop trying.
let fishAvailable: boolean | null = null;

export function isFishAudioKnownUnavailable(): boolean {
  return fishAvailable === false;
}

async function speakFishAudio(
  text: string,
  referenceId: string,
  onStart: () => void,
  onEnd: () => void,
): Promise<boolean> {
  // Returns true if Fish Audio handled playback; false → caller falls back.
  try {
    const clean = text.replace(/\*\*/g, "").slice(0, 800);
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: clean, referenceId }),
    });

    if (res.status === 503) { fishAvailable = false; return false; }
    if (!res.ok) return false;
    fishAvailable = true;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => { URL.revokeObjectURL(url); currentAudio = null; onEnd(); };
    audio.onerror = () => { URL.revokeObjectURL(url); currentAudio = null; onEnd(); };
    onStart();
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

// ─── Main speak function ──────────────────────────────────────────────────────
// Priority: Fish Audio (celebrity clones, server key) → ElevenLabs → browser.

export function speak(
  text: string,
  mentorId: string,
  callbacks: { onStart: () => void; onEnd: () => void; onError?: (e: string) => void },
): void {
  const voice = getMentorVoice(mentorId);

  const fallback = () => {
    if (hasElevenLabsKey()) {
      speakElevenLabs(text, voice.elevenLabsId, callbacks.onStart, callbacks.onEnd, callbacks.onError ?? console.error);
    } else {
      speakBrowser(text, voice.browserVoiceHint, callbacks.onStart, callbacks.onEnd);
    }
  };

  if (fishAvailable === false) { fallback(); return; }

  stopAllVoice();
  speakFishAudio(text, FISH_VOICES[mentorId] ?? "", callbacks.onStart, callbacks.onEnd)
    .then((handled) => { if (!handled) fallback(); });
}

// ─── Speech Recognition (STT) ────────────────────────────────────────────────

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionEvent = {
  resultIndex: number;
  results: {
    length: number;
    [i: number]: { isFinal: boolean; [j: number]: { transcript: string } };
  };
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

let currentRecognition: SpeechRecognitionInstance | null = null;

export function isSpeechRecognitionSupported(): boolean {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function startListening(callbacks: {
  onInterim: (text: string) => void;
  onFinal: (text: string) => void;
  onEnd: () => void;
  onError: (e: string) => void;
}): () => void {
  stopListening();

  const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    callbacks.onError("Speech recognition not supported in this browser. Try Chrome or Edge.");
    return () => {};
  }

  const recognition = new SpeechRecognition();
  currentRecognition = recognition;
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (e: SpeechRecognitionEvent) => {
    let interim = "";
    let final = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t;
      else interim += t;
    }
    if (interim) callbacks.onInterim(interim);
    if (final) callbacks.onFinal(final);
  };

  recognition.onend = () => {
    currentRecognition = null;
    callbacks.onEnd();
  };

  recognition.onerror = (e: { error: string }) => {
    currentRecognition = null;
    if (e.error !== "aborted") callbacks.onError(e.error);
    callbacks.onEnd();
  };

  try { recognition.start(); }
  catch { callbacks.onError("Could not start microphone. Check browser permissions."); }

  return () => recognition.abort();
}

export function stopListening(): void {
  if (currentRecognition) {
    currentRecognition.abort();
    currentRecognition = null;
  }
}
