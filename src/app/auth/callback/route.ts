import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  console.log("[Callback] Full URL:", request.url);
  console.log("[Callback] Origin:", origin);
  console.log("[Callback] Code:", !!code, "Next param:", next);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("[Callback] Exchange error:", error?.message);

    if (!error) {
      // Make sure next is valid and starts with /
      const safeNext = next && next.startsWith("/") ? next : "/admin";
      const redirectUrl = `${origin}${safeNext}`;
      console.log("[Callback] Safe next:", safeNext);
      console.log("[Callback] Full redirect URL:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Return to login with error
  console.log("[Callback] Auth failed, redirecting to login");
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
