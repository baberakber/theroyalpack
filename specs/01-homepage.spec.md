# 01 — Homepage

> The primary entry point for the Xerostop Cups website.
> Converts first-time visitors into quote/sample requesters, builds brand trust.

**Route:** `/`
**File:** `src/app/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Direct URL, Google search, social media, QR code on physical cup |
| **Conversion goal** | Click "Get a Quote" or "Request Sample" |
| **Primary CTA** | "Get a Quote" (accent button) |
| **Secondary CTA** | "Request a Free Sample" (secondary button) |
| **Exit paths** | Products pages, Gallery, About Us, Contact |

---

## 2. Layout Structure

### Section Order (top to bottom)

1. **Hero Section**
2. **Trust Bar** (logo strip)
3. **What We Do** (3 cards)
4. **Why Xerostop** (4 pillars)
5. **Mini Gallery** (photo grid)
6. **Industries We Serve** (preview)
7. **CTA Banner**

---

### 2.1 Hero Section

- **Background:** Full-width, `color-bg-secondary` with subtle radial gradient from `color-primary-wash` top-center.
- **Layout:** Two columns on desktop (60/40 text/image), stacked on mobile (text above image).
- **Height:** Viewport height minus header (calc(100vh - 80px)), min 500px, max 800px.

**Left Column (Text):**
- Eyebrow badge: `"Premium Paper Cups"` — small pill badge, `color-primary-wash` bg, `color-primary` text.
- Heading (h1): `"Custom Branded Paper Cups for Your Business"` — `text-display`, `color-text-primary`.
- Subheading: `"From single-wall to ripple-wall, we manufacture and print high-quality paper cups tailored to your brand. Minimum order from 1,000 pieces."` — `text-body-lg`, `color-text-secondary`, max-width 560px.
- CTA Group:
  - Primary: `"Get a Quote"` → `/get-a-quote` — Button variant `accent`, size `lg`.
  - Secondary: `"Request Free Sample"` → `/request-sample` — Button variant `secondary`, size `lg`.
- Trust line: `"✓ Custom printing  ✓ Fast turnaround  ✓ MOQ 1,000 pcs"` — `text-body-sm`, `color-text-muted`. Use check-circle icons from Lucide.

**Right Column (Image):**
- Hero image: Branded paper cups arrangement. `priority` loading, `sizes="(max-width: 768px) 100vw, 40vw"`.
- Subtle float animation (3s ease-in-out infinite, translateY ±8px).
- Image wrapped in rounded container with `radius-xl` and `shadow-lg`.

**Responsive:**
- Desktop (≥1280px): Two columns, 60/40.
- Tablet (768–1279px): Two columns, 55/45, smaller text.
- Mobile (<768px): Single column, text centered, image below at 80% width, `text-display` → 36px.

### 2.2 Trust Bar

- **Background:** `color-bg-primary` (white).
- **Padding:** `py-8`.
- **Content:** Row of partner/client logos, grayscale, opacity 0.6, full opacity on hover.
- **Label:** Small centered text above logos: `"Trusted by businesses across the region"` — `text-caption`, `color-text-muted`, uppercase, `tracking-widest`.
- **Logos:** 5–8 client logos. `[CLIENT PLACEHOLDER — provide 5-8 client logos as SVG or PNG]`.
- **Behavior:** Auto-scrolling marquee on mobile (CSS animation, `prefers-reduced-motion: reduce` → static grid).
- Desktop: Static flex row, `justify-evenly`, `items-center`, gap `space-8`.

### 2.3 What We Do (3 Cards)

- **Background:** `color-bg-secondary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"What We Offer"` — centered, `text-h2`, `color-text-primary`.
- **Subheading:** `"Everything you need for branded disposable cups"` — `text-body-lg`, `color-text-secondary`, centered, max-width 600px.
- **Grid:** 3 columns on desktop, 1 column on mobile. Gap `space-8`.

**Cards:**

| Card | Icon | Title | Description | Link |
|------|------|-------|-------------|------|
| 1 | `Coffee` (Lucide) | Paper Cups | `"Single-wall, double-wall, and ripple-wall cups in 14 sizes"` | `/products/paper-cups` |
| 2 | `Printer` (Lucide) | Custom Printing | `"Full-color offset and flexo printing with your branding"` | `/products/cup-printing` |
| 3 | `Package` (Lucide) | Accessories | `"Lids, sleeves, stirrers, and carriers to complete your setup"` | `/products/accessories` |

**Card Design:**
- Background: `color-bg-primary`.
- Border radius: `radius-lg`.
- Padding: `space-6`.
- Shadow: `shadow-md`, on hover `shadow-lg` + translateY(-4px).
- Icon: 48px, `color-primary`, inside 72px circle with `color-primary-wash` background.
- Title: `text-h4`, `color-text-primary`.
- Description: `text-body`, `color-text-secondary`.
- Link: `"Learn more →"` — `text-body-sm`, `color-primary`, `font-medium`, hover underline.
- Transition: `transition-base`.

### 2.4 Why Xerostop (4 Pillars)

- **Background:** `color-bg-primary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"Why Choose Xerostop"` — centered.
- **Grid:** 4 columns desktop, 2×2 tablet, 1 column mobile. Gap `space-8`.

| Pillar | Icon | Title | Description |
|--------|------|-------|-------------|
| 1 | `Factory` | Own Manufacturing | `"We control every step — from raw paper to finished cup — in our own facility."` |
| 2 | `Palette` | Design Support | `"Free design assistance to bring your brand to life on every cup."` |
| 3 | `Truck` | Fast Delivery | `"Regional delivery network with turnaround as fast as 7 business days."` |
| 4 | `ShieldCheck` | Quality Certified | `"Food-safe materials, ISO-compliant processes, rigorous quality checks."` |

**Pillar Design:**
- No card background (flat).
- Icon: 40px, `color-accent`, margin-bottom `space-4`.
- Title: `text-h5`, `color-text-primary`.
- Description: `text-body`, `color-text-secondary`.
- On scroll: fade-in-up with staggered delay (100ms between each).

### 2.5 Mini Gallery

- **Background:** `color-bg-secondary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"Our Work"` — left-aligned on desktop, centered on mobile.
- **Layout:** 2×3 grid of images on desktop (with varying heights for masonry effect), 2×2 on tablet, scrollable horizontal row on mobile.
- **Images:** 6 photos of printed cups. `[CLIENT PLACEHOLDER — provide 6+ high-quality photos of printed cups]`.
- **Image treatment:** `radius-lg`, `object-cover`, on hover scale(1.03) with `transition-slow`.
- **CTA:** `"View Full Gallery →"` — link below grid, `color-primary`, `font-medium`.

### 2.6 Industries We Serve (Preview)

- **Background:** `color-bg-primary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"Industries We Serve"`.
- **Layout:** Horizontal scroll of industry cards on mobile, grid (4 per row) on desktop.
- **Cards:** Show 4 of 7 industries (cafes, restaurants, hotels, corporate). Each card:
  - Background image with dark gradient overlay.
  - Industry name centered in white, `text-h4`, `font-bold`.
  - Rounded `radius-lg`.
  - Aspect ratio: 4:3.
  - Hover: slight zoom on bg image, overlay lightens.
- **CTA:** `"See All Industries →"` → `/industries` — link below.

### 2.7 CTA Banner

- **Background:** Gradient from `color-primary` to `color-primary-dark`, angled 135deg.
- **Padding:** `py-16`.
- **Content:** Centered.
  - Heading (h2): `"Ready to Brand Your Cups?"` — white, `text-h2`.
  - Subtext: `"Get a custom quote in minutes. Free design support included."` — white, opacity 0.9, `text-body-lg`.
  - Two buttons side by side:
    - `"Get a Quote"` — Button variant `accent`, size `lg`.
    - `"Request Free Sample"` — white outline button (custom: white border, white text, hover bg white/10).
- **Decoration:** Subtle cup silhouette SVG watermark, positioned bottom-right, opacity 0.05, `aria-hidden`.

---

## 3. Component Breakdown

```
src/
├── app/
│   └── page.tsx                          # Homepage server component
├── components/
│   └── home/
│       ├── HeroSection.tsx               # Hero with text + image
│       ├── TrustBar.tsx                  # Client logo strip
│       ├── WhatWeDoSection.tsx           # 3 service cards
│       ├── ServiceCard.tsx               # Individual card
│       ├── WhyXerostopSection.tsx        # 4 pillars
│       ├── PillarItem.tsx                # Individual pillar
│       ├── MiniGallery.tsx               # 6-image grid
│       ├── IndustriesPreview.tsx         # Industry cards preview
│       ├── IndustryCard.tsx              # Individual industry card
│       └── CtaBanner.tsx                 # Bottom CTA section
```

### Key Props Interfaces

```tsx
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface PillarItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number; // animation stagger delay in ms
}

