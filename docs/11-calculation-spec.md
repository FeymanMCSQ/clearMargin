# ClearMargin — Calculation Specification

## Philosophy
Numbers must be defensible.

Every metric must be explainable line-by-line.

---

## Currency Rules
V1 supports:
- SINGLE currency per import.

If multiple currencies detected:
→ reject upload with clear error.

All values stored in integer cents.

---

## Revenue Definition

Gross Revenue =
Sum of all completed sales before refunds.

Includes:
- product sales
- shipping revenue (if present)

Excludes:
- taxes (if identifiable)
- cancelled orders

---

## Refunds Definition

Refund Total =
Sum of all refunded amounts.

Must include:
- full refunds
- partial refunds

Refunds reduce revenue impact.

---

## Fees Definition

Fees include:
- payment processing fees
- Shopify transaction fees
(if present in export)

If fees missing:
→ mark as DATA GAP.

---

## Ad Spend

Optional input.

If absent:
ad_spend_cents = null

Never assume zero.

---

## Net Profit Equation

net_profit =
revenue
- refunds
- fees
- ad_spend (if provided)

No other adjustments in V1.

---

## Product Profit Allocation

Per-product revenue:
sum line item sales.

Refund allocation:
refund assigned to original product.

Fee allocation:
proportional to product revenue share.

Ad spend allocation (if provided):
proportional to product revenue.

---

## Margin Calculation

margin_percent =
profit / revenue

If revenue == 0 → margin undefined.

---

## Rounding Rules

- Perform all math in cents.
- Round only at presentation layer.
- Never round intermediate totals.

---

## Data Gaps Rules

If any required category missing:
add entry to `data_gaps`.

Examples:
- FEES_UNKNOWN
- AD_SPEND_NOT_PROVIDED

---

## Versioning

Every change to formulas requires:
- calc_version increment
- migration note
- updated fixtures

Old reports must remain reproducible.
