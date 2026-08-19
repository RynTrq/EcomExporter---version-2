import "server-only";

import { randomUUID } from "node:crypto";
import {
  leadSubmissionSchema,
  normalizeEmail,
  normalizePhone,
  type LeadSubmission,
} from "@/server/contracts/leads";
import {
  createAuditEvent,
  createLeadSubmission,
  findRecentDuplicateLead,
} from "@/server/db/repositories";
import { ApiError } from "@/server/http/errors";
import type { RequestContext } from "@/server/http/context";

export { leadSubmissionSchema };

export type SubmittedLead = {
  id: string;
  status: "created" | "duplicate";
};

export async function submitLead(
  input: LeadSubmission,
  context: RequestContext,
): Promise<SubmittedLead> {
  if (input.website) {
    await createAuditEvent({
      actorType: "anonymous",
      action: "lead.honeypot_triggered",
      entityType: "lead",
      requestId: context.requestId,
      ipHash: context.ipHash,
      metadata: { source: input.source },
    });
    return { id: "accepted", status: "duplicate" };
  }

  if (!input.consentToContact) {
    throw new ApiError(
      400,
      "validation_failed",
      "Consent to contact is required for growth enquiries.",
    );
  }

  const emailNormalized = normalizeEmail(input.email);
  const phoneNormalized = normalizePhone(input.phone);
  const duplicateSince = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
  const duplicate = await findRecentDuplicateLead({
    emailNormalized,
    phoneNormalized,
    marketplace: input.marketplace,
    source: input.source,
    sinceIso: duplicateSince,
  });

  if (duplicate) {
    await createAuditEvent({
      actorType: "anonymous",
      action: "lead.duplicate_suppressed",
      entityType: "lead",
      entityId: duplicate.id,
      requestId: context.requestId,
      ipHash: context.ipHash,
      metadata: { marketplace: input.marketplace, source: input.source },
    });
    return { id: duplicate.id, status: "duplicate" };
  }

  const id = randomUUID();
  const leadScore = scoreLead(input);
  await createLeadSubmission({
    lead: {
      id,
      name: input.name,
      email_normalized: emailNormalized,
      email_display: input.email.trim(),
      phone_normalized: phoneNormalized,
      phone_display: input.phone.trim(),
      company: input.company || null,
      marketplace: input.marketplace,
      monthly_revenue: input.monthlyRevenue || null,
      message: input.message || null,
      source: input.source,
      status: "new",
      lead_score: leadScore,
      ip_hash: context.ipHash,
      user_agent: context.userAgent,
      request_id: context.requestId,
    },
    historyId: randomUUID(),
    audit: {
      actorType: "anonymous",
      action: "lead.created",
      entityType: "lead",
      entityId: id,
      requestId: context.requestId,
      ipHash: context.ipHash,
      metadata: {
        marketplace: input.marketplace,
        source: input.source,
        revenue: input.monthlyRevenue || null,
        leadScore,
      },
    },
  });

  return { id, status: "created" };
}

export function scoreLead(input: LeadSubmission) {
  let score = 10;
  if (input.company) score += 10;
  if (input.message && input.message.length > 80) score += 10;
  if (input.marketplace === "Multiple marketplaces") score += 15;
  if (input.monthlyRevenue === "₹25 lakh–₹1 crore") score += 20;
  if (input.monthlyRevenue === "₹1 crore+") score += 30;
  return Math.min(score, 100);
}
