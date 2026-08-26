import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeGoogleCode } from "@/lib/email/gmail-oauth";
import { saveGmailTokens } from "@/lib/email/gmail-store";
import { startGmailWatch, isGmailPubSubConfigured } from "@/lib/email/gmail-api";
import { recordAudit } from "@/lib/audit";
import { getSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  if (oauthError) {
    return NextResponse.redirect(
      `${origin}/app/integrations?error=${encodeURIComponent(oauthError)}`,
    );
  }

  const store = await cookies();
  const expected = store.get("zumelia_oauth_state")?.value;
  store.delete("zumelia_oauth_state");

  if (!code || !state || !expected || state !== expected) {
    return NextResponse.redirect(
      `${origin}/app/integrations?error=invalid_oauth_state`,
    );
  }

  try {
    const tokens = await exchangeGoogleCode(code, origin);
    await saveGmailTokens(tokens);
    const session = await getSession();
    await recordAudit(
      session?.id ?? "anonymous",
      "gmail.connected",
      { email: tokens.email },
      session?.id,
    );

    let watchNote = "";
    if (isGmailPubSubConfigured()) {
      const watch = await startGmailWatch(tokens);
      if (watch.ok) {
        await recordAudit(session?.id ?? "anonymous", "gmail.watch_started", {
          historyId: watch.historyId,
          expiration: watch.expiration,
        });
      } else {
        watchNote = `&watch_error=${encodeURIComponent(watch.error)}`;
      }
    }

    return NextResponse.redirect(
      `${origin}/app/integrations?connected=gmail${watchNote}`,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "oauth_failed";
    return NextResponse.redirect(
      `${origin}/app/integrations?error=${encodeURIComponent(message)}`,
    );
  }
}
