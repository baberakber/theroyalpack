'use client';

import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block p-6 lg:p-8 rounded-2xl',
        'bg-white border border-border-light',
        'transition-all duration-300',
        'hover:shadow-xl hover:border-primary-200 hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'inline-flex items-center justify-center',
          'w-14 h-14 rounded-xl mb-5',
          'bg-primary-50 text-primary-500',
          'group-hover:bg-primary-500 group-hover:text-white',
          'transition-colors duration-300'
        )}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-text-secondary mb-4 line-clamp-3">
        {description}
      </p>

      {/* Link */}
      <span
        className={cn(
          'inline-flex items-center gap-2',
          'text-primary-500 font-medium',
          'group-hover:gap-3 transition-all duration-300'
        )}
      >
        Learn more
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
