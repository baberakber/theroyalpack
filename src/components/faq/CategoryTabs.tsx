'use client';

import { cn } from '@/lib/utils';

interface Category {
  key: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryTabsProps) {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-white py-4 border-b border-border-light',
        className
      )}
    >
      <div
        role="tablist"
        aria-label="FAQ categories"
        className="flex gap-1 overflow-x-auto scrollbar-hide pb-1"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.key;

          return (
            <button
              key={category.key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${category.key}`}
              id={`tab-${category.key}`}
              onClick={() => onCategoryChange(category.key)}
              className={cn(
                'flex-shrink-0 px-4 py-2 text-sm font-medium',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                'rounded-t-md',
                isActive
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-text-secondary hover:text-primary-500'
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
