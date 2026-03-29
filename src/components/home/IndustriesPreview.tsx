'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IndustryCard } from './IndustryCard';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { SiteContainer } from '@/components/layout/SiteContainer';

const industries = [
  {
    key: 'cafes' as const,
    href: '/industries/cafes',
    imageSrc: '/images/industries/Cafee%20Shops.webp',
    imageAlt: 'Professional branded cups for cafes and coffee shops',
  },
  {
    key: 'restaurants' as const,
    href: '/industries/restaurants',
    imageSrc: '/images/industries/Restuarants.webp',
    imageAlt: 'High quality custom cup print for restaurants',
  },
  {
    key: 'hotels' as const,
    href: '/industries/hotels',
    imageSrc: '/images/industries/Hotels.webp',
    imageAlt: 'Premium hospitality paper cups for hotels',
  },
  {
    key: 'events' as const,
    href: '/industries/events',
    imageSrc: '/images/industries/Events.webp',
    imageAlt: 'Event-ready custom branded cups',
  },
];

export function IndustriesPreview() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.industries');
  const tIndustries = useTranslations('industries');

  return (
    <section className="py-20 lg:py-32 bg-bg-secondary" ref={ref}>
      <SiteContainer>
        {/* Header with left-aligned title and right CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p
              className={cn(
                'text-sm font-medium text-primary-500 uppercase tracking-wider mb-4',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
            >
              Industries
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
              <Link href="/industries">{t('viewAll')}</Link>
            </Button>
          </div>
        </div>

        {/* Asymmetric grid: row 1 = 7fr + 5fr, row 2 = 5fr + 7fr */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div
            className={cn(
              'md:col-span-7 animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '240ms' }}
          >
            <IndustryCard
              title={tIndustries(`${industries[0].key}.title`)}
              description={tIndustries(`${industries[0].key}.description`)}
              href={industries[0].href}
              imageSrc={industries[0].imageSrc}
              imageAlt={industries[0].imageAlt}
              className="h-full min-h-[240px] lg:min-h-[280px]"
            />
          </div>
          <div
            className={cn(
              'md:col-span-5 animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '320ms' }}
          >
            <IndustryCard
              title={tIndustries(`${industries[1].key}.title`)}
              description={tIndustries(`${industries[1].key}.description`)}
              href={industries[1].href}
              imageSrc={industries[1].imageSrc}
              imageAlt={industries[1].imageAlt}
              className="h-full min-h-[240px] lg:min-h-[280px]"
            />
          </div>
          <div
            className={cn(
              'md:col-span-5 animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '400ms' }}
          >
            <IndustryCard
              title={tIndustries(`${industries[2].key}.title`)}
              description={tIndustries(`${industries[2].key}.description`)}
              href={industries[2].href}
              imageSrc={industries[2].imageSrc}
              imageAlt={industries[2].imageAlt}
              className="h-full min-h-[240px] lg:min-h-[280px]"
            />
          </div>
          <div
            className={cn(
              'md:col-span-7 animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '480ms' }}
          >
            <IndustryCard
              title={tIndustries(`${industries[3].key}.title`)}
              description={tIndustries(`${industries[3].key}.description`)}
              href={industries[3].href}
              imageSrc={industries[3].imageSrc}
              imageAlt={industries[3].imageAlt}
              className="h-full min-h-[240px] lg:min-h-[280px]"
            />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
