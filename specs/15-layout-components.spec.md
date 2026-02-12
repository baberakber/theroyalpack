# 15 — Layout Components

> Header, Footer, Mobile Menu, and WhatsApp Floating Button specifications.

---

## 1. Header

**File:** `src/components/layout/Header.tsx`

### 1.1 Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Logo          Nav Links                    Lang | CTA | Mobile  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Behavior

| Property | Value |
|----------|-------|
| Position | Sticky, `top-0` |
| Height | 80px desktop, 64px mobile |
| Z-index | `z-sticky` (20) |
| Background | `color-bg-primary` with `backdrop-blur-md` when scrolled |
| Border | `border-b border-border-light` when scrolled |
| Shadow | `shadow-sm` when scrolled (appears after 50px scroll) |

### 1.3 Logo

- **File:** `public/logo.svg` (horizontal) + `public/logo-icon.svg` (icon only).
- **Size:** 150px width desktop, 120px mobile.
- **Link:** Wraps logo, links to `/`.
- **Alt text:** `"Xerostop Cups"`.

### 1.4 Navigation Links (Desktop)

| Label | Href | Dropdown |
|-------|------|----------|
| Products | `/products` | Yes — submenu |
| Industries | `/industries` | No |
| Gallery | `/gallery` | No |
| About | `/about` | Yes — submenu |
| Contact | `/contact` | No |

**Products Dropdown:**
- Paper Cups → `/products/paper-cups`
- Cup Printing → `/products/cup-printing`
- Accessories → `/products/accessories`

**About Dropdown:**
- Our Story → `/about`
- Sustainability → `/sustainability`
- FAQ → `/faq`

**Link Styling:**
- `text-body`, `color-text-secondary`, `font-medium`.
- Hover: `color-primary`.
- Active (current page): `color-primary`, `font-semibold`.
- Gap between links: `space-6`.

### 1.5 Dropdown Menu

- **Trigger:** Hover on desktop, click on mobile.
- **Position:** Absolutely positioned below trigger, left-aligned.
- **Background:** `color-bg-primary`.
- **Border:** `1px solid color-border-light`.
- **Border radius:** `radius-md`.
- **Shadow:** `shadow-lg`.
- **Padding:** `py-2`.
- **Min-width:** 200px.
- **Animation:** Fade-in + slide-down (10px), `transition-fast`.

**Dropdown Item:**
- Padding: `py-2 px-4`.
- `text-body`, `color-text-secondary`.
- Hover: `color-primary`, `color-bg-secondary` bg.

### 1.6 Language Switcher

- **Position:** Right side, before CTA button.
- **Design:** Text button showing current language code (EN / AR).
- **Click:** Switches language, updates URL prefix (`/` ↔ `/ar`).
- **Icon:** `Globe` icon, 18px, before text.
- **Styling:** `text-body-sm`, `color-text-muted`, hover `color-primary`.

```tsx
interface LanguageSwitcherProps {
  currentLocale: 'en' | 'ar';
}
```

**File:** `src/components/layout/LanguageSwitcher.tsx`

### 1.7 CTA Button

- **Text:** `"Get a Quote"`.
- **Href:** `/get-a-quote`.
- **Variant:** `accent`, size `sm`.
- **Visible:** Desktop only. Hidden on mobile (in mobile menu instead).

### 1.8 Mobile Menu Toggle

- **Visible:** <1024px only.
- **Icon:** `Menu` (hamburger) when closed, `X` when open.
- **Size:** 44×44px touch target.
- **Position:** Right side.
- **Aria:** `aria-label="Open menu"` / `"Close menu"`, `aria-expanded`.

### 1.9 Scroll Behavior

