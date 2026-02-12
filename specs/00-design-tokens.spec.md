# 00 — Design Tokens

> Single source of truth for every visual decision across the Xerostop Cups website.
> All page specs reference this file by token name — never by raw hex values.

---

## 1. Color Palette

### Primary — Xerostop Teal

| Token | Hex | Usage |
|-------|-----|-------|
| `color-primary` | `#0D7377` | Buttons, links, active states, header accents |
| `color-primary-dark` | `#0A5C5F` | Button hover, active nav items, focus rings |
| `color-primary-light` | `#1A9DA2` | Badges, tags, secondary buttons outline |
| `color-primary-wash` | `#E6F7F7` | Section backgrounds, card tint, input focus bg |

### Accent — Warm Amber

| Token | Hex | Usage |
|-------|-----|-------|
| `color-accent` | `#D97706` | CTA buttons, price highlights, attention markers |
| `color-accent-dark` | `#B45309` | CTA hover states |
| `color-accent-light` | `#FBBF24` | Star ratings, badges, soft highlights |
| `color-accent-wash` | `#FEF3C7` | Alert backgrounds, promo banners |

### Eco (Sustainability)

| Token | Hex | Usage |
|-------|-----|-------|
| `color-eco` | `#059669` | Eco badges, sustainability sections |
| `color-eco-light` | `#D1FAE5` | Eco section backgrounds |

### Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `color-text-primary` | `#1A1A2E` | Headings, body text |
| `color-text-secondary` | `#374151` | Subheadings, captions |
| `color-text-muted` | `#6B7280` | Placeholder text, metadata |
| `color-bg-primary` | `#FFFFFF` | Card backgrounds, main content |
| `color-bg-secondary` | `#F3F4F6` | Page backgrounds, alternating sections |
| `color-bg-tertiary` | `#E5E7EB` | Dividers, borders, disabled bg |
| `color-border` | `#D1D5DB` | Input borders, card borders |
| `color-border-light` | `#E5E7EB` | Subtle separators |

### Semantic / Feedback

| Token | Hex | Usage |
|-------|-----|-------|
| `color-error` | `#EF4444` | Validation errors, destructive actions |
| `color-error-bg` | `#FEF2F2` | Error alert backgrounds |
| `color-success` | `#10B981` | Success messages, confirmation |
| `color-success-bg` | `#ECFDF5` | Success alert backgrounds |
| `color-warning` | `#F59E0B` | Warning messages |
| `color-warning-bg` | `#FFFBEB` | Warning alert backgrounds |
| `color-info` | `#3B82F6` | Info messages |
| `color-info-bg` | `#EFF6FF` | Info alert backgrounds |

---

## 2. Typography

### Font Families

```
--font-primary: 'Inter', 'Noto Sans Arabic', sans-serif;
--font-heading: 'Inter', 'Noto Sans Arabic', sans-serif;
```

- **Inter** — Primary typeface for all Latin text. Loaded via `next/font/google` with subsets `['latin']`.
- **Noto Sans Arabic** — Arabic fallback. Loaded via `next/font/google` with subsets `['arabic']`.
- Weights loaded: `400 (regular)`, `500 (medium)`, `600 (semibold)`, `700 (bold)`.

### Type Scale

| Token | Size (rem) | Size (px) | Line Height | Weight | Usage |
|-------|-----------|-----------|-------------|--------|-------|
| `text-display` | 3.75 | 60 | 1.1 | 700 | Hero headlines |
| `text-h1` | 3 | 48 | 1.2 | 700 | Page titles |
| `text-h2` | 2.25 | 36 | 1.25 | 700 | Section headings |
| `text-h3` | 1.875 | 30 | 1.3 | 600 | Sub-section headings |
| `text-h4` | 1.5 | 24 | 1.35 | 600 | Card titles |
| `text-h5` | 1.25 | 20 | 1.4 | 600 | Small headings |
| `text-body-lg` | 1.125 | 18 | 1.6 | 400 | Lead paragraphs |
| `text-body` | 1 | 16 | 1.6 | 400 | Body text |
| `text-body-sm` | 0.875 | 14 | 1.5 | 400 | Captions, labels |
| `text-caption` | 0.75 | 12 | 1.5 | 500 | Badges, fine print |

