import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // If your Supabase project has "Confirm email" enabled (the default for
  // new projects), signUp() creates the user but returns no session until
  // they click the confirmation link — so there's no cookie to set yet.
  if (!data.session) {
    return NextResponse.json({
      success: true,
      requiresEmailConfirmation: true,
      message: "Check your inbox to confirm your email before signing in.",
    });
  }

  return NextResponse.json({
    success: true,
    user: {
      id: data.user?.id,
      email: data.user?.email,
      name,
    },
  });
}
