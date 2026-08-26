/** Canonical production URL for Zumelia Scout */
export const PRODUCTION_APP_URL = "https://zumeliascout.vercel.app";

export function getAppUrl(origin?: string) {
  if (origin?.startsWith("http")) return origin.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_APP_URL?.trim()) {
    return process.env.NEXT_PUBLIC_APP_URL.trim().replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export function getGmailOAuthRedirectUri(origin?: string) {
  return `${getAppUrl(origin)}/api/oauth/google/callback`;
}

export function getGmailWebhookUrl(origin?: string) {
  // Pub/Sub must hit a public HTTPS URL — always prefer production when set
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    PRODUCTION_APP_URL;
  if (origin?.includes("localhost")) {
    return `${PRODUCTION_APP_URL}/api/webhooks/gmail`;
  }
  return `${base.replace(/\/$/, "")}/api/webhooks/gmail`;
}

export const GMAIL_REDIRECT_URIS = [
  "http://localhost:3000/api/oauth/google/callback",
  `${PRODUCTION_APP_URL}/api/oauth/google/callback`,
] as const;

export const AUTH_CALLBACK_URIS = [
  "http://localhost:3000/auth/callback",
  `${PRODUCTION_APP_URL}/auth/callback`,
] as const;
