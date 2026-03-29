'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { StatCounter } from '@/components/content/StatCounter';
import { SiteContainer } from '@/components/layout/SiteContainer';

type StoryKey = 'story' | 'mission' | 'vision';

function AboutImageBlock({
  src,
  alt,
  fit = 'cover',
  priority,
}: {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
  priority?: boolean;
}) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-border-light bg-bg-secondary">
      <Image
        src={src}
        alt={alt}
        fill
        className={fit === 'contain' ? 'object-contain p-2' : 'object-cover'}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
}

function AboutTextBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-4 md:py-2">
      <h2 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">{title}</h2>
      <p className="text-text-secondary text-base lg:text-lg leading-relaxed">{body}</p>
    </div>
  );
}

export function AboutContent() {
  const t = useTranslations('about');

  const stats = [
    { value: 1000000, labelKey: 'stats.cups', suffix: '+' },
    { value: 500, labelKey: 'stats.clients', suffix: '+' },
    { value: 10, labelKey: 'stats.years', suffix: '+' },
    { value: 15, labelKey: 'stats.countries', suffix: '+' },
  ];

  const rows: {
    key: StoryKey;
    imageSrc: string;
    imageFirst: boolean;
    imageFit?: 'cover' | 'contain';
  }[] = [
    {
      key: 'story',
      imageSrc: '/images/products/About/Story.webp',
      imageFirst: true,
      imageFit: 'contain',
    },
    {
      key: 'mission',
      imageSrc: '/images/products/About/mission.webp',
      imageFirst: false,
      imageFit: 'contain',
    },
    {
      key: 'vision',
      imageSrc: '/images/Gallary/21.webp',
      imageFirst: true,
    },
  ];

  return (
    <RootLayout>
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <SiteContainer>
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">{t('title')}</h1>
            <p className="text-lg text-text-secondary">{t('subtitle')}</p>
          </div>
        </SiteContainer>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <SiteContainer className="space-y-16 lg:space-y-24">
          {rows.map(({ key, imageSrc, imageFirst, imageFit }, index) => {
            const text = (
              <AboutTextBlock
                title={t(`${key}.title`)}
                body={t(`${key}.content`)}
              />
            );
            const image = (
              <AboutImageBlock
                src={imageSrc}
                alt={t(`${key}.imageAlt`)}
                fit={imageFit}
                priority={index === 0}
              />
            );

            return (
              <div
                key={key}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center"
              >
                {imageFirst ? (
                  <>
                    {image}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {image}
                  </>
                )}
              </div>
            );
          })}
        </SiteContainer>
      </section>

      <section className="py-16 bg-bg-secondary">
        <SiteContainer>
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">{t('values.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(['quality', 'innovation', 'sustainability', 'customer'] as const).map((valueKey) => (
              <div key={valueKey} className="bg-white rounded-xl p-6 text-center shadow-sm border border-border-light">
                <p className="font-semibold text-text-primary">{t(`values.${valueKey}`)}</p>
              </div>
            ))}
          </div>
        </SiteContainer>
      </section>

      <section className="py-16 bg-primary-600">
        <SiteContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map(({ value, labelKey, suffix }) => (
              <StatCounter key={labelKey} value={value} label={t(labelKey)} suffix={suffix} />
            ))}
          </div>
        </SiteContainer>
      </section>

      <section className="py-16 bg-primary-500">
        <SiteContainer className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <Button variant="accent" size="lg" asChild>
            <Link href="/contact">{t('cta.button')}</Link>
          </Button>
        </SiteContainer>
      </section>
    </RootLayout>
  );
}
