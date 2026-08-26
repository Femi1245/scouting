import { DEMO_BADGE } from "@/lib/demo/data";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Campaigns</h1>
      </div>
      <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-semibold">London Restaurants — Booking Gaps</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Approval mode · Daily limit 15 · Follow-ups day 0 / 3 / 7 / 14
            </p>
          </div>
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-900">
            paused
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[
            ["Sent", "6"],
            ["Replies", "2"],
            ["Positive", "1"],
            ["Unsubscribes", "0"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-[var(--muted)]">{k}</dt>
              <dd className="font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}
