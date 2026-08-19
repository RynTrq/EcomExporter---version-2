import "server-only";

import { randomUUID } from "node:crypto";
import { hashIp } from "@/server/security/crypto";

export type RequestContext = {
  requestId: string;
  method: string;
  path: string;
  ip: string;
  ipHash: string;
  userAgent: string;
  startedAt: number;
};

export function createRequestContext(request: Request): RequestContext {
  const url = new URL(request.url);
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = sanitizeHeaderValue(
    forwarded?.split(",")[0]?.trim() || realIp || "local",
    80,
    "local",
  );
  const requestId =
    parseRequestId(request.headers.get("x-request-id")) ||
    parseRequestId(request.headers.get("x-vercel-id")) ||
    randomUUID();

  return {
    requestId,
    method: request.method,
    path: url.pathname,
    ip,
    ipHash: hashIp(ip),
    userAgent: sanitizeHeaderValue(
      request.headers.get("user-agent") || "unknown",
      300,
      "unknown",
    ),
    startedAt: Date.now(),
  };
}

function parseRequestId(value: string | null) {
  if (!value) return "";
  const trimmed = sanitizeHeaderValue(value, 120, "");
  return /^[a-zA-Z0-9:._-]+$/.test(trimmed) ? trimmed : "";
}

function sanitizeHeaderValue(value: string, maxLength: number, fallback: string) {
  const trimmed = value.replace(/[\r\n\t]/g, "").trim();
  if (!trimmed || trimmed.length > maxLength) return fallback;
  return trimmed;
}
