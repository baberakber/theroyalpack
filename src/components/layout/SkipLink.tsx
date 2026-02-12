'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface SkipLinkProps {
  href?: string;
  className?: string;
}

export function SkipLink({ href = '#main-content', className }: SkipLinkProps) {
  const t = useTranslations('skipLink');

  return (
    <a
      href={href}
      className={cn(
        'skip-link',
        'fixed left-4 -top-12 z-[100]',
        'bg-primary-500 text-white px-4 py-2 rounded-md',
        'font-medium text-sm',
        'focus:top-4 transition-[top] duration-200',
        'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500',
        className
      )}
    >
      {t('skipToContent')}
    </a>
  );
}
