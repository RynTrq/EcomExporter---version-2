import { createLegacyRoute } from "@/server/http/route";
import { authenticateAdmin, listAdminLeads } from "@/server/services/admin";
import { enforceRateLimit } from "@/server/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = createLegacyRoute(["GET"], (request, context) => {
  enforceRateLimit(context, "admin");
  const actor = authenticateAdmin(request, context);
  const leads = listAdminLeads(context, actor.username);

  return {
    status: 200,
    body: { ok: true, leads, requestId: context.requestId },
  };
});
