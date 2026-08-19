import { z } from "zod";

export const estimateSchema = z.object({
  platform: z.enum([
    "amazon-india",
    "amazon-us",
    "walmart",
    "etsy",
    "ebay",
    "flipkart",
    "meesho",
  ]),
  sellingPrice: z.coerce.number().positive().max(10_000_000),
  productCost: z.coerce.number().nonnegative().max(10_000_000),
  shippingCost: z.coerce.number().nonnegative().max(1_000_000),
  adCostPercent: z.coerce.number().min(0).max(100),
  taxPercent: z.coerce.number().min(0).max(100),
  weightGrams: z.coerce.number().nonnegative().max(1_000_000),
  category: z.enum(["general", "fashion", "beauty", "electronics", "home"]),
});

export type EstimateInput = z.infer<typeof estimateSchema>;

const profiles: Record<
  EstimateInput["platform"],
  {
    referral: Record<EstimateInput["category"], number>;
    closing: number;
    weightRate: number;
    payment: number;
    currency: "INR" | "USD";
  }
> = {
  "amazon-india": {
    referral: { general: 0.12, fashion: 0.17, beauty: 0.08, electronics: 0.06, home: 0.13 },
    closing: 35,
    weightRate: 0.055,
    payment: 0,
    currency: "INR",
  },
  "amazon-us": {
    referral: { general: 0.15, fashion: 0.17, beauty: 0.15, electronics: 0.08, home: 0.15 },
    closing: 0.99,
    weightRate: 0.0032,
    payment: 0,
    currency: "USD",
  },
  walmart: {
    referral: { general: 0.15, fashion: 0.15, beauty: 0.15, electronics: 0.08, home: 0.15 },
    closing: 0,
    weightRate: 0.0027,
    payment: 0,
    currency: "USD",
  },
  etsy: {
    referral: { general: 0.065, fashion: 0.065, beauty: 0.065, electronics: 0.065, home: 0.065 },
    closing: 0.2,
    weightRate: 0,
    payment: 0.03,
    currency: "USD",
  },
  ebay: {
    referral: { general: 0.1325, fashion: 0.15, beauty: 0.1325, electronics: 0.09, home: 0.1325 },
    closing: 0.3,
    weightRate: 0,
    payment: 0,
    currency: "USD",
  },
  flipkart: {
    referral: { general: 0.13, fashion: 0.18, beauty: 0.12, electronics: 0.07, home: 0.14 },
    closing: 30,
    weightRate: 0.05,
    payment: 0.02,
    currency: "INR",
  },
  meesho: {
    referral: { general: 0, fashion: 0, beauty: 0, electronics: 0, home: 0 },
    closing: 0,
    weightRate: 0.065,
    payment: 0,
    currency: "INR",
  },
};

export function calculateEstimate(input: EstimateInput) {
  const profile = profiles[input.platform];
  const referralFee = input.sellingPrice * profile.referral[input.category];
  const paymentFee = input.sellingPrice * profile.payment;
  const advertising = input.sellingPrice * (input.adCostPercent / 100);
  const weightFee = Math.max(0, input.weightGrams - 500) * profile.weightRate;
  const marketplaceFees = referralFee + profile.closing + paymentFee + weightFee;
  const taxOnFees = marketplaceFees * (input.taxPercent / 100);
  const totalCosts =
    input.productCost +
    input.shippingCost +
    marketplaceFees +
    taxOnFees +
    advertising;
  const profit = input.sellingPrice - totalCosts;
  const margin = (profit / input.sellingPrice) * 100;

  return {
    currency: profile.currency,
    referralFee: round(referralFee),
    closingFee: round(profile.closing),
    paymentFee: round(paymentFee),
    weightFee: round(weightFee),
    advertising: round(advertising),
    taxOnFees: round(taxOnFees),
    totalFees: round(marketplaceFees + taxOnFees),
    totalCosts: round(totalCosts),
    profit: round(profit),
    margin: round(margin),
    health: margin >= 20 ? "healthy" : margin >= 8 ? "watch" : "at-risk",
    note:
      "This is a planning estimate based on representative fee rules. Marketplace rules vary by category, fulfillment method, region, and effective date.",
  };
}

function round(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
