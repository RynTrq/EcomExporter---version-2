# Backend Runbook

This backend is a modular monolith designed for serverless deployment on Vercel
with Neon PostgreSQL, while remaining portable to a larger seller operating
system later.

## Architecture

- `src/app/api/*` contains thin route adapters only.
- `src/server/contracts/*` owns request validation and public API schemas.
- `src/server/services/*` owns business workflows.
- `src/server/db/*` owns migrations, the Neon client, and repositories.
- `src/server/http/*` owns request context, JSON parsing, errors, and response
  envelopes.
- `src/server/security/*` owns origin checks, rate limits, idempotency, hashing,
  and constant-time comparison.
- `src/proxy.ts` owns perimeter security headers and the admin Basic challenge.

## Persistence

The application uses Neon PostgreSQL through its serverless HTTP driver. The
schema is applied lazily and idempotently on the first database-backed request,
which keeps Next.js build-time route discovery independent of database access.

Core tables:

- `leads` stores normalized and display contact fields separately.
- `lead_status_history` records every lead state transition.
- `events` stores bounded first-party analytics events.
- `calculator_scenarios` stores calculator inputs and outputs for product
  intelligence.
- `api_idempotency_keys` safely replays duplicate lead submissions.
- `audit_events` records operationally meaningful actions.
- `rate_limit_windows` provides durable atomic fixed-window rate limiting.
- `api_requests` records request IDs, status codes, duration, and error codes.

## Security Controls

- JSON bodies require `application/json` and are size-limited by
  `API_MAX_JSON_BYTES`.
- Public write APIs require same-origin requests when an `Origin` header is
  present.
- Lead, event, calculator, and admin routes have independent durable rate-limit
  policies.
- Lead submissions support `Idempotency-Key` and reject key reuse with a
  different body.
- IP addresses are HMAC-hashed with `IP_HASH_SALT` before storage.
- Admin pages and admin APIs require `ADMIN_USER` and `ADMIN_KEY`.
- The Proxy adds CSP, referrer, frame, content-type, permissions, COOP, and CORP
  headers to application responses.
- Event metadata blocks likely sensitive keys such as email, phone, token,
  secret, password, cookie, and authorization.

## API Notes

- `POST /api/leads`
  - Body: lead contract from `src/server/contracts/leads.ts`.
  - Returns `201` for a new lead and `202` for accepted duplicates or honeypot
    suppression.
  - Optional `Idempotency-Key` header is recommended for client retries.
- `POST /api/events`
  - Body: bounded analytics event from `src/server/contracts/events.ts`.
  - Returns `202`.
- `POST /api/calculators/estimate`
  - Body: calculator input from `src/lib/calculator.ts`.
  - Returns the calculator result directly to preserve the existing frontend
    contract.
- `GET /api/openapi`
  - Returns the current machine-readable API contract.
- `GET /api/livez`
  - Cheap process liveness; does not touch the database.
- `GET /api/readyz`
  - Database and configuration readiness.

## Verification

Run the full local gate before shipping backend changes:

```bash
npm run verify
```

The gate runs linting, TypeScript, Vitest unit tests, Next production build, and
an npm production audit.

## Production Evolution

The current Neon-backed deployment is suitable for a serverless marketing site.
At higher traffic or broader operational scope, keep the same route, service,
repository, and contract boundaries while moving:

- rate limits to Redis or a managed edge limiter;
- outbox processing to a durable queue;
- authentication to OIDC with organization RBAC;
- marketplace credentials to KMS-backed encrypted storage;
- metrics and traces to OpenTelemetry;
- errors to Sentry or an equivalent incident platform.
