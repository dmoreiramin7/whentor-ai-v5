import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { advisors, ALL_CATEGORIES, CATEGORY_META, getAdvisorsByCategory } from "@/lib/advisors";
import { useMemory } from "@/hooks/useMemory";
import { useVoice } from "@/hooks/useVoice";
import {
  Mic, ArrowRight, Sparkles, TrendingUp, Target, BookOpen, Volume2, Loader2, Square,
  Search, Brain, Heart, Activity, Briefcase, Crown,
} from "lucide-react";

// Category pills with quick prompts (V4 signature interaction)
type Pill = { id: string; label: string; icon: typeof Sparkles; prompts: string[]; advisorId: string };
const pills: Pill[] = [
  { id: "spiritual", label: "Spiritual", icon: Sparkles,  advisorId: "christ",           prompts: ["Connect with God", "Daily prayer", "Find inner peace", "Surrender control"] },
  { id: "mind",      label: "Mind",      icon: Brain,     advisorId: "jung",             prompts: ["Calm my anxiety", "Quiet my thoughts", "Heal old wounds", "Sleep better"] },
  { id: "heart",     label: "Heart",     icon: Heart,     advisorId: "brene",            prompts: ["Reconnect with my partner", "Communicate honestly", "Set boundaries"] },
  { id: "body",      label: "Body",      icon: Activity,  advisorId: "health-mentor",    prompts: ["Build a routine", "Train with purpose", "Eat to thrive", "Sleep deeper"] },
  { id: "work",      label: "Work",      icon: Briefcase, advisorId: "business-mentor",  prompts: ["Find clarity", "Pressure-test my idea", "Ask for a raise", "Lead my team"] },
  { id: "lead",      label: "Lead",      icon: Crown,     advisorId: "solomon",          prompts: ["Make hard decisions", "Speak with authority", "Negotiate better"] },
];

const essentialIds = ["christ", "jung", "emotional-mentor", "elon", "health-mentor", "business-mentor"];

