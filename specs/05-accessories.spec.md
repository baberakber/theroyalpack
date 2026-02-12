# 05 — Accessories Page

> Displays all cup accessories: lids, sleeves, stirrers, and carriers with a compatibility chart.

**Route:** `/products/accessories`
**File:** `src/app/products/accessories/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Products landing, paper cups cross-sell, nav menu |
| **Conversion goal** | User adds accessories to their cup order and requests a quote |
| **Primary CTA** | "Get a Quote" (with accessories context) |
| **Secondary CTA** | "View Paper Cups" (cross-sell) |
| **Exit paths** | Get a Quote, Paper Cups |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Accessory Categories** (4 categories with product details)
3. **Compatibility Chart**
4. **Bundle CTA**
5. **Bottom CTA**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Products > Accessories`.
- **Heading (h1):** `"Cup Accessories"` — `text-h1`.
- **Intro:** `"Complete your cup setup with matching lids, insulating sleeves, stirrers, and carriers. All available to order alongside your paper cups."` — `text-body-lg`, max-width 720px.

### 2.2 Accessory Categories

Each category is a full-width section with image + details. Alternating left/right layout on desktop.

#### Category 1: Lids

- **Heading (h3):** `"Lids"`.
- **Image:** Assorted lids on cups.
- **Description:** `"Food-grade plastic and paper lids designed to fit our cup range perfectly. Available in flat, dome, and sip-through styles."`.
- **Variants Table:**

| Lid Type | Material | Fits Cup Sizes | Features |
|----------|----------|---------------|----------|
| Flat Lid | PS Plastic | 8oz–22oz | Straw slot, tight seal |
| Dome Lid | PS Plastic | 12oz–22oz | For whipped cream, cold drinks |
| Sip-Through Lid | PS Plastic | 8oz–16oz | Hot drink sipping, anti-splash |
| Paper Lid | Paperboard | 8oz–16oz | Eco-friendly, recyclable |

`[CLIENT PLACEHOLDER — confirm lid types, materials, and sizing]`

#### Category 2: Sleeves

- **Heading (h3):** `"Cup Sleeves"`.
- **Image:** Kraft and printed sleeves on cups.
- **Description:** `"Insulating kraft paper sleeves for single-wall cups. Available in natural brown or with custom printing to extend your branding."`.
- **Options:**
  - Natural kraft (unprinted)
  - Custom printed (1–4 color flexo)
  - Embossed
- **Fits:** 8oz–16oz single-wall cups.
- **MOQ:** `[CLIENT PLACEHOLDER]`.

#### Category 3: Stirrers

- **Heading (h3):** `"Stirrers"`.
- **Image:** Wooden and paper stirrers.
- **Description:** `"Eco-friendly wooden and paper stirrers. Biodegradable and compostable alternatives to plastic."`.
- **Options:**

| Type | Material | Length | Pack Size |
|------|----------|--------|-----------|
| Wooden Flat | Birch wood | 140mm / 190mm | 1,000 pcs |
| Wooden Round | Birch wood | 140mm / 190mm | 1,000 pcs |
| Paper | FSC paper | 140mm | 1,000 pcs |

`[CLIENT PLACEHOLDER — confirm stirrer specs]`

#### Category 4: Cup Carriers

- **Heading (h3):** `"Cup Carriers"`.
- **Image:** 2-cup and 4-cup carriers with cups.
- **Description:** `"Sturdy pulp-molded carriers for takeaway orders. Available in 2-cup and 4-cup configurations."`.
- **Options:**

| Type | Capacity | Material | Pack Size |
|------|----------|----------|-----------|
| 2-Cup Carrier | 2 cups | Molded pulp | 300 pcs |
| 4-Cup Carrier | 4 cups | Molded pulp | 200 pcs |

`[CLIENT PLACEHOLDER — confirm carrier specs and pack sizes]`

**Section Design (all categories):**
- Image/text alternating layout: odd categories = image left, even = image right.
- Image: `radius-lg`, `shadow-md`, `object-cover`, aspect 4:3.
- Variant tables: compact, within the section.
- Background: alternating `color-bg-primary` / `color-bg-secondary`.
- Padding: `py-16`.

