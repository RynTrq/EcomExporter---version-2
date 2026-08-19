import { describe, expect, it } from "vitest";
import {
  leadSubmissionSchema,
  normalizeEmail,
  normalizePhone,
} from "@/server/contracts/leads";
import { eventSubmissionSchema } from "@/server/contracts/events";

describe("lead contract", () => {
  it("normalizes contact identities without mutating display values", () => {
    const parsed = leadSubmissionSchema.parse({
      name: "Priya Seller",
      email: "Priya@Example.COM",
      phone: "+91 98765-43210",
      marketplace: "Amazon India",
      monthlyRevenue: "₹25 lakh–₹1 crore",
      source: "calculator:amazon-india",
      consentToContact: true,
    });

    expect(normalizeEmail(parsed.email)).toBe("priya@example.com");
    expect(normalizePhone(parsed.phone)).toBe("919876543210");
    expect(parsed.consentToContact).toBe(true);
    expect(parsed.privacyVersion).toBe("2026-06-10");
  });

  it("rejects unknown marketplaces", () => {
    const parsed = leadSubmissionSchema.safeParse({
      name: "Priya Seller",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      marketplace: "Unknown Market",
      consentToContact: true,
    });

    expect(parsed.success).toBe(false);
  });

  it("does not silently accept missing consent", () => {
    const parsed = leadSubmissionSchema.parse({
      name: "Priya Seller",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      marketplace: "Amazon India",
    });

    expect(parsed.consentToContact).toBe(false);
  });
});

describe("analytics event contract", () => {
  it("accepts bounded first-party event metadata", () => {
    const parsed = eventSubmissionSchema.parse({
      name: "cta_clicked",
      path: "/services/smart-product-cataloging",
      sessionId: "session-123",
      metadata: {
        placement: "hero",
        rank: 1,
        experiment: "founder-led",
      },
    });

    expect(parsed.metadata).toEqual({
      placement: "hero",
      rank: 1,
      experiment: "founder-led",
    });
  });

  it("rejects sensitive metadata keys", () => {
    const parsed = eventSubmissionSchema.safeParse({
      name: "cta_clicked",
      path: "/",
      metadata: {
        email: "buyer@example.com",
      },
    });

    expect(parsed.success).toBe(false);
  });
});
