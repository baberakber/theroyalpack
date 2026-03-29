'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProductImageSliderProps = {
  images: string[];
  altBase: string;
  className?: string;
  priority?: boolean;
  autoPlayMs?: number;
};

export function ProductImageSlider({
  images,
  altBase,
  className,
  priority = false,
  autoPlayMs = 3000,
}: ProductImageSliderProps) {
  const sliderId = useId();
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [safeImages.join('|')]);

  const canNavigate = safeImages.length > 1;
  const activeSrc = safeImages[index] ?? safeImages[0];

  const goPrev = useCallback(() => {
    if (!canNavigate) return;
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  }, [canNavigate, safeImages.length]);

  const goNext = useCallback(() => {
    if (!canNavigate) return;
    setIndex((i) => (i + 1) % safeImages.length);
  }, [canNavigate, safeImages.length]);

  useEffect(() => {
    if (!canNavigate) return;
    if (isPaused) return;
    if (!autoPlayMs || autoPlayMs < 1000) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length);
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [autoPlayMs, canNavigate, isPaused, safeImages.length]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!canNavigate) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    },
    [canNavigate, goNext, goPrev]
  );

  if (!activeSrc) return null;

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${altBase} gallery`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        className={cn(
          // Medium height for a more premium look across screens
          'relative h-[280px] sm:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden',
          'border border-border-light bg-bg-secondary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
        )}
      >
        <Image
          src={activeSrc}
          alt={`${altBase} ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 800px"
          priority={priority}
        />

        {canNavigate && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-controls={sliderId}
              aria-label="Previous image"
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2',
                'h-10 w-10 rounded-full',
                'bg-white/90 hover:bg-white shadow-md',
                'border border-border-light',
                'flex items-center justify-center',
                'transition'
              )}
            >
              <ChevronLeft className="h-5 w-5 text-text-primary" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-controls={sliderId}
              aria-label="Next image"
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                'h-10 w-10 rounded-full',
                'bg-white/90 hover:bg-white shadow-md',
                'border border-border-light',
                'flex items-center justify-center',
                'transition'
              )}
            >
              <ChevronRight className="h-5 w-5 text-text-primary" aria-hidden="true" />
            </button>
          </>
        )}

        <div
          id={sliderId}
          className={cn(
            'absolute bottom-3 left-1/2 -translate-x-1/2',
            'rounded-full bg-white/90 border border-border-light shadow-sm',
            'px-3 py-1 text-xs text-text-secondary'
          )}
        >
          {index + 1} / {safeImages.length}
        </div>
      </div>

      {safeImages.length > 1 && (
        <div className="mt-3 hidden lg:flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((src, i) => {
            const isActive = i === index;
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden',
                  'border bg-white',
                  isActive ? 'border-primary-500 ring-2 ring-primary-500/30' : 'border-border-light hover:border-border-default'
                )}
                aria-label={`Show image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

