import "server-only";

import type Database from "better-sqlite3";

type Migration = {
  id: number;
  name: string;
  up: (db: Database.Database) => void;
};

const migrations: Migration[] = [
  {
    id: 1,
    name: "core_operational_schema",
    up(db) {
      const tableExists = (name: string) =>
        Boolean(
          db
            .prepare(
              "SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?",
            )
            .get(name),
        );
      const columns = (name: string) =>
        new Set(
          db
            .prepare(`PRAGMA table_info(${name})`)
            .all()
            .map((row) => (row as { name: string }).name),
        );

      if (tableExists("leads") && !columns("leads").has("email_normalized")) {
        db.exec("ALTER TABLE leads RENAME TO legacy_leads");
      }

      if (tableExists("events") && !columns("events").has("metadata_json")) {
        db.exec("ALTER TABLE events RENAME TO legacy_events");
      }

      db.exec(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email_normalized TEXT NOT NULL,
          email_display TEXT NOT NULL,
          phone_normalized TEXT NOT NULL,
          phone_display TEXT NOT NULL,
          company TEXT,
          marketplace TEXT NOT NULL,
          monthly_revenue TEXT,
          message TEXT,
          source TEXT NOT NULL DEFAULT 'website',
          status TEXT NOT NULL DEFAULT 'new',
          lead_score INTEGER NOT NULL DEFAULT 0,
          ip_hash TEXT,
          user_agent TEXT,
          request_id TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          deleted_at TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_leads_created_at
          ON leads(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_leads_email
          ON leads(email_normalized);
        CREATE INDEX IF NOT EXISTS idx_leads_status
          ON leads(status, created_at DESC);

        CREATE TABLE IF NOT EXISTS lead_status_history (
          id TEXT PRIMARY KEY,
          lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
          from_status TEXT,
          to_status TEXT NOT NULL,
          actor_type TEXT NOT NULL,
          actor_id TEXT,
          request_id TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_lead_status_history_lead
          ON lead_status_history(lead_id, created_at DESC);

        CREATE TABLE IF NOT EXISTS events (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          path TEXT NOT NULL,
          session_id TEXT,
          metadata_json TEXT,
          ip_hash TEXT,
          user_agent TEXT,
          request_id TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_events_name_created
          ON events(name, created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_events_session
          ON events(session_id, created_at DESC);

        CREATE TABLE IF NOT EXISTS calculator_scenarios (
          id TEXT PRIMARY KEY,
          platform TEXT NOT NULL,
          input_json TEXT NOT NULL,
          result_json TEXT NOT NULL,
          ip_hash TEXT,
          user_agent TEXT,
          request_id TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_calculator_scenarios_platform_created
          ON calculator_scenarios(platform, created_at DESC);

        CREATE TABLE IF NOT EXISTS calculator_rule_sets (
          id TEXT PRIMARY KEY,
          platform TEXT NOT NULL,
          version TEXT NOT NULL,
          currency TEXT NOT NULL,
          effective_from TEXT NOT NULL,
          effective_to TEXT,
          source TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_calculator_rule_sets_active
          ON calculator_rule_sets(platform, effective_from DESC);

        CREATE TABLE IF NOT EXISTS calculator_fee_rules (
          id TEXT PRIMARY KEY,
          rule_set_id TEXT NOT NULL REFERENCES calculator_rule_sets(id) ON DELETE CASCADE,
          category TEXT NOT NULL,
          referral_basis_points INTEGER NOT NULL,
          closing_fee_minor INTEGER NOT NULL,
          weight_rate_micro_minor INTEGER NOT NULL,
          payment_basis_points INTEGER NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_calculator_fee_rules_rule_set
          ON calculator_fee_rules(rule_set_id, category);

        CREATE TABLE IF NOT EXISTS api_idempotency_keys (
          key_hash TEXT PRIMARY KEY,
          method TEXT NOT NULL,
          path TEXT NOT NULL,
          body_hash TEXT NOT NULL,
          status INTEGER NOT NULL,
          response_json TEXT NOT NULL,
          request_id TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          expires_at INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_api_idempotency_expires
          ON api_idempotency_keys(expires_at);

        CREATE TABLE IF NOT EXISTS audit_events (
          id TEXT PRIMARY KEY,
          actor_type TEXT NOT NULL,
          actor_id TEXT,
          action TEXT NOT NULL,
          entity_type TEXT NOT NULL,
          entity_id TEXT,
          request_id TEXT,
          ip_hash TEXT,
          metadata_json TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_audit_events_entity
          ON audit_events(entity_type, entity_id, created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_audit_events_action
          ON audit_events(action, created_at DESC);

        CREATE TABLE IF NOT EXISTS outbox_messages (
          id TEXT PRIMARY KEY,
          topic TEXT NOT NULL,
          payload_json TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          attempts INTEGER NOT NULL DEFAULT 0,
          next_attempt_at TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_outbox_messages_status
          ON outbox_messages(status, created_at ASC);

        CREATE TABLE IF NOT EXISTS rate_limit_hits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bucket TEXT NOT NULL,
          route TEXT NOT NULL,
          occurred_at INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_rate_limit_hits_bucket_route_time
          ON rate_limit_hits(bucket, route, occurred_at);

        CREATE TABLE IF NOT EXISTS api_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          request_id TEXT NOT NULL,
          method TEXT NOT NULL,
          path TEXT NOT NULL,
          status INTEGER NOT NULL,
          duration_ms INTEGER NOT NULL,
          ip_hash TEXT,
          user_agent TEXT,
          error_code TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_api_requests_created_at
          ON api_requests(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_api_requests_path_status
          ON api_requests(path, status, created_at DESC);
      `);

      if (tableExists("legacy_leads")) {
        db.exec(`
          INSERT INTO leads (
            id, name, email_normalized, email_display, phone_normalized,
            phone_display, company, marketplace, monthly_revenue, message,
            source, status, lead_score, request_id, created_at, updated_at
          )
          SELECT
            lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
              substr(hex(randomblob(2)), 2) || '-' ||
              substr('89ab', abs(random()) % 4 + 1, 1) ||
              substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6))),
            trim(name),
            lower(trim(email)),
            trim(email),
            replace(replace(replace(trim(phone), ' ', ''), '-', ''), '+', ''),
            trim(phone),
            NULLIF(trim(company), ''),
            marketplace,
            monthly_revenue,
            message,
            source,
            status,
            0,
            'legacy-migration',
            created_at,
            created_at
          FROM legacy_leads
          WHERE NOT EXISTS (
            SELECT 1 FROM leads
            WHERE leads.email_normalized = lower(trim(legacy_leads.email))
              AND leads.phone_normalized = replace(replace(replace(trim(legacy_leads.phone), ' ', ''), '-', ''), '+', '')
              AND leads.created_at = legacy_leads.created_at
          );
        `);
      }

      if (tableExists("legacy_events")) {
        db.exec(`
          INSERT INTO events (
            id, name, path, session_id, metadata_json, request_id, created_at
          )
          SELECT
            lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
              substr(hex(randomblob(2)), 2) || '-' ||
              substr('89ab', abs(random()) % 4 + 1, 1) ||
              substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6))),
            name,
            path,
            session_id,
            metadata,
            'legacy-migration',
            created_at
          FROM legacy_events;
        `);
      }
    },
  },
  {
    id: 2,
    name: "rate_limit_cleanup_index",
    up(db) {
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_rate_limit_hits_occurred_at
          ON rate_limit_hits(occurred_at);
      `);
    },
  },
];

export function runMigrations(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const applied = new Set(
    db
      .prepare("SELECT id FROM schema_migrations")
      .all()
      .map((row) => (row as { id: number }).id),
  );

  const transaction = db.transaction(() => {
    for (const migration of migrations) {
      if (applied.has(migration.id)) continue;
      migration.up(db);
      db.prepare(
        "INSERT INTO schema_migrations (id, name) VALUES (?, ?)",
      ).run(migration.id, migration.name);
    }
  });

  transaction();
}
