import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  console.log("[Callback] Code:", !!code, "Next redirect:", next);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("[Callback] Exchange error:", error?.message);

    if (!error) {
      const redirectUrl = `${origin}${next}`;
      console.log("[Callback] Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Return to login with error
  console.log("[Callback] Auth failed, redirecting to login");
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
