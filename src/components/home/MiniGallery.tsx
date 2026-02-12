'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const galleryImages = [
  { src: '/gallery/1.svg', alt: 'Custom branded coffee cup design', size: 'large' },
  { src: '/gallery/2.svg', alt: 'Eco-friendly paper cup', size: 'small' },
  { src: '/gallery/3.svg', alt: 'Branded cup with logo', size: 'small' },
  { src: '/gallery/4.svg', alt: 'Creative cup design', size: 'small' },
  { src: '/gallery/5.svg', alt: 'Multiple cup sizes', size: 'small' },
  { src: '/gallery/6.svg', alt: 'Premium cup collection', size: 'large' },
];

export function MiniGallery() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.miniGallery');

  return (
    <section className="py-16 lg:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2
              className={cn(
                'text-3xl lg:text-4xl font-bold text-text-primary mb-4',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
            >
              {t('title')}
            </h2>
            <p
              className={cn(
                'text-lg text-text-secondary max-w-xl',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '100ms' }}
            >
              {t('subtitle')}
            </p>
          </div>
          <div
            className={cn(
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '200ms' }}
          >
            <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />} asChild>
              <Link href="/gallery">{t('viewGallery')}</Link>
            </Button>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                'relative overflow-hidden rounded-xl group',
                image.size === 'large' ? 'row-span-2' : '',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className={cn(
                'relative',
                image.size === 'large' ? 'aspect-[3/4]' : 'aspect-square'
              )}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
