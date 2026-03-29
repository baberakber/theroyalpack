'use client';

import { Link } from '@/i18n/navigation';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { SiteContainer } from '@/components/layout/SiteContainer';

export function CtaBanner() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.cta');

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      ref={ref}
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      {/* Inner border for glass depth */}
      <div className="absolute inset-0 border-y border-white/5" />

      <SiteContainer className="relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content - 7 columns */}
          <div className="lg:col-span-7">
            <h2
              className={cn(
                'text-3xl lg:text-5xl font-bold text-white tracking-tighter leading-none mb-5',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
            >
              {t('title')}
            </h2>
            <p
              className={cn(
                'text-lg lg:text-xl text-primary-100/80 leading-relaxed mb-8 max-w-[50ch]',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '80ms' }}
            >
              {t('subtitle')}
            </p>

            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '160ms' }}
            >
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link href="/get-a-quote">{t('button')}</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
                className="text-white border border-white/20 hover:bg-white/10"
                asChild
              >
                <a
                  href="https://wa.me/971501234567?text=Hello!%20I%20am%20interested%20in%20custom%20paper%20cups."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Right trust metrics - 5 columns */}
          <div className="lg:col-span-5">
            <div
              className={cn(
                'grid grid-cols-2 gap-6 lg:gap-8',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '240ms' }}
            >
              {[
                { value: '24h', label: 'Response Time' },
                { value: '500+', label: 'Happy Clients' },
                { value: '1M+', label: 'Cups Delivered' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    'p-5 rounded-2xl',
                    'bg-white/5 border border-white/10',
                    'backdrop-blur-sm'
                  )}
                >
                  <span className="block text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm text-primary-200 mt-1 block font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
