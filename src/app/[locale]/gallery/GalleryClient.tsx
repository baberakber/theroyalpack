'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { FilterChips, GalleryGrid, LoadMoreButton } from '@/components/gallery';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import type { GalleryItem } from '@/lib/data/gallery-types';

const Lightbox = dynamic(() => import('@/components/gallery/Lightbox').then((m) => ({ default: m.Lightbox })), {
  ssr: false,
});

interface GalleryClientProps {
  items: GalleryItem[];
}

const ITEMS_PER_PAGE = 12;

export function GalleryClient({ items }: GalleryClientProps) {
  const t = useTranslations('gallery');
  const tBreadcrumb = useTranslations('breadcrumb');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  // Filter items based on active filters
  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) {
      return items;
    }
    return items.filter((item) => activeFilters.includes(item.category));
  }, [items, activeFilters]);

  // Get visible items based on pagination
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Handle filter change - reset visible count
  const handleFilterChange = useCallback((filters: string[]) => {
    setActiveFilters(filters);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 300);
  }, []);

  // Handle lightbox
  const handleItemClick = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <>
      {/* Page Header */}
      <section
        ref={headerRef}
        className="py-12 lg:py-16 bg-bg-secondary"
      >
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className={cn(
              'mb-4 animate-fade-in-up',
              headerVisible && 'is-visible'
            )}
          >
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-500 transition-colors"
                >
                  {tBreadcrumb('home')}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <li className="text-text-primary font-medium">{t('title')}</li>
            </ol>
          </nav>

          {/* Heading */}
          <h1
            className={cn(
              'text-4xl lg:text-5xl font-bold text-text-primary mb-4',
              'animate-fade-in-up',
              headerVisible && 'is-visible'
            )}
            style={{ animationDelay: '100ms' }}
          >
            {t('heading')}
          </h1>

          {/* Intro */}
          <p
            className={cn(
              'text-lg text-text-secondary max-w-xl',
              'animate-fade-in-up',
              headerVisible && 'is-visible'
            )}
            style={{ animationDelay: '200ms' }}
          >
            {t('description')}
          </p>
        </div>
      </section>

      {/* Filter Chips */}
      <FilterChips
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Gallery Grid */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <GalleryGrid items={visibleItems} onItemClick={handleItemClick} />

          {/* Load More */}
          <LoadMoreButton
            visibleCount={visibleItems.length}
            totalCount={filteredItems.length}
            isLoading={isLoadingMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </section>

      {/* CTA Banner */}
      <section
        ref={ctaRef}
        className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className={cn(
                'text-3xl lg:text-4xl font-bold text-white mb-4',
                'animate-fade-in-up',
                ctaVisible && 'is-visible'
              )}
            >
              {t('cta.title')}
            </h2>
            <p
              className={cn(
                'text-lg lg:text-xl text-primary-100 mb-8',
                'animate-fade-in-up',
                ctaVisible && 'is-visible'
              )}
              style={{ animationDelay: '100ms' }}
            >
              {t('cta.description')}
            </p>

            <div
              className={cn(
                'flex flex-col sm:flex-row items-center justify-center gap-4',
                'animate-fade-in-up',
                ctaVisible && 'is-visible'
              )}
              style={{ animationDelay: '200ms' }}
            >
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link href="/get-a-quote">{t('cta.quote')}</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
                className="text-white border-white/30 hover:bg-white/10"
                asChild
              >
                <Link href="/request-sample">{t('cta.sample')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={visibleItems}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={handleLightboxClose}
      />
    </>
  );
}
