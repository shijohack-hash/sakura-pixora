import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on every request.
 *
 * Supabase access tokens are short-lived. Without this, a Server Component
 * can only *read* cookies (it can't write refreshed ones back), so a session
 * would silently expire even while the refresh token is still valid. This
 * middleware runs before Server Components, refreshes the token if needed,
 * and writes the updated cookies onto both the request and the response.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured yet, don't block the app — just pass through.
  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: calling getUser() (not getSession()) forces a round trip to
  // Supabase that validates the token and triggers a refresh if it's stale.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every path except static assets and image optimization files,
     * so auth cookies stay fresh across the whole app.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
