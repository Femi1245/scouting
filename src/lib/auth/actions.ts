"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encodeSession, SESSION_COOKIE, type SessionUser } from "./session";

export async function demoLogin(formData: FormData) {
  const email = String(formData.get("email") || "demo@scouter.app").trim();
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
  redirect("/app");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/");
}