```tsx
// Detect scroll position
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 1.10 Component Interface

```tsx
interface HeaderProps {
  currentLocale: 'en' | 'ar';
}
```

---

## 2. Mobile Menu (Drawer)

**File:** `src/components/layout/MobileMenu.tsx`

### 2.1 Structure

```
┌────────────────────────┐
│ X Close           Logo │  ← Header bar
├────────────────────────┤
│ Products            ▼  │  ← Expandable
│   Paper Cups           │
│   Cup Printing         │
│   Accessories          │
│ Industries             │
│ Gallery                │
│ About                ▼ │  ← Expandable
│   Our Story            │
│   Sustainability       │
│   FAQ                  │
│ Contact                │
├────────────────────────┤
│    [ Get a Quote ]     │  ← CTA
│    [ EN | AR ]         │  ← Language
└────────────────────────┘
```

### 2.2 Behavior

| Property | Value |
|----------|-------|
| Position | Fixed, `inset-0` (full screen) |
| Z-index | `z-overlay` (30) |
| Background | `color-bg-primary` |
| Animation | Slide in from right, `transition-drawer` (350ms) |
| Body scroll | Locked when open (`overflow: hidden` on `<body>`) |

### 2.3 Overlay

- Semi-transparent dark overlay behind menu: `bg-black/50`.
- Click on overlay closes menu.
- Animation: Fade in, `transition-base`.

### 2.4 Focus Trap

- Focus is trapped within the menu when open.
- First focusable element: Close button.
- Last focusable element: Language switcher or last link.
- Tab cycles through items.
- Escape key closes menu.

```tsx
// Use @headlessui/react Dialog or custom focus trap
import { Dialog } from '@headlessui/react';
```

### 2.5 Navigation Items

- Same links as desktop.
- Expandable sections for Products and About.
- Accordion-style: tap to expand/collapse.
- Chevron icon rotates on expand.
- Active page: `color-primary`, `font-semibold`.

### 2.6 CTA & Language

- Bottom of menu, above safe area.
- CTA button: full-width, variant `accent`, size `lg`.
- Language switcher: centered below CTA.

### 2.7 Component Interface

```tsx
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: 'en' | 'ar';
  currentPath: string;
}
```

---

## 3. Footer

**File:** `src/components/layout/Footer.tsx`

### 3.1 Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    4-Column Link Grid                           │
├─────────────────────────────────────────────────────────────────┤
│                    Divider                                      │
├─────────────────────────────────────────────────────────────────┤
│ © 2024 Xerostop Cups        Social Icons       Privacy | Terms  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Main Section

- **Background:** `color-text-primary` (dark charcoal).
- **Text color:** white and white/70 for secondary.
- **Padding:** `py-16`.

### 3.3 Four Columns

**Column 1: Brand**
- Logo (white version or inverted).
- Tagline: `"Premium paper cups, custom printed."` — `text-body-sm`, white/70.
- Address: `[CLIENT PLACEHOLDER]`.
- Phone: `[CLIENT PLACEHOLDER]`.
- Email: `[CLIENT PLACEHOLDER]`.

**Column 2: Products**
- Heading: `"Products"` — `text-h5`, white, `font-semibold`.
- Links:
  - Paper Cups → `/products/paper-cups`
  - Cup Printing → `/products/cup-printing`
  - Accessories → `/products/accessories`

**Column 3: Company**
- Heading: `"Company"` — same styling.
- Links:
  - About Us → `/about`
  - Sustainability → `/sustainability`
  - Gallery → `/gallery`
  - FAQ → `/faq`
  - Contact → `/contact`

**Column 4: Get Started**
- Heading: `"Get Started"` — same styling.
- Links:
  - Get a Quote → `/get-a-quote`
  - Request a Sample → `/request-sample`
  - Design Support → `/design-support`

**Link Styling:**
- `text-body-sm`, white/70.
- Hover: white, underline.
- Gap: `space-2` between links.

### 3.4 Divider

- `border-t border-white/10`.
- Margin: `my-8`.

### 3.5 Bottom Bar

- **Layout:** Flex row, justify-between.
- **Left:** Copyright: `"© 2024 Xerostop Cups. All rights reserved."` — `text-caption`, white/50.
- **Center:** Social icons row.
- **Right:** Legal links: Privacy Policy, Terms of Service.

**Social Icons:**
- Icons: Instagram, Facebook, LinkedIn, Twitter/X.
- `[CLIENT PLACEHOLDER — confirm social platforms]`.
- Size: 20px.
- Color: white/50, hover white.
- Gap: `space-4`.

### 3.6 Responsive

| Breakpoint | Layout |
|------------|--------|
| Desktop ≥1024px | 4 columns in row |
| Tablet 768–1023px | 2×2 grid |
| Mobile <768px | 1 column, stacked, columns collapsible |

### 3.7 Component Interface

```tsx
interface FooterProps {
  currentLocale: 'en' | 'ar';
}
```

---

## 4. WhatsApp Floating Button

**File:** `src/components/layout/WhatsAppButton.tsx`

### 4.1 Behavior

| Property | Value |
|----------|-------|
| Position | Fixed, bottom-right |
| Offset | `bottom-6 right-6` (24px) |
| Z-index | `z-toast` (50) |
| Visibility | Always visible except on `/admin/*` routes |

### 4.2 Design

- **Shape:** Circle, 56px diameter.
- **Background:** WhatsApp green `#25D366`.
- **Icon:** WhatsApp icon (custom SVG or from icon library), white, 28px.
- **Shadow:** `shadow-lg`.
- **Hover:** Scale 1.1, `shadow-xl`.
- **Transition:** `transition-base`.

### 4.3 Click Action

Opens WhatsApp with pre-filled message:

```tsx
const whatsappNumber = '[CLIENT PLACEHOLDER]'; // e.g., '971501234567'
const defaultMessage = encodeURIComponent('Hello! I have a question about your paper cups.');

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
```

### 4.4 Tooltip

- On hover: show tooltip `"Chat with us on WhatsApp"`.
- Position: left of button.
- Background: `color-text-primary`, white text.
- `radius-md`, `shadow-md`.
- Animation: fade-in from right.

### 4.5 Mobile Considerations

- Same position and size.
- No tooltip (tap to open).
- Ensure doesn't overlap with cookie banner or other fixed elements.

### 4.6 Accessibility

- `aria-label="Chat with us on WhatsApp"`.
- `role="button"` (even though it's an `<a>`).
- Opens in new tab: `target="_blank" rel="noopener noreferrer"`.

### 4.7 Component Interface

```tsx
interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}
```

---

## 5. Skip Link

**File:** `src/components/layout/SkipLink.tsx`

- **Text:** `"Skip to main content"`.
- **Position:** Absolutely positioned off-screen, visible on focus.
- **Focus styling:** `color-bg-primary`, `color-primary` text, `shadow-lg`, appears at top-left.
- **Target:** `href="#main"` — main content area has `id="main"`.

```tsx
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-lg focus:rounded-md"
    >
      Skip to main content
    </a>
  );
}
```

---

## 6. Layout Wrapper

**File:** `src/components/layout/Layout.tsx`

Wraps all pages with consistent layout structure.

```tsx
interface LayoutProps {
  children: React.ReactNode;
  locale: 'en' | 'ar';
}

export function Layout({ children, locale }: LayoutProps) {
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <SkipLink />
      <Header currentLocale={locale} />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer currentLocale={locale} />
      <WhatsAppButton phoneNumber="[CLIENT PLACEHOLDER]" />
    </div>
  );
}
```

---

## 7. Responsive Breakpoints Summary

| Component | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|-----------|------------------|---------------------|-----------------|
| Header | Full nav + CTA | Full nav, smaller | Logo + hamburger |
| Mobile Menu | Hidden | Hidden | Full drawer |
| Footer | 4 columns | 2×2 grid | 1 column accordion |
| WhatsApp | Bottom-right | Same | Same |

---

## 8. i18n & RTL

### Translation Keys

```
layout.header.nav.products
layout.header.nav.industries
layout.header.nav.gallery
layout.header.nav.about
layout.header.nav.contact
layout.header.cta
layout.header.menu_open
layout.header.menu_close
layout.header.language_switch

layout.footer.tagline
layout.footer.products_heading
layout.footer.company_heading
layout.footer.get_started_heading
layout.footer.copyright
layout.footer.privacy
layout.footer.terms

layout.whatsapp.tooltip
layout.skip_link
```

### RTL Adjustments

- Header: logo on right, nav flows right-to-left, CTA on left.
- Mobile menu: slides in from left.
- Footer: columns flow right-to-left.
- WhatsApp button: `left-6` instead of `right-6`.
- Dropdown arrows flip direction.
- All `me-*` / `ms-*` handle margin swapping.

---

## 9. Accessibility Checklist

| Component | Requirement | Implementation |
|-----------|-------------|----------------|
| Header | Keyboard navigable | Tab through all links and CTA |
| Dropdown | Escape closes | Event listener for Escape key |
| Mobile menu | Focus trap | @headlessui/react Dialog or custom |
| Mobile menu | Body scroll lock | `overflow: hidden` on body |
| Footer links | Accessible names | Clear link text, no "click here" |
| WhatsApp | Button role | `role="button"`, `aria-label` |
| Skip link | Visible on focus | `sr-only` + `focus:not-sr-only` |
| All | Focus indicators | Visible focus ring on all interactive elements |
