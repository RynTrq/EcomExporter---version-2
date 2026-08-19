import "server-only";

import { getSql } from "@/server/db/client";

let migrationPromise: Promise<void> | undefined;

export function ensureDatabase() {
  migrationPromise ??= migrate().catch((error) => {
    migrationPromise = undefined;
    throw error;
  });
  return migrationPromise;
}

async function migrate() {
  const sql = getSql();

  await sql.transaction((tx) => [
    tx`SELECT pg_advisory_xact_lock(53746813)`,
    tx`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    tx`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY,
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
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      )
    `,
    tx`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC)`,
    tx`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email_normalized)`,
    tx`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status, created_at DESC)`,
    tx`
      CREATE TABLE IF NOT EXISTS lead_status_history (
        id UUID PRIMARY KEY,
        lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
        from_status TEXT,
        to_status TEXT NOT NULL,
        actor_type TEXT NOT NULL,
        actor_id TEXT,
        request_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    tx`
      CREATE INDEX IF NOT EXISTS idx_lead_status_history_lead
      ON lead_status_history(lead_id, created_at DESC)
    `,
    tx`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        path TEXT NOT NULL,
        session_id TEXT,
        metadata_json JSONB,
        ip_hash TEXT,
        user_agent TEXT,
        request_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    tx`CREATE INDEX IF NOT EXISTS idx_events_name_created ON events(name, created_at DESC)`,
    tx`CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id, created_at DESC)`,
    tx`
      CREATE TABLE IF NOT EXISTS calculator_scenarios (
        id UUID PRIMARY KEY,
        platform TEXT NOT NULL,
        input_json JSONB NOT NULL,
        result_json JSONB NOT NULL,
        ip_hash TEXT,
        user_agent TEXT,
        request_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    tx`
      CREATE INDEX IF NOT EXISTS idx_calculator_scenarios_platform_created
      ON calculator_scenarios(platform, created_at DESC)
    `,
    tx`
      CREATE TABLE IF NOT EXISTS api_idempotency_keys (
        key_hash TEXT PRIMARY KEY,
        method TEXT NOT NULL,
        path TEXT NOT NULL,
        body_hash TEXT NOT NULL,
        status INTEGER NOT NULL,
        response_json JSONB NOT NULL,
        request_id TEXT NOT NULL,
        created_at BIGINT NOT NULL,
        expires_at BIGINT NOT NULL
      )
    `,
    tx`
      CREATE INDEX IF NOT EXISTS idx_api_idempotency_expires
      ON api_idempotency_keys(expires_at)
    `,
    tx`
      CREATE TABLE IF NOT EXISTS audit_events (
        id UUID PRIMARY KEY,
        actor_type TEXT NOT NULL,
        actor_id TEXT,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id TEXT,
        request_id TEXT,
        ip_hash TEXT,
        metadata_json JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    tx`
      CREATE INDEX IF NOT EXISTS idx_audit_events_entity
      ON audit_events(entity_type, entity_id, created_at DESC)
    `,
    tx`
      CREATE INDEX IF NOT EXISTS idx_audit_events_action
      ON audit_events(action, created_at DESC)
    `,
    tx`
      CREATE TABLE IF NOT EXISTS rate_limit_windows (
        bucket TEXT NOT NULL,
        route TEXT NOT NULL,
        window_start BIGINT NOT NULL,
        hit_count INTEGER NOT NULL,
        expires_at BIGINT NOT NULL,
        PRIMARY KEY (bucket, route, window_start)
      )
    `,
    tx`
      CREATE INDEX IF NOT EXISTS idx_rate_limit_windows_expires
      ON rate_limit_windows(expires_at)
    `,
    tx`
      CREATE TABLE IF NOT EXISTS api_requests (
        id BIGSERIAL PRIMARY KEY,
        request_id TEXT NOT NULL,
        method TEXT NOT NULL,
        path TEXT NOT NULL,
        status INTEGER NOT NULL,
        duration_ms INTEGER NOT NULL,
        ip_hash TEXT,
        user_agent TEXT,
        error_code TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    tx`CREATE INDEX IF NOT EXISTS idx_api_requests_created_at ON api_requests(created_at DESC)`,
    tx`
      CREATE INDEX IF NOT EXISTS idx_api_requests_path_status
      ON api_requests(path, status, created_at DESC)
    `,
    tx`
      INSERT INTO schema_migrations (id, name)
      VALUES (1, 'neon_marketing_schema')
      ON CONFLICT (id) DO NOTHING
    `,
  ]);
}
