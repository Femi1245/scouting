import { cookies } from "next/headers";
import { decryptSecret, encryptSecret } from "@/lib/crypto/secrets";
import { GMAIL_COOKIE, type GmailTokens } from "@/lib/email/gmail-oauth";

export async function saveGmailTokens(tokens: GmailTokens) {
  const store = await cookies();
  store.set(GMAIL_COOKIE, encryptSecret(JSON.stringify(tokens)), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 180,
  });
}

export async function getGmailTokens(): Promise<GmailTokens | null> {
  const store = await cookies();
  const raw = store.get(GMAIL_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decryptSecret(raw)) as GmailTokens;
  } catch {
    return null;
  }
}

export async function clearGmailTokens() {
  const store = await cookies();
  store.delete(GMAIL_COOKIE);
}

export async function getGmailConnectionStatus() {
  const tokens = await getGmailTokens();
  if (!tokens) {
    return { connected: false as const };
  }
  return {
    connected: true as const,
    email: tokens.email,
    scopes: tokens.scopes,
  };
}
