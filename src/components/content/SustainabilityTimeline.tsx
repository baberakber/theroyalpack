'use client';

import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

interface TimelineItem {
  year: number;
  milestone: string;
  isPast: boolean;
}

interface SustainabilityTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function SustainabilityTimeline({ items, className }: SustainabilityTimelineProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Timeline line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border-light" />

      {/* Timeline items */}
      <ol className="relative space-y-8">
        {items.map((item, index) => (
          <li
            key={item.year}
            className={cn(
              'relative pl-12 md:pl-20',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Year marker */}
            <div
              className={cn(
                'absolute left-0 md:left-4 flex items-center justify-center',
                'w-8 h-8 rounded-full text-sm font-semibold',
                item.isPast
                  ? 'bg-eco-500 text-white'
                  : 'bg-white border-2 border-border-default text-text-secondary'
              )}
            >
              <time dateTime={String(item.year)} className="sr-only">
                {item.year}
              </time>
            </div>

            {/* Year label */}
            <div
              className={cn(
                'absolute left-0 md:left-4 -top-6 text-xs font-medium',
                item.isPast ? 'text-eco-600' : 'text-text-muted'
              )}
            >
              {item.year}
            </div>

            {/* Milestone content */}
            <div
              className={cn(
                'p-4 rounded-lg',
                item.isPast ? 'bg-eco-50' : 'bg-bg-secondary'
              )}
            >
              <p
                className={cn(
                  'text-base',
                  item.isPast ? 'text-text-primary' : 'text-text-secondary'
                )}
              >
                {item.milestone}
              </p>
            </div>

            {/* Connecting line segment (dashed for future) */}
            {index < items.length - 1 && (
              <div
                className={cn(
                  'absolute left-[15px] md:left-[31px] top-8 w-0.5 h-8',
                  item.isPast ? 'bg-eco-400' : 'bg-border-light border-dashed'
                )}
                style={!item.isPast ? { borderLeft: '2px dashed', background: 'none' } : undefined}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
