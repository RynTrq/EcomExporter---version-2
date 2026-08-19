import "server-only";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { env } from "@/server/config/env";

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured.");
    this.name = "DatabaseNotConfiguredError";
  }
}

let sqlClient: NeonQueryFunction<false, false> | undefined;

export function hasDatabaseConfiguration() {
  return Boolean(env.databaseUrl);
}

export function getSql() {
  if (!env.databaseUrl) {
    throw new DatabaseNotConfiguredError();
  }

  sqlClient ??= neon(env.databaseUrl);
  return sqlClient;
}
