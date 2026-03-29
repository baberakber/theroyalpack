'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { SiteContainer } from '@/components/layout/SiteContainer';

type NavigatorConnection = {
  saveData?: boolean;
};

export function HeroSection() {
  const tHome = useTranslations('home.hero');
  const tCommon = useTranslations('common');
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;
    const saveData = connection?.saveData === true;

    setCanAutoplay(!prefersReducedMotion && !saveData && isDesktop);
  }, []);

  useEffect(() => {
    const target = mediaContainerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0]?.isIntersecting ?? false);
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canAutoplay) return;

    if (isInView) {
      void video.play().catch(() => {
        setCanAutoplay(false);
      });
    } else {
      video.pause();
    }
  }, [isInView, canAutoplay]);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-secondary">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary-50/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-50/40 to-transparent" />
      </div>

      <SiteContainer className="relative py-20 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Content - Left aligned, 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            <Badge
              variant="primary"
              className="animate-fade-in-up is-visible tracking-wider uppercase text-xs"
            >
              {tCommon('siteName')}
            </Badge>

            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold',
                'text-text-primary tracking-tighter leading-none',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '80ms' }}
            >
              {tHome('title')}
            </h1>

            <p
              className={cn(
                'text-lg lg:text-xl text-text-secondary leading-relaxed max-w-[55ch]',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '160ms' }}
            >
              {tHome('subtitle')}
            </p>

            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4 pt-2',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '240ms' }}
            >
              <Button variant="accent" size="lg" asChild>
                <Link href="/get-a-quote">{tHome('cta')}</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/products">{tCommon('learnMore')}</Link>
              </Button>
            </div>

            {/* Trust metrics */}
            <div
              className={cn(
                'flex items-center gap-8 pt-8 border-t border-border-light',
                'animate-fade-in-up is-visible'
              )}
              style={{ animationDelay: '320ms' }}
            >
              <div>
                <span className="block text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                  500+
                </span>
                <span className="text-sm text-text-muted font-medium mt-1 block">
                  Happy Clients
                </span>
              </div>
              <div className="w-px h-12 bg-border-light" />
              <div>
                <span className="block text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                  1M+
                </span>
                <span className="text-sm text-text-muted font-medium mt-1 block">
                  Cups Delivered
                </span>
              </div>
              <div className="w-px h-12 bg-border-light hidden sm:block" />
              <div className="hidden sm:block">
                <span className="block text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                  24h
                </span>
                <span className="text-sm text-text-muted font-medium mt-1 block">
                  Turnaround
                </span>
              </div>
            </div>
          </div>

          {/* Image - Right side, 5 columns, offset upward */}
          <div className="lg:col-span-5 relative lg:-mt-8">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Decorative ring behind the image */}
              <div className="absolute inset-4 rounded-[2rem] border border-primary-200/50 -rotate-3" />
              <div className="absolute inset-2 rounded-[2rem] border border-accent-200/30 rotate-2" />

              <div
                ref={mediaContainerRef}
                className="relative animate-float rounded-[1.75rem] overflow-hidden bg-white/40 border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)]"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src="/royalpack-hero-poster.webp"
                    alt="Custom branded paper cups"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 38vw"
                    className={cn(
                      'object-cover transition-opacity duration-500',
                      canAutoplay && videoLoaded ? 'opacity-0' : 'opacity-100'
                    )}
                  />

                  {canAutoplay && (
                    <video
                      ref={videoRef}
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster="/royalpack-hero-poster.webp"
                      onCanPlay={() => setVideoLoaded(true)}
                      className={cn(
                        'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
                        videoLoaded ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      <source src="/Main.mp4" type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>

              {/* Ambient glow - tinted to background, no neon */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-accent-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary-100 rounded-full blur-3xl opacity-40" />
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
