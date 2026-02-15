# ClearMargin — Domain Model

## Guiding rules
- Money is integer minor units (e.g., cents) stored as `int`/`bigint`.
- Dates stored as UTC timestamps; original timezone (if known) stored separately.
- Raw CSV is not the domain; normalized entities are.

## Entities

### User
- `id` (uuid)
- `email` (string)
- `created_at` (timestamp)
- `plan` (enum: FREE/TRIAL/PAID)

### ImportJob
Represents a single upload + processing run.
- `id` (uuid)
- `user_id` (uuid)
- `status` (PENDING | PROCESSING | SUCCEEDED | FAILED)
- `import_schema_version` (string)
- `calc_version` (string)
- `ai_version` (string)
- `file_ref` (string, optional, pointer to temp storage)
- `created_at`, `updated_at`
- `error_code` (optional enum)
- `error_message` (optional string, user-safe)

### ShopifyExport
Metadata about the uploaded file (not the content itself).
- `job_id`
- `original_filename`
- `row_count`
- `date_range_start`, `date_range_end`
- `currency_code` (string, e.g., "USD")
- `detected_columns` (string[])

### Transaction (Normalized)
Represents an order-related financial event.
- `id`
- `job_id`
- `occurred_at` (timestamp UTC)
- `type` (SALE | REFUND | FEE | AD_SPEND | ADJUSTMENT)
- `amount_cents` (signed int; refunds negative or separate type—choose ONE and be consistent)
- `currency_code`
- `source` (SHOPIFY | ADS_CSV | MANUAL)
- `external_ref` (optional; hashed if sensitive)

### LineItem (Normalized)
For product-level breakdowns.
- `id`
- `transaction_id`
- `product_id` (string)
- `product_name` (string)
- `quantity` (int)
- `gross_amount_cents` (int)
- `refund_amount_cents` (int, optional)

### MonthlySummary (Computed)
- `job_id`
- `month` (YYYY-MM)
- `revenue_cents`
- `refunds_cents`
- `fees_cents`
- `ad_spend_cents` (nullable; null means not provided)
- `net_profit_cents`
- `gross_margin_percent` (optional; depends on definitions)
- `data_gaps` (string[])
- `generated_at`

### ProductProfit (Computed)
- `job_id`
- `month`
- `product_id`
- `product_name`
- `revenue_cents`
- `refunds_cents`
- `allocated_fees_cents` (if fees allocated; define rules)
- `allocated_ad_spend_cents` (nullable if not provided)
- `profit_cents`
- `margin_percent`

### Report (Rendered)
- `job_id`
- `month`
- `headline_metrics` (structured object)
- `top_products` (ProductProfit[])
- `low_margin_products` (ProductProfit[])
- `warnings` (string[])
- `ai_summary` (structured fields; not free-form only)
- `report_version`

## Units & conventions
- Money: cents (integer), never float.
- Percent: integer basis points OR decimal string; choose one.
- Null vs 0:
  - 0 means explicitly computed as zero
  - null means “not provided / not computable”
