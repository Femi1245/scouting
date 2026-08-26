import Link from "next/link";
import { demoActivity, demoMetrics, DEMO_BADGE } from "@/lib/demo/data";

const metricCards = [
  ["Opportunities Found", demoMetrics.opportunitiesFound],
  ["Websites Analyzed", demoMetrics.websitesAnalyzed],
  ["Qualified Leads", demoMetrics.qualifiedLeads],
  ["Contacts Found", demoMetrics.contactsFound],
  ["Emails Sent", demoMetrics.emailsSent],
  ["Replies", demoMetrics.replies],
  ["Interested Prospects", demoMetrics.interestedProspects],
  ["Meetings Booked", demoMetrics.meetingsBooked],
] as const;

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            {DEMO_BADGE}
          </p>
          <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight">
            Overview
          </h1>
          <p className="mt-1 text-[var(--muted)]">
            Your agent found 17 new opportunities while you were away. 5 are
            highly relevant. 3 outreach messages are ready. 1 prospect replied
            and wants to talk.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Agent status: Working
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <p className="text-xs text-[var(--muted)]">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Your agent is working</h2>
          <ul className="mt-4 space-y-3">
            {demoActivity.slice(0, 8).map((a) => (
              <li key={a.time + a.message} className="flex gap-3 text-sm">
                <time className="w-12 shrink-0 tabular-nums text-[var(--muted)]">
                  {a.time}
                </time>
                <span>{a.message}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/app/agent"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Open AI Agent →
          </Link>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Charts (demo)</h2>
          <div className="mt-4 space-y-4">
            {[
              ["Opportunities over time", 72],
              ["Emails sent", 40],
              ["Reply rate", 28],
              ["Interested leads", 18],
              ["Meetings", 12],
              ["Conversion rate", 8],
            ].map(([label, pct]) => (
              <div key={label as string}>
                <div className="mb-1 flex justify-between text-xs text-[var(--muted)]">
                  <span>{label}</span>
                  <span>{pct as number}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-2)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--muted)]">
            Demo visualizations — replace with live analytics when connected.
          </p>
        </section>
      </div>
    </div>
  );
}