interface IndustryCardProps {
  name: string;
  backgroundImage: string;
  href: string;
}
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Hero | 2-col 60/40 | 2-col 55/45 | 1-col stacked |
| Trust Bar | Static row | Static row | Marquee scroll |
| What We Do | 3-col grid | 3-col grid | 1-col stack |
| Why Xerostop | 4-col grid | 2×2 grid | 1-col stack |
| Mini Gallery | 2×3 grid | 2×2 grid | Horizontal scroll |
| Industries | 4 per row | 2×2 | Horizontal scroll |
| CTA Banner | Centered text | Same | Buttons stack |

---

## 5. Animations & Interactions

| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Hero image | Float | Auto, infinite | `translateY(±8px)`, 3s ease-in-out |
| Service cards | Fade-in-up | Scroll into view | 30px travel, 600ms, stagger 100ms |
| Pillar items | Fade-in-up | Scroll into view | 30px travel, 600ms, stagger 100ms |
| Gallery images | Scale on hover | Hover | `scale(1.03)`, `transition-slow` |
| Industry cards | Overlay shift | Hover | Gradient lightens, bg-image zooms 1.05x |
| CTA buttons | Standard button | Hover/focus | Per design tokens |
| Trust bar logos | Marquee | Auto (mobile) | 30s linear infinite, pauses on hover |

