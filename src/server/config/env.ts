import "server-only";

import path from "node:path";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().default("https://ecomexporter.com"),
  DATABASE_PATH: z.string().min(1).default("./data/ecomexporter.db"),
  ADMIN_USER: z.string().min(1).default("admin"),
  ADMIN_KEY: z.string().min(12).optional(),
  IP_HASH_SALT: z.string().min(16).default("local-development-ip-hash-salt"),
  API_MAX_JSON_BYTES: z.coerce.number().int().positive().default(32_768),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_LEADS: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_EVENTS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_CALCULATORS: z.coerce.number().int().positive().default(30),

  // Lead notifications — where new enquiries are delivered.
  LEAD_NOTIFY_PHONE: z.string().trim().min(8).default("+918447077283"),
  LEAD_NOTIFY_EMAIL: z.string().trim().email().default("info@ecomexporter.com"),
  // Twilio (SMS + WhatsApp). All optional; channels are skipped if unset.
  TWILIO_ACCOUNT_SID: z.string().trim().min(1).optional(),
  TWILIO_AUTH_TOKEN: z.string().trim().min(1).optional(),
  TWILIO_SMS_FROM: z.string().trim().min(1).optional(),
  TWILIO_WHATSAPP_FROM: z.string().trim().min(1).optional(),
  // Resend (email). Optional; skipped if unset.
  RESEND_API_KEY: z.string().trim().min(1).optional(),
  RESEND_FROM: z.string().trim().min(1).default("Ecom Exporter <onboarding@resend.dev>"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid server environment: ${details}`);
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  siteUrl: parsed.data.NEXT_PUBLIC_SITE_URL,
  databasePath: path.resolve(
    /* turbopackIgnore: true */ process.cwd(),
    parsed.data.DATABASE_PATH,
  ),
  adminUser: parsed.data.ADMIN_USER,
  adminKey: parsed.data.ADMIN_KEY,
  ipHashSalt: parsed.data.IP_HASH_SALT,
  apiMaxJsonBytes: parsed.data.API_MAX_JSON_BYTES,
  rateLimitWindowMs: parsed.data.RATE_LIMIT_WINDOW_MS,
  rateLimitLeads: parsed.data.RATE_LIMIT_LEADS,
  rateLimitEvents: parsed.data.RATE_LIMIT_EVENTS,
  rateLimitCalculators: parsed.data.RATE_LIMIT_CALCULATORS,
  isProduction: parsed.data.NODE_ENV === "production",
  leadNotifyPhone: parsed.data.LEAD_NOTIFY_PHONE,
  leadNotifyEmail: parsed.data.LEAD_NOTIFY_EMAIL,
  twilioAccountSid: parsed.data.TWILIO_ACCOUNT_SID,
  twilioAuthToken: parsed.data.TWILIO_AUTH_TOKEN,
  twilioSmsFrom: parsed.data.TWILIO_SMS_FROM,
  twilioWhatsappFrom: parsed.data.TWILIO_WHATSAPP_FROM,
  resendApiKey: parsed.data.RESEND_API_KEY,
  resendFrom: parsed.data.RESEND_FROM,
};
