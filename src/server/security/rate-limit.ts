import "server-only";

import { env } from "@/server/config/env";
import { checkRateLimit } from "@/server/db/repositories";
import { ApiError } from "@/server/http/errors";
import type { RequestContext } from "@/server/http/context";

export type RateLimitPolicy = "lead" | "event" | "calculator" | "admin";

const policyLimits: Record<RateLimitPolicy, number> = {
  lead: env.rateLimitLeads,
  event: env.rateLimitEvents,
  calculator: env.rateLimitCalculators,
  admin: 5,
};

export async function enforceRateLimit(
  context: RequestContext,
  policy: RateLimitPolicy,
) {
  const result = await checkRateLimit({
    bucket: `${policy}:${context.ipHash}`,
    route: context.path,
    limit: policyLimits[policy],
    windowMs: env.rateLimitWindowMs,
  });

  if (!result.allowed) {
    throw new ApiError(
      429,
      "rate_limited",
      "Too many requests. Please wait a moment and try again.",
      { resetAt: result.resetAt },
    );
  }

  return result;
}
