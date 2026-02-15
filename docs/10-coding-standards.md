# ClearMargin — Coding Standards

## Philosophy
Consistency > cleverness.

Code must be readable by:
- future humans
- AI IDE agents
- tired founders at 2am

---

## Folder Structure

/core
  /domain
  /calculations
  /types

/api
  /routes
  /middleware

/worker
  /jobs
  /parsers

/ui
/docs

Rule:
Business logic lives ONLY in /core.

---

## Naming Conventions

Variables:
camelCase

Types:
PascalCase

Constants:
UPPER_SNAKE_CASE

Money variables:
*_cents

---

## Error Handling Pattern

Never throw raw errors to user.

Use:
AppError(code, message, safeDetails)

---

## Dependency Rules

Allowed:
ui -> api -> core

Forbidden:
core -> api
core -> ui

Core must remain pure.

---

## Adding a New Metric

1. update calculation-spec.md
2. implement in /core/calculations
3. add fixture test
4. expose via API
5. update report schema

If step 1 skipped → reject PR.

---

## Adding Report Section

1. define data contract
2. add deterministic computation
3. extend report model
4. update AI guardrails

UI must never invent metrics.

---

## Lint & Formatting
- strict TypeScript
- formatter enforced
- no unused exports
- no implicit any

---

## Code Review Rule

Readable > clever
Deterministic > smart
Explicit > implicit
