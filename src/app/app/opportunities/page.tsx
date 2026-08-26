import Link from "next/link";
import { DEMO_BADGE, demoOpportunities } from "@/lib/demo/data";

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
          <h1 className="font-display text-3xl font-semibold">Opportunities</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            AI-scored matches between prospect problems and your service.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <select className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5">
            <option>Score: all</option>
            <option>80+</option>
            <option>90+</option>
          </select>
          <select className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5">
            <option>Industry: all</option>
            <option>Restaurant</option>
            <option>Cafe</option>
          </select>
          <select className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5">
            <option>Status: all</option>
            <option>new</option>
            <option>awaiting_approval</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--surface-2)] text-xs text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2 font-medium">Score</th>
              <th className="px-3 py-2 font-medium">Company</th>
              <th className="hidden px-3 py-2 font-medium md:table-cell">Problem</th>
              <th className="hidden px-3 py-2 font-medium lg:table-cell">Match</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {demoOpportunities.map((o) => (
              <tr key={o.id} className="hover:bg-[var(--bg)]/80">
                <td className="px-3 py-3 font-semibold tabular-nums text-[var(--accent)]">
                  {o.score}
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium">{o.company}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {o.industry} · {o.location}
                  </p>
                </td>
                <td className="hidden px-3 py-3 text-[var(--muted)] md:table-cell">
                  {o.detectedProblems[0]}
                </td>
                <td className="hidden px-3 py-3 lg:table-cell">{o.serviceMatch}</td>
                <td className="px-3 py-3 capitalize text-[var(--muted)]">
                  {o.status.replaceAll("_", " ")}
                </td>
                <td className="px-3 py-3 text-right">
                  <Link
                    href={`/app/opportunities/${o.id}`}
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
