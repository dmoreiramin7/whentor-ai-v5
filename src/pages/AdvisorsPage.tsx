import { useSearchParams, Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { ALL_CATEGORIES, CATEGORY_META, getAdvisorsByCategory, type AdvisorCategory } from "@/lib/advisors";
import { useMemory } from "@/hooks/useMemory";

export function AdvisorsPage() {
  const [params, setParams] = useSearchParams();
  const { memory } = useMemory();
  const activeSlug = params.get("cat");
  const activeCat = ALL_CATEGORIES.find((c) => CATEGORY_META[c].slug === activeSlug) ?? null;
  const visibleCats = activeCat ? [activeCat] : ALL_CATEGORIES;

  return (
    <AppShell>
      <div className="pt-4">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          <span className="neon-text">Advisors</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.6_0_0)]">A board of advisors that's never too busy for you.</p>

        {/* Category filter */}
        <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-hide">
          <button
            onClick={() => setParams({})}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              !activeCat
                ? "border-[oklch(0.92_0.27_132/0.7)] bg-[oklch(0.92_0.27_132/0.1)] text-white"
                : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] text-[oklch(0.65_0_0)] hover:text-white"
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const isActive = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setParams({ cat: meta.slug })}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-[oklch(0.92_0.27_132/0.7)] bg-[oklch(0.92_0.27_132/0.1)] text-white"
                    : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] text-[oklch(0.65_0_0)] hover:text-white"
                }`}
              >
                {meta.emoji} {cat.split(" & ")[0]}
              </button>
            );
          })}
        </div>

        {/* Category sections */}
        {visibleCats.map((cat) => {
          const meta = CATEGORY_META[cat];
          const list = getAdvisorsByCategory(cat as AdvisorCategory);
          return (
            <section key={cat} className="mt-10">
              <div className="mb-4">
                <h2 className="font-display text-lg tracking-tight sm:text-xl text-white">
                  {meta.emoji} {cat}
                </h2>
                <p className="mt-0.5 text-xs text-[oklch(0.55_0_0)]">{meta.tagline}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {list.map((a) => {
                  const Icon = a.icon;
                  const sessions = memory.mentorUsage[a.id] ?? 0;
                  return (
                    <Link
                      key={a.id}
                      to={`/advisor/${a.id}`}
                      className="group flex flex-col gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
                    >
                      <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl ring-1 ring-[oklch(1_0_0/0.08)]">
                        {a.avatar ? (
                          <img src={a.avatar} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.06)" }}>
                            <Icon className="h-6 w-6 text-[var(--neon)]" strokeWidth={1.6} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{a.name}</p>
                        <p className="mt-0.5 text-[11px] text-[var(--neon)]">{a.title}</p>
                        <p className="mt-2 text-[11px] text-[oklch(0.55_0_0)] line-clamp-2">{a.essence}</p>
                        {sessions > 0 && (
                          <p className="mt-2 text-[10px] text-[oklch(0.45_0_0)]">{sessions} conversation{sessions > 1 ? "s" : ""}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
