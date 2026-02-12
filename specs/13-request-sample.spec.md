# 13 — Request Sample Page

> Simpler form for requesting free cup samples, with address fields and API route.

**Route:** `/request-sample`
**File:** `src/app/request-sample/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Homepage CTA, product pages, nav menu |
| **Conversion goal** | User submits sample request with shipping address |
| **Primary CTA** | "Request Free Sample" |
| **Exit paths** | Success → thank you state, also link to "Get a Quote" |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Sample Request Form** (single-section, simpler than quote)
3. **Sidebar: What You'll Receive**
4. **Success State**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Request a Sample`.
- **Heading (h1):** `"Request a Free Sample"` — `text-h1`.
- **Intro:** `"Try before you buy. We'll send you sample cups so you can feel the quality firsthand. Free of charge, no commitment."` — `text-body-lg`.

### 2.2 Sample Request Form

- **Layout:** Two columns on desktop — form (65%) + sidebar (35%). Single column on mobile.

#### Contact Fields

| Field | Type | Label | Placeholder | Validation | Required |
|-------|------|-------|-------------|------------|----------|
| `name` | text | Full Name | `"Your full name"` | min 2 chars | ✅ |
| `email` | email | Email Address | `"you@company.com"` | valid email | ✅ |
| `phone` | tel | Phone Number | `"+971 50 000 0000"` | valid phone | ✅ |
| `company` | text | Company Name | `"Your company"` | min 2 chars | ❌ |

#### Shipping Address

| Field | Type | Label | Placeholder | Validation | Required |
|-------|------|-------|-------------|------------|----------|
| `addressLine1` | text | Address Line 1 | `"Street address"` | min 5 chars | ✅ |
| `addressLine2` | text | Address Line 2 | `"Suite, floor, etc."` | — | ❌ |
| `city` | text | City | `"City"` | min 2 chars | ✅ |
| `state` | text | State / Region | `"State or region"` | — | ❌ |
| `postalCode` | text | Postal / ZIP Code | `"Postal code"` | — | ❌ |
| `country` | select | Country | `"Select country"` | from country list | ✅ |

#### Sample Preferences

| Field | Type | Label | Options | Required |
|-------|------|-------|---------|----------|
| `cupTypes` | checkbox group | Which cup types interest you? | Single-Wall, Double-Wall, Ripple-Wall, All Types | ❌ |
| `preferredSize` | select | Preferred Cup Size | Same as quote form sizes + "Assorted Sizes" | ❌ |
| `message` | textarea | Any specific requirements? | `"e.g., we're looking for 8oz cups for hot coffee"` | ❌ |

#### Submit

- **Consent:** `"I agree to be contacted regarding this sample request."` — Required.
- **Submit button:** `"Request Free Sample"` — variant `accent`, size `lg`.
- **Note below button:** `"Samples are shipped within 3–5 business days. Shipping is free within [CLIENT PLACEHOLDER — region]."` — `text-body-sm`, `color-text-muted`.

### 2.3 Sidebar: What You'll Receive

- **Sticky on desktop.**
- **Content:**

**"Your Free Sample Kit"**
- ☕ Assorted cup types (single, double, ripple wall).
- 📏 Selected sizes to test.
- 📋 Product spec sheet included.
- 🎨 Examples of printed cups (if available).

**"Why Request a Sample?"**
- Feel the cup quality in your hands.
- Test insulation and durability.
- Show your team before ordering.
- No cost, no obligation.

**Image:** Photo of sample kit box. `[CLIENT PLACEHOLDER]`.

**Sidebar Design:**
- Same as quote form sidebar.
- `color-bg-secondary` bg, `radius-lg`, `padding space-6`.

### 2.4 Success State

- **Icon:** `Package`, 64px, `color-success`.
- **Heading (h2):** `"Your Sample Request Has Been Sent!"`.
- **Text:** `"We'll prepare your sample kit and ship it to [submitted address]. You'll receive a confirmation email at [submitted email]."`.
- **ETA:** `"Expected delivery: 3–5 business days."`.
- **Actions:**
  - `"Request Another Sample"` — resets form.
  - `"Get a Quote Now"` → `/get-a-quote`.

---

## 3. Backend Requirements

### API Route

**Endpoint:** `POST /api/sample`
**File:** `src/app/api/sample/route.ts`

#### Zod Schema

```tsx
// src/lib/schemas/sample.ts
import { z } from 'zod';

export const sampleFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  company: z.string().max(100).optional(),

  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(2).max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  country: z.string().min(2),

  cupTypes: z.array(z.string()).optional(),
  preferredSize: z.string().optional(),
  message: z.string().max(1000).optional(),

  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted' }),
  }),
});

export type SampleFormData = z.infer<typeof sampleFormSchema>;
```

#### API Handler

```tsx
// src/app/api/sample/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sampleFormSchema } from '@/lib/schemas/sample';
import { sendSampleEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit: 3 per hour per IP
  const rateLimitResult = await rateLimit(request, {
    windowMs: 60 * 60 * 1000,
    max: 3,
  });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = sampleFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await sendSampleEmail(parsed.data);

  return NextResponse.json({
    success: true,
    reference: `SR-${Date.now()}`,
  });
}
```

#### Email

Same Nodemailer setup as quote form. Sends:
1. Notification to sales team with full address and preferences.
2. Confirmation to customer with estimated delivery time.

---

## 4. Component Breakdown

```
src/
├── app/
│   ├── request-sample/
│   │   └── page.tsx
│   └── api/
│       └── sample/
│           └── route.ts
├── components/
│   └── sample/
│       ├── SampleForm.tsx              # 'use client'
│       ├── SampleSidebar.tsx
│       └── SampleSuccess.tsx
├── lib/
│   └── schemas/
│       └── sample.ts
```

---

## 5. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Form + sidebar | 2-col (65/35) | 2-col (60/40) | 1-col, sidebar below |
| Address fields | 2 per row (city+state, postal+country) | Same | 1 per row |
| Cup types checkboxes | 4 inline | 2×2 | 1-col |
| Submit button | Right-aligned | Same | Full-width |

---

## 6. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Form fields | Standard focus states | Focus |
| Submit button | Loading spinner | Submission |
| Success state | Fade-in + scale | Success |
| Validation errors | Shake + inline error | Invalid submit |

---

## 7. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Request a Free Sample — Paper Cups | Xerostop Cups',
  description: 'Request free paper cup samples to test quality before ordering. No cost, no obligation. Ships within 3-5 business days.',
  openGraph: {
    title: 'Request a Free Sample — Xerostop Cups',
    description: 'Try our paper cups before you buy. Free samples with no commitment.',
    images: [{ url: '/og/request-sample.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 8. Accessibility

- Same accessibility standards as quote form (see spec 12).
- Country select: searchable/filterable for long list.
- Checkbox group: `role="group"`, `aria-label="Cup type preferences"`.
- Address fields: grouped in `<fieldset>` with `<legend>` "Shipping Address".

---

## 9. i18n & RTL

### Translation Keys

```
sample.breadcrumb
sample.header.*
sample.form.contact.*
sample.form.address.*
sample.form.preferences.*
sample.form.consent
sample.form.submit
sample.form.shipping_note
sample.sidebar.*
sample.success.*
sample.errors.*
```

### RTL Adjustments

- Same as quote form.
- Address field labels: standard RTL text direction.
- Country select: same component.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Invalid address | Inline validation per field |
| Country not in shipping range | Show note: `"Shipping to [country] may take 7-10 days"` |
| Multiple submissions | Rate limited to 3/hour |
| Network error | Error toast, form data preserved |
| No cup type selected | Valid — all types sent by default |
