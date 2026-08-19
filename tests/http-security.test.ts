import { describe, expect, it } from "vitest";
import { z } from "zod";
import { getOpenApiDocument } from "@/server/contracts/openapi";
import { ApiError } from "@/server/http/errors";
import { createRequestContext } from "@/server/http/context";
import { parseJsonBody } from "@/server/http/json";
import { requireSameOrigin } from "@/server/security/origin";
import { authenticateAdmin } from "@/server/services/admin";

describe("json body parser", () => {
  it("rejects non-json requests before validation", async () => {
    await expect(
      parseJsonBody(
        new Request("http://localhost/api/test", {
          method: "POST",
          headers: { "content-type": "text/plain" },
          body: "hello",
        }),
        z.object({ ok: z.boolean() }),
      ),
    ).rejects.toMatchObject({
      status: 400,
      code: "bad_request",
    });
  });

  it("returns flattened validation errors for invalid json payloads", async () => {
    await expect(
      parseJsonBody(
        new Request("http://localhost/api/test", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ok: "not-a-boolean" }),
        }),
        z.object({ ok: z.boolean() }),
      ),
    ).rejects.toMatchObject({
      status: 400,
      code: "validation_failed",
    });
  });
});

describe("same-origin gate", () => {
  it("rejects cross-origin write attempts", () => {
    expect(() =>
      requireSameOrigin(
        new Request("http://localhost:3000/api/events", {
          headers: {
            host: "localhost:3000",
            origin: "https://attacker.example",
          },
        }),
      ),
    ).toThrow(ApiError);
  });

  it("allows requests without an Origin header", () => {
    expect(() =>
      requireSameOrigin(new Request("http://localhost:3000/api/events")),
    ).not.toThrow();
  });
});

describe("admin authentication", () => {
  it("accepts configured Basic credentials", () => {
    const credentials = Buffer.from("admin:test-admin-key-12345").toString(
      "base64",
    );
    const request = new Request("http://localhost/api/admin/leads", {
      headers: { authorization: `Basic ${credentials}` },
    });

    expect(authenticateAdmin(request, createRequestContext(request))).toEqual({
      username: "admin",
    });
  });

  it("rejects bad Basic credentials", () => {
    const credentials = Buffer.from("admin:wrong-password").toString("base64");
    const request = new Request("http://localhost/api/admin/leads", {
      headers: { authorization: `Basic ${credentials}` },
    });

    expect(() => authenticateAdmin(request, createRequestContext(request))).toThrow(
      ApiError,
    );
  });
});

describe("openapi contract", () => {
  it("publishes the public backend routes", () => {
    const document = getOpenApiDocument();

    expect(document.openapi).toBe("3.1.0");
    expect(Object.keys(document.paths)).toEqual([
      "/api/leads",
      "/api/events",
      "/api/calculators/estimate",
    ]);
  });
});
