# ClearMargin — Security Model

## Security Philosophy
Trust is a feature.

ClearMargin handles financial truth.
Security failures destroy product credibility immediately.

Default assumption:
All inputs are hostile.

---

## Authentication Model

V1 Options:
- Magic link authentication OR
- Email/password with secure hashing

Requirements:
- Password hashing: bcrypt/argon2 only
- Sessions stored securely
- HttpOnly cookies
- Secure flag enabled

No localStorage tokens.

---

## Authorization Model

Every resource must verify ownership.

Checks required for:
- ImportJob
- Reports
- File access

Rule:
UserID must be validated in database query itself.

Never:
fetch then filter.

---

## Rate Limiting

Required limits:
- Upload endpoint
- Auth endpoints
- Report generation

Suggested:
- IP + user based throttling
- burst allowed, sustained abuse blocked

---

## File Upload Hardening

Must enforce:
- MIME type validation
- Extension validation (.csv only)
- Size limit enforcement
- Character encoding validation

Reject:
- executable formats
- archives
- malformed CSVs

---

## CSV Injection Protection

Danger:
Spreadsheet formulas can execute commands when exported.

Mitigation:
- sanitize cells starting with:
  = + - @

before exporting or rendering.

---

## Malware Scanning (Minimum Viable)

V1:
- reject non-text uploads
- optional antivirus scanning via provider
- quarantine suspicious files

---

## Content-Type Validation

Never trust browser headers.

Server must:
- inspect file content
- verify text/csv format

---

## OWASP Controls (Required)

- input validation everywhere
- output escaping
- CSRF protection
- secure headers
- dependency vulnerability scanning
- prepared SQL statements only

---

## Secrets Management

Secrets must NEVER:
- exist in repository
- exist in client bundle
- be printed to logs

Use:
- environment variables
- secret manager

Rotate:
- API keys
- database credentials

---

## AI Security Boundary

AI output is UNTRUSTED TEXT.

Never:
- execute
- parse as commands
- trust formatting

AI text is display-only.

---

## Incident Response (Minimum)

If breach suspected:
1. revoke tokens
2. disable uploads
3. preserve logs
4. notify users if data exposure confirmed
