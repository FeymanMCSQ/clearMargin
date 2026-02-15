# ClearMargin — API Contracts

## Principles
- JSON only.
- All responses include a stable `request_id`.
- Errors use a single format.
- All endpoints are tenant-scoped (auth required where applicable).

## Error format (global)
```json
{
  "request_id": "req_123",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required column: net_sales",
    "details": {
      "missing_columns": ["net_sales"]
    }
  }
}
Common error codes:

VALIDATION_ERROR

UNSUPPORTED_FORMAT

FILE_TOO_LARGE

UNAUTHORIZED

FORBIDDEN

NOT_FOUND

RATE_LIMITED

INTERNAL_ERROR

Endpoints
POST /api/imports

Upload a Shopify CSV and create an ImportJob.

Request:

multipart/form-data

file: CSV

optional metadata: store_timezone, currency_code (if not in file)

Response (201):

{
  "request_id": "req_123",
  "job": {
    "id": "job_uuid",
    "status": "PENDING",
    "created_at": "2026-02-19T10:00:00Z",
    "import_schema_version": "shopify_export_v1",
    "calc_version": "calc_v1",
    "ai_version": "ai_v1"
  }
}


Notes:

Should be idempotent only if client provides an idempotency key (optional V1).

GET /api/imports/{jobId}

Get job status.

Response (200):

{
  "request_id": "req_124",
  "job": {
    "id": "job_uuid",
    "status": "SUCCEEDED",
    "progress": {
      "stage": "COMPUTE",
      "percent": 100
    },
    "error": null
  }
}

GET /api/reports?jobId={jobId}&month=YYYY-MM

Retrieve a report for a month.

Response (200):

{
  "request_id": "req_125",
  "report": {
    "job_id": "job_uuid",
    "month": "2026-01",
    "headline_metrics": {
      "revenue_cents": 1243000,
      "refunds_cents": 184000,
      "fees_cents": 230000,
      "ad_spend_cents": null,
      "net_profit_cents": 829000,
      "currency_code": "USD"
    },
    "top_products": [
      {
        "product_id": "p1",
        "product_name": "Minimalist Leather Wallet",
        "profit_cents": 214000,
        "margin_percent": 0.32
      }
    ],
    "low_margin_products": [],
    "warnings": [
      "Ad spend not provided; ad-related profitability cannot be assessed."
    ],
    "data_gaps": ["AD_SPEND"],
    "ai_summary": {
      "summary_paragraph": "…",
      "bullets": ["…", "…"],
      "limitations": ["Ad spend not provided."]
    },
    "versions": {
      "import_schema_version": "shopify_export_v1",
      "calc_version": "calc_v1",
      "ai_version": "ai_v1",
      "report_version": "report_v1"
    }
  }
}

GET /api/reports/months?jobId={jobId}

List months available in the import.

Response (200):

{
  "request_id": "req_126",
  "months": ["2025-11", "2025-12", "2026-01"]
}

Auth rules

If auth is enabled in V1:

All /api/*endpoints require user session except initial “trial upload” path if you choose that.

Tenant enforcement:

jobId/report must belong to current user; otherwise 404 or 403 (choose and document).

Rate limits (minimum viable)

Upload: X per minute per IP/user

Report fetch: higher limit, cached

Versioning

Versions are returned in report payload.

Breaking API changes bump v2 path or header-based versioning (choose later).