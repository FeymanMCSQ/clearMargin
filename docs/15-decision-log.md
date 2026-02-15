# ClearMargin — Decision Log (ADR)

Purpose:
Preserve reasoning behind architectural and product decisions.

Each entry prevents future re-argument of solved problems.

---

## Format

Date:
Decision:
Context:
Alternatives considered:
Decision:
Consequences:

---

## ADR-001
Date: 2026-02
Decision: CSV Upload First

Context:
Direct integrations increase complexity and approval friction.

Alternatives:
- Shopify OAuth integration
- Manual CSV upload

Decision:
Manual CSV upload for V1.

Consequences:
✔ faster launch
✔ fewer failures
✘ manual user step

---

## ADR-002
Date: 2026-02
Decision: Store money as integer cents

Context:
Floating point errors unacceptable for finance.

Decision:
All money stored in minor units.

Consequences:
✔ deterministic math
✔ auditability

---

## ADR-003
Date: 2026-02
Decision: AI as presentation layer only

Context:
AI-generated calculations destroy trust.

Decision:
AI limited to explanation.

Consequences:
✔ credibility
✔ reproducibility
