'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

interface ProductCategoryCardProps {
  image: string;
  imageAlt: string;
  imageFit?: 'cover' | 'contain';
  title: string;
  description: string;
  href: string;
  ctaText: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCategoryCard({
  image,
  imageAlt,
  imageFit = 'cover',
  title,
  description,
  href,
  ctaText,
  className,
  style,
}: ProductCategoryCardProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <article
      style={style}
      className={cn(
        'group rounded-xl border border-border-light shadow-md overflow-hidden',
        'bg-white transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1 hover:bg-primary-50 hover:border-primary-300',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-primary-50">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            imageFit === 'contain' ? 'object-contain p-2' : 'object-cover',
            'transition-transform duration-300',
            imageFit === 'cover' && 'group-hover:scale-105'
          )}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-text-secondary mb-4">
          {description}
        </p>
        <Button
          variant="primary"
          size="md"
          className="w-full"
          rightIcon={<ArrowRight className={cn('w-4 h-4', isRTL && 'rotate-180')} />}
          asChild
        >
          <Link href={href}>{ctaText}</Link>
        </Button>
      </div>
    </article>
  );
}
