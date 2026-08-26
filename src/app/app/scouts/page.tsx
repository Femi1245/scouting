import Link from "next/link";
import { DEMO_BADGE, demoScouts } from "@/lib/demo/data";

export default function ScoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
          <h1 className="font-display text-3xl font-semibold">Scouts</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Missions your agent runs to discover businesses.
          </p>
        </div>
        <Link
          href="/app/scouts/new"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
        >
          Create Scout
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {demoScouts.map((s) => (
          <article
            key={s.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold">{s.name}</h2>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                  s.status === "running"
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-stone-200 text-stone-700"
                }`}
              >
                {s.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{s.mission}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-[var(--muted)]">Target</dt>
                <dd className="font-medium">{s.target}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Min score</dt>
                <dd className="font-medium">{s.minScore}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Daily research limit</dt>
                <dd className="font-medium">{s.dailyResearchLimit}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Sources</dt>
                <dd className="font-medium">{s.sources.join(", ")}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
