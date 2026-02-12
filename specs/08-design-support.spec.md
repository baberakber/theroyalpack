# 08 — Design Support Page

> Explains design services, provides design guidelines (CMYK, bleed, DPI), and offers downloadable templates.

**Route:** `/design-support`
**File:** `src/app/design-support/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Cup printing page CTA, nav menu, footer links |
| **Conversion goal** | User downloads a template or starts a quote with design support |
| **Primary CTA** | "Get a Quote with Design Support" |
| **Secondary CTA** | "Download Templates" |
| **Exit paths** | Get a Quote, Cup Printing, Contact |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Our Design Services**
3. **Design Guidelines**
4. **Downloadable Templates**
5. **CTA Section**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Design Support`.
- **Heading (h1):** `"Design Support"` — `text-h1`.
- **Intro:** `"Not a designer? No problem. Our team helps you create print-ready cup artwork — free with every order. Already have a design? Follow our guidelines to ensure perfect results."` — `text-body-lg`, max-width 720px.

### 2.2 Our Design Services

- **Background:** `color-bg-primary`.
- **Heading (h2):** `"How We Help"`.
- **Layout:** 3-column cards (desktop), stacked (mobile).

| Service | Icon | Title | Description |
|---------|------|-------|-------------|
| 1 | `PenTool` | Design from Scratch | `"Share your logo and brand guidelines. We'll create a complete cup design for you."` |
| 2 | `RefreshCw` | Adapt Existing Design | `"Have an existing design? We'll adapt it to cup dimensions with proper bleed and color settings."` |
| 3 | `Eye` | Proof & Revise | `"Receive a digital proof mockup. Request unlimited revisions until you're happy."` |

**Card Design:**
- Same as homepage service cards.
- Icon: 48px circle with `color-primary-wash` bg.
- Title: `text-h4`.
- Description: `text-body`.
- Below cards: `"Design support is free with every printing order."` — highlighted in `color-accent`, `font-semibold`.

### 2.3 Design Guidelines

- **Background:** `color-bg-secondary`.
- **Heading (h2):** `"Design Guidelines for Print-Ready Files"`.
- **Subtext:** `"If you're preparing your own artwork, follow these specifications to ensure the best print quality."`.

**Guidelines Grid:** 2 columns on desktop, stacked on mobile.

#### Guideline 1: Color Mode

- **Icon:** `Palette`, `color-primary`.
- **Heading (h3):** `"Use CMYK Color Mode"`.
- **Body:** `"All artwork must be in CMYK color mode, not RGB. RGB colors will shift during printing. Convert your files before submission."`.
- **Tip box:** `color-accent-wash` bg, `"Tip: If you need exact color matching, provide Pantone (PMS) codes."`.

#### Guideline 2: Resolution

- **Icon:** `Maximize`, `color-primary`.
- **Heading (h3):** `"Minimum 300 DPI"`.
- **Body:** `"Images and artwork must be at least 300 DPI (dots per inch) at actual print size. Low-resolution files will appear blurry when printed."`.
- **Tip box:** `"Tip: Vector files (AI, EPS, PDF) are ideal as they scale without quality loss."`.

#### Guideline 3: Bleed & Safe Zone

- **Icon:** `Crop`, `color-primary`.
- **Heading (h3):** `"Bleed Area: 3mm"`.
- **Body:** `"Extend your design 3mm beyond the cup template edge (bleed area). Keep important text and logos at least 5mm inside the cut line (safe zone)."`.
- **Visual:** Diagram showing cup template with bleed, cut line, and safe zone marked. SVG inline.

#### Guideline 4: File Formats

- **Icon:** `FileType`, `color-primary`.
- **Heading (h3):** `"Accepted File Formats"`.
- **Body:**
  - ✅ Preferred: Adobe Illustrator (`.ai`), PDF (`.pdf`), EPS (`.eps`)
  - ✅ Accepted: PSD (`.psd`) at 300 DPI, TIFF (`.tiff`)
  - ⚠️ Conditional: PNG/JPEG — only if 300 DPI+ and CMYK
  - ❌ Not accepted: Word, PowerPoint, low-res JPEG

#### Guideline 5: Fonts

- **Icon:** `Type`, `color-primary`.
- **Heading (h3):** `"Outline All Fonts"`.
- **Body:** `"Convert all text to outlines/paths before submitting. This prevents font substitution issues. Alternatively, include the font files with your artwork."`.

#### Guideline 6: Cup Template

- **Icon:** `FileDown`, `color-primary`.
- **Heading (h3):** `"Use Our Cup Templates"`.
- **Body:** `"Download the correct template for your cup size below. Templates include bleed lines, safe zones, and print area markings."`.

