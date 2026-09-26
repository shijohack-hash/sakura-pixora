import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WebP images are supported." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image must be smaller than 10 MB." }, { status: 400 });
    }

    const result = await uploadImage(Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({
      success: true,
      asset: result,
    });
  } catch (error) {
    console.error("POST /api/upload", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 }
    );
  }
}
