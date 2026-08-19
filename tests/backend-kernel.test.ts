import { describe, expect, it } from "vitest";
import { leadSubmissionSchema } from "@/server/contracts/leads";
import { createRequestContext } from "@/server/http/context";
import { createLegacyRoute } from "@/server/http/route";
import { submitLead } from "@/server/services/leads";

describe("request context", () => {
  it("sanitizes hostile request IDs and oversized network headers", () => {
    const context = createRequestContext(
      new Request("http://localhost/api/leads", {
        method: "POST",
        headers: {
          "x-request-id": "bad request",
          "x-forwarded-for": "x".repeat(200),
          "user-agent": "Vitest",
        },
      }),
    );

    expect(context.requestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
    expect(context.ip).toBe("local");
    expect(context.userAgent).toBe("Vitest");
  });
});

describe("legacy route adapter", () => {
  it("records successful responses and preserves legacy response bodies", async () => {
    const route = createLegacyRoute(["POST"], () => ({
      status: 201,
      body: { ok: true },
    }));

    const response = await route(
      new Request("http://localhost/api/test-kernel", {
        method: "POST",
      }),
    );

    expect(response.status).toBe(201);
    expect(response.headers.get("x-request-id")).toBeTruthy();
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("returns a structured legacy error for disallowed methods", async () => {
    const route = createLegacyRoute(["POST"], () => ({
      status: 201,
      body: { ok: true },
    }));

    const response = await route(
      new Request("http://localhost/api/test-kernel", {
        method: "GET",
      }),
    );

    expect(response.status).toBe(405);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      code: "method_not_allowed",
    });
  });
});

describe("lead workflow", () => {
  it("creates a lead and suppresses a natural duplicate", async () => {
    const unique = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const input = leadSubmissionSchema.parse({
      name: "Priya Seller",
      email: `priya-${unique}@example.com`,
      phone: "+91 98765 43210",
      company: "Priya Commerce",
      marketplace: "Amazon India",
      monthlyRevenue: "Pre-launch",
      message: "Need a marketplace launch plan with catalog and ad support.",
      source: "vitest",
      consentToContact: true,
    });

    const first = await submitLead(
      input,
      createRequestContext(
        new Request("http://localhost/api/leads", { method: "POST" }),
      ),
    );
    const second = await submitLead(
      input,
      createRequestContext(
        new Request("http://localhost/api/leads", { method: "POST" }),
      ),
    );

    expect(first.status).toBe("created");
    expect(second).toEqual({ id: first.id, status: "duplicate" });
  });
});
