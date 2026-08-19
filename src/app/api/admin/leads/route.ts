import { createLegacyRoute } from "@/server/http/route";
import { authenticateAdmin, listAdminLeads } from "@/server/services/admin";
import { enforceRateLimit } from "@/server/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = createLegacyRoute(["GET"], async (request, context) => {
  await enforceRateLimit(context, "admin");
  const actor = await authenticateAdmin(request, context);
  const leads = await listAdminLeads(context, actor.username);

  return {
    status: 200,
    body: { ok: true, leads, requestId: context.requestId },
  };
});
