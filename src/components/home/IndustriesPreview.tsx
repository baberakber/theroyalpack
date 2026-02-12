'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IndustryCard } from './IndustryCard';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const industries = [
  {
    key: 'cafes' as const,
    href: '/industries/cafes',
    gradient: 'bg-gradient-to-br from-primary-600 to-primary-800',
  },
  {
    key: 'restaurants' as const,
    href: '/industries/restaurants',
    gradient: 'bg-gradient-to-br from-accent-500 to-accent-700',
  },
  {
    key: 'hotels' as const,
    href: '/industries/hotels',
    gradient: 'bg-gradient-to-br from-eco-600 to-eco-800',
  },
  {
    key: 'events' as const,
    href: '/industries/events',
    gradient: 'bg-gradient-to-br from-text-primary to-gray-800',
  },
];

export function IndustriesPreview() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.industries');
  const tIndustries = useTranslations('industries');

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary" ref={ref}>
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
              <Link href="/industries">{t('viewAll')}</Link>
            </Button>
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div
              key={industry.href}
              className={cn(
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <IndustryCard
                title={tIndustries(`${industry.key}.title`)}
                description={tIndustries(`${industry.key}.description`)}
                href={industry.href}
                gradient={industry.gradient}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
