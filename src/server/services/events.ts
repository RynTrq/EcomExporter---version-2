import "server-only";

import { randomUUID } from "node:crypto";
import {
  eventSubmissionSchema,
  type EventSubmission,
} from "@/server/contracts/events";
import {
  createEventWithAudit,
} from "@/server/db/repositories";
import type { RequestContext } from "@/server/http/context";

export { eventSubmissionSchema };

export async function recordAnalyticsEvent(
  input: EventSubmission,
  context: RequestContext,
) {
  const id = randomUUID();
  await createEventWithAudit({
    id,
    name: input.name,
    path: input.path,
    sessionId: input.sessionId,
    metadata: input.metadata,
    ipHash: context.ipHash,
    userAgent: context.userAgent,
    requestId: context.requestId,
  });
  return { id };
}
