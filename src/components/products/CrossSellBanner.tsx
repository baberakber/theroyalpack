'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface CrossSellBannerProps {
  heading: string;
  text: string;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

export function CrossSellBanner({
  heading,
  text,
  ctaText,
  ctaHref,
  className,
}: CrossSellBannerProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={cn('py-12 bg-bg-secondary', className)}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex flex-col md:flex-row items-center justify-between gap-6',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              {heading}
            </h2>
            <p className="text-text-secondary max-w-xl">
              {text}
            </p>
          </div>
          <Button
            variant="accent"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            asChild
          >
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
