import "server-only";

import { randomUUID } from "node:crypto";
import {
  eventSubmissionSchema,
  type EventSubmission,
} from "@/server/contracts/events";
import {
  createAuditEvent,
  createEventRecord,
  runWriteTransaction,
} from "@/server/db/repositories";
import type { RequestContext } from "@/server/http/context";

export { eventSubmissionSchema };

export async function recordAnalyticsEvent(
  input: EventSubmission,
  context: RequestContext,
) {
  const id = randomUUID();
  runWriteTransaction(() => {
    createEventRecord({
      id,
      name: input.name,
      path: input.path,
      sessionId: input.sessionId,
      metadata: input.metadata,
      ipHash: context.ipHash,
      userAgent: context.userAgent,
      requestId: context.requestId,
    });
    createAuditEvent({
      actorType: "anonymous",
      action: "event.accepted",
      entityType: "event",
      entityId: id,
      requestId: context.requestId,
      ipHash: context.ipHash,
      metadata: { name: input.name, path: input.path },
    });
  });
  return { id };
}
