'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import type { GalleryItem as GalleryItemType } from '@/lib/data/gallery-types';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
  onClick: () => void;
  priority?: boolean;
}

export function GalleryItem({ item, index, onClick, priority = false }: GalleryItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const itemRef = useRef<HTMLDivElement>(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (priority) return;

    const element = itemRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [priority]);

  const categoryLabel =
    item.category.charAt(0).toUpperCase() + item.category.slice(1);

  return (
    <div
      ref={itemRef}
      className={cn(
        'group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid mb-4',
        'animate-fade-in-up',
        isLoaded && 'is-visible'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} - ${item.alt}`}
    >
      {/* Image container with aspect ratio */}
      <div
        className="relative w-full bg-bg-tertiary"
        style={{
          paddingBottom:
            item.width && item.height
              ? `${(item.height / item.width) * 100}%`
              : '75%',
        }}
      >
        {isInView && (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={cn(
              'object-cover transition-transform duration-300 group-hover:scale-105',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsLoaded(true)}
            priority={priority}
          />
        )}

        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-bg-tertiary animate-pulse" />
        )}

        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            'flex flex-col justify-end p-4'
          )}
        >
          {/* Expand icon */}
          <div className="absolute top-3 right-3">
            <Maximize2 className="w-5 h-5 text-white opacity-80" />
          </div>

          {/* Title and category */}
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Badge
              variant="primary"
              size="sm"
              className="mb-2 bg-primary-500/80 text-white"
            >
              {categoryLabel}
            </Badge>
            <h3 className="text-white font-medium text-sm line-clamp-2">
              {item.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
