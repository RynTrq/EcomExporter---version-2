import "server-only";

import { z } from "zod";
import { env } from "@/server/config/env";
import { ApiError } from "@/server/http/errors";

export async function parseJsonBody<T extends z.ZodType>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new ApiError(
      400,
      "bad_request",
      "Expected a JSON request body.",
    );
  }

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength > env.apiMaxJsonBytes) {
    throw new ApiError(
      413,
      "body_too_large",
      "Request body is too large.",
      { maxBytes: env.apiMaxJsonBytes },
    );
  }

  let raw: unknown;
  try {
    raw = JSON.parse(Buffer.from(bytes).toString("utf8"));
  } catch {
    throw new ApiError(400, "bad_request", "Malformed JSON request body.");
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    throw new ApiError(
      400,
      "validation_failed",
      "Please check the submitted fields.",
      parsed.error.flatten(),
    );
  }

  return parsed.data;
}

