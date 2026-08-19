import { getOpenApiDocument } from "@/server/contracts/openapi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getOpenApiDocument(), {
    status: 200,
    headers: {
      "cache-control": "no-store",
    },
  });
}
