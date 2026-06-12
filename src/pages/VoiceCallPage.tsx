import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdvisor } from "@/lib/advisors";
import { Sparkles } from "lucide-react";
import { getPersonality } from "@/lib/personalities";
import { detectEmotion } from "@/lib/emotions";
import { getMentorVoice, hasElevenLabsKey, isSpeechRecognitionSupported } from "@/lib/voice";
import { useVoice } from "@/hooks/useVoice";
import { useMemory } from "@/hooks/useMemory";
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, MessageSquare } from "lucide-react";

type CallMessage = { role: "user" | "mentor"; text: string; ts: number };

function renderClean(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\n+/g, " ").trim();
}

export function VoiceCallPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Adapter: advisor (or virtual Chief Advisor) → the shape this page renders
  const advisor = id === "chief-advisor"
    ? { id: "chief-advisor", name: "Chief Advisor", title: "Your Personal Guide", icon: Sparkles, avatar: undefined as string | undefined }
    : (id ? getAdvisor(id) : undefined);
  const mentor = advisor
    ? { id: advisor.id, inspiredBy: advisor.name, name: advisor.title, icon: advisor.icon, avatar: advisor.avatar }
    : undefined;
  const personality = id ? getPersonality(id) : null;
  const { memory, recordEmotion, recordConversation } = useMemory();
  const voice = useVoice(id ?? "");

  const [messages, setMessages] = useState<CallMessage[]>([]);
  const [muted, setMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStarted, setCallStarted] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voiceConfig = id ? getMentorVoice(id) : null;

  // ── Timer ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (callStarted) {
      timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callStarted]);

  // ── Auto-scroll transcript ───────────────────────────────────────────────────
  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // ── Start call with greeting ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mentor || !personality) return;

    const greeting = personality.greeting(memory.name, false, memory.currentStreak);
    const cleanGreeting = renderClean(greeting);
    const msgId = `mentor-0`;

    setMessages([{ role: "mentor", text: greeting, ts: Date.now() }]);
    setCallStarted(true);

    voice.speakThenListen(cleanGreeting, msgId, handleUserSpoke);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handle user speech ────────────────────────────────────────────────────────
  function handleUserSpoke(userText: string) {
    if (!userText.trim() || !mentor || !personality) return;

    const emotion = detectEmotion(userText);
    setMessages((prev) => [...prev, { role: "user", text: userText, ts: Date.now() }]);
    recordEmotion(emotion.emotion, emotion.intensity, userText.slice(0, 60), mentor.id);

    // Build reply
    const emotionalPre = emotion.intensity >= 2
      ? personality.emotionalResponses[emotion.emotion] ?? ""
      : "";
    const mainResp = personality.respond(userText, emotion, []);
    const fullReply = emotionalPre ? `${emotionalPre} ${mainResp}` : mainResp;
    const cleanReply = renderClean(fullReply);
    const msgId = `mentor-${Date.now()}`;

    setMessages((prev) => [...prev, { role: "mentor", text: fullReply, ts: Date.now() }]);
    recordConversation(mentor.id, userText, fullReply, emotion.emotion);

    // Continue the call loop
    voice.speakThenListen(cleanReply, msgId, handleUserSpoke);
  }

  // ── Manual mic press ─────────────────────────────────────────────────────────
  function handleMicPress() {
    if (voice.status === "listening" || voice.status === "processing") {
      voice.stopMic();
    } else if (voice.status === "idle") {
      voice.startMic(handleUserSpoke);
    }
  }

  // ── End call ─────────────────────────────────────────────────────────────────
  function endCall() {
    voice.stopSpeaking();
    voice.stopMic();
    if (timerRef.current) clearInterval(timerRef.current);
    navigate(id === "chief-advisor" ? "/home" : `/advisor/${id}`);
  }

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const isActive = voice.status === "speaking" || voice.status === "listening" || voice.status === "processing";

  if (!mentor || !personality) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="text-[oklch(0.6_0_0)]">Mentor not found.</p>
      </div>
    );
  }

  const Icon = mentor.icon;

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black">
      {/* ── Aurora background ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(50% 50% at 50% 30%, oklch(0.92 0.27 132 / 0.12) 0%, transparent 70%),
            radial-gradient(30% 40% at 20% 80%, oklch(0.92 0.27 132 / 0.06) 0%, transparent 60%),
            #000
          `,
        }}
      />

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-6 pb-2">
        <div>
          <p className="text-xs text-[oklch(0.5_0_0)] uppercase tracking-widest">In Call</p>
          <p className="text-sm font-semibold text-white">{mentor.inspiredBy}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.08)] px-3 py-1 text-xs text-[var(--neon)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--neon)]" />
            {formatTime(callDuration)}
          </span>
          <button
            onClick={() => setShowTranscript((s) => !s)}
            className="grid h-8 w-8 place-items-center rounded-full border border-[oklch(1_0_0/0.08)] text-[oklch(0.6_0_0)] hover:text-white transition"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Main center — avatar + status ── */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
        {/* Pulsing rings */}
        <div className="relative flex items-center justify-center">
          {isActive && (
            <>
              <span
                className="absolute rounded-full opacity-20"
                style={{
                  width: 200, height: 200,
                  background: "var(--neon)",
                  animation: "pulse-ring 2s ease-out infinite",
                }}
              />
              <span
                className="absolute rounded-full opacity-15"
                style={{
                  width: 160, height: 160,
                  background: "var(--neon)",
                  animation: "pulse-ring 2s ease-out 0.6s infinite",
                }}
              />
            </>
          )}

          {/* Avatar */}
          <div
            className="relative grid h-36 w-36 place-items-center overflow-hidden rounded-full"
            style={{
              background: "oklch(0.92 0.27 132 / 0.08)",
              boxShadow: isActive
                ? "0 0 0 4px oklch(0.92 0.27 132 / 0.4), 0 0 60px oklch(0.92 0.27 132 / 0.3)"
                : "0 0 0 2px oklch(0.92 0.27 132 / 0.2)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {mentor.avatar ? (
              <img src={mentor.avatar} alt={mentor.inspiredBy} className="h-full w-full object-cover" />
            ) : (
              <Icon className="h-16 w-16 text-[var(--neon)]" strokeWidth={1.2} />
            )}
          </div>
        </div>

        {/* Name + status */}
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-white">{mentor.inspiredBy}</h2>
          <p className="mt-1 text-sm text-[oklch(0.55_0_0)]">{mentor.name}</p>

          {/* Dynamic status pill */}
          <div className="mt-3 flex justify-center">
            {voice.status === "loading" && (
              <span className="rounded-full border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.05)] px-4 py-1.5 text-xs text-[oklch(0.6_0_0)]">
                Preparing response…
              </span>
            )}
            {voice.status === "speaking" && (
              <span className="flex items-center gap-2 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.08)] px-4 py-1.5 text-xs text-[var(--neon)]">
                <Volume2 className="h-3.5 w-3.5" />
                {mentor.inspiredBy} is speaking…
              </span>
            )}
            {(voice.status === "listening" || voice.status === "processing") && (
              <span className="flex items-center gap-2 rounded-full border border-[oklch(0.65_0.15_250/0.4)] bg-[oklch(0.65_0.15_250/0.1)] px-4 py-1.5 text-xs text-[oklch(0.8_0.1_250)]">
                <Mic className="h-3.5 w-3.5 animate-pulse" />
                {voice.status === "processing" ? `"${voice.interimText.slice(0, 40)}…"` : "Listening…"}
              </span>
            )}
            {voice.status === "idle" && callStarted && (
              <span className="rounded-full border border-[oklch(1_0_0/0.06)] bg-[oklch(1_0_0/0.03)] px-4 py-1.5 text-xs text-[oklch(0.5_0_0)]">
                Tap mic to speak
              </span>
            )}
            {voice.status === "error" && (
              <span className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-1.5 text-xs text-red-400">
                {voice.error?.slice(0, 60)}
              </span>
            )}
          </div>
        </div>

        {/* ElevenLabs / browser voice badge */}
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[oklch(1_0_0/0.06)] bg-[oklch(1_0_0/0.03)] px-3 py-1 text-[10px] text-[oklch(0.45_0_0)]">
            {hasElevenLabsKey()
              ? `ElevenLabs · ${voiceConfig?.displayName ?? "Custom"} voice`
              : `Browser voice · Add VITE_ELEVENLABS_API_KEY for premium`}
          </span>
          {!isSpeechRecognitionSupported() && (
            <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-[10px] text-amber-400">
              Mic not available · Use Chrome
            </span>
          )}
        </div>
      </div>

      {/* ── Live transcript ── */}
      {showTranscript && messages.length > 0 && (
        <div
          ref={transcriptRef}
          className="mx-4 mb-4 max-h-44 overflow-y-auto rounded-3xl border border-[oklch(1_0_0/0.06)] bg-[oklch(1_0_0/0.03)] p-4 space-y-2 scrollbar-hide"
        >
          {messages.slice(-6).map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--neon)] text-black font-medium"
                    : "text-[oklch(0.7_0_0)]"
                }`}
              >
                {msg.text.slice(0, 160)}{msg.text.length > 160 ? "…" : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Controls ── */}
      <div className="flex items-center justify-center gap-6 px-6 pb-safe pb-10">
        {/* Mute toggle */}
        <button
          onClick={() => { setMuted((m) => !m); if (!muted) voice.stopSpeaking(); }}
          className="grid h-14 w-14 place-items-center rounded-full border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.04)] text-[oklch(0.7_0_0)] hover:text-white transition"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>

        {/* End call — center, red */}
        <button
          onClick={endCall}
          className="grid h-20 w-20 place-items-center rounded-full text-white transition hover:opacity-90 active:scale-95"
          style={{ background: "oklch(0.62 0.22 25)" }}
        >
          <PhoneOff className="h-7 w-7" />
        </button>

        {/* Mic */}
        <button
          onClick={handleMicPress}
          disabled={voice.status === "speaking" || voice.status === "loading"}
          className={`grid h-14 w-14 place-items-center rounded-full transition disabled:opacity-30 ${
            voice.status === "listening" || voice.status === "processing"
              ? "text-black"
              : "border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.04)] text-[oklch(0.7_0_0)] hover:text-white"
          }`}
          style={
            voice.status === "listening" || voice.status === "processing"
              ? { background: "var(--neon)", boxShadow: "0 0 20px oklch(0.92 0.27 132 / 0.5)" }
              : undefined
          }
        >
          {voice.status === "listening" || voice.status === "processing"
            ? <Mic className="h-5 w-5 animate-pulse" />
            : <MicOff className="h-5 w-5" />}
        </button>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.3; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
