'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const tHome = useTranslations('home.hero');
  const tCommon = useTranslations('common');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-secondary via-white to-primary-50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Content - 60% */}
          <div className="lg:col-span-3 space-y-6">
            <Badge variant="primary" className="animate-fade-in-up is-visible">
              {tCommon('siteName')}
            </Badge>

            <h1
              className={cn(
                'text-4xl lg:text-5xl xl:text-6xl font-bold',
                'text-text-primary leading-tight',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '100ms' }}
            >
              {tHome('title')}
            </h1>

            <p
              className={cn(
                'text-lg lg:text-xl text-text-secondary max-w-2xl',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '200ms' }}
            >
              {tHome('subtitle')}
            </p>

            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4 pt-4',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '300ms' }}
            >
              <Button variant="accent" size="lg" asChild>
                <Link href="/get-a-quote">{tHome('cta')}</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/products">{tCommon('learnMore')}</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div
              className={cn(
                'flex items-center gap-6 pt-6',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-500">500+</span>
                <span className="text-sm text-text-muted">Happy Clients</span>
              </div>
              <div className="w-px h-8 bg-border-light" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-500">1M+</span>
                <span className="text-sm text-text-muted">Cups Delivered</span>
              </div>
            </div>
          </div>

          {/* Image - 40% */}
          <div className="lg:col-span-2 relative">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="animate-float">
                <Image
                  src="/hero-cups.svg"
                  alt="Custom branded paper cups"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-200 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-60" />
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-100/30 to-transparent" />
      </div>
    </section>
  );
}
