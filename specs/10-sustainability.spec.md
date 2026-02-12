# 10 — Sustainability Page

> Eco-friendly options, honest messaging about sustainability, and a roadmap for improvement.

**Route:** `/sustainability`
**File:** `src/app/sustainability/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Nav menu, footer, about page link |
| **Conversion goal** | User feels confident about eco options, requests a quote for eco products |
| **Primary CTA** | "Get a Quote for Eco Cups" |
| **Secondary CTA** | "Learn About Our Products" |
| **Exit paths** | Get a Quote, Products, Contact |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Our Honest Approach** (transparent messaging)
3. **Eco-Friendly Options**
4. **What We're Doing** (current initiatives)
5. **Sustainability Roadmap** (timeline)
6. **FAQ Mini-Section**
7. **CTA Section**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > Sustainability`.
- **Heading (h1):** `"Sustainability at Xerostop"` — `text-h1`.
- **Intro:** `"We believe in transparency about our environmental impact. Here's where we are today, what options we offer, and where we're headed."` — `text-body-lg`, max-width 720px.
- **Icon accent:** `Leaf` icon in `color-eco`, 48px, above or next to heading.

### 2.2 Our Honest Approach

- **Background:** `color-eco-light` (light green).
- **Padding:** `py-12`.
- **Layout:** Centered text block with max-width 800px.
- **Heading (h2):** `"An Honest Conversation About Paper Cups"`.
- **Content:**

```
"Paper cups aren't perfect. Most contain a PE (polyethylene) lining that makes
them difficult to recycle in standard facilities. We don't shy away from this
fact — instead, we work to offer better alternatives and continuously improve
our processes.

Here's what you should know:
• Our standard cups use a PE lining for food safety.
• PE-lined cups can be recycled at specialized facilities (not all curbside programs accept them).
• We offer water-based coating alternatives for select cup types.
• We source paper from responsibly managed forests.
• We are actively exploring PLA and other bio-based coatings."
```

`[CLIENT PLACEHOLDER — adjust messaging based on actual practices]`

- **Design:** Callout box style, `border-l-4 border-eco`, `color-eco-light` bg, `radius-md`.

### 2.3 Eco-Friendly Options

- **Background:** `color-bg-primary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"Eco-Friendly Options Available"`.
- **Grid:** 3 columns on desktop, 1 on mobile.

| Option | Icon | Title | Description | Status |
|--------|------|-------|-------------|--------|
| 1 | `TreePine` | Responsibly Sourced Paper | `"Our paper stock comes from FSC-certified or sustainably managed forests."` | ✅ Available |
| 2 | `Droplets` | Water-Based Coatings | `"Water-based aqueous coatings as an alternative to traditional PE lining for select cup sizes."` | ✅ Available (select sizes) |
| 3 | `Recycle` | Recyclable Packaging | `"Our shipping boxes and packaging materials are fully recyclable."` | ✅ Available |

`[CLIENT PLACEHOLDER — confirm available eco options]`

**Card Design:**
- `color-bg-primary` with `1px border-eco/30`.
- `radius-lg`.
- Eco badge: `"Available"` pill in `color-eco` bg, white text.
- Icon: 40px, `color-eco`.

### 2.4 What We're Doing

- **Background:** `color-bg-secondary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"Current Sustainability Initiatives"`.
- **Layout:** Checklist style.

| Initiative | Status |
|-----------|--------|
| Sourcing paper from certified forests | ✅ In place |
| Offering water-based coating cups | ✅ In place |
| Reducing production waste | 🔄 Ongoing |
| Minimizing shipping packaging | 🔄 Ongoing |
| Exploring PLA (plant-based) coatings | 🔬 Researching |
| Carbon footprint measurement | 📋 Planned |
| Composting-compatible cup development | 📋 Planned |

`[CLIENT PLACEHOLDER — confirm all initiatives and their status]`

**Design:** Checklist with status icons. Background: `color-bg-secondary`. Each row: `py-3`, `border-b border-border-light`.

### 2.5 Sustainability Roadmap

- **Background:** `color-bg-primary`.
- **Padding:** `py-16`.
- **Heading (h2):** `"Our Sustainability Roadmap"`.
- **Layout:** Vertical timeline.

| Year | Milestone |
|------|-----------|
| 2024 | `"Introduced water-based coating cups"` |
| 2025 | `"Partnered with recycling facilities for cup collection guidance"` |
| 2026 | `"Launch PLA-coated cup range"` |
| 2027 | `"Achieve 50% waste reduction in production"` |
| 2028 | `"Full carbon footprint transparency report"` |

