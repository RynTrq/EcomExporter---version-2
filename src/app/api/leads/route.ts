import { after } from "next/server";
import { createLegacyRoute } from "@/server/http/route";
import { parseJsonBody } from "@/server/http/json";
import { leadSubmissionSchema, scoreLead, submitLead } from "@/server/services/leads";
import { dispatchLeadNotifications } from "@/server/services/notifications";
import { runIdempotent } from "@/server/security/idempotency";
import { requireSameOrigin } from "@/server/security/origin";
import { enforceRateLimit } from "@/server/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createLegacyRoute(["POST"], async (request, context) => {
  requireSameOrigin(request);
  await enforceRateLimit(context, "lead");

  const parsed = await parseJsonBody(request, leadSubmissionSchema);
  const result = await runIdempotent({
    request,
    context,
    parsedBody: parsed,
    execute: async () => {
      const submitted = await submitLead(parsed, context);
      if (submitted.status === "created") {
        after(() =>
          dispatchLeadNotifications({
            lead: parsed,
            id: submitted.id,
            leadScore: scoreLead(parsed),
            requestId: context.requestId,
          }),
        );
      }
      return {
        status: submitted.status === "created" ? 201 : 202,
        body: {
          ok: true,
          status: submitted.status,
          requestId: context.requestId,
        },
      };
    },
  });

  return { status: result.status, body: result.body };
});
