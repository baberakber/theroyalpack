'use client';

import { ChevronRight, Home } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const t = useTranslations('breadcrumb');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <nav aria-label="Breadcrumb" className={cn('py-4', className)}>
      <ol className={cn('flex items-center flex-wrap gap-1 text-sm', isRTL && 'flex-row-reverse justify-end')}>
        {/* Home Link */}
        <li>
          <Link
            href="/"
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded',
              'text-text-muted hover:text-text-primary',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
            )}
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{t('home')}</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center">
              <ChevronRight
                className={cn('h-4 w-4 text-text-muted mx-1', isRTL && 'rotate-180')}
                aria-hidden="true"
              />
              {isLast || !item.href ? (
                <span
                  className={cn(
                    'px-2 py-1',
                    isLast ? 'text-text-primary font-medium' : 'text-text-muted'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'px-2 py-1 rounded',
                    'text-text-muted hover:text-text-primary',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
