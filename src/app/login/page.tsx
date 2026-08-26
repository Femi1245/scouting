import Link from "next/link";
import { demoLogin } from "@/lib/auth/actions";
import { isSupabaseConfigured } from "@/lib/auth/supabase";

export default function LoginPage() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-4 py-16">
      <Link href="/" className="mb-8 text-sm text-[var(--muted)] hover:underline">
        ← Scouter
      </Link>
      <h1 className="font-display text-3xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {supabaseReady
          ? "Sign in with email or continue in Demo Mode."
          : "Supabase Auth is not configured yet — use Demo Mode to explore the product."}
      </p>

      <form action={demoLogin} className="mt-8 space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
          Demo Mode
        </p>
        <label className="block space-y-1 text-sm">
          <span className="text-[var(--muted)]">Email</span>
          <input
            name="email"
            type="email"
            defaultValue="demo@scouter.app"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <input type="hidden" name="skipOnboarding" value="1" />
        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
        >
          Enter demo workspace
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        New here?{" "}
        <Link href="/signup" className="text-[var(--accent)] underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
