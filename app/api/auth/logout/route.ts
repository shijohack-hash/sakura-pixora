import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // Nothing to sign out of if Supabase isn't configured — treat as already logged out.
  }
  return NextResponse.json({ success: true });
}
