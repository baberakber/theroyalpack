# 11 — FAQ Page

> Category-tabbed FAQ with accordion, 20–25 questions, and structured data for SEO.

**Route:** `/faq`
**File:** `src/app/faq/page.tsx`

---

## 1. Page Purpose & User Journey

| Aspect | Detail |
|--------|--------|
| **Entry points** | Nav menu, footer, search, support links on other pages |
| **Conversion goal** | User's question is answered → converts to quote/contact |
| **Primary CTA** | "Still Have Questions? Contact Us" |
| **Secondary CTA** | "Get a Quote" |
| **Exit paths** | Contact, Get a Quote |

---

## 2. Layout Structure

### Section Order

1. **Page Header**
2. **Category Tabs**
3. **Accordion Questions**
4. **Still Have Questions? CTA**

---

### 2.1 Page Header

- **Breadcrumb:** `Home > FAQ`.
- **Heading (h1):** `"Frequently Asked Questions"` — `text-h1`.
- **Intro:** `"Find answers to common questions about our paper cups, printing, ordering, and delivery."` — `text-body-lg`, max-width 640px.
- **Search (optional):** Simple search input to filter questions client-side.
  - Placeholder: `"Search questions..."`.
  - Filters accordion items as user types (client-side, instant).
  - Uses `Input` component from design tokens.

### 2.2 Category Tabs

- **Layout:** Horizontal tab bar, scrollable on mobile.
- **Position:** Sticky below header on scroll.

| Tab | Category Key |
|-----|-------------|
| All | `all` |
| Ordering | `ordering` |
| Products | `products` |
| Printing | `printing` |
| Delivery | `delivery` |
| Design | `design` |
| Sustainability | `sustainability` |

**Tab Design:**
- Inactive: `text-body`, `color-text-secondary`, no background.
- Active: `text-body`, `font-semibold`, `color-primary`, underline `2px solid color-primary`.
- Hover: `color-primary-light`.
- Transition: `transition-fast`.

### 2.3 Accordion Questions

Each category contains 3–5 questions. Questions are shown/hidden based on active tab.

**Accordion Design:**
- Each question: `border-b border-border-light`.
- Question (trigger): `py-4`, `text-h5` (or `text-body-lg font-medium`), `color-text-primary`, flex row with `ChevronDown` icon on right.
- Answer (content): `pb-4`, `text-body`, `color-text-secondary`, hidden by default.
- Open state: chevron rotates 180°, answer slides down (`transition-slow`, `max-height` animation).
- Only one question open at a time per category (optional — configurable).
- Focus: `ring-2 ring-primary` on trigger.

#### FAQ Content

**Category: Ordering**

| # | Question | Answer |
|---|----------|--------|
| 1 | What is your minimum order quantity (MOQ)? | `"Our minimum order is 1,000 pieces for flexographic printing and 5,000 pieces for offset printing. For plain (unprinted) cups, the MOQ is 1,000 pieces."` |
| 2 | How do I place an order? | `"Start by requesting a quote through our website. Our team will follow up with pricing and a digital proof. Once approved, we begin production."` |
| 3 | Can I order samples before a bulk order? | `"Yes! We offer free samples so you can test the cup quality before committing to a large order. Request a sample through our website."` |
| 4 | What payment methods do you accept? | `"[CLIENT PLACEHOLDER — list accepted payment methods]"` |
| 5 | Can I reorder the same design? | `"Yes, we keep your print plates and digital files on record. Reordering is quick and easy."` |

**Category: Products**

