# ClearMargin — Vision

## One-liner
ClearMargin turns a Shopify export into a calm, plain-English monthly profit reality check.

## Target user
### Primary
- Solo Shopify store owners (no finance team, no accountant)
- Store size: ~$1k–$20k/month revenue
- Feels overwhelmed by dashboards/spreadsheets
- Needs clarity, not optimization

### Secondary (allowed but not optimized for)
- Small teams (1–3 people) running a Shopify store
- Part-time sellers

### Explicit non-target
- Shopify Plus / enterprise brands
- Agencies managing multiple stores
- Finance teams wanting custom accounting workflows
- Users seeking forecasting, attribution modeling, cohort analytics, LTV, etc.

## Core promise
After uploading a Shopify export, the user gets:
1) A clear answer to “Did I actually make money?”
2) The most profitable product(s) and why
3) What is quietly draining profit (fees/refunds/ads where available)
…without needing accounting knowledge.

## Product philosophy
- Clarity > completeness
- Deterministic numbers > “smart” guesses
- Minimal workflow > deep integrations
- Explain reality, don’t invent it

## What ClearMargin is
- A monthly business summary generator
- A deterministic calculation engine + a plain-English explanation layer
- A decision-clarity tool (not a dashboard)

## What ClearMargin is NOT (non-goals)
- Not a bookkeeping system (no chart of accounts, no reconciliation, no journals)
- Not an analytics dashboard (no endless charts, no custom dimensions)
- Not forecasting (no predictions, no “next month will…”)
- Not ad attribution (no ROAS modeling beyond what’s explicitly provided)
- Not “AI financial advisor” (no strategy, no speculative recommendations)

## V1 scope (must-have)
### Inputs
- Upload one supported Shopify export format (CSV)
- Optional: user can also upload an “ad spend” CSV OR manually enter ad spend per month (define in requirements)

### Outputs
- Monthly summary view for a selected month
- Key numbers: Revenue, Refunds, Fees, Ad spend (if provided), Net Profit
- Top product(s) by profit (as defined by calculation spec)
- Lowest-margin product(s)
- A small set of warnings based only on provided data (e.g., ad spend exceeds gross profit)

### UX
- No account required for first result (optional; allowed if needed for billing)
- Calm report layout; “executive summary” feel
- Export report to PDF (optional for v1 if time)

### Pricing
- Early access subscription: $10/month (assumption; billing implementation can be staged)

## V1 constraints / guardrails
- Single-store, single-user assumption (no multi-tenant org features beyond basic tenancy)
- Support only one Shopify export schema for launch
- If required data is missing, show “Not provided” rather than guessing

## Success metrics (V1)
- Activation: % who upload CSV and see a report within 3 minutes
- Retention proxy: % who upload again next month / return in 30 days
- Support load: < X% reports disputed as “wrong”
- Conversion: visitor → trial/report view → paid

## V2 parking lot (explicitly not V1)
- Direct Shopify integration (OAuth)
- Multi-store dashboard
- Multi-currency conversion
- COGS / inventory integration
- Automated ad platform pulls (Meta/Google)
- Advanced segmentation (channels, cohorts)
- Benchmarks across sellers

## Open questions (tracked but not blocking)
- Which Shopify export exact format are we supporting first?
- Will we store uploads long-term or delete after processing?
- Do we require login before first report or only for billing?
