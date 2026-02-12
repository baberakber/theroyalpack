/**
 * Gallery item type - shared by server (gallery.ts) and client (gallery components).
 * No Node.js or server-only imports so client components can import safely.
 */
export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description?: string;
  category: string;
  alt: string;
  order: number;
  createdAt: string;
  /** Optional dimensions for aspect-ratio layout; when missing, default ratio is used */
  width?: number;
  height?: number;
}
