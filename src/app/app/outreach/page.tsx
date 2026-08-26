import { DEMO_BADGE, demoOpportunities } from "@/lib/demo/data";

export default function OutreachPage() {
  const drafts = demoOpportunities.filter((o) => o.emailSubject);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Outreach</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Personalized drafts grounded in verified observations — approval required in this workspace.
        </p>
      </div>
      <div className="space-y-3">
        {drafts.map((d) => (
          <article
            key={d.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold">{d.company}</h2>
                <p className="text-sm text-[var(--muted)]">
                  To: {d.contactName} · Score {d.score}
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                Awaiting approval
              </span>
            </div>
            <p className="mt-3 text-sm font-medium">{d.emailSubject}</p>
            <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">{d.emailBody}</p>
            <div className="mt-3 flex gap-2 text-sm">
              <button type="button" className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-white">
                Approve
              </button>
              <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
                Edit
              </button>
              <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
                Ignore
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
