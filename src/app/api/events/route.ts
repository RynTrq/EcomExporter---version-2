import { createLegacyRoute } from "@/server/http/route";
import { parseJsonBody } from "@/server/http/json";
import { requireSameOrigin } from "@/server/security/origin";
import { enforceRateLimit } from "@/server/security/rate-limit";
import {
  eventSubmissionSchema,
  recordAnalyticsEvent,
} from "@/server/services/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createLegacyRoute(["POST"], async (request, context) => {
  requireSameOrigin(request);
  await enforceRateLimit(context, "event");

  const parsed = await parseJsonBody(request, eventSubmissionSchema);
  await recordAnalyticsEvent(parsed, context);

  return {
    status: 202,
    body: { ok: true, requestId: context.requestId },
  };
});
