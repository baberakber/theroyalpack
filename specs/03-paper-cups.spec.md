# 03 — Paper Cups Page

> Detailed product page for all paper cup types, sizes, and specifications.

**Route:** `/products/paper-cups`
**File:** `src/app/products/paper-cups/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Products landing, homepage service cards, direct search |
| **Conversion goal** | User selects cup type/size and clicks "Get a Quote" |
| **Primary CTA** | "Get a Quote for This Cup" (contextual per type) |
| **Secondary CTA** | "Request a Free Sample" |
| **Exit paths** | Get a Quote (with pre-filled cup type), Cup Printing, Accessories |

---

## 2. Layout Structure

### Section Order

1. **Page Header** (breadcrumb, title, intro)
2. **Cup Types Overview** (3 types with tabs or cards)
3. **Size Guide**
4. **Specifications Table**
5. **Comparison Table** (type vs type)
6. **Interactive Size Recommender**
7. **Cross-Sell** (printing + accessories)
8. **CTA Section**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Products > Paper Cups`.
- **Heading (h1):** `"Paper Cups"` — `text-h1`.
- **Intro:** `"We manufacture three types of paper cups to suit every need — from budget-friendly single-wall cups to premium ripple-wall insulated cups. All food-safe, all customizable."` — `text-body-lg`, max-width 720px.

### 2.2 Cup Types Overview

- **Heading (h2):** `"Choose Your Cup Type"`.
- **Layout:** 3 cards in a row (desktop), stacked (mobile).

| Type | Image | Title | Tagline | Best For | Price Indicator |
|------|-------|-------|---------|----------|-----------------|
| Single-Wall | Cup photo | Single-Wall Cups | `"Light & economical"` | Cold drinks, water coolers, short-serve hot drinks | `$` |
| Double-Wall | Cup photo | Double-Wall Cups | `"Insulated for comfort"` | Hot drinks, no sleeve needed, premium feel | `$$` |
| Ripple-Wall | Cup photo | Ripple-Wall Cups | `"Maximum insulation & grip"` | Hot drinks, food trucks, premium cafes | `$$$` |

**Card Design:**
- Image: top half of card, 1:1 aspect ratio, cup centered on `color-primary-wash` background.
- Title: `text-h3`.
- Tagline: `text-body`, `color-text-muted`, italic.
- "Best for" list: bullet points, `text-body-sm`.
- Price indicator: `$` symbols in `color-accent`, right-aligned in header.
- CTA: `"Get a Quote"` → `/get-a-quote?cup_type=single-wall` — variant `primary`, size `md`.
- Active/selected state: `border-2 border-primary`, `shadow-lg`.

### 2.3 Size Guide

- **Heading (h2):** `"Available Sizes"`.
- **Subtext:** `"All cup types are available in the following sizes. Not sure which size? Try our size recommender below."`.
- **Visual:** Row of cup silhouette SVGs at relative scale, showing size progression.
- **Layout:** Horizontally scrollable on mobile, grid on desktop.

| Size (oz) | Volume (ml) | Top Ø (mm) | Bottom Ø (mm) | Height (mm) | Common Use |
|-----------|-------------|-----------|---------------|-------------|------------|
| 2.5 | 75 | 50 | 35 | 50 | Espresso |
| 4 | 120 | 62 | 42 | 64 | Espresso, tasting |
| 6 | 180 | 73 | 50 | 75 | Small coffee |
| 7 | 210 | 73 | 50 | 85 | Small coffee |
| 8 | 240 | 80 | 56 | 92 | Standard coffee |
| 9 | 270 | 80 | 56 | 98 | Coffee, tea |
| 10 | 300 | 85 | 58 | 105 | Medium coffee |
| 12 | 360 | 90 | 60 | 110 | Medium, iced drinks |
| 14 | 420 | 90 | 62 | 125 | Large coffee |
| 16 | 480 | 90 | 62 | 135 | Large, smoothies |
| 18 | 540 | 95 | 65 | 140 | Extra large |
| 20 | 600 | 95 | 65 | 150 | Extra large, cold |
| 22 | 650 | 95 | 65 | 160 | Jumbo cold drinks |