| # | Question | Answer |
|---|----------|--------|
| 6 | What types of paper cups do you offer? | `"We offer three types: single-wall (economical), double-wall (insulated, no sleeve needed), and ripple-wall (maximum insulation and grip). All are available in sizes from 2.5oz to 22oz."` |
| 7 | Are your cups food-safe? | `"Yes, all our cups are manufactured with food-grade materials and meet [CLIENT PLACEHOLDER — certification names] standards."` |
| 8 | Can your cups hold hot and cold drinks? | `"Yes. Single-wall cups are best for cold drinks or short-serve hot drinks. Double-wall and ripple-wall cups are designed for hot drinks without a sleeve."` |
| 9 | Do you sell lids separately? | `"Yes, we offer flat lids, dome lids, sip-through lids, and eco-friendly paper lids. They can be ordered with or without cups."` |
| 10 | What sizes are available? | `"We offer cups from 2.5oz (espresso) to 22oz (large cold drinks). See our full size guide on the Paper Cups page."` |

**Category: Printing**

| # | Question | Answer |
|---|----------|--------|
| 11 | What printing methods do you use? | `"We offer two methods: offset printing (full CMYK, ideal for complex designs) and flexographic printing (1–4 spot colors, cost-effective for simpler designs)."` |
| 12 | Can you print full-color photos on cups? | `"Yes, with offset printing we can reproduce full-color photographs and gradients. The MOQ for offset is 5,000 pieces."` |
| 13 | Do you provide design support? | `"Yes, our in-house design team offers free design support with every printing order. We can create artwork from scratch or adapt your existing design."` |
| 14 | What file format should I send my design in? | `"We prefer vector files (AI, EPS, PDF). We also accept PSD and TIFF at 300 DPI. All files should be in CMYK color mode."` |
| 15 | Can I see a proof before production? | `"Yes, we always send a digital proof (mockup) before printing. You can request revisions until the design is approved."` |

**Category: Delivery**

| # | Question | Answer |
|---|----------|--------|
| 16 | What are your delivery lead times? | `"Standard lead times are 7–14 business days for flexo printing and 10–18 business days for offset printing. Rush orders may be available."` |
| 17 | Do you deliver internationally? | `"[CLIENT PLACEHOLDER — delivery regions and international shipping policy]"` |
| 18 | How are cups packaged for delivery? | `"Cups are packed in sturdy cartons with protective inner packaging to prevent damage during transit."` |
| 19 | Can I track my order? | `"[CLIENT PLACEHOLDER — order tracking details]"` |

**Category: Design**

| # | Question | Answer |
|---|----------|--------|
| 20 | Do I need to be a designer to order printed cups? | `"Not at all. Our design team can create your cup artwork from just your logo and brand colors. The service is free with every order."` |
| 21 | What is bleed and safe zone? | `"Bleed is the area that extends beyond the cup template edge (3mm). Safe zone is the area where important content should stay (5mm inside the cut line). This ensures clean printing without white edges."` |

**Category: Sustainability**

| # | Question | Answer |
|---|----------|--------|
| 22 | Are your cups recyclable? | `"Our standard cups can be recycled at specialized facilities. Our water-based coating cups are more widely recyclable. Check with your local recycler."` |
| 23 | Do you offer eco-friendly cup options? | `"Yes, we offer cups made from responsibly sourced paper and water-based coating alternatives. We're also developing PLA-coated cups."` |
| 24 | What certifications do you have? | `"[CLIENT PLACEHOLDER — list environmental and quality certifications]"` |

`[CLIENT PLACEHOLDER — review all answers for accuracy]`

### 2.4 Still Have Questions? CTA

- **Background:** `color-primary-wash`.
- **Padding:** `py-12`.
- **Layout:** Centered.
- **Heading (h2):** `"Still Have Questions?"`.
- **Text:** `"Our team is here to help. Get in touch and we'll respond within 24 hours."`.
- **Buttons:**
  - `"Contact Us"` → `/contact` — variant `primary`, size `lg`.
  - `"Get a Quote"` → `/get-a-quote` — variant `accent`, size `lg`.

---

## 3. Component Breakdown

