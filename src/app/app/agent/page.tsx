"use client";

import { useState } from "react";
import { DEMO_BADGE, demoActivity, demoWorkspace } from "@/lib/demo/data";
import {
  DEFAULT_PERMISSIONS,
  type AgentPermissionKey,
} from "@/lib/agent/permissions";

const LABELS: Record<AgentPermissionKey, string> = {
  find_businesses: "Find businesses",
  analyze_websites: "Analyze websites",
  find_contacts: "Find professional contacts",
  generate_outreach: "Generate outreach",
  send_approved_emails: "Send approved emails",
  send_autopilot_emails: "Send autopilot emails",
  read_replies: "Read replies",
  draft_replies: "Draft replies",
  send_automatic_replies: "Send automatic replies",
  schedule_followups: "Schedule follow-ups",
};

export default function AgentPage() {
  const [paused, setPaused] = useState(false);
  const [perms, setPerms] = useState({
    ...DEFAULT_PERMISSIONS,
    mode: "approval" as const,
    paused: false,
    send_approved_emails: true,
    read_replies: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">AI Agent</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Your business-development employee — always visible, always controllable.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Current mission</h2>
          <p className="mt-2 text-sm">{demoWorkspace.mission}</p>
          <h3 className="mt-4 text-sm font-semibold">Current activity</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Analyzing discovered websites…
          </p>
          <h3 className="mt-4 text-sm font-semibold">Queue</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            <li>24 companies waiting for analysis</li>
            <li>8 high-potential opportunities</li>
            <li>3 outreach drafts awaiting approval</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm"
            >
              Change Mission
            </button>
            <button
              type="button"
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700"
            >
              Kill switch
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Agent permissions</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Mode: {perms.mode} · Daily send limit: {perms.daily_send_limit}
          </p>
          <ul className="mt-4 space-y-2">
            {(Object.keys(LABELS) as AgentPermissionKey[]).map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={perms[key]}
                  onChange={(e) =>
                    setPerms((p) => ({ ...p, [key]: e.target.checked }))
                  }
                />
                {LABELS[key]}
              </label>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="font-semibold">Activity log</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {demoActivity.map((a) => (
            <li key={a.time + a.message} className="flex gap-3 border-b border-[var(--border)] py-2 last:border-0">
              <time className="w-12 text-[var(--muted)]">{a.time}</time>
              <span>{a.message}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