`[CLIENT PLACEHOLDER — provide actual roadmap milestones]`

**Timeline Design:**
- Vertical line on left (desktop) or center (mobile).
- Year markers: circles with year, `color-eco` bg, white text.
- Past milestones: `color-eco` circle (filled, completed feel).
- Future milestones: `color-border` circle (outlined, upcoming feel).
- Milestone text: `text-body`, `color-text-primary`.
- Connecting line: `2px solid color-border`, dashed for future items.

### 2.6 FAQ Mini-Section

- **Background:** `color-bg-secondary`.
- **Padding:** `py-12`.
- **Heading (h2):** `"Common Questions About Sustainability"`.
- **Accordion:** 4–5 questions specific to eco concerns.

| Question | Answer |
|----------|--------|
| Are your cups recyclable? | `"Our standard cups with PE lining can be recycled at specialized facilities. Check with your local recycler. Our water-based coating cups are more widely recyclable."` |
| Do you offer biodegradable cups? | `"We're currently developing PLA-coated cups. Our paper cups are biodegradable in industrial composting facilities, though the PE lining takes longer to break down."` |
| What certifications do you have? | `"[CLIENT PLACEHOLDER — list environmental certifications]"` |
| Can I recycle the packaging? | `"Yes, all our shipping packaging (boxes, padding) is fully recyclable."` |

**Accordion Design:** Same as FAQ page accordion (see spec 11). Reuses `Accordion` component.

### 2.7 CTA Section

- **Background:** gradient `color-eco` to darken 15%.
- **Heading (h2):** `"Choose the Greener Option"` — white.
- **Text:** `"Ask about our eco-friendly cup range when you request a quote."` — white/90.
- **CTA:** `"Get a Quote for Eco Cups"` → `/get-a-quote?eco=true` — Button variant `accent`, size `lg`.

---

## 3. Component Breakdown

```
src/
├── app/
│   └── sustainability/
│       └── page.tsx
├── components/
│   └── sustainability/
│       ├── HonestApproach.tsx
│       ├── EcoOptionCard.tsx
│       ├── InitiativesList.tsx
│       ├── SustainabilityTimeline.tsx
│       └── EcoFaqSection.tsx
│   └── shared/
│       └── Accordion.tsx               # Reused from FAQ page
```

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Honest approach | Centered wide | Same | Same, smaller text |
| Eco options | 3-col | 3-col | 1-col stack |
| Initiatives | Full-width list | Same | Same |
| Timeline | Left-aligned line | Same | Center-aligned line |
| FAQ | Wide accordion | Same | Full-width |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Eco cards | Fade-in-up, stagger | Scroll |
| Timeline items | Fade-in sequentially | Scroll |
| Initiative checkmarks | Scale-in pop | Scroll |
| FAQ accordion | Expand/collapse, `transition-slow` | Click |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'Sustainability — Eco-Friendly Paper Cups | Xerostop Cups',
  description: 'Our honest approach to sustainability. Eco-friendly cup options, current initiatives, and our roadmap for a greener future.',
  openGraph: {
    title: 'Sustainability at Xerostop Cups',
    description: 'Transparent sustainability messaging, eco cup options, and our environmental roadmap.',
    images: [{ url: '/og/sustainability.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Accessibility

- Timeline uses `<ol>` with `role="list"`.
- Timeline years: `<time>` elements.
- Accordion follows WAI-ARIA accordion pattern.
- Status icons (✅, 🔄, etc.) have text alternatives.
- `color-eco` on white bg: check contrast (currently 4.6:1 — passes AA for large text, use bold/large for headings).

---

## 8. Performance

- Page is static content — minimal JS.
- Accordion: reuses shared component (already loaded if FAQ page visited).
- Timeline: CSS-only, no JS animation library.

---

## 9. i18n & RTL

### Translation Keys

```
sustainability.breadcrumb
sustainability.header.*
sustainability.honest.heading
sustainability.honest.content
sustainability.eco_options.heading
sustainability.eco_options.card_{1,2,3}.*
sustainability.initiatives.heading
sustainability.initiatives.item_{1..7}.*
sustainability.roadmap.heading
sustainability.roadmap.year_{2024..2028}.*
sustainability.faq.heading
sustainability.faq.q_{1..4}.*
sustainability.cta.*
```

### RTL Adjustments

- Timeline line moves to right side.
- Honest approach callout: `border-r-4` instead of `border-l-4`.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| No eco products available | Don't hide the page — show roadmap and honest messaging |
| Certifications pending | Show `"Certification in progress"` badge |
| User expects 100% eco | Honest approach section manages expectations |
