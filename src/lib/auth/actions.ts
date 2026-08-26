"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encodeSession, SESSION_COOKIE, type SessionUser } from "./session";

export async function demoLogin(formData: FormData) {
  const email = String(formData.get("email") || "demo@zumelia.app").trim();
  const name = String(formData.get("name") || "Demo User").trim();
  const user: SessionUser = {
    id: "user_demo",
    email,
    name,
    demo: true,
    onboardingCompleted: formData.get("skipOnboarding") === "1",
  };
  const store = await cookies();
  store.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  redirect(user.onboardingCompleted ? "/app" : "/onboarding");
}

export async function completeOnboarding() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) redirect("/login");
  const user = JSON.parse(decodeURIComponent(raw)) as SessionUser;
  user.onboardingCompleted = true;
  store.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !user.demo
    ) {
      const { createServerSupabase } = await import("@/lib/supabase/server");
      const supabase = await createServerSupabase();
      await supabase.auth.updateUser({
        data: { onboarding_completed: true },
      });
    }
  } catch {
    // non-fatal
  }

  redirect("/app");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  try {
    const { createServerSupabase } = await import("@/lib/supabase/server");
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const supabase = await createServerSupabase();
      await supabase.auth.signOut();
    }
  } catch {
    // ignore if supabase unavailable
  }
  redirect("/");
}
