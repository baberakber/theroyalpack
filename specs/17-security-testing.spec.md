# 17 — Security Testing Specification

> OWASP Top 10 checklist, form security, file upload security, admin auth testing, CSP headers, rate limiting, and dependency scanning.

---

## 1. Overview

This document outlines security testing requirements for the Xerostop Cups website. All items must be verified before production launch.

| Category | Priority | Coverage |
|----------|----------|----------|
| Authentication & Session | Critical | Admin panel |
| Input Validation | Critical | All forms, API routes |
| File Upload | Critical | Quote form, admin gallery |
| XSS Prevention | Critical | All user-generated content |
| CSRF Protection | High | All state-changing operations |
| Rate Limiting | High | All API endpoints |
| Security Headers | High | All responses |
| Dependency Security | Medium | All npm packages |

---

## 2. OWASP Top 10 Checklist

### 2.1 A01:2021 — Broken Access Control

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| Admin routes without auth | 401/redirect to login | `curl /admin/dashboard` without session |
| Admin API without auth | 401 Unauthorized | `curl -X POST /api/admin/gallery` |
| Direct object reference | Cannot access other users' data | N/A (single admin user) |
| Path traversal in file upload | Blocked | Upload file with `../` in name |
| Method tampering | Only allowed methods work | `curl -X DELETE /api/quote` (should fail) |

**Implementation Checklist:**
- [ ] Middleware protects all `/admin/*` routes except `/admin/login`
- [ ] API routes verify session with `getServerSession()`
- [ ] File paths are sanitized (no `..` allowed)
- [ ] HTTP methods are explicitly allowed per route

### 2.2 A02:2021 — Cryptographic Failures

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| HTTPS enforcement | All traffic over HTTPS | Check redirect from HTTP |
| Secure cookies | `Secure`, `HttpOnly`, `SameSite` flags | Browser dev tools |
| Password storage | Hashed with bcrypt (cost ≥12) | Code review |
| Sensitive data in URL | Not exposed | Check for tokens in URLs |

**Implementation Checklist:**
- [ ] HTTPS enforced (redirect HTTP → HTTPS)
- [ ] Session cookies have `Secure`, `HttpOnly`, `SameSite=Lax`
- [ ] Admin password hashed with bcrypt, never stored in plain text
- [ ] No sensitive data in URL parameters
- [ ] `.env` file not committed to repository

### 2.3 A03:2021 — Injection

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| SQL injection | N/A (no SQL database in v1) | — |
| NoSQL injection | N/A (JSON file storage) | — |
| Command injection | Blocked | Try `; rm -rf /` in form fields |
| Email header injection | Blocked | Try `\r\nBcc: attacker@evil.com` in email field |
| Path injection | Blocked | Try `../../../etc/passwd` in file paths |

**Implementation Checklist:**
- [ ] All inputs validated with Zod before processing
- [ ] No shell commands executed with user input
- [ ] Email fields sanitized before use in Nodemailer
- [ ] File paths constructed with `path.join()` and validated

### 2.4 A04:2021 — Insecure Design

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| Rate limiting | Requests blocked after limit | Automated requests exceeding limit |
| Account lockout | N/A (single admin, consider adding) | — |
| Business logic flaws | Cannot bypass quote/sample flow | Manual testing |

**Implementation Checklist:**
- [ ] Rate limiting on all form submissions (5/hour for quote, 3/hour for sample)
- [ ] No way to bypass form validation client-side only
- [ ] Server-side validation matches client-side

### 2.5 A05:2021 — Security Misconfiguration

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| Error messages | Generic messages, no stack traces | Trigger errors in production |
| Debug mode | Disabled in production | Check `NODE_ENV` |
| Default credentials | Changed from defaults | Verify `.env` |
| Unnecessary features | Disabled (e.g., directory listing) | Check server config |
| Security headers | All present | `curl -I` or securityheaders.com |

**Implementation Checklist:**
- [ ] `NODE_ENV=production` in production
- [ ] Error boundaries show generic messages
- [ ] Stack traces not exposed in API responses
- [ ] All default passwords changed
- [ ] Security headers configured (see Section 6)

### 2.6 A06:2021 — Vulnerable and Outdated Components

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| npm audit | No high/critical vulnerabilities | `npm audit` |
| Outdated packages | All up to date | `npm outdated` |
| Known CVEs | None in dependencies | Snyk or similar |

**Implementation Checklist:**
- [ ] Run `npm audit` before each release
- [ ] Set up Dependabot or Renovate for automated updates
- [ ] Use `npm audit fix` or manual updates for vulnerabilities
- [ ] Pin major versions to avoid breaking changes

### 2.7 A07:2021 — Identification and Authentication Failures

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| Brute force login | Rate limited | Automated login attempts |
| Session fixation | New session on login | Check session ID before/after login |
| Session timeout | 24-hour expiry | Wait or modify token |
| Logout invalidates session | Token invalid after logout | Use old token after logout |

