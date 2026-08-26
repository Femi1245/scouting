import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_BADGE, demoOpportunities } from "@/lib/demo/data";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const o = demoOpportunities.find((x) => x.id === id);
  if (!o) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/app/opportunities" className="text-sm text-[var(--muted)] hover:underline">
          ← Opportunities
        </Link>
        <p className="mt-2 text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">{o.company}</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          AI Opportunity Score{" "}
          <span className="font-semibold text-[var(--accent)]">{o.score}/100</span>
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Company overview</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Website</dt>
              <dd className="text-right">{o.website}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Industry</dt>
              <dd>{o.industry}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Location</dt>
              <dd>{o.location}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Size</dt>
              <dd>{o.companySize}</dd>
            </div>
            <p className="pt-2 text-[var(--muted)]">{o.description}</p>
          </dl>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Score breakdown</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {Object.entries(o.scoreBreakdown).map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span className="capitalize text-[var(--muted)]">
                  {k.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="tabular-nums font-medium">{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
            Why? {o.whyMatch} Evidence confidence is directional — not scientifically exact.
          </p>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Website intelligence</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {Object.entries(o.websiteSignals).map(([k, v]) => (
              <li key={k} className="flex justify-between gap-3">
                <span className="capitalize text-[var(--muted)]">
                  {k.replaceAll("_", " ")}
                </span>
                <span
                  className={
                    v === "not_verified"
                      ? "font-medium text-amber-800"
                      : "font-medium"
                  }
                >
                  {v === "not_verified" ? "Not verified" : v}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="mt-4 text-sm font-semibold">Observations</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {o.observations.map((obs) => (
              <li key={obs}>{obs}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">AI findings</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
            {o.detectedProblems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
          <h3 className="mt-4 text-sm font-semibold">Why this lead matches you</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{o.whyMatch}</p>
          <h3 className="mt-4 text-sm font-semibold">Decision maker</h3>
          <p className="mt-1 text-sm">
            {o.contactName} · {o.contactTitle}
            <br />
            <span className="text-[var(--muted)]">{o.contactEmail}</span>
          </p>
          <p className="mt-1 text-xs text-amber-800">
            Provenance: Demo Mode — fictional contact
          </p>
          <h3 className="mt-4 text-sm font-semibold">Outreach angle</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{o.outreachAngle}</p>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">Generated email</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
              Edit
            </button>
            <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
              Regenerate
            </button>
            <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
              Save Draft
            </button>
            <button
              type="button"
              className="rounded-lg bg-[var(--accent)] px-3 py-1.5 font-medium text-white"
            >
              Approve
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] px-3 py-1.5"
            >
              Send
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm font-medium">{o.emailSubject}</p>
        <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-[var(--bg)] p-4 font-sans text-sm leading-relaxed text-[var(--ink)]">
          {o.emailBody}
        </pre>
      </section>
    </div>
  );
}
