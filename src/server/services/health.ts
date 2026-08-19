import "server-only";

import { env } from "@/server/config/env";
import { getDatabaseHealth } from "@/server/db/repositories";

export function getLiveStatus() {
  return {
    status: "ok",
    service: "ecomexporter-web",
    version: process.env.npm_package_version || "0.1.0",
    uptimeSeconds: Math.round(process.uptime()),
    time: new Date().toISOString(),
  };
}

export async function getReadyStatus() {
  const db = await getDatabaseHealth();
  const siteUrlConfigured = Boolean(env.siteUrl);

  const ok = db.connected && siteUrlConfigured;

  return {
    status: ok ? "ok" : "degraded",
    service: "ecomexporter-web",
    time: new Date().toISOString(),
    checks: {
      database: db.connected,
      configuration: siteUrlConfigured,
    },
  };
}
