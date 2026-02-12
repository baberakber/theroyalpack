'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndustryCardProps {
  title: string;
  description: string;
  href: string;
  gradient: string;
  className?: string;
}

export function IndustryCard({
  title,
  description,
  href,
  gradient,
  className,
}: IndustryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative block p-6 lg:p-8 rounded-2xl overflow-hidden',
        'min-h-[200px] lg:min-h-[240px]',
        'transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
        className
      )}
    >
      {/* Background Gradient */}
      <div className={cn('absolute inset-0', gradient)} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end text-white">
        <h3 className="text-xl lg:text-2xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Link */}
        <span
          className={cn(
            'inline-flex items-center gap-2',
            'text-sm font-medium',
            'group-hover:gap-3 transition-all duration-300'
          )}
        >
          Explore
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}
