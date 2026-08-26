import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { encodeSession, SESSION_COOKIE } from "@/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error?.message ?? "auth_failed")}`,
    );
  }

  const user = data.user;
  const name =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    user.email?.split("@")[0] ||
    "User";

  const onboardingCompleted = Boolean(
    user.user_metadata?.onboarding_completed,
  );
  const destination = onboardingCompleted ? "/app" : "/onboarding";

  const response = NextResponse.redirect(new URL(destination, origin));
  response.cookies.set(
    SESSION_COOKIE,
    encodeSession({
      id: user.id,
      email: user.email ?? "",
      name,
      demo: false,
      onboardingCompleted,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  );

  return response;
}
