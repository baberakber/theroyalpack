# 14 — Contact Page

> Two-column layout with contact information and form, Google Maps embed, and business hours.

**Route:** `/contact`
**File:** `src/app/contact/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Nav menu, footer, FAQ CTA, other page CTAs |
| **Conversion goal** | User sends a general inquiry |
| **Primary CTA** | "Send Message" |
| **Secondary CTA** | Direct phone/email/WhatsApp links |
| **Exit paths** | Success → thank you state, Get a Quote |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Contact Grid** (two columns: info + form)
3. **Google Maps Embed**
4. **Business Hours**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Contact`.
- **Heading (h1):** `"Contact Us"` — `text-h1`.
- **Intro:** `"Have a question, need a quote, or want to visit our facility? We're here to help."` — `text-body-lg`.

### 2.2 Contact Grid

**Layout:** Two columns on desktop (40% info + 60% form), stacked on mobile (info above form).

#### Left Column: Contact Information

**Heading (h2):** `"Get in Touch"`.

**Contact Methods:**

| Method | Icon | Label | Value | Action |
|--------|------|-------|-------|--------|
| Phone | `Phone` | Phone | `[CLIENT PLACEHOLDER]` | `tel:` link |
| WhatsApp | `MessageCircle` | WhatsApp | `[CLIENT PLACEHOLDER]` | WhatsApp deep link |
| Email | `Mail` | Email | `[CLIENT PLACEHOLDER]` | `mailto:` link |
| Address | `MapPin` | Visit Us | `[CLIENT PLACEHOLDER — full address]` | Link to Google Maps |

**Design:**
- Each contact method: flex row with icon (24px, `color-primary`) + text.
- Icon inside 44px circle, `color-primary-wash` bg.
- Label: `text-body-sm`, `color-text-muted`, uppercase.
- Value: `text-body`, `color-text-primary`, clickable (styled as link for actionable items).
- Gap between methods: `space-6`.

**Social Media Links:**
- Row of social icons below contact methods.
- `[CLIENT PLACEHOLDER — provide social media URLs]`.
- Icons: 24px, `color-text-muted`, hover `color-primary`.

#### Right Column: Contact Form

| Field | Type | Label | Placeholder | Validation | Required |
|-------|------|-------|-------------|------------|----------|
| `name` | text | Full Name | `"Your name"` | min 2 chars | ✅ |
| `email` | email | Email | `"you@company.com"` | valid email | ✅ |
| `phone` | tel | Phone | `"+971 50 000 0000"` | valid phone | ❌ |
| `subject` | select | Subject | `"Select a topic"` | from list | ✅ |
| `message` | textarea | Message | `"How can we help?"` | min 10 chars, max 2000 | ✅ |

**Subject options:** General Inquiry, Product Question, Printing Question, Request a Quote, Partnership Inquiry, Feedback, Other.

**Submit:** `"Send Message"` — variant `primary`, size `lg`.

**Form Design:**
- Background: `color-bg-primary`, `radius-lg`, `shadow-md`, padding `space-8`.
- Fields use shared Input, Select, Textarea components.

### 2.3 Google Maps Embed

- **Padding:** `py-8`.
- **Layout:** Full-width, 400px height desktop, 300px mobile.
- **Map:** `<iframe>` Google Maps embed centered on company location.
- **Border radius:** `radius-lg`.
- **Border:** `1px solid color-border-light`.

```html
<iframe
  src="https://www.google.com/maps/embed?pb=[CLIENT PLACEHOLDER — Maps embed URL]"
  width="100%"
  height="400"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Xerostop Cups location"
></iframe>
```

`[CLIENT PLACEHOLDER — provide Google Maps embed URL]`

### 2.4 Business Hours

- **Background:** `color-bg-secondary`.
- **Padding:** `py-12`.
- **Layout:** Centered, max-width 600px.
- **Heading (h2):** `"Business Hours"`.

| Day | Hours |
|-----|-------|
| Monday – Friday | `[CLIENT PLACEHOLDER, e.g., 8:00 AM – 6:00 PM]` |
| Saturday | `[CLIENT PLACEHOLDER, e.g., 9:00 AM – 2:00 PM]` |
| Sunday | Closed |

`[CLIENT PLACEHOLDER — confirm business hours]`

