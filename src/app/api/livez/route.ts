import { getLiveStatus } from "@/server/services/health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getLiveStatus(), {
    status: 200,
    headers: {
      "cache-control": "no-store",
    },
  });
}
