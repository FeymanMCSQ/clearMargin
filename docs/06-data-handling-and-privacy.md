# ClearMargin — Data Handling & Privacy

## Philosophy
ClearMargin processes sensitive business financial data.

We minimize risk by:
- storing the least data possible
- retaining data for the shortest time necessary
- isolating computation from raw inputs
- never storing customer-level PII unless absolutely required

ClearMargin is a **summary generator**, not a data warehouse.

---

## Data Classification

### Level 1 — Public
- Marketing site content
- Documentation
Risk: None

---

### Level 2 — Operational Metadata
Stored long-term.

Examples:
- user id
- import job id
- timestamps
- schema versions
- aggregate totals

Risk: Low

---

### Level 3 — Business Financial Data
Derived, aggregated results.

Examples:
- monthly revenue
- refunds total
- profit numbers
- product profit summaries

Stored persistently.

Risk: Medium

---

### Level 4 — Raw Upload Data (Sensitive)
Shopify CSV exports.

May contain:
- order ids
- customer identifiers
- product data
- financial transactions

Risk: High

Policy: **temporary storage only**

---

## Data Storage Policy

### Stored permanently
- MonthlySummary
- ProductProfit
- Report outputs
- ImportJob metadata

### NOT stored permanently
- Raw CSV uploads
- Row-level customer information
- Full transaction history after aggregation (preferred)

---

## File Retention Policy

Default:
- Upload stored temporarily in object storage.
- Deleted automatically within **24 hours** after successful processing.

Failure case:
- Retain file up to 72 hours for debugging.
- Automatically purge afterward.

Implementation requirement:
- Scheduled cleanup job MUST exist.
- Deletion failures must trigger alert.

---

## Encryption

### In transit
- HTTPS required everywhere.
- TLS 1.2+ minimum.

### At rest
- Database encryption provided by infrastructure.
- Object storage encrypted by provider.

### Application rules
- Never store raw financial files unencrypted locally.
- Temporary processing files must use OS temp directories.

---

## Logging Policy

### Allowed in logs
- job_id
- processing duration
- row counts
- aggregated totals (optional)

### Forbidden in logs
- customer emails
- addresses
- full order IDs
- CSV row contents
- uploaded filenames containing identifiable info

Rule:
Logs must never allow reconstruction of a user's business data.

---

## Access Controls

Every object is tenant scoped.

Rules:
- User may access only their own ImportJobs and Reports.
- Access validated server-side.
- Never rely on frontend filtering.

---

## Data Deletion Requests

User must be able to:
- delete account
- delete all associated reports

Deletion means:
- remove user record
- remove reports
- remove aggregates
- purge remaining files

Deletion must be irreversible.

---

## Threat Model (Lite)

Primary risks:
1. Accidental long-term storage of sensitive uploads
2. Cross-tenant data leakage
3. Logging sensitive data
4. Compromised API credentials
5. Malicious file uploads

Mitigations:
- strict retention
- tenant isolation checks
- sanitized logging
- scoped credentials
- upload validation

---

## Privacy Principle

If ClearMargin disappeared tomorrow,
no user's customer database should exist inside it.