### Mobile Overrides

| Token | Desktop | Mobile (<768px) |
|-------|---------|-----------------|
| `text-display` | 60px | 36px |
| `text-h1` | 48px | 32px |
| `text-h2` | 36px | 28px |
| `text-h3` | 30px | 24px |
| `text-h4` | 24px | 20px |

---

## 3. Spacing Scale

Based on a 4px base unit. Mapped to Tailwind's `spacing` config.

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `space-0` | 0px | `0` | — |
| `space-1` | 4px | `1` | Tight gaps |
| `space-2` | 8px | `2` | Inline spacing, icon gaps |
| `space-3` | 12px | `3` | Small padding |
| `space-4` | 16px | `4` | Default padding, card padding |
| `space-5` | 20px | `5` | — |
| `space-6` | 24px | `6` | Section inner padding |
| `space-8` | 32px | `8` | Card gaps |
| `space-10` | 40px | `10` | — |
| `space-12` | 48px | `12` | Section gaps |
| `space-16` | 64px | `16` | Section vertical padding |
| `space-20` | 80px | `20` | Large section spacing |
| `space-24` | 96px | `24` | Hero section padding |

### Section Spacing Convention

- **Between page sections:** `py-16` (64px) desktop, `py-12` (48px) mobile.
- **Container max-width:** `max-w-7xl` (1280px), centered with `mx-auto px-4 sm:px-6 lg:px-8`.

---

## 4. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card lift |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Modals, popovers |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | Lightbox, elevated cards |
| `shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.05)` | Pressed buttons, inset fields |

---

## 5. Border Radii

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `radius-sm` | 4px | `rounded` | Tags, chips |
| `radius-md` | 8px | `rounded-lg` | Cards, inputs, buttons |
| `radius-lg` | 12px | `rounded-xl` | Modals, larger cards |
| `radius-xl` | 16px | `rounded-2xl` | Hero images, feature cards |
| `radius-full` | 9999px | `rounded-full` | Avatars, pill buttons, badges |

---

## 6. Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default stacking |
| `z-dropdown` | 10 | Dropdown menus |
| `z-sticky` | 20 | Sticky header |
| `z-overlay` | 30 | Mobile menu overlay |
| `z-modal` | 40 | Modals, lightbox |
| `z-toast` | 50 | Toast notifications |
| `z-tooltip` | 60 | Tooltips |

---

## 7. Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `transition-fast` | `150ms ease` | Hover color changes |
| `transition-base` | `200ms ease` | Button interactions |
| `transition-slow` | `300ms ease-in-out` | Accordion open/close |
| `transition-drawer` | `350ms cubic-bezier(0.4, 0, 0.2, 1)` | Mobile drawer slide |

---

## 8. Breakpoints

| Token | Width | Tailwind Prefix |
|-------|-------|-----------------|
| `bp-sm` | 640px | `sm:` |
| `bp-md` | 768px | `md:` |
| `bp-lg` | 1024px | `lg:` |
| `bp-xl` | 1280px | `xl:` |
| `bp-2xl` | 1536px | `2xl:` |

Design targets: **Mobile-first**. Default styles = mobile, override upward.

---

