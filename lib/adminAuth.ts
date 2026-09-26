import crypto from "node:crypto";

export const ADMIN_COOKIE = "pixora_admin";

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function computeAdminToken(): string {
  const password = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_PASSWORD_SECRET || "";
  return crypto.createHash("sha256").update(`${password}::${secret}`).digest("hex");
}

export function isValidAdminToken(token: string | undefined | null): boolean {
  if (!token || !isAdminConfigured()) return false;
  const expected = computeAdminToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
