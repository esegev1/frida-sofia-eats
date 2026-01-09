import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      // Not logged in - redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Check if user is in admin_users table
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("email", user.email)
      .single();

    // Handle both error case (.single() not finding record) and user not active
    if (error || !adminUser || !adminUser.is_active) {
      // Not an admin - redirect to login with error
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in admins away from login page
  if (request.nextUrl.pathname === "/auth/login" && user) {
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("email", user.email)
      .single();

    // Redirect only if admin exists and is active (error or not active = stay on login)
    if (!error && adminUser?.is_active) {
      const redirect = request.nextUrl.searchParams.get("redirect") || "/admin";
      return NextResponse.redirect(new URL(redirect, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/login",
  ],
};
