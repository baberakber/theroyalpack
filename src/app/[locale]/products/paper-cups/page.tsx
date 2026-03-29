import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, FileText } from 'lucide-react';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CupTypeCard } from '@/components/products/CupTypeCard';
import { SizeGuide } from '@/components/products/SizeGuide';
import { SpecsTable } from '@/components/products/SpecsTable';
import { ComparisonTable } from '@/components/products/ComparisonTable';
import { SizeRecommender } from '@/components/products/SizeRecommender';
import { Button } from '@/components/ui/Button';
import { listPublicImages } from '@/lib/publicImages';
import { SiteContainer } from '@/components/layout/SiteContainer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('paperCups.title'),
    description: t('paperCups.description'),
    openGraph: {
      title: t('paperCups.title'),
      description: t('paperCups.description'),
      images: [{ url: '/og/paper-cups', width: 1200, height: 630 }],
    },
  };
}

export default async function PaperCupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products' });
  const tNav = await getTranslations({ locale, namespace: 'nav.products' });
  const isRTL = locale === 'ar';
  const cupTypes = [
    {
      image: '/images/products/Single%20Wall%20Cups/25.webp',
      imageAlt: t('paperCupsPage.cupTypes.singleWall.imageAlt'),
      title: t('paperCupsPage.cupTypes.singleWall.title'),
      tagline: t('paperCupsPage.cupTypes.singleWall.tagline'),
      bestFor: [
        t('paperCupsPage.cupTypes.singleWall.bestFor1'),
        t('paperCupsPage.cupTypes.singleWall.bestFor2'),
        t('paperCupsPage.cupTypes.singleWall.bestFor3'),
      ],
      priceIndicator: '$' as const,
      cupType: 'single-wall',
    },
    {
      image: listPublicImages('images/products/Double Wall Cups')[0] ?? '/images/products/double-wall-paper-cups.webp',
      imageAlt: t('paperCupsPage.cupTypes.doubleWall.imageAlt'),
      title: t('paperCupsPage.cupTypes.doubleWall.title'),
      tagline: t('paperCupsPage.cupTypes.doubleWall.tagline'),
      bestFor: [
        t('paperCupsPage.cupTypes.doubleWall.bestFor1'),
        t('paperCupsPage.cupTypes.doubleWall.bestFor2'),
        t('paperCupsPage.cupTypes.doubleWall.bestFor3'),
      ],
      priceIndicator: '$$' as const,
      cupType: 'double-wall',
    },
    {
      image: listPublicImages('images/products/Ripple Wall Cups')[0] ?? '/images/products/Ripple-Wall-Paper-Cups-Coffee-Cups.webp',
      imageAlt: t('paperCupsPage.cupTypes.rippleWall.imageAlt'),
      title: t('paperCupsPage.cupTypes.rippleWall.title'),
      tagline: t('paperCupsPage.cupTypes.rippleWall.tagline'),
      bestFor: [
        t('paperCupsPage.cupTypes.rippleWall.bestFor1'),
        t('paperCupsPage.cupTypes.rippleWall.bestFor2'),
        t('paperCupsPage.cupTypes.rippleWall.bestFor3'),
      ],
      priceIndicator: '$$$' as const,
      cupType: 'ripple-wall',
    },
  ];
  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <SiteContainer>
          <Breadcrumb
            items={[
              { label: tNav('label'), href: '/products' },
              { label: tNav('paperCups') },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('paperCups.title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('paperCupsPage.headerDescription')}
            </p>
          </div>
        </SiteContainer>
      </section>

      {/* Cup Types Overview */}
      <section className="py-16 bg-white">
        <SiteContainer>
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
            {t('paperCupsPage.chooseTypeTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cupTypes.map((cup, index) => (
              <CupTypeCard
                key={cup.cupType}
                {...cup}
                className="animate-fade-in-up is-visible"
                style={{ animationDelay: `${index * 150}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </SiteContainer>
      </section>

      {/* Size Guide */}
      <SizeGuide />

      {/* Specifications Table */}
      <SpecsTable />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Size Recommender */}
      <SizeRecommender />

      {/* Cross-Sell Section */}
      <section className="py-16 bg-white">
        <SiteContainer>
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
            {t('paperCupsPage.crossSellTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Custom Printing Card */}
            <div className="rounded-xl border border-border-light bg-white p-6 shadow-md hover:shadow-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {t('paperCupsPage.printingCardTitle')}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {t('paperCupsPage.printingCardDescription')}
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/products/custom-printing">
                      {t('commonLabels.learnMore')} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : 'ml-1'}`} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Accessories Card */}
            <div className="rounded-xl border border-border-light bg-white p-6 shadow-md hover:shadow-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-accent-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {t('paperCupsPage.accessoriesCardTitle')}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {t('paperCupsPage.accessoriesCardDescription')}
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/products/accessories">
                      {t('commonLabels.learnMore')} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : 'ml-1'}`} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SiteContainer>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600">
        <SiteContainer>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('paperCupsPage.ctaTitle')}
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              {t('paperCupsPage.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />}
                asChild
              >
                <Link href="/get-a-quote">{t('commonLabels.getQuote')}</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10"
                asChild
              >
                <Link href="/contact?type=sample">{t('paperCupsPage.sampleButton')}</Link>
              </Button>
            </div>
          </div>
        </SiteContainer>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Paper Cups',
            description:
              'Custom paper cups available in single-wall, double-wall, and ripple-wall configurations.',
            brand: {
              '@type': 'Brand',
              name: 'Royal Pack',
            },
            offers: {
              '@type': 'AggregateOffer',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </RootLayout>
  );
}

