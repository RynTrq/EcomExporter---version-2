import "server-only";

import { randomUUID } from "node:crypto";
import { db } from "@/server/db/client";

let lastRateLimitCleanup = 0;

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

export function runWriteTransaction<T>(work: () => T): T {
  return db.transaction(work)();
}

export function createLeadRecord(input: Omit<LeadRecord, "created_at" | "updated_at" | "deleted_at">) {
  db.prepare(`
    INSERT INTO leads (
      id, name, email_normalized, email_display, phone_normalized, phone_display,
      company, marketplace, monthly_revenue, message, source, status, lead_score,
      ip_hash, user_agent, request_id
    ) VALUES (
      @id, @name, @email_normalized, @email_display, @phone_normalized, @phone_display,
      @company, @marketplace, @monthly_revenue, @message, @source, @status, @lead_score,
      @ip_hash, @user_agent, @request_id
    )
  `).run(input);

  return input.id;
}

export function findRecentDuplicateLead(input: {
  emailNormalized: string;
  phoneNormalized: string;
  marketplace: string;
  source: string;
  sinceIso: string;
}) {
  return db
    .prepare(
      `SELECT * FROM leads
       WHERE deleted_at IS NULL
         AND email_normalized = @emailNormalized
         AND phone_normalized = @phoneNormalized
         AND marketplace = @marketplace
         AND source = @source
         AND datetime(created_at) >= datetime(@sinceIso)
       ORDER BY datetime(created_at) DESC
       LIMIT 1`,
    )
    .get(input) as LeadRecord | undefined;
}

export function listLeadRecords(limit = 100) {
  return db
    .prepare(
      `SELECT * FROM leads
       WHERE deleted_at IS NULL
       ORDER BY datetime(created_at) DESC, id DESC
       LIMIT ?`,
    )
    .all(limit) as LeadRecord[];
}

export function appendLeadStatusHistory(input: {
  id: string;
  leadId: string;
  fromStatus?: string;
  toStatus: string;
  actorType: string;
  actorId?: string;
  requestId?: string;
}) {
  db.prepare(`
    INSERT INTO lead_status_history (
      id, lead_id, from_status, to_status, actor_type, actor_id, request_id
    ) VALUES (
      @id, @leadId, @fromStatus, @toStatus, @actorType, @actorId, @requestId
    )
  `).run({
    ...input,
    fromStatus: input.fromStatus || null,
    actorId: input.actorId || null,
    requestId: input.requestId || null,
  });
}

export function createEventRecord(input: {
  id: string;
  name: string;
  path: string;
  sessionId?: string;
  metadata?: unknown;
  ipHash?: string;
  userAgent?: string;
  requestId: string;
}) {
  db.prepare(`
    INSERT INTO events (
      id, name, path, session_id, metadata_json, ip_hash, user_agent, request_id
    ) VALUES (
      @id, @name, @path, @sessionId, @metadataJson, @ipHash, @userAgent, @requestId
    )
  `).run({
    ...input,
    sessionId: input.sessionId || null,
    metadataJson: input.metadata ? JSON.stringify(input.metadata) : null,
    ipHash: input.ipHash || null,
    userAgent: input.userAgent || null,
  });
}

export function createCalculatorScenario(input: {
  id: string;
  platform: string;
  estimateInput: unknown;
  estimateResult: unknown;
  ipHash?: string;
  userAgent?: string;
  requestId: string;
}) {
  db.prepare(`
    INSERT INTO calculator_scenarios (
      id, platform, input_json, result_json, ip_hash, user_agent, request_id
    ) VALUES (
      @id, @platform, @inputJson, @resultJson, @ipHash, @userAgent, @requestId
    )
  `).run({
    id: input.id,
    platform: input.platform,
    inputJson: JSON.stringify(input.estimateInput),
    resultJson: JSON.stringify(input.estimateResult),
    ipHash: input.ipHash || null,
    userAgent: input.userAgent || null,
    requestId: input.requestId,
  });
}

