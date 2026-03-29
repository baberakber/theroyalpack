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
import { SiteContainer } from '@/components/layout/SiteContainer';
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

  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) {
      return items;
    }
    return items.filter((item) => activeFilters.includes(item.category));
  }, [items, activeFilters]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleFilterChange = useCallback((filters: string[]) => {
    setActiveFilters(filters);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 300);
  }, []);

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
        className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white"
      >
        <SiteContainer>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className={cn(
              'mb-6 animate-fade-in-up',
              headerVisible && 'is-visible'
            )}
          >
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-500 transition-colors duration-300"
                >
                  {tBreadcrumb('home')}
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <li className="text-text-primary font-medium">{t('title')}</li>
            </ol>
          </nav>

          {/* Heading */}
          <div className="max-w-2xl">
            <h1
              className={cn(
                'text-4xl lg:text-6xl font-bold text-text-primary tracking-tighter leading-none mb-5',
                'animate-fade-in-up',
                headerVisible && 'is-visible'
              )}
              style={{ animationDelay: '80ms' }}
            >
              {t('heading')}
            </h1>

            <p
              className={cn(
                'text-lg text-text-secondary leading-relaxed max-w-[55ch]',
                'animate-fade-in-up',
                headerVisible && 'is-visible'
              )}
              style={{ animationDelay: '160ms' }}
            >
              {t('description')}
            </p>
          </div>

          {/* Item count */}
          <div
            className={cn(
              'mt-8 pt-8 border-t border-border-light',
              'animate-fade-in-up',
              headerVisible && 'is-visible'
            )}
            style={{ animationDelay: '240ms' }}
          >
            <span className="text-sm text-text-muted">
              {filteredItems.length} {filteredItems.length === 1 ? 'design' : 'designs'}
            </span>
          </div>
        </SiteContainer>
      </section>

      {/* Filter Chips */}
      <FilterChips
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Gallery Grid */}
      <section className="py-10 lg:py-16">
        <SiteContainer>
          <GalleryGrid items={visibleItems} onItemClick={handleItemClick} />

          {/* Load More */}
          <LoadMoreButton
            visibleCount={visibleItems.length}
            totalCount={filteredItems.length}
            isLoading={isLoadingMore}
            onLoadMore={handleLoadMore}
          />
        </SiteContainer>
      </section>

      {/* CTA Banner */}
      <section
        ref={ctaRef}
        className="relative py-20 lg:py-28 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500" />
        <div className="absolute inset-0 border-y border-white/5" />

        <SiteContainer className="relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h2
                className={cn(
                  'text-3xl lg:text-5xl font-bold text-white tracking-tighter leading-none mb-5',
                  'animate-fade-in-up',
                  ctaVisible && 'is-visible'
                )}
              >
                {t('cta.title')}
              </h2>
              <p
                className={cn(
                  'text-lg lg:text-xl text-primary-100/80 leading-relaxed mb-8 max-w-[50ch]',
                  'animate-fade-in-up',
                  ctaVisible && 'is-visible'
                )}
                style={{ animationDelay: '80ms' }}
              >
                {t('cta.description')}
              </p>

              <div
                className={cn(
                  'flex flex-col sm:flex-row gap-4',
                  'animate-fade-in-up',
                  ctaVisible && 'is-visible'
                )}
                style={{ animationDelay: '160ms' }}
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
                  className="text-white border border-white/20 hover:bg-white/10"
                  asChild
                >
                  <Link href="/request-sample">{t('cta.sample')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </SiteContainer>
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
