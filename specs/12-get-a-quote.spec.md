# 12 — Get a Quote Page

> Complex multi-section form with contact info, cup requirements, printing details, file upload.
> Includes API route, Zod validation, Nodemailer integration, and rate limiting.

**Route:** `/get-a-quote`
**File:** `src/app/get-a-quote/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | CTAs across all pages, nav menu, direct links with query params |
| **Conversion goal** | User submits a complete quote request |
| **Primary CTA** | "Submit Quote Request" |
| **Secondary CTA** | None (form is the goal) |
| **Exit paths** | Success → thank you state, Fail → retry with error |
| **Query params** | `?cup_type=`, `?size=`, `?industry=`, `?eco=true` (pre-fill form) |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Quote Form** (multi-section, single page — not multi-step)
3. **Sidebar: What to Expect**
4. **Success State**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Get a Quote`.
- **Heading (h1):** `"Get a Custom Quote"` — `text-h1`.
- **Intro:** `"Tell us about your cup requirements and we'll prepare a detailed quote. Most quotes are delivered within 24 hours."` — `text-body-lg`.

### 2.2 Quote Form

- **Layout:** Two columns on desktop — form (65%) + sidebar (35%). Single column on mobile (sidebar below).
- **Form sections** are visually separated with section headings and dividers.

#### Section 1: Contact Information

| Field | Type | Label | Placeholder | Validation | Required |
|-------|------|-------|-------------|------------|----------|
| `name` | text | Full Name | `"Your full name"` | min 2 chars | ✅ |
| `email` | email | Email Address | `"you@company.com"` | valid email | ✅ |
| `phone` | tel | Phone Number | `"+971 50 000 0000"` | valid phone (international) | ✅ |
| `company` | text | Company Name | `"Your company"` | min 2 chars | ❌ |
| `industry` | select | Industry | `"Select your industry"` | from industry list | ❌ |

Industry options: Café / Coffee Shop, Restaurant / Fast Food, Food Truck, Hotel / Hospitality, Airline / Travel, Hospital / Healthcare, Corporate / Events, Other.

#### Section 2: Cup Requirements

| Field | Type | Label | Placeholder | Validation | Required |
|-------|------|-------|-------------|------------|----------|
| `cupType` | select | Cup Type | `"Select cup type"` | from type list | ✅ |
| `cupSize` | select | Cup Size | `"Select size"` | from size list | ✅ |
| `quantity` | number | Quantity | `"e.g., 5000"` | min 1000 | ✅ |
| `lidRequired` | select | Lid Required? | — | Yes/No/Not Sure | ❌ |
| `sleeveRequired` | select | Sleeve Required? | — | Yes/No/Not Sure | ❌ |

Cup type options: Single-Wall, Double-Wall, Ripple-Wall, Not Sure.
Cup size options: 2.5oz, 4oz, 6oz, 7oz, 8oz, 9oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz, 22oz, Not Sure.

#### Section 3: Printing Details

| Field | Type | Label | Placeholder | Validation | Required |
|-------|------|-------|-------------|------------|----------|
| `needsPrinting` | radio | Do you need custom printing? | — | Yes/No | ✅ |
| `printingMethod` | select | Preferred Printing Method | `"Select method"` | from method list | ❌ (show if printing=yes) |
| `designReady` | radio | Is your design ready? | — | Yes, needs adaptation / No, need design support | ❌ (show if printing=yes) |
| `designFile` | file | Upload Your Design | `"AI, PDF, EPS, PSD, PNG"` | max 10MB, allowed types | ❌ (show if designReady=yes) |
| `colorCount` | select | Number of Print Colors | — | 1–6 / Full Color (CMYK) | ❌ (show if printing=yes) |

Printing method options: Offset (Full Color), Flexographic (Spot Colors), Not Sure.

#### Section 4: Additional Details

| Field | Type | Label | Placeholder | Validation | Required |
|-------|------|-------|-------------|------------|----------|
| `timeline` | select | When do you need the cups? | — | ASAP / Within 2 weeks / Within 1 month / Within 3 months / Not urgent | ❌ |
| `ecoPreference` | checkbox | I'm interested in eco-friendly options | — | boolean | ❌ |
| `message` | textarea | Additional Notes | `"Any other details or questions..."` | max 2000 chars | ❌ |

#### Section 5: Submit

- **Consent checkbox:** `"I agree to be contacted regarding this quote request."` — Required.
- **Submit button:** `"Submit Quote Request"` — variant `accent`, size `lg`, full-width on mobile.
- **Loading state:** Button shows spinner + `"Submitting..."`.
- **Character count** shown for textarea: `"0 / 2000"`.

### 2.3 Sidebar: What to Expect

- **Sticky** on desktop (scrolls with form, stops at bottom).
- **Content:**

**"What Happens Next?"**
1. `📧 Quote Delivery` — `"We'll email you a detailed quote within 24 hours."`.
2. `🎨 Design Support` — `"If you need design help, our team will reach out with options."`.
3. `📋 No Commitment` — `"This is a free, no-obligation quote."`.