**Implementation Checklist:**
- [ ] Login rate limited (5 attempts per 15 minutes)
- [ ] New session token generated on successful login
- [ ] Session expires after 24 hours
- [ ] Logout properly invalidates JWT

### 2.8 A08:2021 — Software and Data Integrity Failures

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| File upload integrity | Only allowed types | Upload disguised files |
| CI/CD security | Protected secrets | Review pipeline config |
| Subresource integrity | SRI for CDN resources | Check `<script>` tags |

**Implementation Checklist:**
- [ ] File uploads validated by magic bytes, not just extension
- [ ] CI/CD secrets not exposed in logs
- [ ] External scripts use SRI hashes (if any)
- [ ] Package-lock.json committed

### 2.9 A09:2021 — Security Logging and Monitoring Failures

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| Failed login logging | Logged with IP | Check logs after failed login |
| API errors logging | Logged with context | Check logs after API error |
| Sensitive data in logs | Not logged | Review log outputs |

**Implementation Checklist:**
- [ ] Failed login attempts logged (IP, timestamp, email attempted)
- [ ] API errors logged with request context (no sensitive data)
- [ ] Passwords, tokens never logged
- [ ] Consider log aggregation service (Vercel logs, etc.)

### 2.10 A10:2021 — Server-Side Request Forgery (SSRF)

| Test | Expected Result | How to Test |
|------|-----------------|-------------|
| URL in form fields | Not used for server requests | N/A (no URL-based operations) |

**Implementation Checklist:**
- [ ] No user-provided URLs used in server-side requests
- [ ] If URL handling added later, validate against allowlist

---

## 3. Form Security Testing

### 3.1 Quote Form (`/get-a-quote`)

| Test | Input | Expected |
|------|-------|----------|
| XSS in name | `<script>alert('xss')</script>` | Escaped in email, stored safely |
| XSS in message | `<img src=x onerror=alert('xss')>` | Escaped |
| SQL in fields | `'; DROP TABLE users; --` | Treated as literal string |
| Very long input | 10,000 character message | Rejected (max 2000) |
| Invalid email | `not-an-email` | Validation error |
| Negative quantity | `-1000` | Validation error |
| Non-integer quantity | `1000.5` | Rounded or rejected |
| Missing required fields | Empty name | Validation error |
| Rate limit | 6th request in 1 hour | 429 Too Many Requests |

### 3.2 Sample Form (`/request-sample`)

| Test | Input | Expected |
|------|-------|----------|
| XSS in address | `<script>` in address line | Escaped |
| Invalid country | Non-existent country code | Validation error |
| Rate limit | 4th request in 1 hour | 429 |

### 3.3 Contact Form (`/contact`)

| Test | Input | Expected |
|------|-------|----------|
| Email header injection | `victim@test.com\r\nBcc: attacker@evil.com` | Rejected or sanitized |
| XSS in subject | `<script>` in subject | Escaped |
| Rate limit | 6th request in 1 hour | 429 |

---

## 4. File Upload Security

### 4.1 Quote Form File Upload

| Test | Attack | Expected |
|------|--------|----------|
| File type bypass | Rename `.exe` to `.pdf` | Rejected (magic byte check) |
| Large file | 50MB file | Rejected (max 10MB) |
| Malicious PDF | PDF with JavaScript | File scanned or handled safely |
| Path traversal | Filename `../../../etc/passwd` | Sanitized, UUID filename used |
| Null byte | Filename `file.pdf%00.exe` | Rejected |
| Double extension | `file.pdf.exe` | Rejected or extension stripped |
| Empty file | 0-byte file | Rejected |
| File bomb | Zip bomb | Size limit prevents |

### 4.2 Admin Gallery Upload

| Test | Attack | Expected |
|------|--------|----------|
| Non-image file | Upload `.html` as image | Rejected |
| Image with embedded code | EXIF data with script | Stripped or safe |
| Oversized image | 100MB image | Rejected (max 5MB) |
| Invalid dimensions | Corrupted image header | Rejected |

### 4.3 Implementation

```tsx
// File validation function
import fileType from 'file-type';

const ALLOWED_TYPES = new Map([
  ['image/jpeg', ['.jpg', '.jpeg']],
  ['image/png', ['.png']],
  ['image/webp', ['.webp']],
  ['application/pdf', ['.pdf']],
  // Add more as needed
]);

async function validateFile(file: File): Promise<boolean> {
  // Check size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }

  // Check magic bytes
  const buffer = await file.arrayBuffer();
  const type = await fileType.fromBuffer(buffer);

  if (!type || !ALLOWED_TYPES.has(type.mime)) {
    throw new Error('Invalid file type');
  }

  return true;
}
```

---

## 5. Admin Authentication Testing

### 5.1 Login Tests