export function createAuditEvent(input: {
  actorType: string;
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  requestId?: string;
  ipHash?: string;
  metadata?: unknown;
}) {
  const id = randomUUID();
  db.prepare(`
    INSERT INTO audit_events (
      id, actor_type, actor_id, action, entity_type, entity_id,
      request_id, ip_hash, metadata_json
    ) VALUES (
      @id, @actorType, @actorId, @action, @entityType, @entityId,
      @requestId, @ipHash, @metadataJson
    )
  `).run({
    ...input,
    id,
    actorId: input.actorId || null,
    entityId: input.entityId || null,
    requestId: input.requestId || null,
    ipHash: input.ipHash || null,
    metadataJson: input.metadata ? JSON.stringify(input.metadata) : null,
  });
  return id;
}

export function checkRateLimit(input: {
  bucket: string;
  route: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const cutoff = now - input.windowMs;
  const transaction = db.transaction(() => {
    if (now - lastRateLimitCleanup > 60_000) {
      db.prepare(
        `DELETE FROM rate_limit_hits WHERE occurred_at < ?`,
      ).run(cutoff);
      lastRateLimitCleanup = now;
    }
    const count = (
      db.prepare(
        `SELECT COUNT(*) as count FROM rate_limit_hits
         WHERE bucket = ? AND route = ? AND occurred_at >= ?`,
      ).get(input.bucket, input.route, cutoff) as { count: number }
    ).count;

    if (count >= input.limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(now + input.windowMs).toISOString(),
      };
    }

    db.prepare(
      `INSERT INTO rate_limit_hits (bucket, route, occurred_at)
       VALUES (?, ?, ?)`,
    ).run(input.bucket, input.route, now);

    return {
      allowed: true,
      remaining: Math.max(0, input.limit - count - 1),
      resetAt: new Date(now + input.windowMs).toISOString(),
    };
  });

  return transaction();
}

export function findIdempotencyRecord(keyHash: string) {
  db.prepare("DELETE FROM api_idempotency_keys WHERE expires_at < ?").run(Date.now());
  return db
    .prepare(
      `SELECT * FROM api_idempotency_keys WHERE key_hash = ? LIMIT 1`,
    )
    .get(keyHash) as
    | {
        key_hash: string;
        method: string;
        path: string;
        body_hash: string;
        status: number;
        response_json: string;
        request_id: string;
        created_at: number;
        expires_at: number;
      }
    | undefined;
}

export function saveIdempotencyRecord(input: {
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
  db.prepare(`
    INSERT INTO api_idempotency_keys (
      key_hash, method, path, body_hash, status, response_json,
      request_id, created_at, expires_at
    ) VALUES (
      @keyHash, @method, @path, @bodyHash, @status, @responseJson,
      @requestId, @createdAt, @expiresAt
    )
  `).run({
    keyHash: input.keyHash,
    method: input.method,
    path: input.path,
    bodyHash: input.bodyHash,
    status: input.status,
    responseJson: JSON.stringify(input.response),
    requestId: input.requestId,
    createdAt: now,
    expiresAt: now + input.ttlMs,
  });
}

export function recordApiRequest(input: {
  requestId: string;
  method: string;
  path: string;
  status: number;
  durationMs: number;
  ipHash?: string;
  userAgent?: string;
  errorCode?: string;
}) {
  db.prepare(`
    INSERT INTO api_requests (
      request_id, method, path, status, duration_ms, ip_hash, user_agent, error_code
    ) VALUES (
      @requestId, @method, @path, @status, @durationMs, @ipHash, @userAgent, @errorCode
    )
  `).run({
    ...input,
    ipHash: input.ipHash || null,
    userAgent: input.userAgent || null,
    errorCode: input.errorCode || null,
  });
}

export function getDatabaseHealth() {
  const migrationCount = (
    db.prepare("SELECT COUNT(*) as count FROM schema_migrations").get() as {
      count: number;
    }
  ).count;
  const pendingOutbox = (
    db.prepare(
      "SELECT COUNT(*) as count FROM outbox_messages WHERE status = 'pending'",
    ).get() as { count: number }
  ).count;
  const leadCount = (
    db.prepare(
      "SELECT COUNT(*) as count FROM leads WHERE deleted_at IS NULL",
    ).get() as { count: number }
  ).count;

  return {
    connected: true,
    migrationCount,
    pendingOutbox,
    leadCount,
  };
}
