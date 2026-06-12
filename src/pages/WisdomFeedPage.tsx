import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { getForYou, getTrending, getTimeless, getByAdvisors, type WisdomPost } from "@/lib/wisdom";
import { getAdvisor } from "@/lib/advisors";
import { useMemory } from "@/hooks/useMemory";
import { Bookmark, MessageCircle, TrendingUp, Quote } from "lucide-react";

type Tab = "for-you" | "following" | "trending" | "wisdom";

const TABS: { id: Tab; label: string }[] = [
  { id: "for-you", label: "For You" },
  { id: "following", label: "Following" },
  { id: "trending", label: "Trending" },
  { id: "wisdom", label: "Wisdom" },
];

function WisdomCard({ post, saved, onSave }: { post: WisdomPost; saved: boolean; onSave: () => void }) {
  const advisor = getAdvisor(post.advisorId);
  const Icon = advisor?.icon;

  return (
    <div className="rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5 transition hover:border-[oklch(0.92_0.27_132/0.25)]">
      {/* Advisor row */}
      <Link to={`/advisor/${post.advisorId}`} className="flex items-center gap-3 mb-4 group">
        <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-[oklch(0.92_0.27_132/0.3)]">
          {advisor?.avatar ? (
            <img src={advisor.avatar} alt={post.advisorName} className="h-full w-full object-cover" />
          ) : Icon ? (
            <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.08)" }}>
              <Icon className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.8} />
            </div>
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white group-hover:text-[var(--neon)] transition">{post.advisorName}</p>
          <p className="text-[11px] text-[oklch(0.5_0_0)]">{post.category}</p>
        </div>
        {post.trending && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.07)] px-2.5 py-1 text-[10px] text-[var(--neon)]">
            <TrendingUp className="h-3 w-3" /> Trending
          </span>
        )}
      </Link>

      {/* Quote */}
      <div className="flex gap-3">
        <Quote className="h-5 w-5 shrink-0 text-[oklch(0.92_0.27_132/0.4)]" strokeWidth={1.4} />
        <p className="text-[15px] leading-relaxed text-[oklch(0.9_0_0)] font-light">{post.text}</p>
      </div>
      {post.context && (
        <p className="mt-3 pl-8 text-[11px] italic text-[oklch(0.5_0_0)]">— {post.context}</p>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-5 pl-8">
        <button
          onClick={onSave}
          className={`flex items-center gap-1.5 text-xs transition ${saved ? "text-[var(--neon)]" : "text-[oklch(0.5_0_0)] hover:text-white"}`}
        >
          <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
          {(post.saves + (saved ? 1 : 0)).toLocaleString()}
        </button>
        <Link to={`/advisor/${post.advisorId}`} className="flex items-center gap-1.5 text-xs text-[oklch(0.5_0_0)] hover:text-white transition">
          <MessageCircle className="h-3.5 w-3.5" />
          Discuss with {post.advisorName.split(" ")[0]}
        </Link>
      </div>
    </div>
  );
}

export function WisdomFeedPage() {
  const { memory } = useMemory();
  const [tab, setTab] = useState<Tab>("for-you");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const followedAdvisors = Object.keys(memory.mentorUsage);

  const posts: WisdomPost[] =
    tab === "for-you" ? getForYou(memory.topAreas) :
    tab === "following" ? getByAdvisors(followedAdvisors) :
    tab === "trending" ? getTrending() :
    getTimeless();

  function toggleSave(id: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <AppShell>
      <div className="pt-4">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          Wisdom <span className="neon-text">Feed</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.6_0_0)]">Timeless guidance from humanity's greatest minds.</p>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition ${
                tab === t.id ? "text-black" : "text-[oklch(0.6_0_0)] hover:text-white"
              }`}
              style={tab === t.id ? { background: "var(--neon)" } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="mt-6 space-y-4 mb-8">
          {posts.length === 0 && tab === "following" && (
            <div className="rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-10 text-center">
              <p className="text-sm text-[oklch(0.6_0_0)]">You're not following any advisors yet.</p>
              <p className="mt-1 text-xs text-[oklch(0.45_0_0)]">Start a conversation with an advisor and their wisdom will appear here.</p>
              <Link
                to="/advisors"
                className="mt-4 inline-block rounded-full px-5 py-2.5 text-xs font-semibold text-black"
                style={{ background: "var(--neon)" }}
              >
                Explore Advisors
              </Link>
            </div>
          )}
          {posts.map((p) => (
            <WisdomCard key={p.id} post={p} saved={saved.has(p.id)} onSave={() => toggleSave(p.id)} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
