/**
 * FAQ category options - shared by server (faq.ts) and client (admin).
 * Kept separate so client components never import faq.ts (Node fs/path/uuid).
 */
export const FAQ_CATEGORIES = [
  { value: 'ordering', label: 'Ordering' },
  { value: 'products', label: 'Products' },
  { value: 'printing', label: 'Printing' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'design', label: 'Design' },
  { value: 'sustainability', label: 'Sustainability' },
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number]['value'];
