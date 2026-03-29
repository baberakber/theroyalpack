'use client';

import { cn } from '@/lib/utils';
import { GalleryItem } from './GalleryItem';
import type { GalleryItem as GalleryItemType } from '@/lib/data/gallery-types';

interface GalleryGridProps {
  items: GalleryItemType[];
  onItemClick: (index: number) => void;
}

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-bg-tertiary flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <p className="text-lg font-medium text-text-primary mb-2">
            No designs found
          </p>
          <p className="text-text-muted text-sm">
            Try selecting a different filter or view all designs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Gallery of cup designs"
      className={cn(
        'columns-2 md:columns-3 xl:columns-4',
        'gap-4'
      )}
    >
      {items.map((item, index) => (
        <div key={item.id} role="listitem">
          <GalleryItem
            item={item}
            index={index}
            onClick={() => onItemClick(index)}
            priority={index < 8}
          />
        </div>
      ))}
    </div>
  );
}
