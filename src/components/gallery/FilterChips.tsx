'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GALLERY_CATEGORIES } from '@/lib/data/gallery-categories';

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
      className="sticky top-16 lg:top-20 z-40 bg-bg-primary border-b border-border-light py-3"
      role="group"
      aria-label="Filter gallery by category"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {/* All filter chip */}
          <button
            type="button"
            onClick={() => handleFilterClick('all')}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              isAllSelected
                ? 'bg-primary-500 text-white'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
            )}
            aria-pressed={isAllSelected}
          >
            {t('all')}
          </button>

          {/* Category filter chips */}
          {GALLERY_CATEGORIES.map((category) => {
            const isActive = activeFilters.includes(category.value);
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => handleFilterClick(category.value)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                )}
                aria-pressed={isActive}
              >
                {t(category.value)}
              </button>
            );
          })}

          {/* Clear all button */}
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className={cn(
                'flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium',
                'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
                'transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
              )}
              aria-label="Clear all filters"
            >
              <X className="w-4 h-4" />
              {t('clear')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
