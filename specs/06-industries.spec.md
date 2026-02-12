# 06 — Industries We Serve Page

> Showcases 7 industries that Xerostop serves, with tailored messaging for each.

**Route:** `/industries`
**File:** `src/app/industries/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Homepage industries preview, nav menu |
| **Conversion goal** | Visitor finds their industry, feels understood, clicks "Get a Quote" |
| **Primary CTA** | "Get a Quote" (per industry card) |
| **Secondary CTA** | "View Our Gallery" |
| **Exit paths** | Get a Quote, Gallery, Products |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Industry Cards** (7 industries)
3. **Cross-Industry CTA**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Industries`.
- **Heading (h1):** `"Industries We Serve"` — `text-h1`.
- **Intro:** `"From neighborhood cafés to international airlines, our cups serve businesses of every size. Here's how we help each industry."` — `text-body-lg`, max-width 700px.

### 2.2 Industry Cards

- **Layout:** Grid, 2 columns on desktop (with alternating large/small pattern for visual interest), 1 column on mobile.
- **Alternate pattern:** Rows alternate between one full-width card and two half-width cards.

#### 7 Industries

| # | Industry | Icon | Heading | Description | Key Needs |
|---|----------|------|---------|-------------|-----------|
| 1 | Cafés & Coffee Shops | `Coffee` | Cafés & Coffee Shops | `"Your cup is an extension of your brand. Custom-printed cups create a memorable takeaway experience that keeps customers coming back."` | Branded cups, insulated options, lids, sleeves |
| 2 | Restaurants & Fast Food | `UtensilsCrossed` | Restaurants & Fast Food | `"High-volume, cost-effective cups for dine-in and delivery. Quick reorder and consistent quality."` | Bulk orders, fast turnaround, various sizes |
| 3 | Food Trucks & Street Food | `Truck` | Food Trucks & Street Food | `"Stand out at events and markets with eye-catching branded cups. Durable and portable."` | Durable, insulated, bold printing, carriers |
| 4 | Hotels & Hospitality | `Hotel` | Hotels & Hospitality | `"Elevate in-room service and conference catering with premium-feel branded cups."` | Premium cups (ripple-wall), elegant design, small sizes |
| 5 | Airlines & Travel | `Plane` | Airlines & Travel | `"Lightweight cups meeting aviation safety standards. Custom branding for in-flight service."` | Lightweight, specific sizes, branded lids |
| 6 | Hospitals & Healthcare | `Heart` | Hospitals & Healthcare | `"Hygienic, food-safe cups for patient service, cafeterias, and waiting areas."` | Food-safe certified, plain/simple, bulk pricing |
| 7 | Corporate & Events | `Building2` | Corporate & Events | `"Custom cups for offices, conferences, and promotional events. Make every meeting on-brand."` | Low MOQ for events, corporate branding, quick turnaround |

**Card Design:**
- Background image (industry-specific photo) with dark gradient overlay (bottom 60%).
- Image: `[CLIENT PLACEHOLDER — provide industry-specific photos]`.
- Content over image, bottom-aligned.
- Industry icon: 32px, white, above title.
- Title: `text-h3`, white.
- Description: `text-body`, white/90.
- Key needs: small pill tags, `color-primary-wash` bg with `color-primary` text.
- CTA: `"Get a Quote for Your Café"` (contextualized) → `/get-a-quote?industry=cafes` — Button variant `accent`, size `md`.
- Aspect ratio: 16:10 for full-width, 4:3 for half-width.
- Border radius: `radius-lg`.
- Hover: image zooms 1.05x, overlay lightens slightly.

### Layout Pattern (Desktop)

```
Row 1: [  Cafés & Coffee Shops  (full width)                     ]
Row 2: [  Restaurants    ] [  Food Trucks    ]
Row 3: [  Hotels & Hospitality  (full width)                     ]
Row 4: [  Airlines       ] [  Hospitals       ]
Row 5: [  Corporate & Events  (full width)                       ]
```

### Mobile

All cards full-width, stacked, equal aspect ratio (16:9).

### 2.3 Cross-Industry CTA

- **Background:** gradient `color-primary` → `color-primary-dark`.
- **Heading (h2):** `"Don't See Your Industry?"` — white.
- **Text:** `"We work with businesses of all types. Tell us what you need and we'll create a solution."` — white/90.
- **CTA:** `"Contact Us"` → `/contact` — Button variant `accent`, size `lg`.

---

## 3. Component Breakdown

```
src/
├── app/
│   └── industries/
│       └── page.tsx
├── components/
│   └── industries/
│       ├── IndustryGrid.tsx             # Grid layout with alternating pattern
│       └── IndustryCard.tsx             # Individual industry card
```

### Props Interfaces

```tsx
interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  keyNeeds: string[];
  backgroundImage: string;
  ctaText: string;
  ctaHref: string;
  size: 'full' | 'half';
}
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Grid | Alternating full/half pattern | 2-col grid all same size | 1-col stack |
| Cards | Variable aspect ratios | 4:3 | 16:9 |
| Key needs pills | Inline | Inline | Wrap |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Cards | Fade-in-up, stagger 100ms | Scroll |
| Card image | Zoom 1.05x | Hover |
| Card overlay | Lighten | Hover |
| Key need pills | Fade-in from bottom | Scroll |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Industries We Serve — Cafés, Hotels, Airlines & More | Xerostop Cups',
  description: 'Custom paper cups for cafés, restaurants, food trucks, hotels, airlines, hospitals, and corporate events.',
  openGraph: {
    title: 'Industries We Serve | Xerostop Cups',
    description: 'We manufacture and print custom paper cups for 7 key industries.',
    images: [{ url: '/og/industries.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Accessibility

- Cards use `<article>` elements.
- Background images are decorative; content is in text overlay.
- CTA buttons have descriptive text (not just "Get a Quote" — includes industry name).
- Color contrast: white text on dark overlay meets WCAG AA (overlay darkened enough to ensure 4.5:1).
- Key need pills have sufficient contrast.

---

## 8. Performance

- Industry images: lazy loaded with blur-up placeholder (except first visible card).
- Images served as WebP with fallback.
- `sizes` attribute set per card size variant.

---

## 9. i18n & RTL

### Translation Keys

```
industries.breadcrumb
industries.header.heading
industries.header.intro
industries.card_{1..7}.title
industries.card_{1..7}.description
industries.card_{1..7}.key_needs.*
industries.card_{1..7}.cta
industries.cross_industry.heading
industries.cross_industry.text
industries.cross_industry.cta
```

### RTL Adjustments

- Grid layout: same pattern but mirrored (half-width cards swap sides).
- Text overlay: `text-start` (maps to right in RTL).
- Key need pills: same behavior (wrap direction handled by browser).

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Industry image fails | Solid `color-primary-dark` background instead of image |
| Many key need pills | Wrap to second line, max 5 shown + "+N more" |
| Screen reader on cards | Card title announced as heading, description as content, CTA as link |
