import { describe, expect, it } from "vitest";
import {
  buildTwilioMessageParams,
  buildWhatsAppTemplateVariables,
} from "@/server/services/notifications";

const notification = {
  id: "lead-1",
  leadScore: 55,
  lead: {
    name: "Test Seller",
    email: "seller@example.com",
    phone: "+91 90000 00000",
    company: "",
    marketplace: "Amazon India" as const,
    monthlyRevenue: "" as const,
    message: `A message with   extra whitespace ${"x".repeat(300)}`,
    source: "website",
    website: "",
    privacyVersion: "2026-06-10",
    consentToContact: true,
  },
};

describe("Twilio notification payloads", () => {
  it("uses ContentSid and variables without a free-form body for templates", () => {
    const params = buildTwilioMessageParams(
      "whatsapp:+918929519035",
      "whatsapp:+14155238886",
      {
        contentSid: "HX12345678901234567890123456789012",
        contentVariables: { "1": "Test Seller" },
      },
    );

    expect(params.get("ContentSid")).toBe(
      "HX12345678901234567890123456789012",
    );
    expect(params.get("ContentVariables")).toBe(
      JSON.stringify({ "1": "Test Seller" }),
    );
    expect(params.has("Body")).toBe(false);
  });

  it("keeps the free-form body for SMS and Sandbox sessions", () => {
    const params = buildTwilioMessageParams("+918929519035", "+15005550006", {
      body: "New lead",
    });

    expect(params.get("Body")).toBe("New lead");
    expect(params.has("ContentSid")).toBe(false);
  });

  it("builds bounded, complete WhatsApp template variables", () => {
    const variables = buildWhatsAppTemplateVariables(notification);

    expect(variables).toMatchObject({
      "1": "Test Seller",
      "2": "seller@example.com",
      "3": "+91 90000 00000",
      "4": "Not provided",
      "5": "Amazon India",
      "6": "Prefer not to say",
      "8": "55",
      "9": "website",
    });
    expect(variables["7"].length).toBeLessThanOrEqual(240);
    expect(variables["7"]).not.toContain("  ");
  });
});