### 2.4 Downloadable Templates

- **Background:** `color-bg-primary`.
- **Heading (h2):** `"Download Cup Templates"`.
- **Subtext:** `"Select your cup size to download the corresponding design template. Available in AI, PDF, and PNG formats."`.

**Template Grid:** Responsive grid of download cards.

| Cup Size | Formats Available | File Size (approx) |
|----------|------------------|-------------------|
| 4oz | AI, PDF, PNG | ~1MB |
| 6–7oz | AI, PDF, PNG | ~1MB |
| 8oz | AI, PDF, PNG | ~1MB |
| 9–10oz | AI, PDF, PNG | ~1MB |
| 12oz | AI, PDF, PNG | ~1.2MB |
| 14oz | AI, PDF, PNG | ~1.2MB |
| 16oz | AI, PDF, PNG | ~1.2MB |
| 22oz | AI, PDF, PNG | ~1.5MB |

`[CLIENT PLACEHOLDER — provide all template files]`

**Download Card Design:**
- Small card with cup size as title.
- 3 format buttons (AI / PDF / PNG) as small download links.
- Download icon (`Download` from Lucide).
- `color-bg-secondary` bg, `radius-md`, padding `space-4`.
- File size shown as `text-caption`, `color-text-muted`.
- Hover: `shadow-sm`.

### 2.5 CTA Section

- **Background:** `color-primary-wash`.
- **Heading (h2):** `"Ready to Get Started?"`.
- **Text:** `"Whether you have a finished design or need our help, we're ready to print your perfect cup."`.
- **Buttons:**
  - `"Get a Quote"` → `/get-a-quote` — variant `accent`, size `lg`.
  - `"Contact Our Design Team"` → `/contact` — variant `secondary`, size `lg`.

---

## 3. Component Breakdown

```
src/
├── app/
│   └── design-support/
│       └── page.tsx
├── components/
│   └── design-support/
│       ├── DesignServiceCard.tsx
│       ├── GuidelineItem.tsx
│       ├── BleedDiagram.tsx            # SVG diagram
│       ├── TemplateGrid.tsx
│       └── TemplateDownloadCard.tsx
```

### Props Interfaces

```tsx
interface GuidelineItemProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  tip?: string;
  visual?: React.ReactNode;
}

interface TemplateDownloadCardProps {
  cupSize: string;
  formats: { label: string; href: string; size: string }[];
}
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Services | 3-col | 3-col | 1-col stack |
| Guidelines | 2-col | 2-col | 1-col stack |
| Templates | 4-col grid | 3-col | 2-col |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Service cards | Fade-in-up, stagger | Scroll |
| Guideline items | Fade-in-up | Scroll |
| Bleed diagram | Draw-in SVG lines | Scroll |
| Template cards | Fade-in | Scroll |
| Download buttons | Standard button hover | Hover |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Design Support — Free Cup Design Service & Templates | Xerostop Cups',
  description: 'Free design support for custom cup printing. Download cup design templates and follow our guidelines for CMYK, bleed, and DPI.',
  openGraph: {
    title: 'Design Support — Free Cup Design & Templates | Xerostop Cups',
    description: 'Get free design help or download templates for your custom cup artwork.',
    images: [{ url: '/og/design-support.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Accessibility

- Download links have descriptive text: `"Download 8oz template in AI format (1MB)"`.
- Bleed diagram has `alt` text and `aria-describedby` with full text description.
- Tip boxes: `role="note"`.
- File format acceptance list uses semantic list markup.
- Icons are decorative (`aria-hidden`).

---

## 8. Performance

- Template files: served as static assets, not lazy loaded (user clicks to download).
- Bleed diagram: inline SVG, no external fetch.
- Page is mostly static content — minimal JS.

---

## 9. i18n & RTL

### Translation Keys

```
design_support.breadcrumb
design_support.header.*
design_support.services.heading
design_support.services.card_{1,2,3}.*
design_support.services.free_note
design_support.guidelines.heading
design_support.guidelines.subtext
design_support.guidelines.{color,resolution,bleed,formats,fonts,template}.*
design_support.templates.heading
design_support.templates.subtext
design_support.templates.size_{4,6,8,10,12,14,16,22}.*
design_support.cta.*
```

### RTL Adjustments

- Guidelines grid: same layout, text direction flips.
- Bleed diagram labels: mirror for RTL (text alignment).
- Download card layout: same (symmetric).

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Template file missing | Download button disabled with tooltip `"Coming soon"` |
| Large file download | Show file size before download |
| User has no design software | Suggest PNG template + mention free design service |
