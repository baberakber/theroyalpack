'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIndex]);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when open
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

  // Focus management
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

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Tab':
          // Focus trap
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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrev, goToNext]);

  // Touch swipe handling
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

    if (isLeftSwipe && hasNext) {
      goToNext();
    }
    if (isRightSwipe && hasPrev) {
      goToPrev();
    }
  };

  // Click overlay to close
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
        'bg-text-primary/95 animate-fade-in'
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
          'absolute top-4 right-4 z-10 p-2 rounded-full',
          'text-white/80 hover:text-white hover:bg-white/10',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
        )}
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Previous button */}
      <button
        ref={prevButtonRef}
        onClick={goToPrev}
        disabled={!hasPrev}
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full',
          'text-white/80 hover:text-white hover:bg-white/10',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Next button */}
      <button
        ref={nextButtonRef}
        onClick={goToNext}
        disabled={!hasNext}
        className={cn(
          'absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full',
          'text-white/80 hover:text-white hover:bg-white/10',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading spinner */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="lg" className="text-white" />
          </div>
        )}

        {/* Image */}
        <div
          className={cn(
            'relative transition-opacity duration-200',
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
            className="object-contain max-h-[70vh] w-auto mx-auto"
            onLoad={() => setIsImageLoading(false)}
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center text-white max-w-2xl px-4">
          <h3 className="text-lg font-medium">{currentImage.title}</h3>
          {currentImage.description && (
            <p className="mt-1 text-white/70 text-sm">{currentImage.description}</p>
          )}
        </div>

        {/* Counter */}
        <div
          className="mt-3 text-white/60 text-sm"
          aria-live="polite"
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
