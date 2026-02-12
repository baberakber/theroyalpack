# 02 — Products Landing Page

> Gateway page that introduces all product categories and routes users to detailed sub-pages.

**Route:** `/products`
**File:** `src/app/products/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Main nav "Products" link, homepage "What We Do" cards |
| **Conversion goal** | Navigate to a specific product sub-page |
| **Primary CTA** | Explore individual product pages |
| **Secondary CTA** | "Get a Quote" in cross-sell banner |
| **Exit paths** | Paper Cups, Cup Printing, Accessories sub-pages |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Product Category Cards** (3 cards)
3. **Cross-Sell Banner**

---

### 2.1 Page Header

- **Background:** `color-primary-wash` gradient to white.
- **Padding:** `pt-24 pb-12`.
- **Breadcrumb:** `Home > Products` — `text-body-sm`, `color-text-muted`.
- **Heading (h1):** `"Our Products"` — `text-h1`, `color-text-primary`.
- **Subheading:** `"From the cup to the lid, we provide everything your brand needs for a premium takeaway experience."` — `text-body-lg`, `color-text-secondary`, max-width 640px.

### 2.2 Product Category Cards

- **Background:** `color-bg-primary`.
- **Padding:** `py-16`.
- **Grid:** 3 columns on desktop, 1 column on mobile. Gap `space-8`.

**Cards:**

| # | Image | Title | Description | Link |
|---|-------|-------|-------------|------|
| 1 | Paper cups lineup photo | Paper Cups | `"Single-wall, double-wall, and ripple-wall paper cups available in 14 sizes — from 2.5oz espresso to 22oz cold drinks."` | `/products/paper-cups` |
| 2 | Printed cups showcase | Custom Printing | `"Full-color offset and flexographic printing to put your brand on every cup. Free design support included."` | `/products/cup-printing` |
| 3 | Lids and accessories | Accessories | `"Matching lids, insulating sleeves, stirrers, and cup carriers — everything to complement your cups."` | `/products/accessories` |

**Card Design:**
- Full-width image top, aspect ratio 16:9, `object-cover`, `radius-lg` top corners only.
- Body: padding `space-6`.
- Title: `text-h3`, `color-text-primary`.
- Description: `text-body`, `color-text-secondary`.
- CTA: `"Explore Paper Cups →"` (etc.) — Button variant `primary`, size `md`, full-width.
- Border: `1px solid color-border-light`.
- Border radius: `radius-lg`.
- Shadow: `shadow-md`.
- Hover: `shadow-lg`, translateY(-4px), image zoom 1.05x.
- Transition: `transition-base`.

### 2.3 Cross-Sell Banner

- **Background:** `color-bg-secondary`.
- **Padding:** `py-12`.
- **Layout:** Two columns — text left, CTA right (centered on mobile).
- **Heading (h2):** `"Need a Complete Package?"` — `text-h3`, `color-text-primary`.
- **Text:** `"We can supply cups, printing, lids, and sleeves as a single order — making procurement simple."` — `text-body`, `color-text-secondary`.
- **CTA:** `"Get a Custom Quote"` → `/get-a-quote` — Button variant `accent`, size `lg`.

---

## 3. Component Breakdown

```
src/
├── app/
│   └── products/
│       └── page.tsx                     # Products landing server component
├── components/
│   └── products/
│       ├── ProductCategoryCard.tsx       # Large card with image, text, CTA
│       └── CrossSellBanner.tsx          # Bottom CTA banner
│   └── shared/
│       └── Breadcrumb.tsx               # Reusable breadcrumb component
```

### Props Interfaces

```tsx
interface ProductCategoryCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
}

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Header | Left-aligned | Left-aligned | Centered |
| Cards | 3-col grid | 2-col + 1 below | 1-col stack |
| Cross-sell | 2-col | 2-col | 1-col centered |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Cards | Fade-in-up | Scroll, stagger 150ms |
| Card hover | Lift + shadow | Hover |
| Card image | Zoom 1.05x | Hover |
| Cross-sell | Fade-in | Scroll |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Products — Paper Cups, Printing & Accessories | Xerostop Cups',
  description: 'Browse our range of paper cups, custom printing services, and accessories including lids, sleeves, and carriers.',
  openGraph: {
    title: 'Products — Paper Cups, Printing & Accessories | Xerostop Cups',
    description: 'Everything for branded takeaway cups — from manufacturing to printing to accessories.',
    images: [{ url: '/og/products.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Xerostop Cups Products",
  "description": "Paper cups, custom printing, and accessories for branded takeaway experiences.",
  "hasPart": [
    {
      "@type": "Product",
      "name": "Paper Cups",
      "url": "/products/paper-cups"
    },
    {
      "@type": "Product",
      "name": "Custom Cup Printing",
      "url": "/products/cup-printing"
    },
    {
      "@type": "Product",
      "name": "Cup Accessories",
      "url": "/products/accessories"
    }
  ]
}
```

---

## 7. Accessibility

- Breadcrumb uses `<nav aria-label="Breadcrumb">` with `<ol>` structure.
- Cards are `<article>` elements. The entire card is clickable via a stretched link (`<a>` inside).
- Image alt text is descriptive: e.g., `"Lineup of single-wall, double-wall, and ripple-wall paper cups"`.
- Focus visible on card links with `ring-2 ring-primary`.

---

## 8. Performance

- Card images: lazy loaded, WebP with JPEG fallback, `sizes="(max-width: 768px) 100vw, 33vw"`.
- Page is SSR (no client interactivity beyond hover).
- Minimal JS — no client components needed.

---

## 9. i18n & RTL

### Translation Keys

```
products.breadcrumb.home
products.breadcrumb.products
products.header.heading
products.header.subheading
products.card_{1,2,3}.title
products.card_{1,2,3}.description
products.card_{1,2,3}.cta
products.cross_sell.heading
products.cross_sell.text
products.cross_sell.cta
```

### RTL Adjustments

- Breadcrumb separator flips direction.
- Card text aligns to `text-start`.
- Cross-sell banner: text right, CTA left.
- Arrow in CTA text flips.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Card image fails | Show `color-primary-wash` placeholder with cup icon |
| No JS | Page works fully (SSR), hover effects degrade gracefully |