| Test | Action | Expected |
|------|--------|----------|
| Valid login | Correct email + password | Session created, redirect to dashboard |
| Invalid email | Wrong email | Error: "Invalid email or password" |
| Invalid password | Wrong password | Error: "Invalid email or password" |
| Empty fields | No input | Validation error |
| Brute force | 10 rapid login attempts | Rate limited after 5 |
| SQL injection in login | `' OR 1=1 --` in email | Login fails |
| Session persistence | Close/reopen browser | Session maintained (within 24h) |
| Session expiry | Wait 24+ hours | Redirect to login |
| Logout | Click logout | Session invalidated, redirect to login |
| Access after logout | Use old session token | 401 Unauthorized |

### 5.2 Protected Route Tests

| Test | Action | Expected |
|------|--------|----------|
| Dashboard without auth | Direct URL access | Redirect to login |
| Gallery page without auth | Direct URL access | Redirect to login |
| FAQ page without auth | Direct URL access | Redirect to login |
| API without auth | `POST /api/admin/gallery` | 401 Unauthorized |
| Tampered JWT | Modified token payload | 401 Unauthorized |

---

## 6. Security Headers

### 6.1 Required Headers

Configure in `next.config.js` or middleware:

```tsx
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 6.2 Content Security Policy

```tsx
{
  key: 'Content-Security-Policy',
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://www.google-analytics.com;
    frame-src 'self' https://www.google.com;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
  `.replace(/\n/g, ' '),
}
```

### 6.3 Testing Headers

```bash
# Check headers
curl -I https://www.xerostopcups.com

# Use online tool
# https://securityheaders.com
```

---

## 7. Rate Limiting

### 7.1 Rate Limit Configuration

| Endpoint | Limit | Window | Response |
|----------|-------|--------|----------|
| `POST /api/quote` | 5 | 1 hour | 429 Too Many Requests |
| `POST /api/sample` | 3 | 1 hour | 429 |
| `POST /api/contact` | 5 | 1 hour | 429 |
| `POST /api/auth` (login) | 5 | 15 minutes | 429 |
| `GET /api/admin/*` | 100 | 1 minute | 429 |
| `POST /api/admin/*` | 30 | 1 minute | 429 |

### 7.2 Testing

```bash
# Test rate limiting
for i in {1..10}; do
  curl -X POST https://www.xerostopcups.com/api/quote \
    -H "Content-Type: application/json" \
    -d '{"name":"Test"}'
done

# Expect: First 5 succeed (or fail validation), last 5 return 429
```

### 7.3 Implementation

For production, consider using Upstash Rate Limit:

```tsx
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }

  // Process request...
}
```

---

## 8. Dependency Scanning

### 8.1 npm Audit

Run before each deployment:

```bash
npm audit

# Fix automatically where possible
npm audit fix

# Check for outdated packages
npm outdated
```

### 8.2 Automated Scanning

Set up GitHub Dependabot:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### 8.3 License Compliance

```bash
npx license-checker --summary
```

Ensure no copyleft licenses in production dependencies.

---

## 9. Pre-Launch Security Checklist

### 9.1 Configuration

- [ ] `NODE_ENV=production`
- [ ] All `.env` variables set for production
- [ ] HTTPS enforced
- [ ] Debug/development features disabled
- [ ] Error messages are generic
- [ ] Logging configured (no sensitive data)

### 9.2 Authentication

- [ ] Admin password is strong and hashed
- [ ] Session expiry configured (24 hours)
- [ ] Login rate limiting active
- [ ] Logout invalidates session

### 9.3 Forms & API

- [ ] All inputs validated with Zod
- [ ] Rate limiting on all form endpoints
- [ ] CSRF protection active
- [ ] File uploads validated by magic bytes
- [ ] XSS prevented (output encoding)

### 9.4 Headers

- [ ] HSTS enabled
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set
- [ ] CSP configured
- [ ] Referrer-Policy set

### 9.5 Dependencies

- [ ] `npm audit` shows no high/critical issues
- [ ] All packages reasonably up to date
- [ ] Dependabot or Renovate configured

---

## 10. Ongoing Security

### 10.1 Regular Tasks

| Task | Frequency |
|------|-----------|
| `npm audit` | Weekly / before each deploy |
| Dependency updates | Monthly |
| Password rotation | Annually |
| Security header check | Quarterly |
| Penetration testing | Annually (optional) |

### 10.2 Incident Response

If a security issue is discovered:

1. Assess severity and scope
2. Contain (e.g., disable affected feature)
3. Investigate root cause
4. Fix and deploy
5. Notify affected parties if required
6. Document and improve

---

## 11. Testing Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `npm audit` | Dependency vulnerabilities | `npm audit` |
| OWASP ZAP | Automated security scanning | Run against staging |
| Burp Suite | Manual penetration testing | Intercept and modify requests |
| securityheaders.com | Header analysis | Paste URL |
| cURL | Manual API testing | Command line |
| Browser DevTools | Cookie/header inspection | F12 |
