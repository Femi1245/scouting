import { DEMO_BADGE, demoOpportunities } from "@/lib/demo/data";

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Companies</h1>
      </div>
      <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        {demoOpportunities.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
            <div>
              <p className="font-medium">{o.company}</p>
              <p className="text-[var(--muted)]">
                {o.industry} · {o.location}
              </p>
            </div>
            <a href={o.website} className="text-[var(--accent)] hover:underline">
              {o.website}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
