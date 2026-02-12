'use client';

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PillarItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function PillarItem({
  icon: Icon,
  title,
  description,
  className,
}: PillarItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center p-6',
        className
      )}
    >
      {/* Icon Circle */}
      <div
        className={cn(
          'flex items-center justify-center',
          'w-16 h-16 rounded-full mb-4',
          'bg-primary-100 text-primary-600'
        )}
      >
        <Icon className="w-8 h-8" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary">
        {description}
      </p>
    </div>
  );
}
