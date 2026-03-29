'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GALLERY_CATEGORIES } from '@/lib/data/gallery-categories';
import { SiteContainer } from '@/components/layout/SiteContainer';

interface FilterChipsProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

export function FilterChips({ activeFilters, onFilterChange }: FilterChipsProps) {
  const t = useTranslations('gallery.filters');
  const isAllSelected = activeFilters.length === 0;

  const handleFilterClick = useCallback(
    (value: string) => {
      if (value === 'all') {
        onFilterChange([]);
        return;
      }

      const newFilters = activeFilters.includes(value)
        ? activeFilters.filter((f) => f !== value)
        : [...activeFilters, value];

      onFilterChange(newFilters);
    },
    [activeFilters, onFilterChange]
  );

  const handleClearAll = useCallback(() => {
    onFilterChange([]);
  }, [onFilterChange]);

  return (
    <div
      className="sticky top-20 lg:top-24 z-40 bg-white/90 backdrop-blur-xl border-b border-border-light/60 py-4"
      role="group"
      aria-label="Filter gallery by category"
    >
      <SiteContainer>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {/* All filter chip */}
          <button
            type="button"
            onClick={() => handleFilterClick('all')}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium',
              'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              isAllSelected
                ? 'bg-text-primary text-white shadow-sm'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
            )}
            aria-pressed={isAllSelected}
          >
            {t('all')}
          </button>

          {/* Category chips */}
          {GALLERY_CATEGORIES.map((category) => {
            const isActive = activeFilters.includes(category.value);
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => handleFilterClick(category.value)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium',
                  'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-text-primary text-white shadow-sm'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                )}
                aria-pressed={isActive}
              >
                {t(category.value)}
              </button>
            );
          })}

          {/* Clear all */}
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className={cn(
                'flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium',
                'text-text-muted hover:text-text-primary hover:bg-bg-tertiary',
                'transition-all duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
              )}
              aria-label="Clear all filters"
            >
              <X className="w-3.5 h-3.5" />
              {t('clear')}
            </button>
          )}
        </div>
      </SiteContainer>
    </div>
  );
}
