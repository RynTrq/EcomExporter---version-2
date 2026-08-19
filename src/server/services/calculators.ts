import "server-only";

import { randomUUID } from "node:crypto";
import {
  calculateEstimate,
  estimateSchema,
  type EstimateInput,
} from "@/lib/calculator";
import {
  createAuditEvent,
  createCalculatorScenario,
  runWriteTransaction,
} from "@/server/db/repositories";
import type { RequestContext } from "@/server/http/context";

export { estimateSchema };

export function estimateMarketplaceProfit(
  input: EstimateInput,
  context: RequestContext,
) {
  const result = calculateEstimate(input);
  const id = randomUUID();
  runWriteTransaction(() => {
    createCalculatorScenario({
      id,
      platform: input.platform,
      estimateInput: input,
      estimateResult: result,
      ipHash: context.ipHash,
      userAgent: context.userAgent,
      requestId: context.requestId,
    });
    createAuditEvent({
      actorType: "anonymous",
      action: "calculator.estimated",
      entityType: "calculator_scenario",
      entityId: id,
      requestId: context.requestId,
      ipHash: context.ipHash,
      metadata: {
        platform: input.platform,
        category: input.category,
        currency: result.currency,
        margin: result.margin,
        health: result.health,
      },
    });
  });
  return result;
}
