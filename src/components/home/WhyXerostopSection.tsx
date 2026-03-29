'use client';

import { Leaf, Shield, Zap, Award } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { SiteContainer } from '@/components/layout/SiteContainer';
import { type LucideIcon } from 'lucide-react';

interface PillarBlockProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

function PillarBlock({ icon: Icon, title, description, index, isVisible }: PillarBlockProps) {
  const accentStyles = [
    'from-primary-50 to-white text-primary-600 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white',
    'from-accent-50 to-white text-accent-600 group-hover:from-accent-500 group-hover:to-accent-600 group-hover:text-white',
    'from-eco-50 to-white text-eco-600 group-hover:from-eco-500 group-hover:to-eco-600 group-hover:text-white',
    'from-primary-50 to-accent-50 text-primary-700 group-hover:from-primary-600 group-hover:to-accent-600 group-hover:text-white',
  ];

  return (
    <div
      className={cn(
        'group relative p-6 lg:p-8 rounded-2xl overflow-hidden',
        'bg-white border border-border-light/60',
        'shadow-[0_8px_24px_-14px_rgba(0,0,0,0.15)]',
        'hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.28)] hover:-translate-y-1',
        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'animate-fade-in-up',
        isVisible && 'is-visible'
      )}
      style={{ animationDelay: `${(index + 2) * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-bg-secondary/40 group-hover:opacity-0 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/95 to-primary-700/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className={cn(
          'relative z-10 flex items-center justify-center',
          'w-12 h-12 rounded-xl mb-5 bg-gradient-to-br',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
          accentStyles[index % accentStyles.length],
          'transition-all duration-500'
        )}
      >
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>

      <h3 className="relative z-10 text-lg font-semibold text-text-primary group-hover:text-white mb-2 tracking-tight transition-colors duration-500">
        {title}
      </h3>

      <p className="relative z-10 text-sm text-text-secondary group-hover:text-white/85 leading-relaxed transition-colors duration-500">
        {description}
      </p>
    </div>
  );
}

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
    <section className="relative py-20 lg:py-32 overflow-hidden bg-bg-secondary" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary-100/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent-100/40 to-transparent" />
      </div>

      <SiteContainer>
        <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left sticky header - 5 cols */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p
              className={cn(
                'text-sm font-medium text-primary-500 uppercase tracking-wider mb-4',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
            >
              {t('title')}
            </p>
            <h2
              className={cn(
                'text-3xl lg:text-5xl font-bold text-text-primary tracking-tighter leading-none mb-6',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '80ms' }}
            >
              {t('subtitle')}
            </h2>
            <p
              className={cn(
                'text-base lg:text-lg text-text-secondary max-w-[45ch] mb-6',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '120ms' }}
            >
              Each pillar combines product quality, brand impact, and reliable delivery to help businesses scale confidently.
            </p>
            <div
              className={cn(
                'w-16 h-1 bg-primary-500 rounded-full',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '160ms' }}
            />
          </div>

          {/* Right pillars grid - 7 cols, 2x2 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <PillarBlock
                key={pillar.title}
                {...pillar}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
