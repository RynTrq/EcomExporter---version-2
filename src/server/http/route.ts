import "server-only";

import { createRequestContext } from "@/server/http/context";
import { ApiError } from "@/server/http/errors";
import { recordApiRequest } from "@/server/db/repositories";
import { logger } from "@/server/observability/logger";

export function createLegacyRoute(
  allowedMethods: string[],
  handler: (
    request: Request,
    context: ReturnType<typeof createRequestContext>,
  ) => Promise<{ status: number; body: unknown }> | { status: number; body: unknown },
) {
  return async function route(request: Request) {
    const context = createRequestContext(request);
    const headers = new Headers({
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-request-id": context.requestId,
    });

    try {
      if (!allowedMethods.includes(request.method)) {
        throw new ApiError(
          405,
          "method_not_allowed",
          `${request.method} is not allowed for this endpoint.`,
        );
      }

      const result = await handler(request, context);
      try {
        await recordApiRequest({
          requestId: context.requestId,
          method: context.method,
          path: context.path,
          status: result.status,
          durationMs: Date.now() - context.startedAt,
          ipHash: context.ipHash,
          userAgent: context.userAgent,
        });
      } catch (recordError) {
        logger.warn("Unable to record API request.", {
          requestId: context.requestId,
          route: context.path,
          metadata: {
            error:
              recordError instanceof Error ? recordError.message : "unknown_error",
          },
        });
      }
      return Response.json(result.body, {
        status: result.status,
        headers,
      });
    } catch (error) {
      const apiError =
        error instanceof ApiError
          ? error
          : new ApiError(500, "internal_error", "Something went wrong.");
      logger[apiError.status >= 500 ? "error" : "warn"](apiError.message, {
        requestId: context.requestId,
        route: context.path,
        status: apiError.status,
        durationMs: Date.now() - context.startedAt,
        errorCode: apiError.code,
      });
      try {
        await recordApiRequest({
          requestId: context.requestId,
          method: context.method,
          path: context.path,
          status: apiError.status,
          durationMs: Date.now() - context.startedAt,
          ipHash: context.ipHash,
          userAgent: context.userAgent,
          errorCode: apiError.code,
        });
      } catch (recordError) {
        logger.warn("Unable to record failed API request.", {
          requestId: context.requestId,
          route: context.path,
          metadata: {
            error:
              recordError instanceof Error ? recordError.message : "unknown_error",
          },
        });
      }
      return Response.json(
        {
          ok: false,
          error: apiError.message,
          code: apiError.code,
          requestId: context.requestId,
        },
        { status: apiError.status, headers },
      );
    }
  };
}
