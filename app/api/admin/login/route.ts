import { NextResponse } from "next/server";
import { ADMIN_COOKIE, computeAdminToken, isAdminConfigured } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(ADMIN_COOKIE, computeAdminToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
