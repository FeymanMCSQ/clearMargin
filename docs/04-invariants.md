# ClearMargin — Invariants (Non-negotiable)

These are the laws of physics. Code must conform. If a feature conflicts, the feature is wrong.

## I-1 Deterministic calculations
All financial metrics are computed deterministically from inputs.
- No AI influence on calculations.
- No randomization.
- Same input + same versions => identical output.

## I-2 AI is explanation only
AI may only:
- paraphrase
- summarize
- point out rule-based patterns derived from computed metrics
AI may NOT:
- invent numbers
- infer missing values
- claim causality (e.g., “ads caused…”)
- give financial advice beyond “check X” or “consider reviewing Y”

## I-3 No silent defaults for missing data
If ad spend not provided:
- `ad_spend_cents = null`
- report must display “Not provided”
- AI must acknowledge limitation

Same rule applies to any optional category.

## I-4 Money is stored and computed in integer minor units
- No floats in persistent storage
- No float-based arithmetic in the compute engine
- Rounding rules are defined in calculation spec and applied consistently

## I-5 Uploads are untrusted input
- Validate size, type, encoding
- Parse defensively (CSV injection, formula injection, weird delimiters)
- Never execute or render raw CSV without sanitization

## I-6 Reports are reproducible and auditable
Every report must include:
- import schema version
- calc version
- AI prompt/version
- a list of inputs used (file refs or checksums)
- a list of missing inputs (data gaps)

## I-7 Separation of concerns
- UI never computes business metrics.
- API never re-implements compute formulas.
- All formulas live in the compute engine module (`/core`).

## I-8 Security of tenant data
- Every job/report is owned by a user/tenant.
- Access checks are enforced server-side on every read.

## I-9 User-safe errors
- Never expose stack traces to users.
- Errors must be categorized and actionable: “missing required column X”, “unsupported export format”, etc.

## I-10 Logging is privacy-preserving
- No raw CSV rows in logs
- No customer PII in logs
- Use job IDs, counts, and high-level totals only
