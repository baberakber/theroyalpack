# 07 — Gallery Page

> Masonry image gallery showcasing printed cup designs with filtering, lightbox, and lazy loading.

**Route:** `/gallery`
**File:** `src/app/gallery/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Homepage mini gallery, nav menu, industries page |
| **Conversion goal** | User sees design quality, gets inspired, clicks "Get a Quote" |
| **Primary CTA** | "Get a Quote" (floating + bottom) |
| **Secondary CTA** | "Request a Free Sample" |
| **Exit paths** | Get a Quote, Design Support, Product pages |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Filter Chips**
3. **Masonry Gallery Grid**
4. **Load More / Infinite Scroll**
5. **CTA Banner**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Gallery`.
- **Heading (h1):** `"Our Work"` — `text-h1`.
- **Intro:** `"See what we've created for businesses like yours. Every cup tells a brand story."` — `text-body-lg`, max-width 640px.

### 2.2 Filter Chips

- **Layout:** Horizontal row of filter chips, scrollable on mobile.
- **Position:** Sticky below header on scroll (`top: 80px`, z-index `z-sticky`).
- **Background:** `color-bg-primary` with subtle bottom border.
- **Padding:** `py-3`.

**Filter Categories:**

| Chip Label | Filter Value |
|------------|-------------|
| All | `all` (default, active) |
| Cafés | `cafes` |
| Restaurants | `restaurants` |
| Hotels | `hotels` |
| Corporate | `corporate` |
| Events | `events` |
| Seasonal | `seasonal` |

**Chip Design:**
- Inactive: `color-bg-secondary` bg, `color-text-secondary` text, `radius-full`, `text-body-sm`.
- Active: `color-primary` bg, white text.
- Hover (inactive): `color-bg-tertiary`.
- Transition: `transition-fast`.
- Gap: `space-2`.

### 2.3 Masonry Gallery Grid

- **Layout:** CSS columns-based masonry.
  - Desktop (≥1280px): 4 columns.
  - Tablet (768–1279px): 3 columns.
  - Mobile (<768px): 2 columns.
- **Column gap:** `space-4` (16px).
- **Item gap:** `space-4` (16px), achieved via `margin-bottom` on each item.

**Gallery Item:**
- Image: `radius-lg`, `object-cover`, natural aspect ratio preserved.
- Overlay on hover: semi-transparent dark gradient from bottom.
- Overlay content:
  - Client name / cup description — `text-body-sm`, white, `font-medium`.
  - Category tag — small pill, `color-primary-wash` bg.
  - Expand icon (top-right) — `Maximize2` Lucide icon, white, 20px.
- Transition: overlay fades in (`transition-base`).
- Click: opens lightbox.

```tsx
interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  title: string;
  description?: string;
}
```

### Lazy Loading Strategy

- First 12 images: loaded immediately (SSR + priority for first row).
- Remaining: `loading="lazy"` with Intersection Observer.
- Blur-up placeholder: low-quality blurred version (10px wide, base64 inline).
- Images served via Next.js `<Image>` with `sizes` based on column count.
- Format: WebP with JPEG fallback.

### 2.4 Load More

- **Option A (recommended):** "Load More" button at bottom.
  - Shows 12 items initially, loads 12 more per click.
  - Button: variant `secondary`, size `md`, centered.
  - Text: `"Load More"` → `"Loading..."` (spinner) → updates.
  - Shows count: `"Showing 12 of 48 designs"`.

- **Option B:** Infinite scroll with Intersection Observer sentinel.
  - Not recommended for SEO reasons — use Option A.

### 2.5 Lightbox

- **Trigger:** Click on any gallery image.
- **Overlay:** `color-text-primary` bg, 95% opacity. `z-modal`.
- **Image:** Centered, max 90vw × 85vh, `object-contain`.
- **Controls:**
  - Close: `X` icon (top-right), also close on overlay click or `Escape` key.
  - Previous: `ChevronLeft` (left side or left arrow key).
  - Next: `ChevronRight` (right side or right arrow key).
  - Counter: `"3 / 24"` (bottom center).
- **Caption:** Below image — title + description if available.
- **Swipe:** Touch swipe left/right on mobile for navigation.
- **Body scroll:** Locked when lightbox is open.
- **Transition:** Image fades in (200ms), slides left/right on nav.
- **Preload:** Next and previous images preloaded.

```tsx
interface LightboxProps {
  images: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}
```

### 2.6 CTA Banner

- Standard CTA banner.
- Heading: `"Like What You See?"`.
- Subtext: `"Let's create something just as stunning for your brand."`.
- Buttons: "Get a Quote" + "Request Free Sample".

---

## 3. Component Breakdown

