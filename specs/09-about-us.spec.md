# 09 — About Us Page

> Company story, values, factory photos, certifications, and animated stats.

**Route:** `/about`
**File:** `src/app/about/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Nav menu, footer, search |
| **Conversion goal** | Build trust, drive to quote or contact |
| **Primary CTA** | "Get a Quote" |
| **Secondary CTA** | "Contact Us" |
| **Exit paths** | Contact, Get a Quote, Products |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Our Story**
3. **Our Values** (3–4 values)
4. **Factory & Facility** (photo gallery)
5. **Stats Counter** (animated numbers)
6. **Certifications**
7. **CTA Section**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > About Us`.
- **Heading (h1):** `"About Xerostop Cups"` — `text-h1`.
- **Intro:** `"We're a paper cup manufacturer and printer, dedicated to helping businesses make a lasting impression — one cup at a time."` — `text-body-lg`, max-width 700px.

### 2.2 Our Story

- **Background:** `color-bg-primary`.
- **Padding:** `py-16`.
- **Layout:** Two columns — text left, image right.
- **Heading (h2):** `"Our Story"`.
- **Content:**

```
[CLIENT PLACEHOLDER — Company story text. Suggested structure:]

"Xerostop Cups was founded in [YEAR] with a simple mission: to provide businesses
with high-quality, custom-branded paper cups at competitive prices.

Starting from [ORIGIN STORY], we've grown into a full-service manufacturer
and printer, serving [NUMBER] clients across [REGIONS].

Today, our [SIZE] facility produces [VOLUME] cups monthly, with in-house
design support and printing capabilities that allow us to deliver quality
from concept to cup."
```

- **Image:** Factory exterior or team photo. `[CLIENT PLACEHOLDER]`. `radius-lg`, `shadow-lg`.

### 2.3 Our Values

- **Background:** `color-bg-secondary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"What We Stand For"`.
- **Grid:** 4 columns desktop, 2×2 tablet, 1-col mobile.

| Value | Icon | Title | Description |
|-------|------|-------|-------------|
| 1 | `Award` | Quality First | `"Every cup passes rigorous quality checks. We never cut corners on materials or processes."` |
| 2 | `Users` | Customer Focus | `"Your success is our success. We work closely with every client to deliver exactly what they need."` |
| 3 | `Leaf` | Responsibility | `"We're committed to reducing our environmental impact through sustainable practices and materials."` |
| 4 | `Zap` | Innovation | `"We continuously invest in new printing technology and cup designs to stay ahead of the market."` |

`[CLIENT PLACEHOLDER — confirm or adjust values]`

**Design:** Same flat pillar style as homepage "Why Xerostop" section.

### 2.4 Factory & Facility

- **Background:** `color-bg-primary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"Our Facility"`.
- **Subtext:** `"Take a look inside our manufacturing and printing facility."`.
- **Layout:** 2×3 photo grid (desktop), 2×2 (tablet), 1-col (mobile).
- **Photos:** `[CLIENT PLACEHOLDER — 4-6 factory/facility photos: production line, printing press, quality check, packaging, warehouse, team]`.
- **Photo design:** `radius-lg`, `object-cover`, aspect 4:3, hover scale(1.02) with caption overlay.
- **Caption:** Brief text overlay on hover (e.g., `"Printing press in action"`).

### 2.5 Stats Counter (Animated)

- **Background:** gradient from `color-primary` to `color-primary-dark`.
- **Padding:** `py-16`.
- **Layout:** 4 stat items in a row (desktop), 2×2 (tablet), 2×2 (mobile).

| Stat | Value | Label |
|------|-------|-------|
| 1 | `[X]+` | Years of Experience |
| 2 | `[X]+` | Cups Produced Monthly |
| 3 | `[X]+` | Happy Clients |
| 4 | `[X]+` | Countries Served |

`[CLIENT PLACEHOLDER — provide actual numbers]`

**Counter Animation:**
- Numbers count up from 0 to target when section scrolls into view.
- Duration: 2s, easeOut.
- Numbers use `text-display`, white.
- Labels use `text-body`, white/80.
- `+` suffix animates in after count completes.
- Triggered once (Intersection Observer, `{ once: true }`).
- `prefers-reduced-motion: reduce` → show final numbers instantly.

