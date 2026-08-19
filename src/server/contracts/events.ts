import { z } from "zod";

export const eventNameSchema = z.enum([
  "calculator_opened",
  "calculator_completed",
  "lead_form_viewed",
  "lead_form_submitted",
  "service_viewed",
  "solution_viewed",
  "cta_clicked",
]);

const scalar = z.union([
  z.string().trim().max(160),
  z.number().finite(),
  z.boolean(),
  z.null(),
]);

const blockedKey = /(email|phone|token|secret|password|cookie|authorization)/i;

export const eventMetadataSchema = z
  .record(z.string().min(1).max(40), scalar)
  .default({})
  .superRefine((value, ctx) => {
    const entries = Object.entries(value);
    if (entries.length > 20) {
      ctx.addIssue({
        code: "custom",
        message: "Metadata can contain at most 20 keys.",
      });
    }
    for (const [key] of entries) {
      if (blockedKey.test(key)) {
        ctx.addIssue({
          code: "custom",
          message: `Metadata key '${key}' may contain sensitive data.`,
        });
      }
    }
  });

export const eventSubmissionSchema = z.object({
  name: eventNameSchema,
  path: z.string().trim().min(1).max(500).startsWith("/"),
  sessionId: z.string().trim().max(100).optional(),
  metadata: eventMetadataSchema,
});

export type EventSubmission = z.infer<typeof eventSubmissionSchema>;

