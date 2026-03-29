'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

interface LoadMoreButtonProps {
  visibleCount: number;
  totalCount: number;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function LoadMoreButton({
  visibleCount,
  totalCount,
  isLoading,
  onLoadMore,
}: LoadMoreButtonProps) {
  const t = useTranslations('gallery');
  const remaining = totalCount - visibleCount;

  if (remaining <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 pt-12 pb-4">
      <Button
        variant="secondary"
        size="md"
        isLoading={isLoading}
        onClick={onLoadMore}
        aria-live="polite"
      >
        {t('loadMore')}
      </Button>
      <p className="text-xs text-text-muted tracking-wider uppercase font-medium">
        {visibleCount} of {totalCount}
      </p>
    </div>
  );
}
