"use client";

import { useState } from "react";
import { DEMO_BADGE, demoInbox } from "@/lib/demo/data";

const TABS = [
  "All",
  "Interested",
  "Follow-up",
  "Questions",
  "Not Interested",
  "Unsubscribe",
  "Out of Office",
  "Needs Review",
];

export default function InboxPage() {
  const [tab, setTab] = useState("All");
  const items =
    tab === "All" ? demoInbox : demoInbox.filter((t) => t.tab === tab);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Inbox</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          AI-classified replies with recommended next actions.
        </p>
      </div>

      <div className="flex flex-wrap gap-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              tab === t
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
            No conversations in this tab (demo).
          </p>
        ) : (
          items.map((t) => (
            <article
              key={t.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold">
                    {t.contact} — {t.company}
                  </h2>
                  <p className="text-xs text-[var(--muted)]">
                    Opportunity score {t.score}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{t.classification}</p>
                  <p className="text-xs text-[var(--muted)]">
                    Confidence {t.confidence}%
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm italic text-[var(--muted)]">
                “{t.snippet}”
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">AI recommendation:</span>{" "}
                {t.recommendation}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <button type="button" className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-white">
                  Approve AI Reply
                </button>
                <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
                  Reply
                </button>
                <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
                  Edit
                </button>
                <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
                  Archive
                </button>
                <button type="button" className="rounded-lg border border-[var(--border)] px-3 py-1.5">
                  Mark Not Interested
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
