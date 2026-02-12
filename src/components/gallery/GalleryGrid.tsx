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
      <div className="py-16 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-lg text-text-secondary mb-4">
            No designs in this category yet.
          </p>
          <p className="text-text-tertiary">
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