All scroll animations respect `prefers-reduced-motion: reduce` → instant reveal, no motion.

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Xerostop Cups — Custom Branded Paper Cups & Printing',
  description: 'Manufacturer of custom branded paper cups. Single-wall, double-wall, and ripple-wall cups with full-color printing. Get a quote today.',
  openGraph: {
    title: 'Xerostop Cups — Custom Branded Paper Cups & Printing',
    description: 'Premium paper cups with custom printing for cafes, restaurants, hotels, and corporate events. MOQ from 1,000 pieces.',
    images: [{ url: '/og/homepage.jpg', width: 1200, height: 630 }],
    type: 'website',
    siteName: 'Xerostop Cups',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    languages: {
      'en': '/',
      'ar': '/ar',
    },
  },
};
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Xerostop Cups",
  "description": "Manufacturer of custom branded paper cups with printing services.",
  "url": "https://www.xerostopcups.com",
  "logo": "https://www.xerostopcups.com/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "[CLIENT PLACEHOLDER]",
    "telephone": "[CLIENT PLACEHOLDER]",
    "availableLanguage": ["English", "Arabic"]
  },
  "sameAs": [
    "[CLIENT PLACEHOLDER — social media URLs]"
  ]
}
```

---

## 7. Accessibility

- Hero heading is `<h1>`, only one per page.
- All section headings use `<h2>`.
- Images have descriptive `alt` text.
- CTA buttons have clear, actionable text (no "Click here").
- Trust bar logos: `alt="[Company Name] logo"` or `alt=""` with `aria-label` on the container.
- Marquee has `aria-label="Trusted partners"` and `role="marquee"`.
- Service cards are `<a>` wrapping the card (entire card clickable).
- Skip-link at top of page: `"Skip to main content"` → `#main`.
- Color contrast: all text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text).

---

## 8. Performance

- Hero image: `priority` prop (no lazy load), preloaded.
- Gallery images: `loading="lazy"`, use `<Image>` component with `sizes` and `srcSet`.
- Trust bar logos: inline SVG or small optimized PNGs.
- Intersection Observer for scroll animations (native `IntersectionObserver`, no heavy library).
- Bundle: page-specific components in `components/home/` — tree-shaken if not used elsewhere.

---

## 9. i18n & RTL

### Translation Keys

```
home.hero.badge
home.hero.heading
home.hero.subheading
home.hero.cta_quote
home.hero.cta_sample
home.hero.trust_line
home.trust_bar.label
home.what_we_do.heading
home.what_we_do.subheading
home.what_we_do.card_{1,2,3}_title
home.what_we_do.card_{1,2,3}_description
home.what_we_do.card_{1,2,3}_link
home.why.heading
home.why.pillar_{1,2,3,4}_title
home.why.pillar_{1,2,3,4}_description
home.gallery.heading
home.gallery.cta
home.industries.heading
home.industries.cta
home.cta_banner.heading
home.cta_banner.subtext
home.cta_banner.cta_quote
home.cta_banner.cta_sample
```

### RTL Adjustments

- Hero: text-start (flips to right-aligned), image on opposite side.
- Marquee direction reverses.
- Arrow in "Learn more →" becomes "← Learn more".
- Card icon alignment: `me-4` (margin-end) instead of `mr-4`.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Hero image fails to load | Show `color-primary-wash` gradient background; alt text visible |
| Gallery images fail | Skeleton placeholders remain; no broken image icon |
| Client logos missing | Hide trust bar section entirely (conditional render) |
| JS disabled | All content visible; scroll animations don't run; marquee is static row |
| Slow connection | Skeleton shimmer on image areas; text loads first (SSR) |
