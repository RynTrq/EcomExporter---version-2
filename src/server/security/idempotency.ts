import "server-only";

import { createHash } from "node:crypto";
import {
  createAuditEvent,
  findIdempotencyRecord,
  saveIdempotencyRecord,
} from "@/server/db/repositories";
import { ApiError } from "@/server/http/errors";
import type { RequestContext } from "@/server/http/context";

const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;

export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  return `{${entries
    .map(([key, entryValue]) => `${JSON.stringify(key)}:${canonicalJson(entryValue)}`)
    .join(",")}}`;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getBodyHash(body: unknown) {
  return sha256(canonicalJson(body));
}

export async function runIdempotent<T>(input: {
  request: Request;
  context: RequestContext;
  parsedBody: unknown;
  execute: () => Promise<{ status: number; body: T }> | { status: number; body: T };
}) {
  const key = input.request.headers.get("idempotency-key");
  if (!key) {
    return input.execute();
  }

  if (key.length < 8 || key.length > 160) {
    throw new ApiError(
      400,
      "bad_request",
      "Idempotency-Key must be between 8 and 160 characters.",
    );
  }

  const keyHash = sha256(`${input.context.method}:${input.context.path}:${key}`);
  const bodyHash = getBodyHash(input.parsedBody);
  const existing = await findIdempotencyRecord(keyHash);

  if (existing) {
    if (existing.body_hash !== bodyHash) {
      throw new ApiError(
        409,
        "conflict",
        "Idempotency-Key was already used with a different request body.",
      );
    }
    await createAuditEvent({
      actorType: "system",
      action: "idempotency.replayed",
      entityType: "api_request",
      requestId: input.context.requestId,
      ipHash: input.context.ipHash,
      metadata: { path: input.context.path },
    });
    return {
      status: existing.status,
      body: existing.response_json as T,
      replayed: true,
    };
  }

  const result = await input.execute();
  await saveIdempotencyRecord({
    keyHash,
    method: input.context.method,
    path: input.context.path,
    bodyHash,
    status: result.status,
    response: result.body,
    requestId: input.context.requestId,
    ttlMs: IDEMPOTENCY_TTL_MS,
  });

  return { ...result, replayed: false };
}
