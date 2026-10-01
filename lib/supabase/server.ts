
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  // Log only whether the variables exist, never their values.
  console.log("[Pixora Supabase diagnostic]", {
    urlExists: Boolean(url),
    keyExists: Boolean(key),
    environment: process.env.NODE_ENV,
  });

  if (!url || !key) {
    throw new Error(
      `Supabase environment configuration missing: ${
        !url && !key
          ? "URL and anon key"
          : !url
            ? "URL"
            : "anon key"
      }. Check Vercel Environment Variables and redeploy.`
    );
  }

  const cookieStore = cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot modify cookies.
          // Middleware handles session refresh.
        }
      },
    },
  });
}