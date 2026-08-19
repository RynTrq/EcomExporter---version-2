import "server-only";

import { randomUUID } from "node:crypto";
import { env } from "@/server/config/env";
import { getSql, hasDatabaseConfiguration } from "@/server/db/client";
import { ensureDatabase } from "@/server/db/migrations";

export type LeadRecord = {
  id: string;
  name: string;
  email_normalized: string;
  email_display: string;
  phone_normalized: string;
  phone_display: string;
  company: string | null;
  marketplace: string;
  monthly_revenue: string | null;
  message: string | null;
  source: string;
  status: string;
  lead_score: number;
  ip_hash: string | null;
  user_agent: string | null;
  request_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type LeadRecordInput = Omit<
  LeadRecord,
  "created_at" | "updated_at" | "deleted_at"
>;

type AuditEventInput = {
  actorType: string;
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  requestId?: string;
  ipHash?: string;
  metadata?: unknown;
};

type IdempotencyRecord = {
  key_hash: string;
  method: string;
  path: string;
  body_hash: string;
  status: number;
  response_json: unknown;
  request_id: string;
  created_at: number;
  expires_at: number;
};

type MemoryStore = {
  leads: LeadRecord[];
  idempotency: Map<string, IdempotencyRecord>;
  rateLimits: Map<string, { count: number; expiresAt: number }>;
};

const globalForMemory = globalThis as unknown as {
  ecomExporterTestStore?: MemoryStore;
};

const memory: MemoryStore =
  globalForMemory.ecomExporterTestStore ??
  (globalForMemory.ecomExporterTestStore = {
    leads: [],
    idempotency: new Map(),
    rateLimits: new Map(),
  });

function usesTestStore() {
  return env.nodeEnv === "test";
}

function jsonParameter(value: unknown) {
  return value === undefined ? null : JSON.stringify(value);
}

export async function findRecentDuplicateLead(input: {
  emailNormalized: string;
  phoneNormalized: string;
  marketplace: string;
  source: string;
  sinceIso: string;
}) {
  if (usesTestStore()) {
    return memory.leads
      .filter(
        (lead) =>
          !lead.deleted_at &&
          lead.email_normalized === input.emailNormalized &&
          lead.phone_normalized === input.phoneNormalized &&
          lead.marketplace === input.marketplace &&
          lead.source === input.source &&
          new Date(lead.created_at).getTime() >= new Date(input.sinceIso).getTime(),
      )
      .sort((left, right) => right.created_at.localeCompare(left.created_at))[0];
  }

  await ensureDatabase();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM leads
    WHERE deleted_at IS NULL
      AND email_normalized = ${input.emailNormalized}
      AND phone_normalized = ${input.phoneNormalized}
      AND marketplace = ${input.marketplace}
      AND source = ${input.source}
      AND created_at >= ${input.sinceIso}::timestamptz
    ORDER BY created_at DESC
    LIMIT 1
  `;

  return rows[0] as LeadRecord | undefined;
}

export async function createLeadSubmission(input: {
  lead: LeadRecordInput;
  historyId: string;
  audit: AuditEventInput;
}) {
  const now = new Date().toISOString();
  if (usesTestStore()) {
    memory.leads.push({
      ...input.lead,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    });
    return input.lead.id;
  }

  await ensureDatabase();
  const sql = getSql();
  const auditId = randomUUID();
  await sql.transaction((tx) => [
    tx`
      INSERT INTO leads (
        id, name, email_normalized, email_display, phone_normalized, phone_display,
        company, marketplace, monthly_revenue, message, source, status, lead_score,
        ip_hash, user_agent, request_id
      ) VALUES (
        ${input.lead.id}, ${input.lead.name}, ${input.lead.email_normalized},
        ${input.lead.email_display}, ${input.lead.phone_normalized},
        ${input.lead.phone_display}, ${input.lead.company}, ${input.lead.marketplace},
        ${input.lead.monthly_revenue}, ${input.lead.message}, ${input.lead.source},
        ${input.lead.status}, ${input.lead.lead_score}, ${input.lead.ip_hash},
        ${input.lead.user_agent}, ${input.lead.request_id}
      )
    `,
    tx`
      INSERT INTO lead_status_history (
        id, lead_id, from_status, to_status, actor_type, actor_id, request_id
      ) VALUES (
        ${input.historyId}, ${input.lead.id}, NULL, 'new', 'anonymous', NULL,
        ${input.lead.request_id}
      )
    `,
    tx`
      INSERT INTO audit_events (
        id, actor_type, actor_id, action, entity_type, entity_id,
        request_id, ip_hash, metadata_json
      ) VALUES (
        ${auditId}, ${input.audit.actorType}, ${input.audit.actorId ?? null},
        ${input.audit.action}, ${input.audit.entityType},
        ${input.audit.entityId ?? null}, ${input.audit.requestId ?? null},
        ${input.audit.ipHash ?? null}, ${jsonParameter(input.audit.metadata)}::jsonb
      )
    `,
  ]);

  return input.lead.id;
}

export async function listLeadRecords(limit = 100) {
  if (usesTestStore()) {
    return [...memory.leads]
      .filter((lead) => !lead.deleted_at)
      .sort((left, right) => right.created_at.localeCompare(left.created_at))
      .slice(0, limit);
  }

  await ensureDatabase();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM leads
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC, id DESC
    LIMIT ${limit}
  `;
  return rows as LeadRecord[];
}

export async function createEventWithAudit(input: {
  id: string;
  name: string;
  path: string;
  sessionId?: string;
  metadata?: unknown;
  ipHash?: string;
  userAgent?: string;
  requestId: string;
}) {
  if (usesTestStore()) return input.id;

  await ensureDatabase();
  const sql = getSql();
  const auditId = randomUUID();
  await sql.transaction((tx) => [
    tx`
      INSERT INTO events (
        id, name, path, session_id, metadata_json, ip_hash, user_agent, request_id
      ) VALUES (
        ${input.id}, ${input.name}, ${input.path}, ${input.sessionId ?? null},
        ${jsonParameter(input.metadata)}::jsonb, ${input.ipHash ?? null},
        ${input.userAgent ?? null}, ${input.requestId}
      )
    `,
    tx`
      INSERT INTO audit_events (
        id, actor_type, action, entity_type, entity_id,
        request_id, ip_hash, metadata_json
      ) VALUES (
        ${auditId}, 'anonymous', 'event.accepted', 'event', ${input.id},
        ${input.requestId}, ${input.ipHash ?? null},
        ${jsonParameter({ name: input.name, path: input.path })}::jsonb
      )
    `,
  ]);
  return input.id;
}

export async function createCalculatorScenarioWithAudit(input: {
  id: string;
  platform: string;
  estimateInput: unknown;
  estimateResult: unknown;
  ipHash?: string;
  userAgent?: string;
  requestId: string;
  auditMetadata: unknown;
}) {
  if (usesTestStore()) return input.id;

  await ensureDatabase();
  const sql = getSql();
  const auditId = randomUUID();
  await sql.transaction((tx) => [
    tx`
      INSERT INTO calculator_scenarios (
        id, platform, input_json, result_json, ip_hash, user_agent, request_id
      ) VALUES (
        ${input.id}, ${input.platform}, ${jsonParameter(input.estimateInput)}::jsonb,
        ${jsonParameter(input.estimateResult)}::jsonb, ${input.ipHash ?? null},
        ${input.userAgent ?? null}, ${input.requestId}
      )
    `,
    tx`
      INSERT INTO audit_events (
        id, actor_type, action, entity_type, entity_id,
        request_id, ip_hash, metadata_json
      ) VALUES (
        ${auditId}, 'anonymous', 'calculator.estimated', 'calculator_scenario',
        ${input.id}, ${input.requestId}, ${input.ipHash ?? null},
        ${jsonParameter(input.auditMetadata)}::jsonb
      )
    `,
  ]);
  return input.id;
}

export async function createAuditEvent(input: AuditEventInput) {
  const id = randomUUID();
  if (usesTestStore()) return id;

  await ensureDatabase();
  const sql = getSql();
  await sql`
    INSERT INTO audit_events (
      id, actor_type, actor_id, action, entity_type, entity_id,
      request_id, ip_hash, metadata_json
    ) VALUES (
      ${id}, ${input.actorType}, ${input.actorId ?? null}, ${input.action},
      ${input.entityType}, ${input.entityId ?? null}, ${input.requestId ?? null},
      ${input.ipHash ?? null}, ${jsonParameter(input.metadata)}::jsonb
    )
  `;
  return id;
}

export async function checkRateLimit(input: {
  bucket: string;
  route: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const windowStart = Math.floor(now / input.windowMs) * input.windowMs;
  const resetAtMs = windowStart + input.windowMs;
  const key = `${input.bucket}:${input.route}:${windowStart}`;

  if (usesTestStore()) {
    const current = memory.rateLimits.get(key);
    const count = (current?.count ?? 0) + 1;
    memory.rateLimits.set(key, { count, expiresAt: resetAtMs });
    return {
      allowed: count <= input.limit,
      remaining: Math.max(0, input.limit - count),
      resetAt: new Date(resetAtMs).toISOString(),
    };
  }

  await ensureDatabase();
  const sql = getSql();
  const [, rows] = await sql.transaction((tx) => [
    tx`DELETE FROM rate_limit_windows WHERE expires_at < ${now}`,
    tx`
      INSERT INTO rate_limit_windows (
        bucket, route, window_start, hit_count, expires_at
      ) VALUES (
        ${input.bucket}, ${input.route}, ${windowStart}, 1, ${resetAtMs}
      )
      ON CONFLICT (bucket, route, window_start)
      DO UPDATE SET hit_count = rate_limit_windows.hit_count + 1
      RETURNING hit_count
    `,
  ]);
  const count = Number((rows[0] as { hit_count: number | string }).hit_count);

  return {
    allowed: count <= input.limit,
    remaining: Math.max(0, input.limit - count),
    resetAt: new Date(resetAtMs).toISOString(),
  };
}

export async function findIdempotencyRecord(keyHash: string) {
  const now = Date.now();
  if (usesTestStore()) {
    for (const [key, record] of memory.idempotency) {
      if (record.expires_at < now) memory.idempotency.delete(key);
    }
    return memory.idempotency.get(keyHash);
  }

  await ensureDatabase();
  const sql = getSql();
  const [, rows] = await sql.transaction((tx) => [
    tx`DELETE FROM api_idempotency_keys WHERE expires_at < ${now}`,
    tx`
      SELECT * FROM api_idempotency_keys
      WHERE key_hash = ${keyHash}
      LIMIT 1
    `,
  ]);
  return rows[0] as IdempotencyRecord | undefined;
}

export async function saveIdempotencyRecord(input: {
  keyHash: string;
  method: string;
  path: string;
  bodyHash: string;
  status: number;
  response: unknown;
  requestId: string;
  ttlMs: number;
}) {
  const now = Date.now();
  const record: IdempotencyRecord = {
    key_hash: input.keyHash,
    method: input.method,
    path: input.path,
    body_hash: input.bodyHash,
    status: input.status,
    response_json: input.response,
    request_id: input.requestId,
    created_at: now,
    expires_at: now + input.ttlMs,
  };

  if (usesTestStore()) {
    memory.idempotency.set(input.keyHash, record);
    return;
  }

  await ensureDatabase();
  const sql = getSql();
  await sql`
    INSERT INTO api_idempotency_keys (
      key_hash, method, path, body_hash, status, response_json,
      request_id, created_at, expires_at
    ) VALUES (
      ${input.keyHash}, ${input.method}, ${input.path}, ${input.bodyHash},
      ${input.status}, ${jsonParameter(input.response)}::jsonb, ${input.requestId},
      ${now}, ${now + input.ttlMs}
    )
    ON CONFLICT (key_hash) DO NOTHING
  `;
}

export async function recordApiRequest(input: {
  requestId: string;
  method: string;
  path: string;
  status: number;
  durationMs: number;
  ipHash?: string;
  userAgent?: string;
  errorCode?: string;
}) {
  if (usesTestStore()) return;

  await ensureDatabase();
  const sql = getSql();
  await sql`
    INSERT INTO api_requests (
      request_id, method, path, status, duration_ms, ip_hash, user_agent, error_code
    ) VALUES (
      ${input.requestId}, ${input.method}, ${input.path}, ${input.status},
      ${input.durationMs}, ${input.ipHash ?? null}, ${input.userAgent ?? null},
      ${input.errorCode ?? null}
    )
  `;
}

export async function getDatabaseHealth() {
  if (usesTestStore()) {
    return {
      connected: true,
      migrationCount: 1,
      leadCount: memory.leads.length,
    };
  }

  if (!hasDatabaseConfiguration()) {
    return { connected: false, migrationCount: 0, leadCount: 0 };
  }

  try {
    await ensureDatabase();
    const sql = getSql();
    const [migrationRows, leadRows] = await sql.transaction((tx) => [
      tx`SELECT COUNT(*)::int AS count FROM schema_migrations`,
      tx`SELECT COUNT(*)::int AS count FROM leads WHERE deleted_at IS NULL`,
    ]);
    return {
      connected: true,
      migrationCount: Number((migrationRows[0] as { count: number }).count),
      leadCount: Number((leadRows[0] as { count: number }).count),
    };
  } catch {
    return { connected: false, migrationCount: 0, leadCount: 0 };
  }
}
