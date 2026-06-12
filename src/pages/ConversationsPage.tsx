import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { getAdvisor } from "@/lib/advisors";
import { timeAgo } from "@/lib/memory";
import { EMOTION_META } from "@/lib/emotions";
import { useMemory } from "@/hooks/useMemory";
import { MessageCircle, Phone, ChevronRight, Sparkles } from "lucide-react";

export function ConversationsPage() {
  const { memory } = useMemory();

  // Group conversations by advisor — most recent first
  const byAdvisor = new Map<string, { lastMessage: string; lastTs: number; count: number; lastEmotion: string }>();
  for (const c of memory.conversations) {
    const existing = byAdvisor.get(c.mentorId);
    byAdvisor.set(c.mentorId, {
      lastMessage: c.userMessage,
      lastTs: c.timestamp,
      count: (existing?.count ?? 0) + 1,
      lastEmotion: c.emotion,
    });
  }
  const sorted = [...byAdvisor.entries()].sort((a, b) => b[1].lastTs - a[1].lastTs);

  return (
    <AppShell>
      <div className="pt-4">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          <span className="neon-text">Conversations</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.6_0_0)]">Every conversation is remembered. Pick up where you left off.</p>

        {sorted.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-12 text-center">
            <div
              className="mx-auto grid h-16 w-16 place-items-center rounded-2xl"
              style={{ background: "oklch(0.92 0.27 132 / 0.08)" }}
            >
              <Sparkles className="h-7 w-7 text-[var(--neon)]" strokeWidth={1.4} />
            </div>
            <p className="mt-4 text-sm font-medium text-white">No conversations yet</p>
            <p className="mt-1 text-xs text-[oklch(0.5_0_0)]">
              Start your first conversation. Your advisor will remember everything.
            </p>
            <Link
              to="/advisors"
              className="mt-5 inline-block rounded-full px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              style={{ background: "var(--neon)" }}
            >
              Find Your Advisor
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3 mb-8">
            {sorted.map(([advisorId, data]) => {
              const advisor = getAdvisor(advisorId);
              if (!advisor) return null;
              const Icon = advisor.icon;
              const emotionMeta = EMOTION_META[data.lastEmotion as keyof typeof EMOTION_META];
              return (
                <div
                  key={advisorId}
                  className="group flex items-center gap-4 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 transition hover:border-[oklch(0.92_0.27_132/0.3)]"
                >
                  <Link to={`/advisor/${advisorId}`} className="flex flex-1 items-center gap-4 min-w-0">
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl ring-1 ring-[oklch(0.92_0.27_132/0.3)]">
                      {advisor.avatar ? (
                        <img src={advisor.avatar} alt={advisor.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.08)" }}>
                          <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white truncate">{advisor.name}</p>
                        {emotionMeta && data.lastEmotion !== "neutral" && (
                          <span className="text-xs">{emotionMeta.emoji}</span>
                        )}
                      </div>
                      <p className="text-xs text-[oklch(0.55_0_0)] truncate">"{data.lastMessage.slice(0, 60)}"</p>
                      <p className="mt-0.5 text-[10px] text-[oklch(0.4_0_0)]">
                        {data.count} exchange{data.count > 1 ? "s" : ""} · {timeAgo(data.lastTs)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/advisor/voice/${advisorId}`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[oklch(0.92_0.27_132/0.3)] text-[var(--neon)] transition hover:bg-[oklch(0.92_0.27_132/0.1)]"
                      title="Voice call"
                    >
                      <Phone className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/advisor/${advisorId}`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[oklch(1_0_0/0.08)] text-[oklch(0.6_0_0)] transition hover:text-white"
                      title="Continue conversation"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Saved insights */}
        {memory.milestones.length > 0 && (
          <section className="mt-10 mb-8">
            <h2 className="font-display text-lg text-white mb-3">Saved Insights</h2>
            <div className="space-y-2">
              {memory.milestones.slice(-5).reverse().map((m) => {
                const advisor = getAdvisor(m.mentorId);
                return (
                  <Link
                    key={m.id}
                    to={`/advisor/${m.mentorId}`}
                    className="flex items-center gap-3 rounded-2xl border border-[oklch(0.92_0.27_132/0.15)] bg-[oklch(0.92_0.27_132/0.03)] px-4 py-3 transition hover:border-[oklch(0.92_0.27_132/0.35)]"
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-[var(--neon)]" strokeWidth={1.6} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[oklch(0.8_0_0)] truncate">"{m.message.slice(0, 70)}"</p>
                      <p className="text-[10px] text-[oklch(0.45_0_0)]">{m.title} · {advisor?.name ?? ""}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[oklch(0.4_0_0)]" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
