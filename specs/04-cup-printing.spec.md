# 04 — Cup Printing Page

> Showcases printing methods, what can be printed, the 5-step process, and turnaround times.

**Route:** `/products/cup-printing`
**File:** `src/app/products/cup-printing/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Products landing, homepage, paper cups cross-sell |
| **Conversion goal** | User understands printing options and requests a quote |
| **Primary CTA** | "Get a Quote" (with printing-specific context) |
| **Secondary CTA** | "Download Design Guidelines" |
| **Exit paths** | Get a Quote, Design Support, Gallery |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Printing Methods** (2 methods)
3. **What Can Be Printed**
4. **5-Step Process Visualization**
5. **Turnaround Table**
6. **Design Support CTA**
7. **Bottom CTA**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Products > Cup Printing`.
- **Heading (h1):** `"Custom Cup Printing"` — `text-h1`.
- **Intro:** `"Transform plain cups into powerful brand touchpoints. We offer full-color printing using offset and flexographic methods, with free design support for every order."` — `text-body-lg`, max-width 720px.
- **Hero image:** Full-width banner showing cups being printed or lineup of printed cups. Aspect 3:1 desktop, 16:9 mobile. `radius-lg`.

### 2.2 Printing Methods

- **Heading (h2):** `"Our Printing Methods"`.
- **Layout:** 2 cards side by side (desktop), stacked (mobile).

| Method | Icon | Title | Description | Best For | Colors | MOQ |
|--------|------|-------|-------------|----------|--------|-----|
| Offset | `Printer` | Offset Printing | `"High-resolution printing with photographic quality. Ideal for detailed logos, gradients, and multi-color designs. Uses CMYK color model."` | Complex designs, gradients, photo-realistic images | Full CMYK (unlimited) | 5,000 pcs |
| Flexo | `Stamp` | Flexographic Printing | `"Cost-effective printing for simpler designs using flexible relief plates. Great for solid colors, text, and simple logos."` | Solid colors, text-heavy designs, large runs | 1–4 spot colors | 1,000 pcs |

**Card Design:**
- Two equal-width cards.
- Top: method illustration/photo.
- Highlighted "Best For" tag in `color-accent-wash` with `color-accent` text.
- Feature list with check icons.
- Shadow `shadow-md`, hover `shadow-lg`.

### 2.3 What Can Be Printed

- **Heading (h2):** `"What You Can Print on Your Cups"`.
- **Grid:** 3×2 on desktop, 2×3 on tablet, 1-col on mobile.

| Item | Icon | Description |
|------|------|-------------|
| Company Logo | `Image` | `"Your logo in full color, perfectly positioned"` |
| Brand Colors | `Palette` | `"Match your exact brand colors using Pantone or CMYK"` |
| Marketing Messages | `MessageSquare` | `"Promotions, taglines, QR codes, social handles"` |
| Patterns & Artwork | `Brush` | `"Custom patterns, illustrations, seasonal designs"` |
| Regulatory Info | `FileText` | `"Food safety marks, recycling symbols, barcodes"` |
| Full Wrap Design | `RotateCw` | `"360° coverage — design wraps around the entire cup"` |

Each item: icon (40px, `color-primary`) + title (`text-h5`) + short description (`text-body-sm`, `color-text-secondary`).

### 2.4 Five-Step Process Visualization

- **Heading (h2):** `"From Design to Delivery in 5 Steps"`.
- **Layout:** Horizontal timeline on desktop with connecting line. Vertical stacked on mobile.

| Step | Number | Title | Description | Icon |
|------|--------|-------|-------------|------|
| 1 | 01 | Inquiry | `"Tell us your cup type, size, quantity, and share your logo or artwork."` | `MessageCircle` |
| 2 | 02 | Design | `"Our team creates a print-ready mockup. We offer free design support."` | `PenTool` |
| 3 | 03 | Approval | `"Review the digital proof. Request revisions until you're satisfied."` | `CheckCircle` |
| 4 | 04 | Production | `"Cups are printed and quality-checked in our facility."` | `Factory` |
| 5 | 05 | Delivery | `"Packed and shipped to your location. Track your order online."` | `Truck` |

**Visual Design:**
- Each step: circle with step number (56px diameter, `color-primary` bg, white number), title below, description below that.
- Connecting line between circles: `2px solid color-border`, dashed.
- Active/hover step: circle grows slightly, `shadow-md`.
- Animation: steps fade-in sequentially on scroll (stagger 200ms).

### 2.5 Turnaround Table

