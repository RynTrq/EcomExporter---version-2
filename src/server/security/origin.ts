import "server-only";

import { env } from "@/server/config/env";
import { ApiError } from "@/server/http/errors";

export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const expected = new URL(env.siteUrl);

  if (!origin) return;

  let actual: URL;
  try {
    actual = new URL(origin);
  } catch {
    throw new ApiError(403, "forbidden", "Cross-origin requests are not allowed.");
  }

  const hostAllowed =
    actual.host === expected.host ||
    (!env.isProduction && host && actual.host === host);

  if (!hostAllowed) {
    throw new ApiError(403, "forbidden", "Cross-origin requests are not allowed.");
  }
}
