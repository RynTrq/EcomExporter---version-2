import { createLegacyRoute } from "@/server/http/route";
import { getReadyStatus } from "@/server/services/health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = createLegacyRoute(["GET"], async () => {
  const status = await getReadyStatus();
  return {
    status: status.status === "ok" ? 200 : 503,
    body: status,
  };
});
