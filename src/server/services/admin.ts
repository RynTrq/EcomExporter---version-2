import "server-only";

import { env } from "@/server/config/env";
import { createAuditEvent, listLeadRecords } from "@/server/db/repositories";
import { ApiError } from "@/server/http/errors";
import type { RequestContext } from "@/server/http/context";
import { safeEqual } from "@/server/security/crypto";

export async function authenticateAdmin(request: Request, context: RequestContext) {
  const authorization = request.headers.get("authorization");
  const encodedCredentials = authorization?.startsWith("Basic ")
    ? authorization.slice(6)
    : "";
  const decodedCredentials = encodedCredentials
    ? Buffer.from(encodedCredentials, "base64").toString("utf8")
    : "";
  const separator = decodedCredentials.indexOf(":");
  const username = separator >= 0 ? decodedCredentials.slice(0, separator) : "";
  const password = separator >= 0 ? decodedCredentials.slice(separator + 1) : "";

  if (
    !env.adminKey ||
    !safeEqual(username, env.adminUser) ||
    !safeEqual(password, env.adminKey)
  ) {
    await createAuditEvent({
      actorType: "anonymous",
      action: "admin.auth_failed",
      entityType: "admin",
      requestId: context.requestId,
      ipHash: context.ipHash,
    });
    throw new ApiError(401, "unauthorized", "Admin authentication required.");
  }

  await createAuditEvent({
    actorType: "admin",
    actorId: username,
    action: "admin.authenticated",
    entityType: "admin",
    requestId: context.requestId,
    ipHash: context.ipHash,
  });
  return { username };
}

export async function listAdminLeads(context: RequestContext, actorId: string) {
  const leads = (await listLeadRecords(250)).map((lead) => ({
    id: lead.id,
    name: lead.name,
    email: lead.email_display,
    phone: lead.phone_display,
    company: lead.company,
    marketplace: lead.marketplace,
    monthlyRevenue: lead.monthly_revenue,
    source: lead.source,
    status: lead.status,
    leadScore: lead.lead_score,
    createdAt: lead.created_at,
  }));
  await createAuditEvent({
    actorType: "admin",
    actorId,
    action: "lead.listed",
    entityType: "lead",
    requestId: context.requestId,
    ipHash: context.ipHash,
    metadata: { count: leads.length },
  });
  return leads;
}
