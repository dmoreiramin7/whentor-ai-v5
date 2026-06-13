import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { advisors, ALL_CATEGORIES, CATEGORY_META } from "@/lib/advisors";
import { MOOD_OPTIONS, EMOTION_META } from "@/lib/emotions";
import { useMemory } from "@/hooks/useMemory";
import { useVoice } from "@/hooks/useVoice";
import {
  Mic, ArrowRight, Sparkles, Volume2, Loader2, Square,
  Search, Brain, Heart, Activity, Briefcase, Crown,
} from "lucide-react";

type Pill = { id: string; label: string; icon: typeof Sparkles; advisorId: string };
const pills: Pill[] = [
  { id: "spiritual", label: "Spiritual", icon: Sparkles,  advisorId: "christ" },
  { id: "mind",      label: "Mind",      icon: Brain,     advisorId: "jung" },
  { id: "heart",     label: "Heart",     icon: Heart,     advisorId: "brene" },
  { id: "body",      label: "Body",      icon: Activity,  advisorId: "health-mentor" },
  { id: "work",      label: "Work",      icon: Briefcase, advisorId: "business-mentor" },
  { id: "lead",      label: "Lead",      icon: Crown,     advisorId: "solomon" },
];

const essentialIds = ["christ", "jung", "therapist", "elon", "health-mentor", "trump"];

// Mood → recommended advisors (tap = instant guidance)
const MOOD_ADVISORS: Record<string, string[]> = {
  motivated:  ["goggins", "elon", "hormozi", "tony"],
  happy:      ["naval", "tolle", "solomon", "buffett"],
  neutral:    essentialIds,
  anxious:    ["therapist", "christ", "huberman-mind", "tolle"],
  sad:        ["therapist", "christ", "frankl", "brene"],
  lost:       ["christ", "frankl", "marcus", "solomon"],
  frustrated: ["goggins", "marcus", "jung", "epictetus"],
  grateful:   ["christ", "tolle", "spiritual-mentor", "brene"],
};