**Design:**
- Table or definition list layout.
- Current day highlighted with `color-primary-wash` bg.
- "Open Now" / "Closed" badge next to heading based on current time.
- Open badge: `color-success` bg, white text.
- Closed badge: `color-text-muted` bg, white text.
- Client-side time check (`'use client'` for the badge only).

---

## 3. Backend Requirements

### API Route

**Endpoint:** `POST /api/contact`
**File:** `src/app/api/contact/route.ts`

#### Zod Schema

```tsx
// src/lib/schemas/contact.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1),
  message: z.string().min(10).max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

#### API Handler

Same pattern as quote and sample forms:
1. Rate limit: 5 per hour per IP.
2. Validate with Zod.
3. Send email via Nodemailer to business.
4. Send confirmation to customer.
5. Return success with reference number.

---

## 4. Component Breakdown

```
src/
├── app/
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   └── contact/
│       ├── ContactInfo.tsx             # Left column info
│       ├── ContactForm.tsx             # 'use client' — form
│       ├── MapEmbed.tsx                # Google Maps iframe
│       ├── BusinessHours.tsx           # Hours table with open/closed badge
│       └── ContactSuccess.tsx          # Success state
├── lib/
│   └── schemas/
│       └── contact.ts
```

---

## 5. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Contact grid | 2-col (40/60) | 2-col (45/55) | 1-col, info above form |
| Map | 400px height | 350px | 300px |
| Hours | Centered table | Same | Full-width |

---

## 6. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Contact info | Fade-in from left | Page load |
| Contact form | Fade-in from right | Page load |
| Map | Fade-in | Scroll |
| Open/Closed badge | Pulse once | Page load |
| Form submit | Standard loading | Submit |

---

## 7. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Contact Us — Xerostop Cups',
  description: 'Get in touch with Xerostop Cups. Call, email, WhatsApp, or visit our facility. We respond within 24 hours.',
  openGraph: {
    title: 'Contact Xerostop Cups',
    description: 'Reach us by phone, email, WhatsApp, or visit. Quick response guaranteed.',
    images: [{ url: '/og/contact.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Xerostop Cups",
  "telephone": "[CLIENT PLACEHOLDER]",
  "email": "[CLIENT PLACEHOLDER]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[CLIENT PLACEHOLDER]",
    "addressLocality": "[CLIENT PLACEHOLDER]",
    "addressCountry": "[CLIENT PLACEHOLDER]"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[CLIENT PLACEHOLDER]",
    "longitude": "[CLIENT PLACEHOLDER]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "[CLIENT PLACEHOLDER]",
      "closes": "[CLIENT PLACEHOLDER]"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "[CLIENT PLACEHOLDER]",
      "closes": "[CLIENT PLACEHOLDER]"
    }
  ]
}
```

---

## 8. Accessibility

- Contact methods: each is a clickable link with descriptive text.
- Map iframe: `title="Xerostop Cups location"`.
- Business hours: `<table>` with `<th scope="row">` for days.
- Form: same accessibility standards as other forms.
- Social media icons: `aria-label="Follow us on [platform]"`.

---

## 9. Performance

- Google Maps: `loading="lazy"`, loads only when scrolled into view.
- Form: client component, lightweight.
- Business hours badge: small `'use client'` component for time check.

---

## 10. i18n & RTL

### Translation Keys

```
contact.breadcrumb
contact.header.*
contact.info.heading
contact.info.phone
contact.info.whatsapp
contact.info.email
contact.info.address
contact.form.name
contact.form.email
contact.form.phone
contact.form.subject
contact.form.subject_options.*
contact.form.message
contact.form.submit
contact.map.title
contact.hours.heading
contact.hours.days.*
contact.hours.open_now
contact.hours.closed_now
contact.success.*
```

### RTL Adjustments

- Contact grid: info column moves to right, form to left.
- Contact method icons: `me-3` (margin-end).
- Map: same (no directional content).
- Hours: table direction flips.

---

## 11. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Maps fails to load | Show static map image with address text |
| Business hours — timezone | Display in business timezone, note timezone for international visitors |
| Form validation | Same inline error pattern |
| Social media URLs missing | Hide social section |
| Phone/email not configured | Hide those contact methods, show form only |
