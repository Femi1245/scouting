import { DEMO_BADGE } from "@/lib/demo/data";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Settings</h1>
      </div>

      {[
        {
          title: "Profile",
          fields: ["Name", "Company", "Website", "Industry", "Services"],
        },
        {
          title: "AI preferences",
          fields: ["Tone", "Language", "Personalization level", "Autonomy level"],
        },
        {
          title: "Outreach",
          fields: ["Daily limit", "Sending schedule", "Follow-up settings"],
        },
        {
          title: "Safety",
          fields: [
            "Approval requirements",
            "Automatic reply rules",
            "Blocked companies",
            "Blocked contacts",
            "Suppression list",
          ],
        },
        {
          title: "Notifications",
          fields: ["Email notifications", "Browser notifications", "Hot lead alerts"],
        },
        {
          title: "Billing",
          fields: ["Plan: Free (demo)", "Usage ledger enabled", "Invoices: —"],
        },
      ].map((section) => (
        <section
          key={section.title}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <h2 className="font-semibold">{section.title}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {section.fields.map((f) => (
              <li key={f} className="flex items-center justify-between gap-3 border-b border-[var(--border)] py-2 last:border-0">
                <span>{f}</span>
                <input
                  className="max-w-[220px] rounded-md border border-[var(--border)] bg-white px-2 py-1 text-[var(--ink)]"
                  placeholder="Configure"
                />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="text-xs text-[var(--muted)]">
        Demo Mode shows fictional data only. Production uses Supabase Auth, encrypted
        OAuth tokens, RLS, and the usage ledger in <code>usage_records</code>.
      </p>
    </div>
  );
}
