import { getGmailOAuthRedirectUri } from "@/lib/config";

export type GmailTokens = {
  accessToken: string;
  refreshToken?: string;
  expiry: number;
  email: string;
  scopes: string[];
  historyId?: string;
  watchExpiration?: string;
};

export const GMAIL_COOKIE = "zumelia_gmail";

export const GMAIL_SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.modify",
] as const;

export function getGoogleRedirectUri(origin?: string) {
  return getGmailOAuthRedirectUri(origin);
}

export function isGoogleOAuthConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID?.trim() &&
      process.env.GOOGLE_CLIENT_SECRET?.trim(),
  );
}

export function buildGoogleAuthUrl(state: string, origin?: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID!.trim();
  const redirectUri = getGoogleRedirectUri(origin);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: GMAIL_SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    state,
    include_granted_scopes: "true",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string, origin?: string) {
  const redirectUri = getGoogleRedirectUri(origin);
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
    client_secret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google token exchange failed: ${text}`);
  }

  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    scope?: string;
  };

  const profileRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${json.access_token}` } },
  );
  if (!profileRes.ok) {
    throw new Error("Failed to fetch Google profile");
  }
  const profile = (await profileRes.json()) as { email?: string };

  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiry: Date.now() + json.expires_in * 1000,
    email: profile.email ?? "unknown",
    scopes: (json.scope ?? "").split(" ").filter(Boolean),
  } satisfies GmailTokens;
}