```
src/
├── app/
│   └── gallery/
│       └── page.tsx                    # Server component wrapper
├── components/
│   └── gallery/
│       ├── GalleryClient.tsx           # 'use client' — filter + grid + lightbox state
│       ├── FilterChips.tsx             # Filter chip row
│       ├── MasonryGrid.tsx             # CSS masonry layout
│       ├── GalleryItem.tsx             # Individual image with hover overlay
│       ├── Lightbox.tsx                # Full-screen lightbox
│       └── LoadMoreButton.tsx          # Load more with counter
```

### Data Loading

Gallery data is loaded from a JSON file (managed by admin panel):

```tsx
// src/data/gallery.json
{
  "items": [
    {
      "id": "1",
      "src": "/gallery/cafe-latte-cup.jpg",
      "alt": "Custom printed latte cup for Brew & Bean café",
      "width": 800,
      "height": 1000,
      "category": "cafes",
      "title": "Brew & Bean Café",
      "description": "Full-color offset print on 12oz double-wall cup"
    }
  ]
}
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Filters | Full row | Full row | Horizontal scroll |
| Grid | 4 columns | 3 columns | 2 columns |
| Lightbox | Centered large | Centered | Full-screen |
| Lightbox nav | Side arrows + keyboard | Side arrows + keyboard | Swipe + tap edges |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Gallery items | Fade-in-up on load | Initial + load more |
| Item hover overlay | Fade-in from bottom | Hover |
| Filter change | Items fade out/in with layout shift | Filter chip click |
| Lightbox open | Fade-in overlay, scale-up image from click position | Click |
| Lightbox close | Reverse of open | Close action |
| Lightbox nav | Slide left/right | Arrow click/key/swipe |
| Load more items | Fade-in-up, stagger | Load more click |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Gallery — Custom Printed Cup Designs | Xerostop Cups',
  description: 'Browse our gallery of custom printed paper cup designs for cafés, restaurants, hotels, and corporate events.',
  openGraph: {
    title: 'Gallery — Custom Printed Cup Designs | Xerostop Cups',
    description: 'See examples of our custom cup printing work across various industries.',
    images: [{ url: '/og/gallery.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Xerostop Cups Design Gallery",
  "description": "Custom printed paper cup designs for various industries",
  "numberOfItems": 48
}
```

---

## 7. Accessibility

- Filter chips: `role="radiogroup"`, each chip `role="radio"`, `aria-checked`.
- Gallery grid: `role="list"`, each item `role="listitem"`.
- Images: descriptive `alt` text (not decorative).
- Lightbox: `role="dialog"`, `aria-modal="true"`, `aria-label="Image lightbox"`.
- Lightbox focus trap: focus cycles through close button, prev, next.
- Close on `Escape` key.
- Arrows keyboard-navigable.
- `aria-live="polite"` region announces current image: `"Image 3 of 24: Brew & Bean Café"`.
- Load more button: `aria-live="polite"` announces new item count.
- Reduced motion: no slide transitions, instant switch.

---

## 8. Performance

- Initial load: 12 images with blur-up placeholders.
- Images sized per column: `sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"`.
- Lightbox images: full-resolution loaded on demand.
- Gallery JSON: fetched at build time (static) or on mount (if dynamic from admin).
- Filter: client-side filtering (no server request — all data loaded).
- CSS columns for masonry (no JS layout library).

**Core Web Vitals targets:**
- LCP: < 2.5s (first visible gallery images).
- CLS: 0 (blur placeholders match final dimensions).
- INP: < 200ms (filter switches).

---

## 9. i18n & RTL

### Translation Keys

```
gallery.breadcrumb
gallery.header.heading
gallery.header.intro
gallery.filter.all
gallery.filter.cafes
gallery.filter.restaurants
gallery.filter.hotels
gallery.filter.corporate
gallery.filter.events
gallery.filter.seasonal
gallery.load_more
gallery.showing_count
gallery.lightbox.close
gallery.lightbox.previous
gallery.lightbox.next
gallery.lightbox.counter
gallery.cta.*
```

### RTL Adjustments

- Filter chips: same (flex-wrap handles direction).
- Masonry columns: same (CSS columns is direction-agnostic).
- Lightbox: prev/next arrows swap sides.
- Lightbox swipe: directions swap.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Image fails to load | Show `color-bg-tertiary` placeholder with `ImageOff` icon |
| No images in category | Message: `"No designs in this category yet."` with CTA to view all |
| Gallery JSON empty | Show message: `"Gallery coming soon. Check back later!"` |
| Lightbox image slow | Show loading spinner in lightbox while image loads |
| 100+ images | Pagination via load more prevents DOM overload |
| JS disabled | Grid renders with SSR images, no lightbox (links to full-size images instead) |
