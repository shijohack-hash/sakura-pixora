import { createClient } from "@/lib/supabase/server";

export { initials } from "@/lib/userDisplay";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

function toPublicUser(user: {
  id: string;
  email?: string | null;
  created_at: string;
  user_metadata?: Record<string, unknown>;
}): PublicUser {
  const metaName = user.user_metadata?.name;
  return {
    id: user.id,
    name: typeof metaName === "string" && metaName.trim() ? metaName : (user.email ?? "").split("@")[0],
    email: user.email ?? "",
    createdAt: user.created_at,
  };
}

/**
 * Gets the current signed-in user from the Supabase session cookie.
 * Uses getUser() rather than getSession() — this makes a validated call to
 * Supabase's auth server instead of trusting an unverified cookie, which is
 * the correct thing to do anywhere this result gates access to a page or API.
 *
 * Returns null (rather than throwing) if Supabase isn't configured yet, so
 * pages that gate on "is someone logged in" degrade to "no" instead of
 * crashing with a 500 when env vars are missing.
 */
export async function getCurrentUser(): Promise<PublicUser | null> {
  let supabase;
  try {
    supabase = createClient();
  } catch {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return toPublicUser(user);
}