- **Heading (h2):** `"Turnaround Times"`.
- **Subtext:** `"Estimated production times from design approval to ready for dispatch."`.

| Quantity | Offset Printing | Flexo Printing |
|----------|----------------|----------------|
| 1,000–5,000 | N/A (min 5,000) | 7–10 business days |
| 5,000–10,000 | 10–14 business days | 7–10 business days |
| 10,000–50,000 | 12–18 business days | 10–14 business days |
| 50,000+ | 18–25 business days | 14–18 business days |

`[CLIENT PLACEHOLDER — confirm turnaround times]`

**Note:** Below table, add: `"Need it faster? Contact us about rush orders."` with link to `/contact`.

### 2.6 Design Support CTA

- **Background:** `color-primary-wash`.
- **Layout:** Two columns — text + illustration.
- **Heading (h3):** `"Need Help with Your Design?"`.
- **Text:** `"Our in-house design team can help you create the perfect cup design — from scratch or based on your existing branding. This service is free with every printing order."`.
- **CTA:** `"Learn About Design Support"` → `/design-support` — Button variant `primary`.
- **Illustration:** Designer at desk or design software mockup.

### 2.7 Bottom CTA

- Same CTA banner pattern as homepage.
- Heading: `"Ready to Print Your Brand?"`.
- Buttons: "Get a Quote" + "View Gallery".

---

## 3. Component Breakdown

```
src/
├── app/
│   └── products/
│       └── cup-printing/
│           └── page.tsx
├── components/
│   └── products/
│       ├── PrintingMethodCard.tsx
│       ├── PrintableItemGrid.tsx
│       ├── ProcessTimeline.tsx         # 5-step visualization
│       ├── ProcessStep.tsx
│       └── TurnaroundTable.tsx
```

### Props Interfaces

```tsx
interface PrintingMethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bestFor: string;
  colors: string;
  moq: string;
  features: string[];
  image: string;
}

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Methods | 2-col | 2-col | 1-col stack |
| Printable items | 3×2 grid | 2×3 grid | 1-col stack |
| Process | Horizontal timeline | Horizontal scroll | Vertical stack |
| Turnaround | Full table | Full table | Horizontal scroll |
| Design CTA | 2-col | 2-col | 1-col, image below |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Method cards | Fade-in-up | Scroll |
| Printable items | Fade-in, stagger 80ms | Scroll |
| Process steps | Fade-in sequentially | Scroll, stagger 200ms |
| Process connecting line | Draw-in (CSS animation) | Scroll |
| Design CTA | Slide-in from left | Scroll |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Custom Cup Printing — Offset & Flexo | Xerostop Cups',
  description: 'Full-color custom cup printing with offset and flexographic methods. Free design support, MOQ from 1,000 pieces.',
  openGraph: {
    title: 'Custom Cup Printing — Offset & Flexo | Xerostop Cups',
    description: 'Print your brand on paper cups with high-quality offset or cost-effective flexo printing.',
    images: [{ url: '/og/cup-printing.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Cup Printing",
  "provider": {
    "@type": "Organization",
    "name": "Xerostop Cups"
  },
  "description": "Full-color custom printing on paper cups using offset and flexographic methods.",
  "areaServed": "[CLIENT PLACEHOLDER]"
}
```

---

## 7. Accessibility

- Process timeline: `<ol>` with `<li>` for each step. `aria-label="Printing process steps"`.
- Timeline connecting line is decorative (`aria-hidden`).
- Tables: proper `<th>` with scope attributes.
- Icons in printable items grid are decorative (`aria-hidden`), text carries meaning.

---

## 8. Performance

- Hero banner: priority load.
- Method card images: lazy.
- Process timeline: SSR, CSS-only animations (no JS animation library).
- Tables: SSR.

---

## 9. i18n & RTL

### Translation Keys

```
cup_printing.breadcrumb
cup_printing.header.heading
cup_printing.header.intro
cup_printing.methods.heading
cup_printing.methods.{offset,flexo}.*
cup_printing.printable.heading
cup_printing.printable.items.*
cup_printing.process.heading
cup_printing.process.step_{1..5}.*
cup_printing.turnaround.heading
cup_printing.turnaround.subtext
cup_printing.turnaround.rush_note
cup_printing.design_cta.*
cup_printing.cta.*
```

### RTL Adjustments

- Process timeline reverses direction (step 1 on right).
- Design CTA columns swap.
- Table reads right-to-left.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Hero image fails | Gradient fallback |
| No JS | Timeline is static, all steps visible. Animations don't play |
| User arrives from paper cups page | Breadcrumb reflects path correctly |