**"Need Help Faster?"**
- Phone: `[CLIENT PLACEHOLDER]`.
- WhatsApp: `[CLIENT PLACEHOLDER]`.
- Email: `[CLIENT PLACEHOLDER]`.

**Sidebar Design:**
- `color-bg-secondary` bg, `radius-lg`, `padding space-6`.
- Each step: numbered with icon, `text-body-sm`.
- Contact info: bottom of sidebar, `border-t border-border`.

### 2.4 Success State

After successful submission, replace the form with:

- **Icon:** `CheckCircle`, 64px, `color-success`.
- **Heading (h2):** `"Thank You! Your Quote Request Has Been Sent."`.
- **Text:** `"We'll review your requirements and get back to you within 24 hours at [submitted email]."`.
- **Reference number:** `"Reference: QR-[TIMESTAMP]"`.
- **Actions:**
  - `"Submit Another Quote"` — resets form.
  - `"Return to Homepage"` → `/`.

---

## 3. Backend Requirements

### API Route

**Endpoint:** `POST /api/quote`
**File:** `src/app/api/quote/route.ts`

#### Request Body (Zod Schema)

```tsx
import { z } from 'zod';

export const quoteFormSchema = z.object({
  // Contact
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number').max(20),
  company: z.string().max(100).optional(),
  industry: z.string().optional(),

  // Cup Requirements
  cupType: z.enum(['single-wall', 'double-wall', 'ripple-wall', 'not-sure']),
  cupSize: z.string().min(1, 'Please select a cup size'),
  quantity: z.number().min(1000, 'Minimum order is 1,000 pieces').max(10000000),
  lidRequired: z.enum(['yes', 'no', 'not-sure']).optional(),
  sleeveRequired: z.enum(['yes', 'no', 'not-sure']).optional(),

  // Printing
  needsPrinting: z.enum(['yes', 'no']),
  printingMethod: z.string().optional(),
  designReady: z.enum(['yes', 'no']).optional(),
  colorCount: z.string().optional(),

  // Additional
  timeline: z.string().optional(),
  ecoPreference: z.boolean().optional(),
  message: z.string().max(2000).optional(),

  // Consent
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted' }),
  }),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
```

#### File Upload

- **Handled separately** via `FormData` with the file.
- **Max size:** 10MB.
- **Allowed types:** `.ai`, `.pdf`, `.eps`, `.psd`, `.png`, `.jpg`, `.jpeg`, `.tiff`.
- **Storage:** Save to `public/uploads/quotes/` with UUID filename, or use a cloud storage provider `[CLIENT PLACEHOLDER]`.
- **Security:** Validate file type by magic bytes (not just extension). Scan for malicious content.

```tsx
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/postscript',        // AI, EPS
  'image/png',
  'image/jpeg',
  'image/tiff',
  'image/vnd.adobe.photoshop',     // PSD
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
```

#### API Route Handler

```tsx
// src/app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { quoteFormSchema } from '@/lib/schemas/quote';
import { sendQuoteEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const rateLimitResult = await rateLimit(request, {
    windowMs: 60 * 60 * 1000,  // 1 hour
    max: 5,                     // 5 requests per hour per IP
  });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  // 2. Parse form data (supports multipart for file upload)
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  // 3. Validate with Zod
  const parsed = quoteFormSchema.safeParse({
    ...data,
    quantity: Number(data.quantity),
    ecoPreference: data.ecoPreference === 'true',
    consent: data.consent === 'true',
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 4. Handle file upload (if present)
  const file = formData.get('designFile') as File | null;
  let fileUrl: string | undefined;
  if (file && file.size > 0) {
    // Validate file size and type
    // Save file and get URL
    // fileUrl = await saveUploadedFile(file);
  }

  // 5. Send email via Nodemailer
  await sendQuoteEmail({
    ...parsed.data,
    designFileUrl: fileUrl,
  });

  // 6. Return success
  return NextResponse.json({
    success: true,
    reference: `QR-${Date.now()}`,
  });
}
```

#### Nodemailer Configuration

```tsx
// src/lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendQuoteEmail(data: QuoteEmailData) {
  // Send to business
  await transporter.sendMail({
    from: `"Xerostop Cups Website" <${process.env.SMTP_FROM}>`,
    to: process.env.QUOTE_RECIPIENT_EMAIL,
    subject: `New Quote Request from ${data.name} — ${data.cupType} ${data.cupSize}`,
    html: renderQuoteEmailTemplate(data),
  });

  // Send confirmation to customer
  await transporter.sendMail({
    from: `"Xerostop Cups" <${process.env.SMTP_FROM}>`,
    to: data.email,
    subject: 'We Received Your Quote Request — Xerostop Cups',
    html: renderConfirmationTemplate(data),
  });
}
```

#### Rate Limiting

```tsx
// src/lib/rate-limit.ts
// Simple in-memory rate limiter using Map
// For production, consider using upstash/ratelimit with Redis

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(
  request: NextRequest,
  options: { windowMs: number; max: number }
): Promise<{ success: boolean; remaining: number }> {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + options.windowMs });
    return { success: true, remaining: options.max - 1 };
  }

  if (record.count >= options.max) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: options.max - record.count };
}
```

