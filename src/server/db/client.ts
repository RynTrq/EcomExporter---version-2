import "server-only";

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { env } from "@/server/config/env";
import { runMigrations } from "@/server/db/migrations";

const globalForDb = globalThis as unknown as {
  ecomExporterDb?: Database.Database;
};

fs.mkdirSync(path.dirname(env.databasePath), { recursive: true });

export const db =
  globalForDb.ecomExporterDb ||
  new Database(env.databasePath, {
    fileMustExist: false,
  });

if (!env.isProduction) {
  globalForDb.ecomExporterDb = db;
}

db.pragma("journal_mode = WAL");
db.pragma("synchronous = FULL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

runMigrations(db);