export function HomePage() {
  const { memory, setMood } = useMemory();
  const voice = useVoice("chief-advisor");
  const [activePill, setActivePill] = useState<string | null>(null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const firstName = memory.name.split(" ")[0];

  // Mood check-in: shown until set today
  const today = new Date().toISOString().slice(0, 10);
  const moodIsToday = memory.todayMoodTimestamp
    ? new Date(memory.todayMoodTimestamp).toISOString().slice(0, 10) === today
    : false;
  const todayMood = moodIsToday ? memory.todayMood : null;
  const [entering, setEntering] = useState(!todayMood);

  const reflection = memory.totalSessions > 1
    ? `${memory.currentStreak} days strong, ${firstName}. One deep conversation today — that's the move.`
    : `Welcome, ${firstName}. One honest conversation. That's how it starts.`;

  const essentials = essentialIds.map((id) => advisors.find((a) => a.id === id)!).filter(Boolean);
  const recommended = (todayMood ? MOOD_ADVISORS[todayMood] ?? essentialIds : essentialIds)
    .map((id) => advisors.find((a) => a.id === id)!)
    .filter(Boolean);

  // ── Mood check-in: ceremonial full-screen entrance ──────────────────────────
  if (entering) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(45% 35% at 50% 28%, oklch(0.92 0.27 132 / 0.14) 0%, transparent 70%),
              radial-gradient(60% 40% at 50% 100%, oklch(0.92 0.27 132 / 0.07) 0%, transparent 60%),
              #000`,
          }}
        />
        <div className="entrance relative w-full max-w-sm text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">Whentor AI</p>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            {greeting},<br /><span className="neon-text">{firstName}.</span>
          </h1>
          <p className="mt-3 text-sm text-[oklch(0.55_0_0)]">How are you feeling?</p>

          <div className="mt-8 grid grid-cols-4 gap-3">
            {MOOD_OPTIONS.map((opt, i) => (
              <button
                key={opt.emotion}
                onClick={() => { setMood(opt.emotion); setEntering(false); }}
                className="mood-tap group flex flex-col items-center gap-2 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] py-4 transition hover:border-[oklch(0.92_0.27_132/0.5)] hover:bg-[oklch(0.92_0.27_132/0.06)] active:scale-90"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-2xl transition group-hover:scale-125">{opt.emoji}</span>
                <span className="text-[10px] text-[oklch(0.6_0_0)] group-hover:text-white transition">{opt.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setEntering(false)}
            className="mt-8 text-xs text-[oklch(0.4_0_0)] transition hover:text-[oklch(0.6_0_0)]"
          >
            Skip
          </button>
        </div>

        <style>{`
          .entrance { animation: rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
          .mood-tap { animation: pop 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
          @keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
          @keyframes pop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: none; } }
        `}</style>
      </div>
    );
  }

  // ── Home ─────────────────────────────────────────────────────────────────────
  const moodMeta = todayMood ? EMOTION_META[todayMood] : null;

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative pt-8 sm:pt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--neon), transparent 70%)" }}
        />
        <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {greeting}, <span className="neon-text">{firstName}.</span>
        </h1>
        {moodMeta && todayMood !== "neutral" && (
          <button
            onClick={() => setEntering(true)}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-3.5 py-1.5 text-xs text-[oklch(0.65_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.3)]"
          >
            {moodMeta.emoji} {moodMeta.label} today
          </button>
        )}

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex h-14 max-w-xl items-center gap-3 rounded-full border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.04)] px-5 backdrop-blur-xl transition focus-within:border-[oklch(0.92_0.27_132/0.6)]"
        >
          <Search className="h-5 w-5 text-[oklch(0.5_0_0)]" />
          <input
            placeholder="Ask anything…"
            className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-[oklch(0.4_0_0)] text-white"
          />
          <button type="submit" className="grid h-9 w-9 place-items-center rounded-full text-black" style={{ background: "var(--neon)" }}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Pills — tap goes straight to the advisor */}
        <div className="mt-5 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {pills.map((p) => {
            const Icon = p.icon;
            const isActive = p.id === activePill;
            return (
              <Link
                key={p.id}
                to={`/advisor/${p.advisorId}`}
                onClick={() => setActivePill(p.id)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition active:scale-95 ${
                  isActive
                    ? "border-[oklch(0.92_0.27_132/0.7)] bg-[oklch(0.92_0.27_132/0.1)] text-white"
                    : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] text-[oklch(0.65_0_0)] hover:border-[oklch(0.92_0.27_132/0.3)] hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[var(--neon)]" : ""}`} strokeWidth={1.8} />
                <span className="font-medium">{p.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Chief Advisor */}
      <section className="mt-10">
        <div
          className="chief-card relative overflow-hidden rounded-3xl border border-[oklch(0.92_0.27_132/0.25)] p-6 sm:p-7"
          style={{ background: "linear-gradient(135deg, oklch(0.92 0.27 132 / 0.07) 0%, oklch(0.1 0 0) 50%, #000 100%)" }}
        >
          <div className="shimmer pointer-events-none absolute inset-0" aria-hidden />

          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon)] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--neon)]" />
            </span>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--neon)]">Chief Advisor</p>
          </div>

          <p className="mt-4 font-display text-lg leading-snug text-white sm:text-xl">{reflection}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/advisor/voice/chief-advisor"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 active:scale-95"
              style={{ background: "var(--neon)", boxShadow: "0 0 30px oklch(0.92 0.27 132 / 0.4)" }}
            >
              <Mic className="h-4 w-4" />
              Talk To My Advisor
            </Link>
            <button
              onClick={() => voice.playMessage(reflection, "weekly-reflection")}
              className="grid h-11 w-11 place-items-center rounded-full border border-[oklch(1_0_0/0.12)] bg-[oklch(1_0_0/0.04)] text-[oklch(0.8_0_0)] transition hover:text-white hover:border-[oklch(0.92_0.27_132/0.4)]"
              title="Voice summary"
            >
              {voice.status === "loading" && voice.playingMessageId === "weekly-reflection"
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : voice.status === "speaking" && voice.playingMessageId === "weekly-reflection"
                ? <Square className="h-4 w-4" />
                : <Volume2 className="h-4 w-4" />}
            </button>
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.12)] bg-[oklch(1_0_0/0.04)] px-5 py-3 text-sm text-[oklch(0.8_0_0)] transition hover:text-white"
            >
              Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mood-based recommendations */}
      {moodMeta && todayMood !== "neutral" && (
        <section className="mt-10">
          <h2 className="font-display text-lg tracking-tight sm:text-xl mb-4">
            {moodMeta.emoji} For how you feel
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {recommended.slice(0, 4).map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.id}
                  to={`/advisor/${a.id}`}
                  className="group flex flex-col items-center gap-2.5 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] active:scale-95"
                >
                  <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full ring-1 ring-[oklch(1_0_0/0.1)] transition group-hover:ring-[oklch(0.92_0.27_132/0.5)]">
                    {a.avatar ? (
                      <img src={a.avatar} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.07)" }}>
                        <Icon className="h-6 w-6 text-[var(--neon)]" strokeWidth={1.6} />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium text-white leading-tight">{a.name}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Essentials */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-lg tracking-tight sm:text-xl">Your essentials</h2>
          <Link to="/advisors" className="text-[11px] uppercase tracking-[0.18em] text-[oklch(0.55_0_0)] transition hover:text-white">
            All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {essentials.map((a) => {
            const Icon = a.icon;
            const sessions = memory.mentorUsage[a.id] ?? 0;
            return (
              <Link
                key={a.id}
                to={`/advisor/${a.id}`}
                className="group relative flex items-center gap-3 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-3.5 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] active:scale-[0.98]"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-[oklch(1_0_0/0.1)] transition group-hover:ring-[oklch(0.92_0.27_132/0.5)]">
                  {a.avatar ? (
                    <img src={a.avatar} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.07)" }}>
                      <Icon className="h-6 w-6 text-[var(--neon)]" strokeWidth={1.6} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{a.name}</p>
                  {sessions > 0
                    ? <p className="text-[11px] font-medium text-[var(--neon)]">{sessions} session{sessions > 1 ? "s" : ""}</p>
                    : <p className="truncate text-[11px] text-[oklch(0.55_0_0)]">{a.title}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Pillars */}
      <section className="mt-10">
        <h2 className="font-display text-lg tracking-tight sm:text-xl mb-4">Guidance</h2>
        <div className="grid grid-cols-2 gap-3">
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            return (
              <Link
                key={cat}
                to={`/advisors?cat=${meta.slug}`}
                className="group flex flex-col items-center gap-3 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5 text-center transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] active:scale-95"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-[oklch(1_0_0/0.08)] transition group-hover:ring-[oklch(0.92_0.27_132/0.4)]"
                  style={{ background: "oklch(0.92 0.27 132 / 0.06)" }}
                >
                  <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{cat.split(" & ")[0]}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Voices */}
      <section className="mt-10 mb-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-lg tracking-tight sm:text-xl">Today's biggest voices</h2>
        </div>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {["huberman", "goggins", "naval", "hormozi", "jensen", "altman", "buffett", "arnold", "thiel", "garyv"]
            .map((id) => advisors.find((a) => a.id === id)!)
            .filter(Boolean)
            .map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.id}
                  to={`/advisor/${a.id}`}
                  className="group flex w-[140px] shrink-0 flex-col items-center gap-3 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] active:scale-95"
                >
                  <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-full ring-1 ring-[oklch(1_0_0/0.1)] transition group-hover:ring-[oklch(0.92_0.27_132/0.5)]">
                    {a.avatar ? (
                      <img src={a.avatar} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.06)" }}>
                        <Icon className="h-7 w-7 text-[var(--neon)]" strokeWidth={1.6} />
                      </div>
                    )}
                  </div>
                  <p className="truncate w-full text-center text-sm font-semibold text-white">{a.name}</p>
                </Link>
              );
            })}
        </div>
      </section>

      <style>{`
        .chief-card { animation: breathe 5s ease-in-out infinite; }
        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 50px -22px oklch(0.92 0.27 132 / 0.35); }
          50% { box-shadow: 0 0 70px -18px oklch(0.92 0.27 132 / 0.55); }
        }
        .shimmer {
          background: linear-gradient(105deg, transparent 40%, oklch(0.92 0.27 132 / 0.05) 50%, transparent 60%);
          background-size: 250% 100%;
          animation: shimmer-sweep 6s ease-in-out infinite;
        }
        @keyframes shimmer-sweep {
          0%, 65% { background-position: 120% 0; }
          100% { background-position: -130% 0; }
        }
      `}</style>
    </AppShell>
  );
}
