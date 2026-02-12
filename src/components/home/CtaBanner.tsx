'use client';

import { Link } from '@/i18n/navigation';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function CtaBanner() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useTranslations('home.cta');

  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={cn(
              'text-3xl lg:text-4xl font-bold text-white mb-4',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
          >
            {t('title')}
          </h2>
          <p
            className={cn(
              'text-lg lg:text-xl text-primary-100 mb-8',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '100ms' }}
          >
            {t('subtitle')}
          </p>

          <div
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-4',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '200ms' }}
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
              className="text-white border-white/30 hover:bg-white/10"
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

          {/* Trust badges */}
          <div
            className={cn(
              'flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/20',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '300ms' }}
          >
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">24h</span>
              <span className="text-sm text-primary-100">Response Time</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">500+</span>
              <span className="text-sm text-primary-100">Happy Clients</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">100%</span>
              <span className="text-sm text-primary-100">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
