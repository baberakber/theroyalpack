'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CupTypeCardProps {
  image: string;
  imageAlt: string;
  title: string;
  tagline: string;
  bestFor: string[];
  priceIndicator: '$' | '$$' | '$$$';
  cupType: string;
  isSelected?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function CupTypeCard({
  image,
  imageAlt,
  title,
  tagline,
  bestFor,
  priceIndicator,
  cupType,
  isSelected = false,
  className,
  style,
}: CupTypeCardProps) {
  return (
    <article
      style={style}
      className={cn(
        'group rounded-xl overflow-hidden bg-white',
        'border shadow-md transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        isSelected
          ? 'border-2 border-primary-500 shadow-lg'
          : 'border-border-light',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-primary-50 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-4"
        />
        {/* Price Indicator */}
        <div className="absolute top-4 right-4">
          <span className="text-lg font-bold text-accent-500">
            {priceIndicator}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-1">
          {title}
        </h3>
        <p className="text-text-muted italic mb-4">{tagline}</p>

        {/* Best For List */}
        <div className="mb-4">
          <span className="text-sm font-medium text-text-secondary">Best for:</span>
          <ul className="mt-1 space-y-1">
            {bestFor.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-primary-500 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant="primary"
          size="md"
          className="w-full"
          asChild
        >
          <Link href={`/get-a-quote?cup_type=${cupType}`}>
            Get a Quote
          </Link>
        </Button>
      </div>
    </article>
  );
}
