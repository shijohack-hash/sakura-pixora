import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createClient();
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Supabase is not configured." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    // Supabase's own message ("Invalid login credentials") covers both a
    // wrong password AND an email that was never created in this Supabase
    // project — including accounts that only ever existed in an old local
    // data store. Surface it as-is so that distinction isn't hidden.
    return NextResponse.json(
      { error: error?.message || "Invalid login credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email,
      name: (data.user.user_metadata?.name as string | undefined) ?? data.user.email,
    },
  });
}
