import "server-only";

import fs from "node:fs";
import path from "node:path";
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

export function getReadyStatus() {
  const db = getDatabaseHealth();
  const storage = checkWritableDirectory(path.dirname(env.databasePath));
  const siteUrlConfigured = Boolean(env.siteUrl);

  const ok = db.connected && storage.writable && siteUrlConfigured;

  return {
    status: ok ? "ok" : "degraded",
    service: "ecomexporter-web",
    time: new Date().toISOString(),
    checks: {
      database: db.connected,
      storage: storage.writable,
      configuration: siteUrlConfigured,
    },
  };
}

function checkWritableDirectory(directory: string) {
  try {
    fs.mkdirSync(directory, { recursive: true });
    fs.accessSync(directory, fs.constants.R_OK | fs.constants.W_OK);
    return { writable: true };
  } catch {
    return { writable: false };
  }
}
