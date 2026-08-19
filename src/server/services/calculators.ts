import "server-only";

import { randomUUID } from "node:crypto";
import {
  calculateEstimate,
  estimateSchema,
  type EstimateInput,
} from "@/lib/calculator";
import {
  createCalculatorScenarioWithAudit,
} from "@/server/db/repositories";
import type { RequestContext } from "@/server/http/context";

export { estimateSchema };

export async function estimateMarketplaceProfit(
  input: EstimateInput,
  context: RequestContext,
) {
  const result = calculateEstimate(input);
  const id = randomUUID();
  await createCalculatorScenarioWithAudit({
    id,
    platform: input.platform,
    estimateInput: input,
    estimateResult: result,
    ipHash: context.ipHash,
    userAgent: context.userAgent,
    requestId: context.requestId,
    auditMetadata: {
      platform: input.platform,
      category: input.category,
      currency: result.currency,
      margin: result.margin,
      health: result.health,
    },
  });
  return result;
}
