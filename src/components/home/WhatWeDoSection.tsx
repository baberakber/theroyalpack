'use client';

import { Coffee, Palette, Truck, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SiteContainer } from '@/components/layout/SiteContainer';
import { Button } from '@/components/ui/Button';
import { type LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  index: number;
  isVisible: boolean;
  learnMore: string;
}

function ServiceCard({ icon: Icon, title, description, href, index, isVisible, learnMore }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col h-full min-h-[280px] md:min-h-[300px]',
        'p-6 md:p-8 rounded-2xl',
        'bg-white border border-border-light',
        'shadow-[0_1px_3px_rgba(15,23,42,0.05)]',
        'hover:bg-primary-500 hover:border-primary-500 hover:shadow-[0_16px_40px_-12px_rgba(13,148,136,0.45)]',
        'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'animate-fade-in-up',
        isVisible && 'is-visible'
      )}
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <div
        className={cn(
          'inline-flex items-center justify-center shrink-0 mb-6',
          'w-14 h-14 rounded-2xl',
          'bg-primary-50 text-primary-600',
          'group-hover:bg-white/20 group-hover:text-white',
          'transition-colors duration-300'
        )}
      >
        <Icon className="w-7 h-7" strokeWidth={1.5} />
      </div>

      <h3
        className={cn(
          'text-xl md:text-2xl font-bold tracking-tight mb-3',
          'text-text-primary group-hover:text-white',
          'transition-colors duration-300'
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'text-base leading-relaxed flex-1',
          'text-text-secondary group-hover:text-white/90',
          'transition-colors duration-300'
        )}
      >
        {description}
      </p>

      <div className="mt-8 flex items-center gap-2 text-primary-600 group-hover:text-white transition-colors duration-300">
        <span className="text-sm font-semibold">{learnMore}</span>
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 rtl:group-hover:translate-x-0"
          aria-hidden
        />
      </div>
    </Link>
  );
}

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
      href: '/products/custom-printing',
    },
    {
      icon: Truck,
      title: t('accessories.title'),
      description: t('accessories.description'),
      href: '/products/accessories',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white" ref={ref}>
      <SiteContainer>
        <header className="max-w-3xl mb-8 md:mb-10">
          <h2
            className={cn(
              'text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary tracking-tighter leading-[1.1] mb-4',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
          >
            {t('title')}
          </h2>
          <p
            className={cn(
              'text-lg md:text-xl text-text-secondary leading-relaxed',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '60ms' }}
          >
            {t('subtitle')}
          </p>
        </header>

        <div
          className={cn(
            'h-px w-full bg-border-light mb-10 md:mb-12',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '100ms' }}
          aria-hidden
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-10 md:mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.href}
              {...service}
              index={index}
              isVisible={isVisible}
              learnMore={t('learnMore')}
            />
          ))}
        </div>

        <div
          className={cn(
            'h-px w-full bg-border-light mb-10 md:mb-12',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '180ms' }}
          aria-hidden
        />

        <div
          className={cn(
            'flex justify-center',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '220ms' }}
        >
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} asChild>
            <Link href="/products">{t('cta')}</Link>
          </Button>
        </div>
      </SiteContainer>
    </section>
  );
}
