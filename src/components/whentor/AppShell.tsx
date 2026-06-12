import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { BottomNav } from "./BottomNav";
import { Bell, Search } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-aurora pb-32">
      <header className="sticky top-0 z-40 border-b border-[oklch(1_0_0/0.08)] bg-[oklch(0_0_0/0.4)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/home" className="flex items-center">
            <Logo size={36} withWordmark />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/journey"
              className="hidden rounded-full border border-[oklch(1_0_0/0.08)] px-4 py-2 text-xs text-[oklch(0.7_0_0)] transition hover:text-white sm:inline-block"
            >
              My Journey
            </Link>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(1_0_0/0.08)] text-[oklch(0.7_0_0)] transition hover:text-white" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(1_0_0/0.08)] text-[oklch(0.7_0_0)] transition hover:text-white" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
      <BottomNav />
    </div>
  );
}
