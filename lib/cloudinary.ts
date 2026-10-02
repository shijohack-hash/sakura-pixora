
import crypto from "node:crypto";

export type UploadResult = {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
};

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("[Pixora Cloudinary diagnostic]", {
      cloudNameExists: Boolean(cloudName),
      apiKeyExists: Boolean(apiKey),
      apiSecretExists: Boolean(apiSecret),
      environment: process.env.NODE_ENV,
    });

    throw new Error(
      "Cloudinary configuration is missing. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Vercel Environment Variables."
    );
  }

  return { cloudName, apiKey, apiSecret };
}

function signParams(params: Record<string, string | number>): string {
  const { apiSecret } = getCloudinaryConfig();

  const serialized = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== "")
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(serialized + apiSecret)
    .digest("hex");
}

export async function uploadImage(
  file: Buffer,
  folder = "pixora/products"
): Promise<UploadResult> {
  const { cloudName, apiKey } = getCloudinaryConfig();

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signParams({ folder, timestamp });

  const form = new FormData();

  form.append("file", new Blob([new Uint8Array(file)]));
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("[Pixora Cloudinary upload error]", {
      status: response.status,
      message: data?.error?.message ?? "Unknown Cloudinary error",
    });

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

function deliveryUrl(publicId: string, transformation = ""): string {
  const { cloudName } = getCloudinaryConfig();

  const encodedId = publicId
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  const transformPart = transformation ? `${transformation}/` : "";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformPart}${encodedId}`;
}

export function backgroundRemovedUrl(publicId: string): string {
  return deliveryUrl(publicId, "e_background_removal");
}

export function resizedUrl(
  publicId: string,
  width: number,
  height: number
): string {
  return deliveryUrl(
    publicId,
    `c_fill,g_auto,w_${width},h_${height},f_auto,q_auto`
  );
}

export function generatedBackgroundUrl(
  publicId: string,
  prompt: string,
  seed = 1
): string {
  const safePrompt = encodeURIComponent(prompt).replace(/%2F/g, "%252F");

  return deliveryUrl(
    publicId,
    `e_gen_background_replace:prompt_${safePrompt};seed_${Math.max(
      0,
      Math.floor(seed)
    )}`
  );
}

export function optimizedUrl(publicId: string): string {
  return deliveryUrl(publicId, "f_auto,q_auto");
}