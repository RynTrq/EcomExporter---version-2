# Ecom Exporter

Full-stack marketing site and operations platform for Ecom Exporter — expert
marketplace management, working seller calculators, persistent lead capture,
and an internal enquiry console.

## What Is Included

- Service pages for smart product cataloging, marketplace account management,
  performance advertising, and sales & growth management.
- Solution pages for strategy consulting, digital marketing, analytics,
  business support, global entity formation, ecom website development, and
  graphic designing.
- Onboarding partner pages covering Amazon India and Global, Flipkart, Meesho,
  Myntra, Walmart, Etsy, eBay, Shopify, Alibaba, and IndiaMART.
- Working fee and profit calculators for seven marketplaces.
- Validated lead intake with durable rate limiting, spam honeypot,
  idempotency, duplicate suppression, audit logging, and SQLite storage.
- Bounded event ingestion, calculator scenario persistence, liveness,
  readiness, request logs, and OpenAPI-style API contracts.
- HTTP Basic protected operations console when `ADMIN_KEY` is configured.
- Next Proxy security headers with a pre-render admin authentication challenge.
- Responsive design system, reduced-motion support, keyboard focus states,
  structured metadata, robots rules, and generated sitemap.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm audit --omit=dev
```

Or run the full gate:

```bash
npm run verify
```

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://ecomexporter.com
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
IP_HASH_SALT=replace-with-a-long-random-salt
API_MAX_JSON_BYTES=32768
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_LEADS=5
RATE_LIMIT_EVENTS=60
RATE_LIMIT_CALCULATORS=30
LEAD_NOTIFY_PHONE=+918929519035
LEAD_NOTIFY_EMAIL=mdinternationalfancyhub@gmail.com
```

For local browser testing you may set `NEXT_PUBLIC_SITE_URL` to the local
origin. Production must use the apex HTTPS URL exactly. Configure any desired
Twilio or Resend notification variables documented in `.env.example`; an
unset channel is skipped and never prevents a lead from being stored.

The optional admin console is at `/admin` and remains disabled unless
`ADMIN_KEY` is configured. Use HTTP Basic authentication with the configured
`ADMIN_USER` (default `admin`) and `ADMIN_KEY` as the password.

## API Surface

- `POST /api/leads` validates and stores growth enquiries.
- `POST /api/calculators/estimate` returns a transparent marketplace economics
  estimate.
- `POST /api/events` stores first-party product events.
- `GET /api/openapi` returns the machine-readable API contract.
- `GET /api/livez` checks only process liveness.
- `GET /api/readyz` and `GET /api/health` check database, storage, and config
  readiness.
- `GET /api/admin/leads` returns protected lead records for authenticated
  operators.

See [docs/backend.md](docs/backend.md) for the backend runbook.

## Production Deployment

This build is production-ready for Vercel Functions with a managed Neon
PostgreSQL database. Connect Neon to the Vercel project so `DATABASE_URL` is
available at runtime, set a strong unique `IP_HASH_SALT`, and verify `/api/livez`
and `/api/readyz` after every release. The database schema is applied lazily and
idempotently on the first database-backed request.

Lead notifications are best-effort and independently enabled. Configure Resend
for email and Twilio for SMS and WhatsApp; an unset provider is skipped without
preventing the validated lead from being stored.

Point the apex domain at the deployment. The application permanently redirects
`www.ecomexporter.com` to the matching apex path and query. Submit
`https://ecomexporter.com/sitemap.xml` in Search Console after release and
verify that the deployed `robots.txt` contains the same production origin.

## Production Evolution

This repository is intentionally a deployable modular monolith. For a
production seller operating system, keep the domain and route boundaries while
adding managed OIDC and organization RBAC, moving integration work to a durable
queue, encrypting marketplace OAuth
credentials with KMS, storing documents in S3-compatible object storage, and
adding OpenTelemetry, Sentry, and marketplace-specific connector adapters.

The first real connector should be Amazon SP-API. Other marketplaces should
remain behind a common adapter contract rather than leaking provider payloads
into core catalog, order, settlement, task, or reporting models.
