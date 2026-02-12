'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { StatCounter } from '@/components/content/StatCounter';

export function AboutContent() {
  const t = useTranslations('about');

  const stats = [
    { value: 1000000, labelKey: 'stats.cups', suffix: '+' },
    { value: 500, labelKey: 'stats.clients', suffix: '+' },
    { value: 10, labelKey: 'stats.years', suffix: '+' },
    { value: 15, labelKey: 'stats.countries', suffix: '+' },
  ];

  return (
    <RootLayout>
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-text-primary mb-4">{t('story.title')}</h2>
          <p className="text-text-secondary">{t('story.content')}</p>
        </div>
      </section>

      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t('mission.title')}</h2>
            <p className="text-text-secondary">{t('mission.content')}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t('vision.title')}</h2>
            <p className="text-text-secondary">{t('vision.content')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">{t('values.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(['quality', 'innovation', 'sustainability', 'customer'] as const).map((key) => (
              <div key={key} className="bg-bg-secondary rounded-xl p-6 text-center">
                <p className="font-semibold text-text-primary">{t(`values.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map(({ value, labelKey, suffix }) => (
              <StatCounter
                key={labelKey}
                value={value}
                label={t(labelKey)}
                suffix={suffix}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <Button variant="accent" size="lg" asChild>
            <Link href="/contact">{t('cta.button')}</Link>
          </Button>
        </div>
      </section>
    </RootLayout>
  );
}
