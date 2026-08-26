"use client";

import { useState, useTransition } from "react";
import { completeOnboarding } from "@/lib/auth/actions";

const STEPS = [
  "What do you sell?",
  "Who do you want to work with?",
  "Where should we look?",
  "What company size?",
  "What problems should we look for?",
  "How autonomous should your agent be?",
  "Connect your email",
];

const SIZES = ["solo", "1–10", "11–50", "51–200", "201–500", "500+"];
const MODES = [
  { id: "research", label: "Research only" },
  { id: "draft", label: "Draft outreach" },
  { id: "approval", label: "Require approval" },
  { id: "autopilot", label: "Autopilot" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(
    "I build websites for restaurants.",
  );
  const [who, setWho] = useState(
    "Small businesses in the UK with outdated websites.",
  );
  const [where, setWhere] = useState("United Kingdom");
  const [sizes, setSizes] = useState<string[]>(["1–10", "11–50"]);
  const [problems, setProblems] = useState(
    "outdated website, poor mobile UX, no online booking, weak CTA",
  );
  const [mode, setMode] = useState("approval");
  const [pending, startTransition] = useTransition();

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else startTransition(() => completeOnboarding());
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-xl flex-col px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
        Onboarding · Step {step + 1} of {STEPS.length}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <h1 className="font-display mt-8 text-3xl font-semibold tracking-tight">
        {STEPS[step]}
      </h1>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        {step === 0 && (
          <div className="space-y-3">
            <textarea
              value={service}
              onChange={(e) => setService(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
            <p className="text-xs text-[var(--muted)]">
              Examples: Shopify stores, SEO, AI automation, mobile apps…
            </p>
          </div>
        )}
        {step === 1 && (
          <textarea
            value={who}
            onChange={(e) => setWho(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        )}
        {step === 2 && (
          <input
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Worldwide, countries, regions, cities…"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        )}
        {step === 3 && (
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => {
              const on = sizes.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setSizes((prev) =>
                      on ? prev.filter((x) => x !== s) : [...prev, s],
                    )
                  }
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    on
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--border)]"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}
        {step === 4 && (
          <div className="space-y-2">
            <p className="text-xs text-[var(--muted)]">AI suggestions — edit freely</p>
            <textarea
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
        )}
        {step === 5 && (
          <div className="space-y-2">
            {MODES.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm ${
                  mode === m.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)]"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={mode === m.id}
                  onChange={() => setMode(m.id)}
                />
                {m.label}
              </label>
            ))}
          </div>
        )}
        {step === 6 && (
          <div className="space-y-3 text-sm">
            <p className="text-[var(--muted)]">
              Connect Gmail or Microsoft with OAuth. We never ask for your email
              password. You can skip and connect later in Integrations.
            </p>
            <button
              type="button"
              className="w-full rounded-lg border border-[var(--border)] py-2.5 font-medium hover:bg-[var(--surface-2)]"
            >
              Connect Gmail (OAuth)
            </button>
            <button
              type="button"
              className="w-full rounded-lg border border-[var(--border)] py-2.5 font-medium hover:bg-[var(--surface-2)]"
            >
              Connect Microsoft (OAuth)
            </button>
            <p className="text-xs text-[var(--muted)]">
              Permissions requested: send email, read relevant replies, manage
              threads you authorize. Configure OAuth client IDs in environment.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={pending}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] disabled:opacity-50"
        >
          {step === STEPS.length - 1
            ? pending
              ? "Launching…"
              : "Enter workspace"
            : "Continue"}
        </button>
      </div>
    </div>
  );
}
