import { describe, expect, it } from "vitest";
import { calculateEstimate, estimateSchema } from "@/lib/calculator";

describe("marketplace estimate engine", () => {
  it("calculates a stable Amazon India profitability estimate", () => {
    const input = estimateSchema.parse({
      platform: "amazon-india",
      sellingPrice: 1499,
      productCost: 520,
      shippingCost: 95,
      adCostPercent: 12,
      taxPercent: 18,
      weightGrams: 650,
      category: "general",
    });

    expect(calculateEstimate(input)).toMatchObject({
      currency: "INR",
      referralFee: 179.88,
      closingFee: 35,
      weightFee: 8.25,
      advertising: 179.88,
      totalFees: 263.29,
      profit: 440.83,
      margin: 29.41,
      health: "healthy",
    });
  });

  it("rejects non-positive selling prices before calculation", () => {
    const parsed = estimateSchema.safeParse({
      platform: "etsy",
      sellingPrice: 0,
      productCost: 4,
      shippingCost: 2,
      adCostPercent: 5,
      taxPercent: 0,
      weightGrams: 100,
      category: "home",
    });

    expect(parsed.success).toBe(false);
  });
});
