'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import {
  Coffee,
  UtensilsCrossed,
  Truck,
  Hotel,
  Plane,
  Heart,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  coffee: Coffee,
  utensils: UtensilsCrossed,
  truck: Truck,
  hotel: Hotel,
  plane: Plane,
  heart: Heart,
  building: Building2,
};

export type IndustryIconKey = keyof typeof INDUSTRY_ICONS;

interface IndustryDetailCardProps {
  iconKey: IndustryIconKey;
  title: string;
  description: string;
  keyNeeds: string[];
  backgroundImage: string;
  ctaText: string;
  ctaHref: string;
  size: 'full' | 'half';
  className?: string;
}

export function IndustryDetailCard({
  iconKey,
  title,
  description,
  keyNeeds,
  backgroundImage,
  ctaText,
  ctaHref,
  size,
  className,
}: IndustryDetailCardProps) {
  const Icon = INDUSTRY_ICONS[iconKey] ?? Building2;
  const displayedNeeds = keyNeeds.slice(0, 5);
  const remainingCount = keyNeeds.length - 5;

  return (
    <article
      className={cn(
        'group relative rounded-xl overflow-hidden',
        size === 'full' ? 'aspect-[16/10] lg:aspect-[21/9]' : 'aspect-[4/3]',
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={size === 'full' ? '100vw' : '50vw'}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
        {/* Icon */}
        <div className="mb-3">
          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/90 text-sm lg:text-base mb-4 max-w-xl">
          {description}
        </p>

        {/* Key needs pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayedNeeds.map((need) => (
            <span
              key={need}
              className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700"
            >
              {need}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div>
          <Button variant="accent" size="md" asChild>
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  );
}
