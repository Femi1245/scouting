import { cookies } from "next/headers";

export const SESSION_COOKIE = "scouter_session";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  demo: boolean;
  onboardingCompleted: boolean;
};

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as SessionUser;
  } catch {
    return null;
  }
}

export function encodeSession(user: SessionUser) {
  return encodeURIComponent(JSON.stringify(user));
}
