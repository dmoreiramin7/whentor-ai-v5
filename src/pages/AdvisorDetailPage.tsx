import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { getAdvisor } from "@/lib/advisors";
import { detectEmotion, EMOTION_META } from "@/lib/emotions";
import { getPersonality } from "@/lib/personalities";
import { getMentorHistory } from "@/lib/memory";
import { getReply, buildMemorySummary, type ChatTurn } from "@/lib/chat";
import { useMemory } from "@/hooks/useMemory";
import { useVoice } from "@/hooks/useVoice";
import {
  ArrowLeft, Send, Mic, Star, Share2, Bookmark, Phone,
  Volume2, Square, Loader2, BookOpen, MessageCircle,
} from "lucide-react";

type Message = {
  role: "user" | "advisor";
  text: string;
  emotion?: ReturnType<typeof detectEmotion>;
  timestamp: number;
};

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i} className="block leading-relaxed">
        {parts.map((p, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{p}</strong> : p,
        )}
      </span>
    );
  });
}

export function AdvisorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const advisor = id ? getAdvisor(id) : undefined;
  const personality = id ? getPersonality(id) : null;
  const { memory, recordEmotion, recordConversation, recordMilestone } = useMemory();
  const voice = useVoice(id ?? "");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [tab, setTab] = useState<"chat" | "about">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  const pastHistory = id ? getMentorHistory(memory, id, 3) : [];
  const hasHistory = pastHistory.length > 0;
  const daysSinceLast = hasHistory
    ? Math.floor((Date.now() - pastHistory[pastHistory.length - 1].timestamp) / 86_400_000)
    : 0;
  const sessionCount = id ? memory.mentorUsage[id] ?? 0 : 0;

  useEffect(() => {
    if (!personality || !advisor) return;
    const greeting = hasHistory
      ? personality.returningMessage(memory.name, pastHistory[pastHistory.length - 1].userMessage.slice(0, 40), daysSinceLast)
      : personality.greeting(memory.name, false, memory.currentStreak);
    setMessages([{ role: "advisor", text: greeting, timestamp: Date.now() }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!advisor || !personality) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-[oklch(0.7_0_0)]">Advisor not found.</p>
          <Link to="/advisors" className="mt-4 text-sm neon-text">← All advisors</Link>
        </div>
      </AppShell>
    );
  }

  const Icon = advisor.icon;

  async function sendMessage(text?: string) {
    if (!advisor || !personality) return;
    const userMsg = (text ?? input).trim();
    if (!userMsg) return;
    setInput("");

    const emotion = detectEmotion(userMsg);
    setMessages((prev) => [...prev, { role: "user", text: userMsg, emotion, timestamp: Date.now() }]);
    setIsTyping(true);

    const _advisor = advisor;

    // Build conversation history for the AI (exclude the greeting if it's the only prior msg)
    const history: ChatTurn[] = messages
      .filter((m) => m.text.trim().length > 0)
      .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text } as ChatTurn));

    const memorySummary = buildMemorySummary({
      streak: memory.currentStreak,
      totalSessions: memory.totalSessions,
      topAreas: memory.topAreas,
      dominantEmotion: memory.dominantEmotion,
      lastTopics: pastHistory.map((h) => h.userMessage),
    });

    const fullReply = await getReply({
      advisorId: _advisor.id,
      userMessage: userMsg,
      emotion,
      history,
      userName: memory.name.split(" ")[0],
      memorySummary,
    });

    setIsTyping(false);
    setMessages((prev) => [...prev, { role: "advisor", text: fullReply, timestamp: Date.now() }]);
    recordEmotion(emotion.emotion, emotion.intensity, userMsg.slice(0, 60), _advisor.id);
    recordConversation(_advisor.id, userMsg, fullReply, emotion.emotion);

    const milestoneWords = ["breakthrough", "realized", "changed", "finally", "i see now", "thank you", "helped me", "makes sense now"];
    if (milestoneWords.some((w) => userMsg.toLowerCase().includes(w))) {
      recordMilestone(_advisor.id, "personal_growth", userMsg, `Insight with ${_advisor.name}`);
    }
  }

  const quickPrompts = advisor.topics.slice(0, 4).map((t) => `Guide me on ${t.toLowerCase()}`);

  return (
    <AppShell>
      <div className="pt-2">
        <Link to="/advisors" className="inline-flex items-center gap-2 text-sm text-[oklch(0.7_0_0)] hover:text-white transition mb-6">
          <ArrowLeft className="h-4 w-4" /> All advisors
        </Link>

        {/* ── Profile header ── */}
        <div className="flex items-start gap-5 mb-5">
          <div
            className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl ring-2 ring-[oklch(0.92_0.27_132/0.4)]"
            style={{ boxShadow: "0 0 40px oklch(0.92 0.27 132 / 0.2)" }}
          >
            {advisor.avatar ? (
              <img src={advisor.avatar} alt={advisor.name} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.08)" }}>
                <Icon className="h-10 w-10 text-[var(--neon)]" strokeWidth={1.4} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-[var(--neon)]">{advisor.category}</p>
            <h1 className="font-display text-2xl sm:text-3xl leading-tight">{advisor.name}</h1>
            <p className="mt-0.5 text-sm text-[oklch(0.6_0_0)]">{advisor.title} · {advisor.followers} followers</p>
            <p className="mt-2 text-sm italic text-[oklch(0.7_0_0)] leading-relaxed max-w-md">"{advisor.essence}"</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {sessionCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.07)] px-3 py-1 text-[11px] text-[var(--neon)]">
                  <Star className="h-3 w-3" strokeWidth={1.8} />
                  {sessionCount} conversation{sessionCount > 1 ? "s" : ""}
                </span>
              )}
              <Link
                to={`/advisor/voice/${advisor.id}`}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-black transition hover:opacity-90"
                style={{ background: "var(--neon)" }}
              >
                <Phone className="h-3 w-3" strokeWidth={2} />
                Voice Call
              </Link>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-1 mb-4 max-w-xs">
          {(["chat", "about"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition flex items-center justify-center gap-2 ${
                tab === t ? "text-black" : "text-[oklch(0.6_0_0)] hover:text-white"
              }`}
              style={tab === t ? { background: "var(--neon)" } : undefined}
            >
              {t === "chat" ? <MessageCircle className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
              {t === "chat" ? "Conversation" : "About"}
            </button>
          ))}
        </div>

        {tab === "about" && (
          <div className="space-y-4 mb-8">
            <div className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5">
              <p className="text-xs uppercase tracking-widest text-[var(--neon)] mb-2">Biography</p>
              <p className="text-sm text-[oklch(0.8_0_0)] leading-relaxed">{advisor.bio}</p>
            </div>
            <div className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5">
              <p className="text-xs uppercase tracking-widest text-[var(--neon)] mb-3">Topics</p>
              <div className="flex flex-wrap gap-2">
                {advisor.topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab("chat"); sendMessage(`Guide me on ${t.toLowerCase()}`); }}
                    className="rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-3 py-1.5 text-xs text-[oklch(0.7_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5">
              <p className="text-xs uppercase tracking-widest text-[var(--neon)] mb-3">Source Material</p>
              {advisor.books.map((b) => (
                <p key={b} className="text-sm text-[oklch(0.7_0_0)] py-1">📖 {b}</p>
              ))}
            </div>
          </div>
        )}

        {tab === "chat" && (
          <>
            {/* Quick prompts */}
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-hide mb-3">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="shrink-0 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-4 py-2 text-xs text-[oklch(0.7_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat */}
            <div className="rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.02)] overflow-hidden">
              <div className="min-h-[380px] max-h-[520px] overflow-y-auto p-5 space-y-5">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "advisor" && (
                      <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full mt-1 ring-1 ring-[oklch(0.92_0.27_132/0.3)]">
                        {advisor.avatar ? (
                          <img src={advisor.avatar} alt={advisor.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.1)" }}>
                            <Icon className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.8} />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col gap-1 max-w-[82%]">
                      {msg.role === "user" && msg.emotion && msg.emotion.emotion !== "neutral" && (
                        <div className="flex justify-end">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]"
                            style={{
                              background: `${EMOTION_META[msg.emotion.emotion].color}18`,
                              color: EMOTION_META[msg.emotion.emotion].color,
                              border: `1px solid ${EMOTION_META[msg.emotion.emotion].color}30`,
                            }}
                          >
                            {EMOTION_META[msg.emotion.emotion].emoji} {EMOTION_META[msg.emotion.emotion].label}
                          </span>
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm ${
                          msg.role === "user"
                            ? "bg-[var(--neon)] text-black font-medium"
                            : "bg-[oklch(1_0_0/0.05)] text-[oklch(0.85_0_0)] border border-[oklch(1_0_0/0.08)]"
                        }`}
                      >
                        {msg.role === "advisor" ? renderText(msg.text) : msg.text}
                      </div>

                      {msg.role === "advisor" && (
                        <div className="flex gap-2 pl-1 items-center">
                          <button
                            onClick={() => voice.playMessage(msg.text, String(msg.timestamp))}
                            className={`flex items-center gap-1 text-[10px] transition ${
                              voice.playingMessageId === String(msg.timestamp) && voice.status === "speaking"
                                ? "text-[var(--neon)]"
                                : "text-[oklch(0.45_0_0)] hover:text-[oklch(0.7_0_0)]"
                            }`}
                          >
                            {voice.playingMessageId === String(msg.timestamp) && voice.status === "loading"
                              ? <Loader2 className="h-3 w-3 animate-spin" />
                              : voice.playingMessageId === String(msg.timestamp) && voice.status === "speaking"
                              ? <Square className="h-3 w-3" />
                              : <Volume2 className="h-3 w-3" />}
                            {voice.playingMessageId === String(msg.timestamp) && voice.status === "speaking" ? "Stop" : "Listen"}
                          </button>
                          {i > 0 && (
                            <>
                              <button
                                onClick={() => setSavedIds((s) => new Set(s).add(msg.timestamp))}
                                className={`flex items-center gap-1 text-[10px] transition ${
                                  savedIds.has(msg.timestamp) ? "text-[var(--neon)]" : "text-[oklch(0.45_0_0)] hover:text-[oklch(0.7_0_0)]"
                                }`}
                              >
                                <Bookmark className="h-3 w-3" /> {savedIds.has(msg.timestamp) ? "Saved" : "Save Wisdom"}
                              </button>
                              <button className="flex items-center gap-1 text-[10px] text-[oklch(0.45_0_0)] hover:text-[oklch(0.7_0_0)] transition">
                                <Share2 className="h-3 w-3" /> Share
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-[oklch(0.92_0.27_132/0.3)]">
                      {advisor.avatar ? (
                        <img src={advisor.avatar} alt={advisor.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.1)" }}>
                          <Icon className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.8} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.05)] px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-2 w-2 rounded-full bg-[var(--neon)] opacity-60"
                          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-[oklch(1_0_0/0.08)] p-4 flex items-center gap-3">
                <input
                  value={voice.status === "listening" || voice.status === "processing" ? voice.interimText || "" : input}
                  onChange={(e) => { if (voice.status === "idle") setInput(e.target.value); }}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={
                    voice.status === "listening" ? "Listening… speak now" :
                    voice.status === "processing" ? "Processing…" :
                    `Ask ${advisor.name} for guidance…`
                  }
                  readOnly={voice.status === "listening" || voice.status === "processing"}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-[oklch(0.4_0_0)] outline-none"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || voice.status === "listening"}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-black transition hover:opacity-90 disabled:opacity-30"
                  style={{ background: "var(--neon)" }}
                >
                  <Send className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (voice.status === "listening" || voice.status === "processing") voice.stopMic();
                    else voice.startMic((text) => sendMessage(text));
                  }}
                  disabled={!voice.hasMic || voice.status === "speaking" || voice.status === "loading"}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition disabled:opacity-30 ${
                    voice.status === "listening" || voice.status === "processing"
                      ? "text-black"
                      : "border border-[oklch(1_0_0/0.08)] text-[oklch(0.7_0_0)] hover:text-white"
                  }`}
                  style={
                    voice.status === "listening" || voice.status === "processing"
                      ? { background: "var(--neon)", boxShadow: "0 0 16px oklch(0.92 0.27 132 / 0.5)" }
                      : undefined
                  }
                >
                  <Mic className={`h-4 w-4 ${voice.status === "listening" ? "animate-pulse" : ""}`} />
                </button>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] text-[oklch(0.35_0_0)]">
              Guidance, not answers · Emotional recognition active ·{" "}
              <Link to={`/advisor/voice/${advisor.id}`} className="text-[var(--neon)] hover:underline">Start voice call →</Link>
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </AppShell>
  );
}
