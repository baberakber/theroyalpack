'use client';

import { Coffee, Palette, Truck } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function WhatWeDoSection() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.whatWeDo');

  const services = [
    {
      icon: Coffee,
      title: t('paperCups.title'),
      description: t('paperCups.description'),
      href: '/products/paper-cups',
    },
    {
      icon: Palette,
      title: t('cupPrinting.title'),
      description: t('cupPrinting.description'),
      href: '/products/cup-printing',
    },
    {
      icon: Truck,
      title: t('accessories.title'),
      description: t('accessories.description'),
      href: '/products/accessories',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
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
              'text-lg text-text-secondary',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '100ms' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
