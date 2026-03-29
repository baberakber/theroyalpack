'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { SiteContainer } from '@/components/layout/SiteContainer';

const topRightImages = [
  { src: '/images/Gallary/5.webp', alt: 'Full wrap printed cup design' },
  { src: '/images/Gallary/7.webp', alt: 'Premium double-wall insulated cup' },
  { src: '/images/Gallary/21.webp', alt: 'Heritage gold foil luxury cup' },
  { src: '/images/Gallary/25.webp', alt: 'Specialty barista series cup' },
];

const bottomLeftImages = [
  { src: '/images/Gallary/3.webp', alt: 'Royal Pack branded cup lineup' },
  { src: '/images/Gallary/4.webp', alt: 'Premium takeaway cup presentation' },
  { src: '/images/Gallary/2.webp', alt: 'Teal gradient design cup' },
  { src: '/images/Gallary/19.webp', alt: 'Ripple wall textured cup' },
];

export function MiniGallery() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.miniGallery');
  const allImages = [
    { src: '/images/products/Collage.webp', alt: 'Royal Pack branded cups and packaging collage' },
    ...topRightImages,
    ...bottomLeftImages,
    { src: '/images/products/Collage2.webp', alt: 'Royal Pack product showcase collage' },
  ];

  const renderTile = (
    image: { src: string; alt: string },
    index: number,
    className = '',
    sizes = '(max-width: 768px) 50vw, 25vw'
  ) => (
    <Link
      href="/gallery"
      key={`${image.src}-${index}`}
      className={cn(
        'relative overflow-hidden rounded-xl group block',
        'animate-scale-in',
        isVisible && 'is-visible',
        className
      )}
      style={{ animationDelay: `${(index + 2) * 80}ms` }}
    >
      <div className="relative w-full h-full aspect-square">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={cn(
            'object-cover',
            'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'group-hover:scale-[1.04]'
          )}
          sizes={sizes}
        />

        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-t from-zinc-900/60 via-zinc-900/10 to-transparent',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-500'
        )} />

        <div className={cn(
          'absolute inset-0 rounded-xl',
          'border border-white/0 group-hover:border-white/20',
          'transition-all duration-500'
        )} />

        <div className={cn(
          'absolute bottom-4 left-4',
          'opacity-0 group-hover:opacity-100',
          'translate-y-2 group-hover:translate-y-0',
          'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
        )}>
          <span className="text-white text-sm font-medium flex items-center gap-1.5">
            View Gallery
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-20 lg:py-32 bg-white" ref={ref}>
      <SiteContainer>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p
              className={cn(
                'text-sm font-medium text-primary-500 uppercase tracking-wider mb-4',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
            >
              Gallery
            </p>
            <h2
              className={cn(
                'text-3xl lg:text-5xl font-bold text-text-primary tracking-tighter leading-none mb-4',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '80ms' }}
            >
              {t('title')}
            </h2>
            <p
              className={cn(
                'text-lg text-text-secondary leading-relaxed',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '160ms' }}
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

        {/* Mobile: simple balanced two-column grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {allImages.map((image, index) => renderTile(image, index))}
        </div>

        {/* Desktop: designer layout (big + 4 small, then 4 small + big) */}
        <div className="hidden md:flex md:flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            {renderTile(
              { src: '/images/products/Collage.webp', alt: 'Royal Pack branded cups and packaging collage' },
              0,
              'col-span-2 row-span-2',
              '(max-width: 1024px) 50vw, 40vw'
            )}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {topRightImages.map((image, index) => renderTile(image, index + 1))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {bottomLeftImages.map((image, index) => renderTile(image, index + 5))}
            </div>
            {renderTile(
              { src: '/images/products/Collage2.webp', alt: 'Royal Pack product showcase collage' },
              9,
              'col-span-2 row-span-2',
              '(max-width: 1024px) 50vw, 40vw'
            )}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
