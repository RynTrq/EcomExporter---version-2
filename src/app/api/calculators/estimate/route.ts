import { createLegacyRoute } from "@/server/http/route";
import { parseJsonBody } from "@/server/http/json";
import {
  estimateMarketplaceProfit,
  estimateSchema,
} from "@/server/services/calculators";
import { requireSameOrigin } from "@/server/security/origin";
import { enforceRateLimit } from "@/server/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createLegacyRoute(["POST"], async (request, context) => {
  requireSameOrigin(request);
  enforceRateLimit(context, "calculator");

  const parsed = await parseJsonBody(request, estimateSchema);
  const estimate = estimateMarketplaceProfit(parsed, context);

  return { status: 200, body: estimate };
});
