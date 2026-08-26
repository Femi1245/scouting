import { DEMO_BADGE, demoMeetings } from "@/lib/demo/data";

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Meetings</h1>
      </div>
      <ul className="space-y-3">
        {demoMeetings.map((m) => (
          <li
            key={m.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold">{m.title}</h2>
                <p className="text-sm text-[var(--muted)]">
                  {m.contact} · {m.company}
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium capitalize text-amber-900">
                {m.status}
              </span>
            </div>
            <p className="mt-2 text-sm">{m.startsAt}</p>
            <button
              type="button"
              className="mt-3 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm"
            >
              Schedule meeting
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
