# ClearMargin — Testing Strategy

## Philosophy
Financial software fails silently.
Tests exist to prove numbers cannot drift.

---

## Test Pyramid

1. Core Calculation Tests (highest priority)
2. Parsing Tests
3. API Contract Tests
4. UI Tests

---

## Golden Fixtures

Core requirement.

Store known CSV inputs:

fixtures/shopify/basic.csv
fixtures/shopify/refunds.csv
fixtures/shopify/edge_cases.csv

Each fixture includes expected outputs:
- revenue
- refunds
- fees
- profit
- product rankings

Test rule:
Running calculation must match expected values exactly.

If output changes → intentional version bump required.

---

## Property-Based Tests

Validate invariants:

Examples:
- revenue >= 0
- net_profit = revenue - fees - refunds - ad_spend
- product profits sum ≈ monthly profit
- removing transactions decreases totals

Randomized datasets allowed.

---

## Regression Suite

Must include cases:
- partial refunds
- duplicate orders
- zero revenue month
- large datasets
- negative profit
- discounts
- missing optional columns

Each historical bug becomes permanent regression test.

---

## API Contract Tests

Ensure responses match schema exactly.

Validate:
- required fields exist
- null vs zero correctness
- version fields present

---

## AI Output Tests

AI output must:
- include limitations when data missing
- never introduce new numbers
- reflect computed values exactly

Use snapshot testing cautiously.

---

## Performance Tests

Targets:
- 50k rows processed < 60s
- report render < 3s

---

## Definition of Done
Feature complete only when:
- tests added
- fixtures updated
- invariants preserved