### 2.3 Compatibility Chart

- **Heading (h2):** `"What Fits What — Compatibility Guide"`.
- **Subtext:** `"Quick reference to find the right accessories for your cup size."`.
- **Table:**

| Cup Size | Flat Lid | Dome Lid | Sip Lid | Paper Lid | Sleeve | 2-Cup Carrier | 4-Cup Carrier |
|----------|:--------:|:--------:|:-------:|:---------:|:------:|:-------------:|:-------------:|
| 2.5oz | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 4oz | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| 6–7oz | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| 8oz | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 9–10oz | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 12oz | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 14–16oz | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 18–22oz | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |

`[CLIENT PLACEHOLDER — confirm all compatibility data]`

**Table Design:**
- Sticky first column on mobile scroll.
- ✅ = `color-success` check icon, ❌ = `color-text-muted` x icon.
- Hover row highlight with `color-bg-secondary`.
- `aria-label` for each cell: `"Flat lid compatible with 8oz cup"` / `"Flat lid not compatible with 2.5oz cup"`.

### 2.4 Bundle CTA

- **Background:** `color-accent-wash`.
- **Layout:** Centered text.
- **Heading (h2):** `"Order Cups + Accessories Together"`.
- **Text:** `"Save time on procurement — bundle your cups, lids, and sleeves in a single order."`.
- **CTA:** `"Get a Bundle Quote"` → `/get-a-quote` — Button variant `accent`, size `lg`.

### 2.5 Bottom CTA

- Standard CTA banner.
- Heading: `"Need Accessories for Your Cups?"`.
- Buttons: "Get a Quote" + "View Paper Cups".

---

## 3. Component Breakdown

```
src/
├── app/
│   └── products/
│       └── accessories/
│           └── page.tsx
├── components/
│   └── products/
│       ├── AccessoryCategory.tsx        # Image + text + table section
│       ├── CompatibilityChart.tsx       # Full compatibility table
│       └── BundleCta.tsx               # Bundle CTA section
```

### Props Interfaces

```tsx
interface AccessoryCategoryProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  children: React.ReactNode;  // table or options list
}
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Categories | 2-col (image + text) | 2-col | 1-col, image above |
| Compatibility | Full table | Horizontal scroll, sticky col 1 | Horizontal scroll, sticky col 1 |
| Bundle CTA | Centered wide | Same | Stack |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Category sections | Fade-in-up | Scroll |
| Compatibility rows | Subtle row highlight | Hover |
| Bundle CTA | Fade-in | Scroll |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Cup Accessories — Lids, Sleeves, Stirrers & Carriers | Xerostop Cups',
  description: 'Complete your paper cup order with matching lids, insulating sleeves, eco-friendly stirrers, and cup carriers.',
  openGraph: {
    title: 'Cup Accessories — Lids, Sleeves, Stirrers & Carriers | Xerostop Cups',
    description: 'Lids, sleeves, stirrers, and carriers to complement your branded paper cups.',
    images: [{ url: '/og/accessories.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Accessibility

- Compatibility chart: sticky column has `aria-label` context.
- Check/X icons have screen-reader text: `"Compatible"` / `"Not compatible"`.
- Images have descriptive alt text.
- Tables use proper semantic markup.

---

## 8. Performance

- Images: lazy loaded with blur placeholder.
- Compatibility chart: SSR, no JS.
- Page is mostly static content — minimal client JS.

---

## 9. i18n & RTL

### Translation Keys

```
accessories.breadcrumb
accessories.header.*
accessories.lids.*
accessories.sleeves.*
accessories.stirrers.*
accessories.carriers.*
accessories.compatibility.*
accessories.bundle.*
accessories.cta.*
```

### RTL Adjustments

- Image/text alternation swaps: odd categories image on right, even on left.
- Table scrolls from right.
- Sticky column on right side.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Category image fails | `color-bg-secondary` placeholder with accessory icon |
| Compatibility data incomplete | Show `—` for unknown compatibility |
| User looking for specific size | Compatibility chart has sticky first column for easy reference |
