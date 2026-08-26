import Link from "next/link";
import { demoLogin } from "@/lib/auth/actions";
import { isSupabaseConfigured } from "@/lib/auth/supabase";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabaseReady = isSupabaseConfigured();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-4 py-16">
      <Link href="/" className="mb-8 text-sm text-[var(--muted)] hover:underline">
        ← Zumelia Scout
      </Link>
      <h1 className="font-display text-3xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Sign in with Google, or explore with Demo Mode.
      </p>

      {params.error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          Sign-in failed: {params.error}
        </p>
      )}

      {supabaseReady && (
        <div className="mt-8 space-y-3">
          <GoogleSignInButton label="Continue with Google" />
          <p className="text-center text-xs text-[var(--muted)]">or</p>
        </div>
      )}

      <form
        action={demoLogin}
        className={`space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 ${
          supabaseReady ? "mt-3" : "mt-8"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
          Demo Mode
        </p>
        <label className="block space-y-1 text-sm">
          <span className="text-[var(--muted)]">Email</span>
          <input
            name="email"
            type="email"
            defaultValue="demo@zumelia.app"
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
