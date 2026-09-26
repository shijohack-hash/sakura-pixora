import crypto from "node:crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

function assertConfigured() {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local."
    );
  }
}

export type UploadResult = {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
};

function signParams(params: Record<string, string | number>) {
  assertConfigured();
  const serialized = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== "")
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(serialized + API_SECRET).digest("hex");
}

export async function uploadImage(file: Buffer, folder = "pixora/products"): Promise<UploadResult> {
  assertConfigured();

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signParams({ folder, timestamp });
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(file)]));
  form.append("api_key", API_KEY!);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
    width: data.width,
    height: data.height,
    format: data.format,
  };
}

function deliveryUrl(publicId: string, transformation = "") {
  assertConfigured();
  const encodedId = publicId
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  const transformPart = transformation ? `${transformation}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformPart}${encodedId}`;
}

export function backgroundRemovedUrl(publicId: string): string {
  return deliveryUrl(publicId, "e_background_removal");
}

export function resizedUrl(publicId: string, width: number, height: number): string {
  return deliveryUrl(publicId, `c_fill,g_auto,w_${width},h_${height},f_auto,q_auto`);
}

export function generatedBackgroundUrl(publicId: string, prompt: string, seed = 1): string {
  const safePrompt = encodeURIComponent(prompt).replace(/%2F/g, "%252F");
  return deliveryUrl(
    publicId,
    `e_gen_background_replace:prompt_${safePrompt};seed_${Math.max(0, Math.floor(seed))}`
  );
}

export function optimizedUrl(publicId: string): string {
  return deliveryUrl(publicId, "f_auto,q_auto");
}
