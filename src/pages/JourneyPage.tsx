import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { daysSinceJoined } from "@/lib/memory";
import { useMemory } from "@/hooks/useMemory";
import { useVoice } from "@/hooks/useVoice";
import {
  Sparkles, Brain, HeartPulse, Rocket, Flame, MessageCircle,
  Bookmark, Users, Volume2, Loader2, Square, TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import logoSrc from "@/assets/whentor-logo.png";

type GrowthArea = {
  id: string;
  label: string;
  icon: typeof Sparkles;
  memoryKeys: string[];
  catSlug: string;
};

const GROWTH_AREAS: GrowthArea[] = [
  { id: "spirituality",  label: "Spirituality & Purpose",            icon: Sparkles,   memoryKeys: ["spirituality", "personal_growth"], catSlug: "spirituality" },
  { id: "mental",        label: "Mental Health & Emotional Support", icon: Brain,      memoryKeys: ["mental_health", "relationships"],  catSlug: "mental-health" },
  { id: "health",        label: "Health & Performance",              icon: HeartPulse, memoryKeys: ["fitness"],                          catSlug: "health" },
  { id: "business",      label: "Entrepreneurship & Business",       icon: Rocket,     memoryKeys: ["business", "leadership", "finance"], catSlug: "business" },
];

export function JourneyPage() {
  const { memory } = useMemory();
  const voice = useVoice("chief-advisor");

  const memberDays = daysSinceJoined(memory);
  const firstName = memory.name.split(" ")[0];

  // Compute per-area scores from real memory data
  function areaScore(area: GrowthArea): { score: number; trend: "up" | "down" | "flat"; insight: string; action: string } {
    const isAreaActive = area.memoryKeys.some((k) => memory.topAreas.includes(k as never));
    const convCount = isAreaActive ? memory.conversations.length : 0;

    const isActive = area.memoryKeys.some((k) => memory.topAreas.includes(k as never));
    const base = isActive ? 45 + Math.min(convCount * 5, 40) : 20 + Math.min(memory.totalSessions * 2, 20);
    const trend = isActive
      ? memory.emotionalTrend === "improving" ? "up" : memory.emotionalTrend === "declining" ? "down" : "flat"
      : "flat";

    const insights: Record<string, [string, string]> = {
      spirituality: [
        isActive ? "Your spiritual conversations show deepening reflection. Keep the morning rhythm." : "This area is quiet. Even 5 minutes of reflection can shift your whole week.",
        isActive ? "Continue your daily practice with one advisor" : "Start with a conversation with Jesus Christ or Marcus Aurelius",
      ],
      mental: [
        isActive ? "You've been processing emotions openly — that's the hardest and most important work." : "No recent emotional check-ins. How are you, really?",
        isActive ? "Revisit what surfaced in your last session" : "Talk to Carl Jung or the Emotional Support Mentor",
      ],
      health: [
        isActive ? "Physical momentum is building. Protect your sleep this week." : "The body is the foundation. One workout changes the day.",
        isActive ? "Ask Huberman about recovery optimization" : "Get a training plan from the Health & Performance Mentor",
      ],
      business: [
        isActive ? "Your business thinking is sharpening. Time to commit to one decision." : "Your ideas need a sounding board. That's what advisors are for.",
        isActive ? "Pressure-test your current plan with Elon or Naval" : "Bring your biggest business question to Warren Buffett",
      ],
    };

    return {
      score: Math.min(base, 95),
      trend,
      insight: insights[area.id][0],
      action: insights[area.id][1],
    };
  }

  function playAreaSummary(area: GrowthArea, data: ReturnType<typeof areaScore>) {
    const summary = `${firstName}, here's your ${area.label} summary. Your growth score is ${data.score} percent. ${data.insight} My recommendation: ${data.action}.`;
    voice.playMessage(summary, `area-${area.id}`);
  }

  const stats = [
    { icon: Flame,         label: "Growth Streak",      value: `${memory.currentStreak} days` },
    { icon: MessageCircle, label: "Conversations",      value: `${memory.conversations.length}` },
    { icon: Bookmark,      label: "Insights Saved",     value: `${memory.milestones.length}` },
    { icon: Users,         label: "Advisors Followed",  value: `${Object.keys(memory.mentorUsage).length}` },
  ];

  return (
    <AppShell>
      <div className="pt-4">
        {/* ── Profile header ── */}
        <div className="flex items-center gap-5 py-6">
          <div
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full ring-2 ring-[oklch(0.92_0.27_132/0.5)]"
            style={{ background: "oklch(0.92 0.27 132 / 0.1)", boxShadow: "0 0 40px oklch(0.92 0.27 132 / 0.2)" }}
          >
            <img src={logoSrc} alt={firstName} className="h-10 w-10 rounded-xl" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl">{memory.name}</h1>
            <p className="text-sm text-[oklch(0.55_0_0)]">
              Member since {memberDays === 0 ? "today" : `${memberDays} day${memberDays > 1 ? "s" : ""} ago`}
            </p>
            <p className="mt-1 text-xs text-[var(--neon)]">
              {memory.emotionalTrend === "improving" ? "📈 You're growing" : memory.emotionalTrend === "declining" ? "🌱 Time to refocus" : "✨ Steady journey"}
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center">
              <Icon className="mx-auto h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
              <p className="mt-2 font-display text-xl text-white">{value}</p>
              <p className="text-[10px] text-[oklch(0.55_0_0)]">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Where you're growing ── */}
        <section className="mt-10 mb-8">
          <h2 className="font-display text-xl tracking-tight sm:text-2xl">Where You're Growing</h2>
          <p className="mt-1 text-xs text-[oklch(0.55_0_0)] mb-5">Living scores — they evolve with every conversation.</p>

          <div className="space-y-4">
            {GROWTH_AREAS.map((area) => {
              const data = areaScore(area);
              const Icon = area.icon;
              const TrendIcon = data.trend === "up" ? TrendingUp : data.trend === "down" ? TrendingDown : Minus;
              const trendColor = data.trend === "up" ? "var(--neon)" : data.trend === "down" ? "oklch(0.7 0.18 25)" : "oklch(0.55 0 0)";
              const isPlayingThis = voice.playingMessageId === `area-${area.id}`;

              return (
                <div key={area.id} className="rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: "oklch(0.92 0.27 132 / 0.07)" }}>
                        <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{area.label}</p>
                        <div className="flex items-center gap-1.5">
                          <TrendIcon className="h-3 w-3" style={{ color: trendColor }} />
                          <span className="text-[11px]" style={{ color: trendColor }}>
                            {data.trend === "up" ? "Improving" : data.trend === "down" ? "Needs attention" : "Steady"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="font-display text-3xl shrink-0" style={{ color: "var(--neon)" }}>{data.score}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 w-full rounded-full bg-[oklch(1_0_0/0.06)] mb-4">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${data.score}%`, background: "var(--neon)", boxShadow: "0 0 12px oklch(0.92 0.27 132 / 0.4)" }}
                    />
                  </div>

                  {/* AI insight */}
                  <p className="text-xs leading-relaxed text-[oklch(0.7_0_0)] mb-4">
                    <span className="text-[var(--neon)] font-medium">AI Insight: </span>
                    {data.insight}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => playAreaSummary(area, data)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.06)] px-4 py-2 text-xs text-[var(--neon)] transition hover:bg-[oklch(0.92_0.27_132/0.12)]"
                    >
                      {isPlayingThis && voice.status === "loading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : isPlayingThis && voice.status === "speaking" ? <Square className="h-3.5 w-3.5" />
                        : <Volume2 className="h-3.5 w-3.5" />}
                      Voice Summary
                    </button>
                    <Link
                      to={`/advisors?cat=${area.catSlug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-4 py-2 text-xs text-[oklch(0.7_0_0)] transition hover:text-white"
                    >
                      {data.action.length > 42 ? data.action.slice(0, 42) + "…" : data.action}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
