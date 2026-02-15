# ClearMargin — Architecture

## High-level system
ClearMargin is a web app with a backend API and a deterministic compute pipeline.

### Components
1) Web Client (UI)
- Upload CSV
- Show job status
- Render monthly report

2) API Server
- Auth (if present)
- Upload handling + validation
- Job creation + status endpoints
- Report retrieval endpoints

3) Processing Worker
- Parses CSV into normalized records
- Runs deterministic calculations
- Stores computed summaries
- Triggers AI explanation generation

4) Storage
- Database: stores users, jobs, normalized aggregates, report results
- Object storage: stores uploads temporarily (optional; TTL deletion)

5) AI Explanation Service
- Receives structured metrics only (never raw CSV)
- Returns plain-English summary text in a strict schema

## Data flow
1. User uploads CSV -> API validates -> stores file (temp) -> creates ImportJob
2. Worker picks job -> parses & normalizes -> computes metrics -> persists results
3. Worker calls AI explanation with structured results -> persists explanation
4. User views report -> API serves deterministic numbers + explanation

## Trust boundaries
- Browser is untrusted input.
- Uploaded file is untrusted input.
- AI output is untrusted text (must be validated against schema and must never be treated as data).

## Storage strategy
### What we store
- ImportJob metadata (owner, created_at, status, schema_version)
- Computed results (MonthlySummary, ProductProfit, warnings, data gaps)
- AI explanation text (structured fields, versioned)

### What we avoid storing (by default)
- Raw CSV long-term
- PII from orders (customer names, emails, addresses)
- Full order content unless needed for computation (prefer aggregation)

## Versioning
- `import_schema_version`: identifies supported Shopify export format
- `calc_version`: identifies the calculation definitions used
- `report_version`: identifies report layout/fields for backward compatibility
- AI prompt versioning: `ai_version`

## Error handling philosophy
- Fail early on invalid inputs with helpful messages
- If optional data missing, show “Not provided” and list it in Data Gaps
- Never silently assume values for missing categories

## Deployment model (recommended)
- Web: Next.js (or equivalent)
- API + worker: Node service (or split), background jobs via queue
- Queue: a managed queue or DB-backed job table (choose one and lock it)
- DB: Postgres

## Why this architecture
- CSV upload avoids brittle third-party integrations for V1
- Deterministic compute is isolated and testable
- Asynchronous processing prevents timeouts and supports scaling
- AI is boxed as an explanation step only

## Folder/module boundaries (enforced)
- `/core` (pure domain + calculation engine, no I/O)
- `/api` (HTTP handlers, auth, validation)
- `/worker` (job runner, parsing, calls core)
- `/ui` (presentation)
- Shared types live in `/core/types` (or equivalent)

Rule: UI and API must not implement business calculations; only `/core` does.
