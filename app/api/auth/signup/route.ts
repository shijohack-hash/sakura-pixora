
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("name" in body) ||
      !("email" in body) ||
      !("password" in body)
    ) {
      return NextResponse.json(
        { error: "Please provide your name, email, and password." },
        { status: 400 }
      );
    }

    const input = body as {
      name: unknown;
      email: unknown;
      password: unknown;
    };

    const name =
      typeof input.name === "string" ? input.name.trim() : "";
    const email =
      typeof input.email === "string"
        ? input.email.trim().toLowerCase()
        : "";
    const password =
      typeof input.password === "string" ? input.password : "";

    if (!name) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Your name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 8 || password.length > 128) {
      return NextResponse.json(
        { error: "Password must be between 8 and 128 characters." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Account creation could not be confirmed. Please try again." },
        { status: 500 }
      );
    }

    if (!data.session) {
      return NextResponse.json({
        success: true,
        requiresEmailConfirmation: true,
        message:
          "Your account was created. Check your email to confirm your address before signing in.",
      });
    }

    return NextResponse.json({
      success: true,
      requiresEmailConfirmation: false,
      user: {
        id: data.user.id,
        email: data.user.email,
        name,
      },
    });
  } catch (error) {
    console.error(
      "Pixora signup error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Signup failed. Please check your connection and try again." },
      { status: 500 }
    );
  }
}