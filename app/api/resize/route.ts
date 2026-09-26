import { NextResponse } from "next/server";
import { resizedUrl } from "@/lib/cloudinary";

export const runtime = "nodejs";

const PRESETS = {
  instagram: { width: 1080, height: 1080 },
  instagramStory: { width: 1080, height: 1920 },
  website: { width: 1600, height: 1200 },
  marketplace: { width: 1200, height: 1200 },
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const publicId = typeof body.publicId === "string" ? body.publicId.trim() : "";
    const preset = body.preset as keyof typeof PRESETS;

    if (!publicId || !PRESETS[preset]) {
      return NextResponse.json(
        { error: "publicId and a valid preset are required." },
        { status: 400 }
      );
    }

    const { width, height } = PRESETS[preset];
    return NextResponse.json({
      success: true,
      preset,
      width,
      height,
      url: resizedUrl(publicId, width, height),
    });
  } catch (error) {
    console.error("POST /api/resize", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Resize failed." },
      { status: 500 }
    );
  }
}
