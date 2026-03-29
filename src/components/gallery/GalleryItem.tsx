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
        'group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-4',
        'animate-fade-in-up',
        isLoaded && 'is-visible'
      )}
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
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
      <div
        className="relative w-full bg-bg-tertiary rounded-xl overflow-hidden"
        style={{
          paddingBottom:
            item.width && item.height
              ? `${(item.height / item.width) * 100}%`
              : '100%',
        }}
      >
        {isInView && (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={cn(
              'object-cover',
              'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
              'group-hover:scale-[1.04]',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsLoaded(true)}
            priority={priority}
          />
        )}

        {/* Skeleton shimmer placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-bg-tertiary">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        )}

        {/* Hover overlay with premium gradient */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-500',
            'flex flex-col justify-end p-5'
          )}
        >
          {/* Expand icon */}
          <div className="absolute top-4 right-4">
            <div className={cn(
              'p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10',
              'opacity-0 group-hover:opacity-100',
              'transition-all duration-500',
              'group-hover:scale-100 scale-90'
            )}>
              <Maximize2 className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title and category */}
          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Badge
              variant="primary"
              size="sm"
              className="mb-2.5 bg-primary-500/80 text-white border-0"
            >
              {categoryLabel}
            </Badge>
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-white/60 text-xs mt-1 line-clamp-1">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Inner border for depth */}
        <div className={cn(
          'absolute inset-0 rounded-xl',
          'border border-white/0 group-hover:border-white/15',
          'transition-all duration-500 pointer-events-none'
        )} />
      </div>
    </div>
  );
}
