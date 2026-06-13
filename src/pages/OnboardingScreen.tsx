import { useState } from "react";
import { Logo } from "@/components/whentor/Logo";
import { ArrowRight } from "lucide-react";

/**
 * First-launch onboarding. Captures the user's name so every advisor
 * can address them personally. Three calm steps, no friction.
 */
export function OnboardingScreen({ onComplete }: { onComplete: (name: string) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");

  const steps = [
    {
      eyebrow: "Welcome to Whentor AI",
      title: "Your personal board of mentors.",
      sub: "Guidance from the greatest minds in history and today — anytime, anywhere.",
    },
    {
      eyebrow: "How it works",
      title: "Information gives answers.\nGuidance changes lives.",
      sub: "Talk by text or voice. Every advisor remembers you and grows with you.",
    },
  ];

  const canFinish = step === steps.length;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(45% 35% at 50% 25%, oklch(0.92 0.27 132 / 0.16) 0%, transparent 70%),
            radial-gradient(60% 40% at 50% 100%, oklch(0.92 0.27 132 / 0.08) 0%, transparent 60%),
            #000`,
        }}
      />

      <div key={step} className="entrance relative w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Logo size={48} withWordmark />
        </div>

        {!canFinish ? (
          <>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">{steps[step].eyebrow}</p>
            <h1 className="mt-4 whitespace-pre-line font-display text-3xl leading-tight sm:text-4xl">
              {steps[step].title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[oklch(0.6_0_0)]">{steps[step].sub}</p>

            <button
              onClick={() => setStep((s) => s + 1)}
              className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-90 active:scale-95"
              style={{ background: "var(--neon)", boxShadow: "0 0 30px oklch(0.92 0.27 132 / 0.4)" }}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Progress dots */}
            <div className="mt-8 flex justify-center gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === step ? 20 : 6,
                    background: i === step ? "var(--neon)" : "oklch(1 0 0 / 0.2)",
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">Last thing</p>
            <h1 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              What should we<br />call you?
            </h1>
            <p className="mt-4 text-sm text-[oklch(0.6_0_0)]">Your advisors will greet you by name.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) onComplete(name.trim());
              }}
              className="mt-8"
            >
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                maxLength={24}
                className="w-full rounded-2xl border border-[oklch(1_0_0/0.12)] bg-[oklch(1_0_0/0.04)] px-5 py-4 text-center text-lg text-white outline-none transition placeholder:text-[oklch(0.4_0_0)] focus:border-[oklch(0.92_0.27_132/0.6)]"
              />
              <button
                type="submit"
                disabled={!name.trim()}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-black transition hover:opacity-90 active:scale-95 disabled:opacity-30"
                style={{ background: "var(--neon)", boxShadow: "0 0 30px oklch(0.92 0.27 132 / 0.4)" }}
              >
                Enter Whentor
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        .entrance { animation: rise 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        @keyframes rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
