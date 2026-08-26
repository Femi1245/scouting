import Link from "next/link";
import { demoLogin } from "@/lib/auth/actions";

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-4 py-16">
      <Link href="/" className="mb-8 text-sm text-[var(--muted)] hover:underline">
        ← Scouter
      </Link>
      <h1 className="font-display text-3xl font-semibold">Create your account</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Start with Demo Mode. Connect Supabase Auth for production email/password and Google sign-in.
      </p>

      <form action={demoLogin} className="mt-8 space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <label className="block space-y-1 text-sm">
          <span className="text-[var(--muted)]">Name</span>
          <input
            name="name"
            defaultValue="Alex Founder"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="text-[var(--muted)]">Email</span>
          <input
            name="email"
            type="email"
            defaultValue="alex@scouter.app"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="text-[var(--muted)]">Password</span>
          <input
            name="password"
            type="password"
            placeholder="Stored via Supabase Auth in production"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
        >
          Continue to onboarding
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link href="/login" className="text-[var(--accent)] underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