---

## 4. Component Breakdown

```
src/
├── app/
│   ├── get-a-quote/
│   │   └── page.tsx                    # Server wrapper
│   └── api/
│       └── quote/
│           └── route.ts                # API route
├── components/
│   └── quote/
│       ├── QuoteForm.tsx               # 'use client' — form state management
│       ├── ContactSection.tsx          # Contact info fields
│       ├── CupRequirementsSection.tsx  # Cup type/size/qty
│       ├── PrintingSection.tsx         # Printing details (conditional)
│       ├── AdditionalSection.tsx       # Timeline, eco, message
│       ├── FileUpload.tsx              # File upload with preview
│       ├── QuoteSidebar.tsx            # What to expect + contact
│       └── QuoteSuccess.tsx            # Success state
├── lib/
│   ├── schemas/
│   │   └── quote.ts                    # Zod schema
│   ├── email.ts                        # Nodemailer
│   └── rate-limit.ts                   # Rate limiter
```

### Form State Management

```tsx
// Use React Hook Form + Zod resolver
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quoteFormSchema, QuoteFormData } from '@/lib/schemas/quote';

const form = useForm<QuoteFormData>({
  resolver: zodResolver(quoteFormSchema),
  defaultValues: {
    cupType: searchParams.get('cup_type') || '',
    cupSize: searchParams.get('size') || '',
    industry: searchParams.get('industry') || '',
    ecoPreference: searchParams.get('eco') === 'true',
    needsPrinting: 'yes',
  },
});
```

---

## 5. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Form layout | 2-col (form 65% + sidebar 35%) | 2-col (60/40) | 1-col, sidebar below |
| Form fields | 2-col for short fields (name/email in row) | Same | 1-col, all full-width |
| File upload | Inline | Same | Full-width |
| Sidebar | Sticky | Sticky | Static below form |
| Submit button | Right-aligned, auto-width | Same | Full-width |

---

## 6. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Printing section | Slide-down reveal | `needsPrinting` = "yes" |
| Design upload | Slide-down reveal | `designReady` = "yes" |
| File upload preview | Fade-in | File selected |
| Submit button | Loading spinner | Form submission |
| Success state | Fade-in + scale | Successful submit |
| Validation errors | Shake + fade-in | Invalid submission |

---

## 7. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Get a Quote — Custom Paper Cups | Xerostop Cups',
  description: 'Request a free quote for custom paper cups with printing. Tell us your requirements and receive a detailed quote within 24 hours.',
  openGraph: {
    title: 'Get a Quote — Custom Paper Cups | Xerostop Cups',
    description: 'Free, no-obligation quote for custom branded paper cups.',
    images: [{ url: '/og/get-a-quote.jpg', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

## 8. Accessibility

- All form fields have visible `<label>` elements.
- Error messages linked to fields via `aria-describedby`.
- Required fields marked with `aria-required="true"` and visual asterisk.
- File upload: `aria-label` describing accepted types and size limit.
- Form validation errors: `aria-live="polite"` error summary at top.
- Focus moves to first error field on invalid submission.
- Success state: `role="alert"` for screen reader announcement.

---

## 9. Performance

- Form: client component, lazy loaded.
- Zod schema: shared between client and server (no duplication).
- File upload: client-side size/type validation before upload (prevents large upload attempts).
- Rate limit: lightweight in-memory (server restart clears — acceptable for basic protection).

---

## 10. i18n & RTL

### Translation Keys

```
quote.breadcrumb
quote.header.*
quote.form.contact.*
quote.form.cup.*
quote.form.printing.*
quote.form.additional.*
quote.form.consent
quote.form.submit
quote.form.submitting
quote.sidebar.*
quote.success.*
quote.errors.*
```

### RTL Adjustments

- Form fields: `text-start`.
- Sidebar: switches to left side (form on right) on desktop.
- File upload drag area: same (symmetric).
- Phone input: LTR even in RTL mode (phone numbers are always LTR).

---

## 11. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Validation error | Inline errors per field + error summary at top |
| File too large | Client-side rejection with message: `"File must be under 10MB"` |
| Invalid file type | Client-side rejection: `"Accepted formats: AI, PDF, EPS, PSD, PNG, JPG"` |
| Network error on submit | Show error toast: `"Submission failed. Please try again."` + keep form data |
| Rate limited | Show message: `"Too many requests. Please wait and try again."` |
| Email delivery failure | Log error server-side, return success to user (follow up manually) |
| Duplicate submission | Rate limit prevents rapid duplicates |
| Pre-filled query params | Parse `searchParams`, set as default form values |
| Very long message | Character counter + max-length enforcement |
| Session timeout | No session needed — form is stateless |

---

## 12. Environment Variables Required

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=noreply@xerostopcups.com
SMTP_PASS=your-smtp-password
SMTP_FROM=noreply@xerostopcups.com
QUOTE_RECIPIENT_EMAIL=sales@xerostopcups.com
```

`[CLIENT PLACEHOLDER — provide actual SMTP credentials and recipient email]`
