# ClearMargin — Requirements

## Functional requirements (FR)

### FR-1 Upload Shopify export
- User can upload a CSV file via web UI.
- System validates:
  - file type (CSV only)
  - size limit (e.g., <= 20MB configurable)
  - required columns exist for supported schema
- System rejects unsupported files with a clear error message and guidance.

Acceptance criteria:
- Upload of a valid CSV produces a successful “Import Job” within 10 seconds.
- Upload of an invalid CSV returns a structured error (see API contracts).

### FR-2 Create an import job + processing pipeline
- Each upload creates an ImportJob with a stable ID.
- Processing must be asynchronous if parsing/calculation might exceed typical request timeouts.
- ImportJob states: `PENDING -> PROCESSING -> SUCCEEDED | FAILED`.

Acceptance criteria:
- Job status is visible to user; UI can poll or use server-sent events.
- Failed jobs include a reason category (validation, parsing, internal error).

### FR-3 Parse and normalize data
- Parse CSV rows into internal `Transaction` and `LineItem` structures (see Domain Model).
- Normalize all currency to integer minor units (cents).
- Normalize dates to a single canonical timezone policy (define; typically store as UTC + preserve shop timezone if available).

Acceptance criteria:
- For a known fixture CSV, normalized row counts and totals match golden tests.

### FR-4 Deterministic calculation engine
Compute:
- Gross revenue (definition in calculation spec)
- Fees (payment processing / Shopify fees if present)
- Refund totals
- Ad spend (optional input; if missing, do not assume 0)
- Net profit (definition in calculation spec)
- Profit per product and margin %

Acceptance criteria:
- Given the same input file + calculation version, results must be identical.

### FR-5 Generate monthly report
- User selects a month (or system detects month(s) present).
- System produces:
  - “Executive Summary” numbers
  - Top product(s) by profit
  - Lowest-margin product(s)
  - Warnings (rule-based, no speculation)
  - “Data gaps” section listing what was missing

Acceptance criteria:
- Report displays within <= 3 seconds after job succeeds (cached summary ok).
- Report includes “Data sources used” (which files/inputs).

### FR-6 Plain-English explanation layer (AI)
- AI receives structured results only (no raw CSV).
- AI produces explanation conforming to tone + guardrails:
  - no speculation
  - no invented numbers
  - must mirror exact computed numbers
  - must mention missing inputs explicitly

Acceptance criteria:
- If ad spend not provided, AI must not mention ad efficiency.
- Output matches required structure defined in AI guardrails doc (later).

### FR-7 Billing (optional staging)
- Users can see one report (or a limited trial) without paying.
- Subscription required for continued monthly access.

Acceptance criteria:
- Access control is enforced server-side; not UI-only.

## Non-functional requirements (NFR)

### NFR-1 Privacy
- Uploaded CSV contains sensitive business data.
- By default: delete raw upload after processing within a short TTL (e.g., 24h) unless user explicitly opts to store.
- Do not log raw rows, emails, addresses, full order IDs.

Acceptance criteria:
- Logs contain no CSV content.
- Retention policy is implemented and tested.

### NFR-2 Security
- Treat uploads as untrusted input.
- Validate file type and content.
- Rate limit uploads.
- Strict auth checks for accessing ImportJobs/Reports.

Acceptance criteria:
- User A cannot access User B’s job/report.
- Upload endpoint rate limits by IP + user.

### NFR-3 Reliability
- Processing should be resilient to transient failures (queue retries).
- Deterministic engine must be pure and testable.

Acceptance criteria:
- Retry does not double-count data.
- Job is idempotent when re-processed.

### NFR-4 Performance
- For typical CSV sizes (<50k rows), processing completes under 60 seconds.
- Report render under 3 seconds after compute is done.

### NFR-5 Maintainability
- Calculation logic isolated from web/API.
- Schema changes handled via explicit versioning.

Acceptance criteria:
- Add a new metric without touching upload plumbing.

## Out of scope (V1)
- Forecasting
- Multi-currency conversion
- Live Shopify integration
- Multi-store org accounts
- Full bookkeeping features
