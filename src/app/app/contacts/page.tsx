import { DEMO_BADGE, demoOpportunities } from "@/lib/demo/data";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Contacts</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Professional contacts from legitimate/demo sources only.
        </p>
      </div>
      <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        {demoOpportunities.map((o) => (
          <li key={o.id} className="px-4 py-3 text-sm">
            <p className="font-medium">
              {o.contactName} · {o.contactTitle}
            </p>
            <p className="text-[var(--muted)]">
              {o.company} · {o.contactEmail}
            </p>
            <p className="text-xs text-amber-800">Provenance: Demo Mode</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
