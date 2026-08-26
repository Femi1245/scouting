import Link from "next/link";
import { ArrowRight, Radar, Shield, Sparkles, Workflow } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <Radar className="h-5 w-5 text-[var(--accent)]" />
          Zumelia Scout
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/login" className="text-[var(--muted)] hover:text-[var(--ink)]">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[var(--accent)] px-3.5 py-2 font-medium text-white hover:bg-[var(--accent-hover)]"
          >
            Start Scouting
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="animate-rise">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Autonomous AI client acquisition
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.35rem]">
            Tell us what you sell. Your AI agent finds who needs it.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            Scout businesses, uncover opportunities, research prospects,
            personalize outreach, and manage conversations from one intelligent
            workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              Start Scouting <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--surface-2)]"
            >
              Watch How It Works
            </a>
          </div>
        </div>

        <div className="animate-rise-delay rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Agent feed
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Found 14 restaurants matching your criteria.",
              "Analyzed 8 websites.",
              "Detected 3 high-value opportunities.",
              "Prepared 3 personalized outreach messages.",
              "Waiting for approval on 2 messages.",
            ].map((line) => (
              <li
                key={line}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5"
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[var(--muted)]">
            Illustration of agent activity — not live account data.
          </p>
        </div>
      </section>

      <section id="how" className="border-t border-[var(--border)] bg-[var(--surface)]/70 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Tell us what you sell",
              "Let AI scout",
              "Review opportunities",
              "Connect your email",
              "Let your agent reach out",
              "Turn replies into meetings",
            ].map((step, i) => (
              <li
                key={step}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
              >
                <span className="text-xs font-semibold text-[var(--accent)]">
                  Step {i + 1}
                </span>
                <p className="mt-2 font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Radar,
              title: "AI Opportunity Scout",
              body: "Missions that discover businesses matching your ICP from legitimate public sources.",
            },
            {
              icon: Sparkles,
              title: "Website Intelligence",
              body: "Evidence-based signals — never invent unverified technical claims.",
            },
            {
              icon: Workflow,
              title: "Personalized Outreach",
              body: "Messages grounded in observed problems and your service — not bulk spam.",
            },
            {
              icon: Shield,
              title: "Controlled autonomy",
              body: "Draft, approval, or autopilot with limits, pause, kill switch, and audit logs.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <f.icon className="h-5 w-5 text-[var(--accent)]" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-semibold">
            Your AI agent for finding clients.
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Subheading: Tell it what you sell. It scouts businesses, discovers
            opportunities, researches prospects, and helps you start conversations.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            Start Scouting
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Zumelia Scout. Responsible outreach. User-controlled agents.
      </footer>
    </div>
  );
}
