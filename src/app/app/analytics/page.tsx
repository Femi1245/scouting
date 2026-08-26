import { DEMO_BADGE, demoMetrics } from "@/lib/demo/data";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Analytics</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Scout performance</h2>
          <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
            <li>Discovered: {demoMetrics.opportunitiesFound + 7}</li>
            <li>Analyzed: {demoMetrics.websitesAnalyzed}</li>
            <li>Qualified: {demoMetrics.qualifiedLeads}</li>
            <li>Opportunity rate: 38%</li>
          </ul>
        </section>
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Outreach</h2>
          <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
            <li>Sent: {demoMetrics.emailsSent}</li>
            <li>Reply rate: 33%</li>
            <li>Positive reply rate: 17%</li>
            <li>Bounces: 0</li>
          </ul>
        </section>
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">AI performance</h2>
          <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
            <li>Accepted opportunities: 5</li>
            <li>Messages edited by user: 2</li>
            <li>Reply approval rate: 100%</li>
            <li>False positives flagged: 1</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
