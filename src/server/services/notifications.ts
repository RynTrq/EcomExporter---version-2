import "server-only";

import { env } from "@/server/config/env";
import { logger } from "@/server/observability/logger";
import type { LeadSubmission } from "@/server/contracts/leads";

export type LeadNotificationInput = {
  lead: LeadSubmission;
  id: string;
  leadScore: number;
  requestId?: string;
};

const CHANNEL_TIMEOUT_MS = 8000;
const TEMPLATE_VALUE_MAX_LENGTH = 240;

type TwilioMessageContent =
  | { body: string }
  | { contentSid: string; contentVariables: Record<string, string> };

function toTemplateValue(value: string | undefined, fallback = "Not provided") {
  const compact = value?.replace(/\s+/g, " ").trim() || fallback;
  if (compact.length <= TEMPLATE_VALUE_MAX_LENGTH) return compact;
  return `${compact.slice(0, TEMPLATE_VALUE_MAX_LENGTH - 1).trimEnd()}…`;
}

export function buildWhatsAppTemplateVariables({
  lead,
  leadScore,
}: LeadNotificationInput) {
  return {
    "1": toTemplateValue(lead.name),
    "2": toTemplateValue(lead.email),
    "3": toTemplateValue(lead.phone),
    "4": toTemplateValue(lead.company),
    "5": toTemplateValue(lead.marketplace),
    "6": toTemplateValue(lead.monthlyRevenue, "Prefer not to say"),
    "7": toTemplateValue(lead.message),
    "8": String(leadScore),
    "9": toTemplateValue(lead.source),
  };
}

export function buildTwilioMessageParams(
  to: string,
  from: string,
  content: TwilioMessageContent,
) {
  const params = new URLSearchParams({ To: to, From: from });
  if ("contentSid" in content) {
    params.set("ContentSid", content.contentSid);
    params.set("ContentVariables", JSON.stringify(content.contentVariables));
  } else {
    params.set("Body", content.body);
  }
  return params;
}

/**
 * Render a new lead into a human-readable plain-text brief shared across
 * WhatsApp, SMS, and email so whoever reads it has the full picture.
 */
export function formatLeadMessage({ lead, leadScore }: LeadNotificationInput) {
  const lines = [
    "New growth enquiry — Ecom Exporter",
    "",
    `Name:        ${lead.name}`,
    `Email:       ${lead.email}`,
    `Phone:       ${lead.phone}`,
  ];

  if (lead.company) lines.push(`Company:     ${lead.company}`);
  lines.push(`Marketplace: ${lead.marketplace}`);
  if (lead.monthlyRevenue) lines.push(`Revenue:     ${lead.monthlyRevenue}`);
  if (lead.message) {
    lines.push("", "Message:", lead.message);
  }
  lines.push(
    "",
    `Source: ${lead.source}`,
    `Lead score: ${leadScore}/100`,
    `Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  );

  return lines.join("\n");
}

async function sendTwilioMessage(
  to: string,
  from: string,
  content: TwilioMessageContent,
  channel: "sms" | "whatsapp",
) {
  const sid = env.twilioAccountSid;
  const token = env.twilioAuthToken;
  if (!sid || !token) return false;

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const params = buildTwilioMessageParams(to, from, content);

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      signal: AbortSignal.timeout(CHANNEL_TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Twilio ${channel} ${response.status}: ${detail.slice(0, 200)}`);
  }
  return true;
}

async function sendSms(body: string) {
  if (!env.twilioSmsFrom) return false;
  return sendTwilioMessage(
    env.leadNotifyPhone,
    env.twilioSmsFrom,
    { body },
    "sms",
  );
}

async function sendWhatsApp(body: string, input: LeadNotificationInput) {
  if (!env.twilioWhatsappFrom) return false;
  const to = `whatsapp:${env.leadNotifyPhone}`;
  const from = env.twilioWhatsappFrom.startsWith("whatsapp:")
    ? env.twilioWhatsappFrom
    : `whatsapp:${env.twilioWhatsappFrom}`;
  const content: TwilioMessageContent = env.twilioWhatsappContentSid
    ? {
        contentSid: env.twilioWhatsappContentSid,
        contentVariables: buildWhatsAppTemplateVariables(input),
      }
    : { body };
  return sendTwilioMessage(to, from, content, "whatsapp");
}

async function sendEmail(subject: string, body: string) {
  if (!env.resendApiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.resendFrom,
      to: [env.leadNotifyEmail],
      subject,
      text: body,
    }),
    signal: AbortSignal.timeout(CHANNEL_TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 200)}`);
  }
  return true;
}

/**
 * Fan out a new lead to WhatsApp, SMS, and email. Each channel is independent
 * and best-effort: a failure or missing configuration on one never blocks the
 * others or the lead itself (it is already persisted before this runs).
 */
export async function dispatchLeadNotifications(input: LeadNotificationInput) {
  const body = formatLeadMessage(input);
  const subject = `New lead: ${input.lead.name} — ${input.lead.marketplace}`;

  const channels: Array<[string, Promise<boolean>]> = [
    ["whatsapp", sendWhatsApp(body, input)],
    ["sms", sendSms(body)],
    ["email", sendEmail(subject, body)],
  ];

  const results = await Promise.allSettled(channels.map(([, promise]) => promise));

  results.forEach((result, index) => {
    const [channel] = channels[index];
    if (result.status === "rejected") {
      logger.error("lead.notification_failed", {
        requestId: input.requestId,
        metadata: { channel, leadId: input.id, error: String(result.reason) },
      });
    } else if (result.value) {
      logger.info("lead.notification_sent", {
        requestId: input.requestId,
        metadata: { channel, leadId: input.id },
      });
    }
  });
}
