import { NextResponse } from "next/server";
import { backgroundRemovedUrl } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const publicId = typeof body.publicId === "string" ? body.publicId.trim() : "";

    if (!publicId) {
      return NextResponse.json({ error: "publicId is required." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      publicId,
      url: backgroundRemovedUrl(publicId),
    });
  } catch (error) {
    console.error("POST /api/remove-background", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Background removal failed." },
      { status: 500 }
    );
  }
}
