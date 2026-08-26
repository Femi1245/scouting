"use client";

import { Bell, Pause, Play, Search, User } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/auth/actions";

export function AppTopbar({
  userName,
  initiallyPaused = false,
}: {
  userName: string;
  initiallyPaused?: boolean;
}) {
  const [paused, setPaused] = useState(initiallyPaused);

  return (
    <header className="flex h-14 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)]/90 px-4 backdrop-blur">
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          placeholder="Search companies, contacts, opportunities…"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] py-1.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--accent)]"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div
          className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:flex ${
            paused
              ? "bg-stone-200 text-stone-700"
              : "bg-emerald-100 text-emerald-900"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              paused ? "bg-stone-500" : "bg-emerald-500"
            }`}
          />
          {paused ? "Paused" : "Working"}
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium hover:bg-[var(--surface-2)]"
        >
          {paused ? (
            <>
              <Play className="h-3.5 w-3.5" /> Resume
            </>
          ) : (
            <>
              <Pause className="h-3.5 w-3.5" /> Pause
            </>
          )}
        </button>
        <button
          type="button"
          className="rounded-lg border border-[var(--border)] p-2 hover:bg-[var(--surface-2)]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-2 py-1">
          <User className="h-4 w-4 text-[var(--muted)]" />
          <span className="hidden text-sm sm:inline">{userName}</span>
          <form action={logout}>
            <button type="submit" className="text-xs text-[var(--muted)] hover:underline">
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
