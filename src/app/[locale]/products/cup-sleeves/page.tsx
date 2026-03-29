import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CrossSellBanner } from '@/components/products/CrossSellBanner';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('cupSleeves.title'),
    description: t('cupSleeves.description'),
    openGraph: {
      title: t('cupSleeves.title'),
      description: t('cupSleeves.description'),
      images: [{ url: '/og/cup-sleeves', width: 1200, height: 630 }],
    },
  };
}

export default async function CupSleevesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.cupSleeves' });
  const tNav = await getTranslations({ locale, namespace: 'nav.products' });
  const tPage = await getTranslations({ locale, namespace: 'products.cupSleevesPage' });
  const isRTL = locale === 'ar';
  const sleeveTypes = [
    {
      name: tPage('types.kraft.name'),
      description: tPage('types.kraft.description'),
      features: [tPage('types.kraft.feature1'), tPage('types.kraft.feature2'), tPage('types.kraft.feature3')],
    },
    {
      name: tPage('types.white.name'),
      description: tPage('types.white.description'),
      features: [tPage('types.white.feature1'), tPage('types.white.feature2'), tPage('types.white.feature3')],
    },
    {
      name: tPage('types.custom.name'),
      description: tPage('types.custom.description'),
      features: [tPage('types.custom.feature1'), tPage('types.custom.feature2'), tPage('types.custom.feature3')],
    },
  ];

  const keyFeatures = [
    {
      title: t('customSection.features.item1.title'),
      description: t('customSection.features.item1.description'),
    },
    {
      title: t('customSection.features.item2.title'),
      description: t('customSection.features.item2.description'),
    },
    {
      title: t('customSection.features.item3.title'),
      description: t('customSection.features.item3.description'),
    },
    {
      title: t('customSection.features.item4.title'),
      description: t('customSection.features.item4.description'),
    },
    {
      title: t('customSection.features.item5.title'),
      description: t('customSection.features.item5.description'),
    },
  ];

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: tNav('label'), href: '/products' },
              { label: tNav('cupSleeves') },
            ]}
          />
          <div className="text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Sleeve Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sleeveTypes.map((sleeve) => (
              <div
                key={sleeve.name}
                className="bg-bg-secondary rounded-xl p-6 border border-border-light animate-fade-in-up is-visible"
              >
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  {sleeve.name}
                </h2>
                <p className="text-text-secondary text-sm mb-4">
                  {sleeve.description}
                </p>
                <ul className="space-y-2">
                  {sleeve.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Paper Cup Sleeves Content */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                {t('customSection.heading')}
              </h2>
              <p className="text-text-secondary text-base lg:text-lg leading-relaxed mb-8">
                {t('customSection.description')}
              </p>

              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {t('customSection.keyFeaturesHeading')}
              </h3>

              <ul className="space-y-4">
                {keyFeatures.map((feature) => (
                  <li
                    key={feature.title}
                    className="flex items-start gap-3 text-text-secondary"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-500 mt-2.5 shrink-0" />
                    <div>
                      <span className="font-medium text-text-primary">{feature.title}:</span>{' '}
                      <span>{feature.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full max-w-[520px] mx-auto lg:mx-0">
              {/* Stacked images (top/bottom) so the layout matches the text width */}
              <div className="rounded-2xl border border-border-light bg-bg-secondary p-3 sm:p-4 shadow-sm space-y-3 sm:space-y-4">
                <div className="rounded-xl overflow-hidden border border-border-light bg-white">
                  <Image
                    src="/images/products/CupSleeves/cup_sleeves.webp"
                    alt={t('customSection.imageAlt1')}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                </div>

                <div className="rounded-xl overflow-hidden border border-border-light bg-white">
                  <Image
                    src="/images/products/CupSleeves/cup_sleeves1.webp"
                    alt={t('customSection.imageAlt2')}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sleeves CTA */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-text-secondary mb-6">
              {t('cta.description')}
            </p>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />} asChild>
              <Link href="/get-a-quote">{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cross-Sell */}
      <CrossSellBanner
        heading={t('crossSell.heading')}
        text={t('crossSell.text')}
        ctaText={t('crossSell.cta')}
        ctaHref="/products/accessories"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cup Sleeves',
            description:
              'Insulated cup sleeves in kraft, white, or custom printed. Protect hands and promote your brand.',
            brand: { '@type': 'Brand', name: 'Royal Pack' },
            category: 'Food Packaging',
          }),
        }}
      />
    </RootLayout>
  );
}