## 9. Tailwind Config Mapping

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D7377',
          dark: '#0A5C5F',
          light: '#1A9DA2',
          wash: '#E6F7F7',
        },
        accent: {
          DEFAULT: '#D97706',
          dark: '#B45309',
          light: '#FBBF24',
          wash: '#FEF3C7',
        },
        eco: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#374151',
          muted: '#6B7280',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#F3F4F6',
          tertiary: '#E5E7EB',
        },
        border: {
          DEFAULT: '#D1D5DB',
          light: '#E5E7EB',
        },
        error: {
          DEFAULT: '#EF4444',
          bg: '#FEF2F2',
        },
        success: {
          DEFAULT: '#10B981',
          bg: '#ECFDF5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          bg: '#FFFBEB',
        },
        info: {
          DEFAULT: '#3B82F6',
          bg: '#EFF6FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-arabic)', 'sans-serif'],
      },
      fontSize: {
        display: ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
        h1: ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['2.25rem', { lineHeight: '1.25', fontWeight: '700' }],
        h3: ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        h5: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      zIndex: {
        dropdown: '10',
        sticky: '20',
        overlay: '30',
        modal: '40',
        toast: '50',
        tooltip: '60',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        drawer: '350ms',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 10. Button Specs

### Variants

| Variant | Background | Text | Border | Hover BG | Active BG |
|---------|-----------|------|--------|----------|-----------|
| `primary` | `color-primary` | `#FFFFFF` | none | `color-primary-dark` | darken 10% |
| `secondary` | transparent | `color-primary` | `color-primary` | `color-primary-wash` | `color-primary` + white text |
| `accent` | `color-accent` | `#FFFFFF` | none | `color-accent-dark` | darken 10% |
| `ghost` | transparent | `color-text-secondary` | none | `color-bg-secondary` | `color-bg-tertiary` |
| `danger` | `color-error` | `#FFFFFF` | none | darken 10% | darken 15% |

### Sizes

| Size | Height | Padding X | Font Size | Border Radius |
|------|--------|-----------|-----------|---------------|
| `sm` | 32px | 12px | 14px | `radius-md` |
| `md` | 40px | 16px | 16px | `radius-md` |
| `lg` | 48px | 24px | 18px | `radius-md` |

### States

- **Disabled:** opacity 0.5, `cursor-not-allowed`.
- **Loading:** spinner icon replaces text, same dimensions.
- **Focus:** `ring-2 ring-offset-2 ring-primary` (2px primary outline, 2px offset).

### Component Interface

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

**File:** `src/components/ui/Button.tsx`

---

## 11. Form Field Specs

### Text Input

| State | Border | Background | Shadow |
|-------|--------|-----------|--------|
| Default | `color-border` | `color-bg-primary` | none |
| Hover | `color-text-muted` | `color-bg-primary` | none |
| Focus | `color-primary` | `color-primary-wash` | `ring-2 ring-primary/20` |
| Error | `color-error` | `color-error-bg` | `ring-2 ring-error/20` |
| Disabled | `color-border-light` | `color-bg-tertiary` | none |

### Dimensions

- Height: 44px (touch-friendly minimum).
- Padding: `12px 16px`.
- Border radius: `radius-md`.
- Font size: `text-body` (16px) — prevents iOS zoom.
- Label: `text-body-sm` (14px), `font-medium`, `color-text-primary`, margin-bottom 6px.
- Helper text: `text-body-sm`, `color-text-muted`, margin-top 4px.
- Error text: `text-body-sm`, `color-error`, margin-top 4px.

### Component Interface

```tsx
interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  dir?: 'ltr' | 'rtl';
  className?: string;
}
```

**File:** `src/components/ui/Input.tsx`

### Select

Same dimensions and state styling as text input. Includes custom chevron icon (`ChevronDown`).

```tsx
interface SelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
```

**File:** `src/components/ui/Select.tsx`

### Textarea

Same styling. Min-height: 120px. Resize: vertical.

```tsx
interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
```

**File:** `src/components/ui/Textarea.tsx`

### Checkbox & Radio

- Size: 20×20px.
- Checked color: `color-primary`.
- Focus ring: same as button.
- Label: inline, 8px gap, clickable label area.

---

## 12. Icon System

- Use **Lucide React** (`lucide-react`) for all icons.
- Default size: 20px.
- Stroke width: 1.5.
- Always pass `aria-hidden="true"` when decorative.
- Always pair with `sr-only` text when interactive.

---

## 13. RTL Overrides

When `dir="rtl"` or `[lang="ar"]`:

- All `margin-left` ↔ `margin-right` swap. Use Tailwind logical properties: `ms-*` / `me-*`, `ps-*` / `pe-*`.
- Icons with directional meaning (arrows, chevrons) are mirrored via `rtl:rotate-180`.
- Text alignment uses `text-start` / `text-end` instead of `text-left` / `text-right`.
- Font weight for Arabic headings: use `600` max (Arabic fonts look heavy at `700`).
- Letter spacing: set to `0` for Arabic (Latin `tracking-tight` etc. must not apply).

---

## 14. Dark Mode

Not included in initial launch. All tokens are light-mode only. Structure supports future dark mode by swapping CSS custom properties.