```tsx
// 'use client' component
interface StatCounterProps {
  value: number;
  suffix?: string; // e.g., "+" or "M"
  label: string;
}
```

**File:** `src/components/about/StatCounter.tsx`

### 2.6 Certifications

- **Background:** `color-bg-secondary`.
- **Padding:** `py-12`.
- **Heading (h2):** `"Certifications & Standards"`.
- **Layout:** Row of certification badges/logos.

| Certification | Description |
|--------------|-------------|
| Food Safety | `[CLIENT PLACEHOLDER — specific certification name, e.g., ISO 22000]` |
| Quality Management | `[CLIENT PLACEHOLDER — e.g., ISO 9001]` |
| Environmental | `[CLIENT PLACEHOLDER — e.g., FSC certified]` |

- **Badge design:** Grayscale logos, 80px height, with text label below.
- **Hover:** full color.

### 2.7 CTA Section

- Standard CTA banner.
- Heading: `"Let's Work Together"`.
- Buttons: "Get a Quote" + "Contact Us".

---

## 3. Component Breakdown

```
src/
├── app/
│   └── about/
│       └── page.tsx
├── components/
│   └── about/
│       ├── StorySection.tsx
│       ├── ValuesGrid.tsx
│       ├── ValueItem.tsx
│       ├── FacilityPhotos.tsx
│       ├── StatsSection.tsx            # Container for stat counters
│       ├── StatCounter.tsx             # 'use client' animated counter
│       └── CertificationsBar.tsx
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Story | 2-col | 2-col | 1-col, image below |
| Values | 4-col | 2×2 | 1-col |
| Facility | 2×3 grid | 2×2 | 1-col |
| Stats | 4-col | 2×2 | 2×2 |
| Certs | Row | Row | 2×2 grid |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Story image | Fade-in from right | Scroll |
| Values | Fade-in-up, stagger | Scroll |
| Facility photos | Fade-in, stagger | Scroll |
| Photo hover | Scale 1.02 + caption overlay | Hover |
| Stats numbers | Count-up from 0 | Scroll into view (once) |
| Cert logos | Grayscale → color | Hover |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'About Us — Our Story & Values | Xerostop Cups',
  description: 'Learn about Xerostop Cups — our story, values, manufacturing facility, and certifications. Quality paper cups made with care.',
  openGraph: {
    title: 'About Xerostop Cups — Our Story & Values',
    description: 'Discover the people and facility behind your custom paper cups.',
    images: [{ url: '/og/about.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "Xerostop Cups",
    "foundingDate": "[CLIENT PLACEHOLDER]",
    "description": "Paper cup manufacturer and printer.",
    "numberOfEmployees": "[CLIENT PLACEHOLDER]",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "[CLIENT PLACEHOLDER]"
    }
  }
}
```

---

## 7. Accessibility

- Stat counter: `aria-label="X plus years of experience"` (screen reader gets final value immediately, not the animation).
- Factory photos: descriptive `alt` text.
- Certification logos: `alt` text with certification name.
- Values icons are decorative (`aria-hidden`).

---

## 8. Performance

- Story image: eager load (above fold if hero is short).
- Facility photos: lazy loaded.
- Stat counter: `'use client'`, lazy loaded via `next/dynamic`.
- Certification logos: small inline SVGs or optimized PNGs.

---

## 9. i18n & RTL

### Translation Keys

```
about.breadcrumb
about.header.*
about.story.heading
about.story.content
about.values.heading
about.values.item_{1,2,3,4}.*
about.facility.heading
about.facility.subtext
about.facility.photo_{1..6}_caption
about.stats.stat_{1,2,3,4}.*
about.certs.heading
about.certs.cert_{1,2,3}.*
about.cta.*
```

### RTL Adjustments

- Story: image/text columns swap.
- Stats: same layout (symmetric).
- Counter numbers: same digits (Arabic numerals or Eastern Arabic based on locale).

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Story image fails | `color-primary-wash` gradient placeholder |
| Facility photos fail | Placeholder with factory icon |
| Stats section — JS disabled | Show final numbers immediately (SSR with `noscript` fallback or render final values server-side) |
| Client hasn't provided stats | Use placeholder values with `[CLIENT PLACEHOLDER]` in CMS |