`[CLIENT PLACEHOLDER — confirm exact dimensions per size]`

### 2.4 Specifications Table

- **Heading (h2):** `"Technical Specifications"`.
- **Table:** Responsive (horizontally scrollable on mobile).

| Spec | Single-Wall | Double-Wall | Ripple-Wall |
|------|------------|------------|-------------|
| Wall Layers | 1 | 2 | 1 + ripple wrap |
| Paper Weight (gsm) | 190–260 | 2×190 | 250 + 120 (ripple) |
| Insulation | Low | High | Highest |
| Sleeve Needed? | Yes (hot) | No | No |
| PE Coating | Inside | Inside | Inside |
| Food Safe | ✅ | ✅ | ✅ |
| Microwave Safe | ❌ | ❌ | ❌ |
| Recyclable | ♻️ (check local) | ♻️ (check local) | ♻️ (check local) |
| MOQ | 1,000 pcs | 1,000 pcs | 1,000 pcs |
| Lead Time | 7–14 days | 10–18 days | 10–18 days |

`[CLIENT PLACEHOLDER — confirm all specifications]`

### 2.5 Comparison Table

- **Heading (h2):** `"Which Cup Type Is Right for You?"`.
- **Visual comparison** with checkmarks and x-marks.

| Feature | Single-Wall | Double-Wall | Ripple-Wall |
|---------|:-----------:|:-----------:|:-----------:|
| Budget-friendly | ✅✅✅ | ✅ | ✅ |
| Hot drink insulation | ✅ | ✅✅✅ | ✅✅✅ |
| No sleeve required | ❌ | ✅ | ✅ |
| Premium feel | ✅ | ✅✅ | ✅✅✅ |
| Print area quality | ✅✅ | ✅✅ | ✅✅✅ |
| Eco-friendly options | ✅ | ✅ | ✅ |
| Best for | Water coolers, events | Cafes, offices | Premium cafes, hotels |

### 2.6 Interactive Size Recommender

- **Heading (h2):** `"Not Sure Which Size? Let Us Help"`.
- **Type:** Client-side interactive widget (`'use client'`).
- **Steps:**

**Step 1:** "What will you serve?"
- Options: Hot Coffee, Iced Coffee, Tea, Smoothie/Juice, Water, Other
- Each option is a button with icon.

**Step 2:** "What serving size?"
- Options: Small, Medium, Large, Extra Large
- Visual cup size indicator.

**Step 3:** "Do you need insulation?"
- Options: Yes (hot drinks held by hand), No (cold drinks / sleeve provided)

**Result:** Recommended cup type + size with specs. CTA: `"Get a Quote for [Recommended Cup]"` → `/get-a-quote?cup_type=...&size=...`.

```tsx
interface SizeRecommenderState {
  step: 1 | 2 | 3 | 'result';
  beverage: string | null;
  servingSize: string | null;
  needsInsulation: boolean | null;
}

interface Recommendation {
  cupType: 'single-wall' | 'double-wall' | 'ripple-wall';
  sizeOz: number;
  reasoning: string;
}
```

**File:** `src/components/products/SizeRecommender.tsx`

### 2.7 Cross-Sell Section

- **Heading (h2):** `"Complete Your Order"`.
- Two cards side by side:
  - `"Add Custom Printing"` → `/products/cup-printing` with brief description.
  - `"Add Lids & Accessories"` → `/products/accessories` with brief description.

### 2.8 CTA Section

- Same pattern as homepage CTA banner.
- Heading: `"Ready to Order Paper Cups?"`.
- Two buttons: "Get a Quote" + "Request a Free Sample".

---

## 3. Component Breakdown

