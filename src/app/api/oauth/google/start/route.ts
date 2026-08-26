import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import {
  buildGoogleAuthUrl,
  isGoogleOAuthConfigured,
} from "@/lib/email/gmail-oauth";
import { getSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isGoogleOAuthConfigured()) {
    return NextResponse.redirect(
      new URL("/app/integrations?error=google_not_configured", request.url),
    );
  }

  const origin = new URL(request.url).origin;
  const state = randomBytes(16).toString("hex");
  const response = NextResponse.redirect(buildGoogleAuthUrl(state, origin));
  response.cookies.set("zumelia_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
