"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateScoutPage() {
  const router = useRouter();
  const [mission, setMission] = useState(
    "Find dentists in London whose websites look outdated and who don't appear to have online booking.",
  );
  const [understood, setUnderstood] = useState(false);
  const [industry, setIndustry] = useState("Dental");
  const [location, setLocation] = useState("London");
  const [signals, setSignals] = useState(
    "outdated website, no booking, poor mobile experience",
  );
  const [minScore, setMinScore] = useState(78);

  function interpret() {
    setUnderstood(true);
    setIndustry("Dental");
    setLocation("London");
    setSignals("outdated website, no booking, poor mobile experience");
    setMinScore(78);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/app/scouts" className="text-sm text-[var(--muted)] hover:underline">
          ← Scouts
        </Link>
        <h1 className="font-display mt-2 text-3xl font-semibold">Create Scout</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Describe a mission in natural language. Review what the AI understood before activating.
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Mission</span>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <button
          type="button"
          onClick={interpret}
          className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--surface-2)]"
        >
          Interpret with AI
        </button>
      </div>

      {understood && (
        <div className="space-y-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/40 p-5">
          <h2 className="font-semibold">AI understands your mission</h2>
          <label className="block space-y-1 text-sm">
            <span className="text-[var(--muted)]">Industry</span>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2"
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="text-[var(--muted)]">Location</span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2"
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="text-[var(--muted)]">Signals</span>
            <textarea
              value={signals}
              onChange={(e) => setSignals(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2"
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="text-[var(--muted)]">Minimum opportunity score</span>
            <input
              type="number"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2"
            />
          </label>
          <button
            type="button"
            onClick={() => router.push("/app/scouts")}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
          >
            Activate Scout
          </button>
        </div>
      )}
    </div>
  );
}
