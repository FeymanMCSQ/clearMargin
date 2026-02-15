# ClearMargin — Operations

## Environment Variables

Required:
DATABASE_URL
STORAGE_BUCKET
AI_API_KEY
SESSION_SECRET
APP_URL
LOG_LEVEL

No defaults allowed for production.

---

## Database Migrations

Rules:
- schema changes only via migration files
- never modify production tables manually
- migrations reversible where possible

---

## Observability

### Logs
- structured JSON logs
- include request_id + job_id

### Metrics
Track:
- uploads/day
- processing duration
- failures
- report generation time

### Alerts
Trigger alerts for:
- job failure spikes
- queue backlog
- cleanup job failures

---

## Background Jobs

Worker responsibilities:
- parse CSV
- compute metrics
- generate AI summary
- cleanup expired uploads

Jobs must be:
- retryable
- idempotent

---

## Retry Strategy

Retry only transient failures:
- network
- storage
- AI API timeout

Never retry:
- validation failures

Backoff:
exponential with limit.

---

## Deployment Process

1. run migrations
2. deploy API
3. deploy worker
4. verify health checks

---

## Support Runbook
("User says profit is wrong")

Steps:
1. check calc_version
2. check schema version
3. confirm uploaded file
4. re-run job deterministically
5. compare totals with fixture logic

Never manually edit report data.

---

## Backup Policy
- daily DB backups
- retention >= 7 days minimum