```
src/
├── app/
│   └── faq/
│       └── page.tsx
├── components/
│   └── faq/
│       ├── FaqClient.tsx               # 'use client' — tabs, search, accordion state
│       ├── FaqSearch.tsx               # Search input for filtering
│       └── CategoryTabs.tsx            # Tab bar
│   └── shared/
│       ├── Accordion.tsx               # Reusable accordion component
│       └── AccordionItem.tsx           # Individual accordion item
```

### Shared Accordion Component

```tsx
interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;  // default false
  className?: string;
}

interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}
```

**File:** `src/components/shared/Accordion.tsx`

---

## 4. Responsive Behavior

| Section | Desktop ≥1280px | Tablet 768–1279px | Mobile <768px |
|---------|----------------|-------------------|---------------|
| Search | Max-width 480px, centered | Same | Full-width |
| Tabs | Full row | Full row | Horizontal scroll |
| Accordion | Max-width 800px, centered | Same | Full-width |

---

## 5. Animations & Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| Tab switch | Active underline slides | Tab click |
| Accordion open | Max-height expand + chevron rotate | Click |
| Accordion close | Max-height collapse + chevron rotate back | Click |
| Search filter | Items fade out/in | Typing |
| No results | Fade-in message | Search with no matches |

---

## 6. SEO Metadata

```tsx
export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions | Xerostop Cups',
  description: 'Find answers about ordering paper cups, custom printing, delivery, design support, and sustainability at Xerostop Cups.',
  openGraph: {
    title: 'FAQ — Frequently Asked Questions | Xerostop Cups',
    description: 'Common questions about paper cups, printing, ordering, and delivery.',
    images: [{ url: '/og/faq.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data (JSON-LD) — FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your minimum order quantity (MOQ)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our minimum order is 1,000 pieces for flexographic printing and 5,000 pieces for offset printing."
      }
    },
    {
      "@type": "Question",
      "name": "What types of paper cups do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer three types: single-wall, double-wall, and ripple-wall cups in sizes from 2.5oz to 22oz."
      }
    }
    // ... all questions
  ]
}
```

**Important:** Include ALL questions in the FAQPage structured data. This enables rich snippets in Google search results.

---

## 7. Accessibility

- Accordion: WAI-ARIA Accordion pattern.
  - Trigger: `role="button"`, `aria-expanded="true|false"`, `aria-controls="panel-id"`.
  - Panel: `role="region"`, `aria-labelledby="trigger-id"`.
  - Keyboard: `Enter`/`Space` toggles, `Up`/`Down` moves between triggers, `Home`/`End` first/last.
- Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`.
  - Keyboard: `Left`/`Right` arrow keys to switch tabs.
- Search: `<input type="search" aria-label="Search frequently asked questions">`.
- Screen reader: live region announces result count changes.

---

## 8. Performance

- FAQ data: embedded in page (no fetch, SSR).
- Structured data: rendered server-side.
- Accordion: lightweight CSS animation (no JS animation library).
- Search: client-side filtering on static data (instant).

---

## 9. i18n & RTL

### Translation Keys

```
faq.breadcrumb
faq.header.heading
faq.header.intro
faq.search.placeholder
faq.tabs.{all,ordering,products,printing,delivery,design,sustainability}
faq.questions.q_{1..24}.question
faq.questions.q_{1..24}.answer
faq.cta.heading
faq.cta.text
faq.cta.contact
faq.cta.quote
faq.no_results
```

### RTL Adjustments

- Accordion chevron: left side instead of right.
- Tabs: same (flex direction handled by browser).
- Search input: `text-start` + RTL placeholder direction.

---

## 10. Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| Search returns no results | Show: `"No questions found for '[query]'. Try a different search or contact us."` |
| Category has no questions | Hide that tab (conditional render from data) |
| Very long answer | Answer text wraps naturally, no truncation |
| Deep link to category | Support URL hash: `/faq#printing` → auto-select printing tab |
| JS disabled | All accordion items expanded (CSS-only `<details>`/`<summary>` fallback) |
