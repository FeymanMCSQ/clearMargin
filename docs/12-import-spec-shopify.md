# ClearMargin — Shopify Import Specification

## Purpose
CSV ingestion must be predictable, deterministic, and debuggable.

This document defines:
- which Shopify exports are supported
- how formats are detected
- validation rules
- normalization behavior

ClearMargin supports **explicit formats only**.
We do NOT attempt to guess unknown schemas.

---

## Supported Export (V1)

### Shopify Orders Export — Standard CSV

Source:
Shopify Admin → Orders → Export → CSV

Supported option:
✔ Export orders as CSV (default Shopify format)

Version label:
shopify_orders_v1

---

## Required Columns

The parser MUST verify existence.

| Column Name | Required | Purpose |
|------------|----------|---------|
| Name | YES | Order identifier |
| Created at | YES | Transaction timestamp |
| Financial Status | YES | Determines inclusion |
| Lineitem name | YES | Product name |
| Lineitem quantity | YES | Quantity sold |
| Lineitem price | YES | Revenue calculation |
| Total | YES | Order-level revenue |
| Total discounts | OPTIONAL | Discount handling |
| Refund Amount | OPTIONAL | Refund totals |
| Payment Method | OPTIONAL | Metadata |
| Currency | REQUIRED | Currency validation |

---

## Format Detection

Detection algorithm:

1. Verify CSV header row exists.
2. Match required column names.
3. Confirm Shopify naming conventions.
4. Assign:
   import_schema_version = shopify_orders_v1

If match fails:
→ Reject with UNSUPPORTED_FORMAT.

No heuristic guessing allowed.

---

## File Validation Rules

### File-level checks
- MIME type must be text/csv
- Encoding UTF-8
- Max size: configurable (default 20MB)
- Header row required
- Must contain >= 1 data row

---

### Row-level validation

Reject row if:
- invalid date format
- quantity not numeric
- price not numeric
- currency inconsistent

Rejected rows must be counted and reported.

Rule:
Invalid rows must NOT silently disappear.

---

## Handling Missing Columns

### Required column missing
→ Reject entire import.

### Optional column missing
→ Continue processing.
→ Record Data Gap.

Examples:
- Refund column missing → REFUNDS_UNKNOWN
- Fee column missing → FEES_UNKNOWN

Never substitute zero.

---

## Currency Rules

V1 constraint:
Single currency only.

If multiple currencies detected:
→ Reject import with explanation.

---

## Date Normalization

- Parse Shopify timestamp
- Convert to UTC
- Preserve original timezone if detectable

Monthly grouping uses store timezone when available.

---

## Duplicate Detection

Duplicate order handling:
- Detect identical Order Name + Timestamp.
- Ignore exact duplicates.
- Record duplicate count in metadata.

---

## Sample Row

Name,Created at,Financial Status,Lineitem name,Lineitem quantity,Lineitem price,Total,Currency
#1001,2026-01-05 12:33:22 +1000,paid,Minimalist Wallet,1,49.00,49.00,USD


---

## Parsing Output Requirements

Parser must produce normalized objects only:

Transaction
LineItem

Raw CSV must NOT propagate into business logic.

---

## Future Versions

New Shopify format support requires:
- new schema version
- new fixture tests
- decision log entry