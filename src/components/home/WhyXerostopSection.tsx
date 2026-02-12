'use client';

import { Leaf, Shield, Zap, Award } from 'lucide-react';
import { PillarItem } from './PillarItem';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function WhyXerostopSection() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.whyXerostop');

  const pillars = [
    {
      icon: Leaf,
      title: t('sustainability.title'),
      description: t('sustainability.description'),
    },
    {
      icon: Shield,
      title: t('quality.title'),
      description: t('quality.description'),
    },
    {
      icon: Zap,
      title: t('customization.title'),
      description: t('customization.description'),
    },
    {
      icon: Award,
      title: t('service.title'),
      description: t('service.description'),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary" ref={ref}>
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

        {/* Pillars Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={cn(
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <PillarItem {...pillar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