```
src/
├── app/
│   └── products/
│       └── paper-cups/
│           └── page.tsx
├── components/
│   └── products/
│       ├── CupTypeCard.tsx
│       ├── SizeGuide.tsx
│       ├── SizeGuideCupSvg.tsx         # Scaled SVG cup silhouettes
│       ├── SpecsTable.tsx
│       ├── ComparisonTable.tsx
│       ├── SizeRecommender.tsx         # 'use client'
│       └── CrossSellCards.tsx
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Cup types | 3-col | 3-col | 1-col stack |
| Size guide (visual) | Full row | Full row | Horizontal scroll |
| Size table | Full table | Full table | Horizontal scroll |
| Specs table | Full table | Horizontal scroll | Horizontal scroll |
| Comparison | Full table | Horizontal scroll | Horizontal scroll |
| Recommender | Wide layout | Medium | Full-width, stacked |
| Cross-sell | 2-col | 2-col | 1-col stack |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Cup type cards | Fade-in-up | Scroll, stagger |
| Size guide SVGs | Scale-in | Scroll |
| Recommender steps | Slide transition | Step change |
| Recommender result | Fade-in + confetti-like accent dots | Result reveal |
| Tables | Fade-in | Scroll |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Paper Cups — Single, Double & Ripple Wall | Xerostop Cups',
  description: 'Explore our range of paper cups: single-wall, double-wall, and ripple-wall. Available in 14 sizes from 2.5oz to 22oz. Custom printing available.',
  openGraph: {
    title: 'Paper Cups — Single, Double & Ripple Wall | Xerostop Cups',
    description: 'Manufacturing premium paper cups for cafes, restaurants, and businesses. MOQ from 1,000 pieces.',
    images: [{ url: '/og/paper-cups.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Paper Cups",
  "description": "Custom paper cups available in single-wall, double-wall, and ripple-wall configurations.",
  "brand": {
    "@type": "Brand",
    "name": "Xerostop Cups"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "[CLIENT PLACEHOLDER]",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## 7. Accessibility

- Tables use `<thead>`, `<tbody>`, `<th scope="col">` / `<th scope="row">`.
- Horizontally scrollable tables wrapped in `<div role="region" aria-label="Specifications table" tabindex="0">` for keyboard scroll.
- Size recommender: each step has `aria-live="polite"` region for screen reader announcements.
- Recommender buttons are focusable, keyboard-activatable, with visible focus ring.
- Comparison table icons (✅/❌) have `aria-label` text equivalents.

---

## 8. Performance

- Cup images: lazy loaded except the first visible card.
- SVG size guide: inline SVG, no external requests.
- Size recommender: lazy loaded via `next/dynamic` (not needed for initial render).
- Tables: SSR, no JS needed.

---

## 9. i18n & RTL

### Translation Keys

```
paper_cups.breadcrumb
paper_cups.header.heading
paper_cups.header.intro
paper_cups.types.heading
paper_cups.types.{single,double,ripple}.title
paper_cups.types.{single,double,ripple}.tagline
paper_cups.types.{single,double,ripple}.best_for
paper_cups.size_guide.heading
paper_cups.size_guide.subtext
paper_cups.specs.heading
paper_cups.comparison.heading
paper_cups.recommender.heading
paper_cups.recommender.step_{1,2,3}.question
paper_cups.recommender.step_{1,2,3}.options.*
paper_cups.recommender.result.*
paper_cups.cross_sell.heading
paper_cups.cta.heading
```

### RTL Adjustments

- Tables scroll from right edge.
- Recommender step progress indicator reverses direction.
- Price indicator `$` symbols → `[CLIENT PLACEHOLDER — Arabic price symbol]`.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Recommender JS fails | Hide recommender, show static recommendation chart |
| Cup images fail | Placeholder with cup type name text |
| Table overflow | Scroll indicators (fade gradient on edges) |
| Deep link with query params | Pre-select cup type card if `?type=double-wall` in URL |
