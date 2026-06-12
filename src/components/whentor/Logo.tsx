import logoSrc from "@/assets/whentor-logo.png";

export function Logo({ size = 36, withWordmark = false }: { size?: number; withWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src={logoSrc} alt="Whentor AI" width={size} height={size} className="rounded-xl" style={{ width: size, height: size }} />
      {withWordmark && (
        <span className="font-display text-lg tracking-tight">
          <span className="neon-text">W</span>HENTOR <span className="neon-text">AI</span>
        </span>
      )}
    </div>
  );
}
