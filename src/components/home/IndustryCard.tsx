'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndustryCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export function IndustryCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  className,
}: IndustryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative block p-8 lg:p-10 rounded-[1.25rem] overflow-hidden',
        'min-h-[200px]',
        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-900/45 to-zinc-900/20" />
      <div className="absolute inset-0 bg-zinc-900/15" />

      {/* Subtle inner border for depth */}
      <div className="absolute inset-0 border border-white/10 rounded-[1.25rem]" />
      <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end text-white">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-2 max-w-[45ch]">
          {description}
        </p>

        <span
          className={cn(
            'inline-flex items-center gap-2',
            'text-sm font-medium text-white/90',
            'group-hover:gap-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]'
          )}
        >
          Explore
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
    </Link>
  );
}
