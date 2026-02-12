/**
 * Gallery category options - shared by server (gallery.ts) and client (admin).
 * Kept separate so client components never import gallery.ts (Node fs/path/uuid).
 */
export const GALLERY_CATEGORIES = [
  { value: 'cafes', label: 'Cafes' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'hotels', label: 'Hotels' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'events', label: 'Events' },
  { value: 'seasonal', label: 'Seasonal' },
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]['value'];
