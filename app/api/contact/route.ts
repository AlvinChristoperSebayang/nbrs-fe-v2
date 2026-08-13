import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000;
const MIN_COMPLETION_MS = 1200;

type RateLimitBucket = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitBucket>();

const json = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status });

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimits.get(ip);
  if (!existing || existing.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  existing.count += 1;
  return existing.count > MAX_REQUESTS;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const expectedOrigin = new URL(request.url).origin;
  if (request.headers.get("origin") !== expectedOrigin) {
    return json(403, { success: false, message: "Invalid request origin." });
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return json(429, { success: false, message: "Too many requests. Please try again shortly." });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, { success: false, message: "Invalid request." });
  }

  if (!isRecord(payload)) {
    return json(400, { success: false, message: "Invalid request." });
  }

  const honeypot = payload.website;
  const startedAt = payload.formStartedAt;
  const elapsed = typeof startedAt === "number" ? Date.now() - startedAt : 0;
  if ((typeof honeypot === "string" && honeypot.trim() !== "") || elapsed < MIN_COMPLETION_MS || elapsed > 2 * 60 * 60 * 1000) {
    // Do not tell automated clients which check they failed.
    return json(200, { success: true });
  }

  const secret = process.env.CONTACT_SUBMISSION_SECRET;
  if (!secret) {
    console.error("CONTACT_SUBMISSION_SECRET is not configured.");
    return json(503, { success: false, message: "The form is temporarily unavailable." });
  }

  const craftPayload = JSON.stringify({
    firstName: payload.firstName,
    lastName: payload.lastName,
    company: payload.company,
    role: payload.role,
    phoneCountryCode: payload.phoneCountryCode,
    phone: payload.phone,
    email: payload.email,
    serviceTypes: payload.serviceTypes,
    sectors: payload.sectors,
    message: payload.message,
    hearAbout: payload.hearAbout,
  });
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac("sha256", secret).update(`${timestamp}.${craftPayload}`).digest("hex");

  try {
    const craftResponse = await fetch(
      process.env.CRAFT_CONTACT_SUBMISSION_URL || "https://phpstack-1082258-6573734.cloudwaysapps.com/contact-submissions/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Contact-Timestamp": timestamp,
          "X-Contact-Signature": signature,
        },
        body: craftPayload,
        cache: "no-store",
      },
    );
    const result = await craftResponse.json().catch(() => null);

    if (!craftResponse.ok) {
      return json(craftResponse.status >= 500 ? 502 : craftResponse.status, {
        success: false,
        message: result?.message || "We could not send your enquiry. Please try again.",
        fieldErrors: result?.fieldErrors || {},
      });
    }

    return json(201, { success: true });
  } catch (error) {
    console.error("Contact submission could not reach Craft:", error);
    return json(502, { success: false, message: "We could not send your enquiry. Please try again." });
  }
}
