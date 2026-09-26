import { NextResponse } from "next/server";
import { generatedBackgroundUrl, resizedUrl } from "@/lib/cloudinary";

export const runtime = "nodejs";

const DEFAULT_SCENES = [
  { id: "studio", name: "Studio", prompt: "a clean premium studio product photography background" },
  { id: "lifestyle", name: "Lifestyle", prompt: "a modern luxury lifestyle setting suitable for product advertising" },
  { id: "nature", name: "Nature", prompt: "an elegant natural outdoor setting with soft premium lighting" },
];

const FORMATS = [
  { id: "instagram", name: "Instagram Post", width: 1080, height: 1080 },
  { id: "story", name: "Instagram Story", width: 1080, height: 1920 },
  { id: "website", name: "Website", width: 1600, height: 1200 },
  { id: "marketplace", name: "Marketplace", width: 1200, height: 1200 },
];

export async function POST(request: Request) {
  try {
    const body: { publicId?: unknown; scenes?: unknown } = await request.json();
    const publicId = typeof body.publicId === "string" ? body.publicId.trim() : "";
    const requestedScenes: unknown[] = Array.isArray(body.scenes) ? body.scenes : DEFAULT_SCENES;

    if (!publicId) {
      return NextResponse.json({ error: "publicId is required." }, { status: 400 });
    }

    type Scene = { id?: string; name?: string; prompt: string };

    const scenes: Scene[] = requestedScenes
      .filter((scene: unknown): scene is Scene => {
        return typeof scene === "object" && scene !== null && typeof (scene as { prompt?: unknown }).prompt === "string";
      })
      .slice(0, 6);

    if (!scenes.length) {
      return NextResponse.json({ error: "At least one valid scene is required." }, { status: 400 });
    }

    const assets = scenes.flatMap((scene, sceneIndex) => {
      const backgroundUrl = generatedBackgroundUrl(
        publicId,
        scene.prompt,
        sceneIndex + 1
      );

      return FORMATS.map((format) => ({
        id: `${scene.id ?? `scene-${sceneIndex + 1}`}-${format.id}`,
        scene: scene.name ?? `Scene ${sceneIndex + 1}`,
        format: format.name,
        width: format.width,
        height: format.height,
        url: `${backgroundUrl.replace(
          "/image/upload/",
          `/image/upload/c_fill,g_auto,w_${format.width},h_${format.height},f_auto,q_auto/`
        )}`,
      }));
    });

    return NextResponse.json({
      success: true,
      note: "Cloudinary may return a temporary processing response while generative backgrounds are being created.",
      assets,
      original: resizedUrl(publicId, 1600, 1200),
    });
  } catch (error) {
    console.error("POST /api/generate-assets", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Asset generation failed." },
      { status: 500 }
    );
  }
}
