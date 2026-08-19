import { z } from "zod";

export const marketplaceSchema = z.enum([
  "Amazon India",
  "Amazon Global",
  "Flipkart",
  "Meesho",
  "Walmart",
  "Etsy / eBay",
  "Shopify / D2C",
  "Multiple marketplaces",
]);

export const monthlyRevenueSchema = z.enum([
  "",
  "Pre-launch",
  "Under ₹5 lakh",
  "₹5–25 lakh",
  "₹25 lakh–₹1 crore",
  "₹1 crore+",
]);

export const leadSourceSchema = z
  .string()
  .trim()
  .max(100)
  .regex(/^[a-zA-Z0-9:_-]+$/)
  .default("website");

export const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().trim().max(200),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(24)
    .regex(/^[+()\d\s-]+$/, "Enter a valid phone number."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  marketplace: marketplaceSchema,
  monthlyRevenue: monthlyRevenueSchema.default(""),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: leadSourceSchema,
  website: z.string().max(0).optional(),
  privacyVersion: z.string().trim().max(40).default("2026-06-10"),
  consentToContact: z.preprocess((value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  }, z.boolean().default(false)),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "").replace(/^\+91/, "91");
}
