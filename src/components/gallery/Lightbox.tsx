'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import type { GalleryItem } from '@/lib/data/gallery-types';

interface LightboxProps {
  images: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const isRTL = useLocale() === 'ar';
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [hasPrev]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [hasNext]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (isRTL) {
            goToNext();
          } else {
            goToPrev();
          }
          break;
        case 'ArrowRight':
          if (isRTL) {
            goToPrev();
          } else {
            goToNext();
          }
          break;
        case 'Tab': {
          e.preventDefault();
          const focusableElements = [closeButtonRef, prevButtonRef, nextButtonRef]
            .map((ref) => ref.current)
            .filter((el): el is HTMLButtonElement => el !== null && !el.disabled);

          const currentFocusIndex = focusableElements.findIndex(
            (el) => el === document.activeElement
          );

          if (e.shiftKey) {
            const prevIndex = currentFocusIndex <= 0
              ? focusableElements.length - 1
              : currentFocusIndex - 1;
            focusableElements[prevIndex]?.focus();
          } else {
            const nextIndex = currentFocusIndex >= focusableElements.length - 1
              ? 0
              : currentFocusIndex + 1;
            focusableElements[nextIndex]?.focus();
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrev, goToNext, isRTL]);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (isRTL && hasPrev) {
        goToPrev();
      } else if (!isRTL && hasNext) {
        goToNext();
      }
    }
    if (isRightSwipe) {
      if (isRTL && hasNext) {
        goToNext();
      } else if (!isRTL && hasPrev) {
        goToPrev();
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-zinc-950/95 backdrop-blur-sm'
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className={cn(
          'absolute top-5 end-5 z-10 p-2.5 rounded-full',
          'text-white/60 hover:text-white hover:bg-white/10',
          'transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
        )}
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Previous button */}
      <button
        ref={prevButtonRef}
        onClick={goToPrev}
        disabled={!hasPrev}
        className={cn(
          'absolute start-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full',
          'text-white/60 hover:text-white hover:bg-white/10',
          'transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
          'disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-7 h-7" strokeWidth={1.5} />
      </button>

      {/* Next button */}
      <button
        ref={nextButtonRef}
        onClick={goToNext}
        disabled={!hasNext}
        className={cn(
          'absolute end-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full',
          'text-white/60 hover:text-white hover:bg-white/10',
          'transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
          'disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="Next image"
      >
        <ChevronRight className="w-7 h-7" strokeWidth={1.5} />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="lg" className="text-white" />
          </div>
        )}

        <div
          className={cn(
            'relative transition-opacity duration-300',
            isImageLoading ? 'opacity-0' : 'opacity-100'
          )}
          style={{
            width: 'min(90vw, 1200px)',
            height: 'auto',
            maxHeight: '70vh',
          }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            className="object-contain max-h-[70vh] w-auto mx-auto rounded-lg"
            onLoad={() => setIsImageLoading(false)}
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-6 text-center text-white max-w-2xl px-4">
          <h3 className="text-lg font-semibold tracking-tight">{currentImage.title}</h3>
          {currentImage.description && (
            <p className="mt-1.5 text-white/50 text-sm">{currentImage.description}</p>
          )}
        </div>

        {/* Counter */}
        <div
          className="mt-4 text-white/30 text-xs font-medium tracking-wider uppercase"
          aria-live="polite"
        >
          {currentIndex + 1} of {images.length}
        </div>
      </div>
    </div>
  );
}
