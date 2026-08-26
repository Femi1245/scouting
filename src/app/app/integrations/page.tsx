import { DEMO_BADGE } from "@/lib/demo/data";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Integrations</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Connect email with OAuth. We never store email passwords.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Gmail</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Status: Disconnected</p>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Permissions requested: send email, read relevant messages, manage
            replies you authorize. Minimum scopes only.
          </p>
          <button
            type="button"
            className="mt-4 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
          >
            Connect Gmail
          </button>
          <p className="mt-2 text-xs text-amber-800">
            Set GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET to enable live OAuth.
          </p>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Microsoft</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Status: Disconnected</p>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Permissions requested: send mail, read mail in authorized mailboxes.
          </p>
          <button
            type="button"
            className="mt-4 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
          >
            Connect Microsoft
          </button>
          <p className="mt-2 text-xs text-amber-800">
            Set MICROSOFT_CLIENT_ID / MICROSOFT_CLIENT_SECRET to enable live OAuth.
          </p>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm">
        <h2 className="font-semibold">Email agent limits</h2>
        <ul className="mt-3 space-y-1 text-[var(--muted)]">
          <li>Daily send limit: 25/day</li>
          <li>Maximum new contacts: 20/day</li>
          <li>Reply mode: Draft only / Require approval</li>
          <li>Working hours: configurable in Settings</li>
        </ul>
      </section>
    </div>
  );
}