export function HomePage() {
  const { memory } = useMemory();
  const voice = useVoice("chief-advisor");
  const [activePill, setActivePill] = useState("spiritual");
  const currentPill = pills.find((p) => p.id === activePill)!;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const firstName = memory.name.split(" ")[0];

  const topArea = memory.topAreas[0];
  const areaLabel: Record<string, string> = {
    spirituality: "Spirituality & Purpose", mental_health: "Mental Health",
    fitness: "Health & Performance", business: "Business", leadership: "Leadership",
    personal_growth: "Personal Growth", relationships: "Relationships", finance: "Finance",
    family: "Family",
  };
  const focusArea = topArea ? areaLabel[topArea] ?? "Personal Growth" : "Personal Growth";

  const weeklyReflection = memory.totalSessions > 1
    ? `${firstName}, you've shown up ${memory.currentStreak} day${memory.currentStreak > 1 ? "s" : ""} in a row — that consistency is the foundation everything else is built on. Your strongest focus lately has been ${focusArea}. This week, I'd recommend one deep conversation about what's actually driving that focus. Growth isn't speed. It's direction.`
    : `${firstName}, welcome to your journey. I'm your Chief Advisor — I'll watch your growth across every area of life and guide you to the right advisor at the right moment. Start with one honest conversation today. That's all it takes.`;

  const insights = [
    { icon: Target, label: "Recommended Focus", value: focusArea },
    { icon: TrendingUp, label: "Growth Trend", value: memory.emotionalTrend === "improving" ? "Improving ↑" : memory.emotionalTrend === "declining" ? "Needs attention" : "Steady" },
    { icon: Sparkles, label: "Day Streak", value: `${memory.currentStreak} days` },
    { icon: BookOpen, label: "Conversations", value: `${memory.conversations.length}` },
  ];

  const essentials = essentialIds.map((id) => advisors.find((a) => a.id === id)!).filter(Boolean);

  return (
    <AppShell>
      {/* ── Hero ── */}
      <section className="relative pt-8 sm:pt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--neon), transparent 70%)" }}
        />
        <p className="text-sm text-[oklch(0.6_0_0)]">
          {memory.totalSessions > 1 ? `Day ${memory.currentStreak} streak · ${memory.totalSessions} sessions` : "Welcome to Whentor AI"}
        </p>
        <h1 className="mt-1 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {greeting}, <span className="neon-text">{firstName}.</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.6_0_0)] sm:text-base">
          Your mentor. Anytime. Anywhere.
        </p>

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

        {/* Category pills */}
        <div className="mt-5 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {pills.map((p) => {
            const Icon = p.icon;
            const isActive = p.id === activePill;
            return (
              <button
                key={p.id}
                onClick={() => setActivePill(p.id)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${
                  isActive
                    ? "border-[oklch(0.92_0.27_132/0.7)] bg-[oklch(0.92_0.27_132/0.1)] text-white"
                    : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] text-[oklch(0.65_0_0)] hover:border-[oklch(0.92_0.27_132/0.3)] hover:text-white"
                }`}
                style={isActive ? { boxShadow: "0 0 0 1px oklch(0.92 0.27 132 / 0.35), 0 8px 30px -10px oklch(0.92 0.27 132 / 0.4)" } : undefined}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[var(--neon)]" : ""}`} strokeWidth={1.8} />
                <span className="font-medium">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick prompts — link to the right advisor */}
        <div className="mt-3 -mx-5 flex flex-wrap gap-2 px-5 sm:flex-nowrap sm:overflow-x-auto scrollbar-hide">
          {currentPill.prompts.map((q) => (
            <Link
              key={q}
              to={`/advisor/${currentPill.advisorId}`}
              className="shrink-0 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.02)] px-4 py-2 text-xs text-[oklch(0.65_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white sm:text-sm"
            >
              {q}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Chief Advisor Card — with breathing glow + shimmer ── */}
      <section className="mt-10">
        <div
          className="chief-card relative overflow-hidden rounded-3xl border border-[oklch(0.92_0.27_132/0.25)] p-6 sm:p-8"
          style={{
            background: "linear-gradient(135deg, oklch(0.92 0.27 132 / 0.07) 0%, oklch(0.1 0 0) 50%, #000 100%)",
          }}
        >
          {/* shimmer sweep */}
          <div className="shimmer pointer-events-none absolute inset-0" aria-hidden />

          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon)] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--neon)]" />
            </span>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--neon)]">Your Chief Advisor · Live</p>
          </div>

          <div className="mt-4 flex items-start gap-4">
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl ring-2 ring-[oklch(0.92_0.27_132/0.4)]"
              style={{ background: "oklch(0.92 0.27 132 / 0.1)", boxShadow: "0 0 30px oklch(0.92 0.27 132 / 0.25)" }}
            >
              <Sparkles className="h-7 w-7 text-[var(--neon)]" strokeWidth={1.4} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl sm:text-2xl text-white">Weekly Reflection</h2>
              <p className="mt-2 text-sm leading-relaxed text-[oklch(0.75_0_0)]">{weeklyReflection}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {insights.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-[oklch(1_0_0/0.06)] bg-[oklch(1_0_0/0.03)] px-3 py-3">
                <Icon className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.6} />
                <p className="mt-1.5 text-[10px] text-[oklch(0.5_0_0)]">{label}</p>
                <p className="text-sm font-semibold text-white truncate">{value}</p>
              </div>
            ))}
          </div>

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
              onClick={() => voice.playMessage(weeklyReflection, "weekly-reflection")}
              className="inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.12)] bg-[oklch(1_0_0/0.04)] px-5 py-3 text-sm text-[oklch(0.8_0_0)] transition hover:text-white hover:border-[oklch(0.92_0.27_132/0.4)]"
            >
              {voice.status === "loading" && voice.playingMessageId === "weekly-reflection"
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : voice.status === "speaking" && voice.playingMessageId === "weekly-reflection"
                ? <Square className="h-4 w-4" />
                : <Volume2 className="h-4 w-4" />}
              Voice Summary
            </button>
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.12)] bg-[oklch(1_0_0/0.04)] px-5 py-3 text-sm text-[oklch(0.8_0_0)] transition hover:text-white"
            >
              Continue Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Your essentials (screenshot detail: avatar + sessions) ── */}
      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight sm:text-2xl">Your essentials</h2>
          <Link to="/advisors" className="text-[11px] uppercase tracking-[0.18em] text-[oklch(0.55_0_0)] transition hover:text-white">
            All advisors
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
                className="group relative flex items-center gap-3 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-3.5 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
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
                  <p className="truncate text-[11px] text-[oklch(0.55_0_0)]">{a.title}</p>
                  {sessions > 0 && (
                    <p className="mt-0.5 text-[11px] font-medium text-[var(--neon)]">{sessions} session{sessions > 1 ? "s" : ""}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="mt-12">
        <h2 className="font-display text-xl tracking-tight sm:text-2xl mb-1">Where do you need guidance?</h2>
        <p className="text-xs text-[oklch(0.55_0_0)] mb-4">Four pillars. One journey.</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const count = getAdvisorsByCategory(cat).length;
            return (
              <Link
                key={cat}
                to={`/advisors?cat=${meta.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-[oklch(1_0_0/0.08)] transition group-hover:ring-[oklch(0.92_0.27_132/0.4)]"
                  style={{ background: "oklch(0.92 0.27 132 / 0.06)" }}
                >
                  <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{cat}</p>
                  <p className="mt-0.5 text-xs text-[oklch(0.55_0_0)]">{meta.tagline}</p>
                </div>
                <span className="text-[10px] text-[oklch(0.45_0_0)]">{count} advisors</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Featured advisors row ── */}
      <section className="mt-12 mb-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl tracking-tight sm:text-2xl">Today's biggest voices</h2>
            <p className="mt-1 text-xs text-[oklch(0.55_0_0)]">The minds shaping how we grow right now.</p>
          </div>
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
                  className="group flex w-[160px] shrink-0 flex-col gap-3 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
                >
                  <div className="mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-full ring-1 ring-[oklch(1_0_0/0.1)] transition group-hover:ring-[oklch(0.92_0.27_132/0.5)]">
                    {a.avatar ? (
                      <img src={a.avatar} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.06)" }}>
                        <Icon className="h-7 w-7 text-[var(--neon)]" strokeWidth={1.6} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 text-center">
                    <p className="truncate text-sm font-semibold text-white">{a.name}</p>
                    <p className="mt-0.5 truncate text-[11px] text-[oklch(0.55_0_0)]">{a.title}</p>
                  </div>
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
