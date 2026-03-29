import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { QuoteForm, QuoteSidebar } from '@/components/forms/QuoteForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('quote.title'),
    description: t('quote.description'),
    openGraph: {
      title: t('quote.title'),
      description: t('quote.description'),
      images: [{ url: '/og/quote', width: 1200, height: 630 }],
    },
  };
}

interface QuotePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    cupType?: string;
    size?: string;
    industry?: string;
    eco?: string;
  }>;
}

export default async function GetAQuotePage({ params, searchParams }: QuotePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const paramsResolved = await searchParams;
  const t = await getTranslations({ locale, namespace: 'quote' });

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="text-center lg:text-left max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3">
              {t('title')}
            </h1>
            <p className="text-text-secondary">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 md:p-8">
                <QuoteForm
                  defaultCupType={paramsResolved.cupType}
                  defaultSize={paramsResolved.size}
                  defaultIndustry={paramsResolved.industry}
                  defaultEco={paramsResolved.eco === 'true'}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <QuoteSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-text-muted">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">24hr</div>
              <div className="text-sm text-text-muted">Quote Response</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">1,000</div>
              <div className="text-sm text-text-muted">Min Order</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">Free</div>
              <div className="text-sm text-text-muted">Design Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Get a Quote for Custom Paper Cups',
            description:
              'Request a free quote for custom printed paper cups from Royal Pack.',
            mainEntity: {
              '@type': 'Service',
              name: 'Custom Paper Cup Manufacturing',
              provider: {
                '@type': 'Organization',
                name: 'Royal Pack',
              },
            },
          }),
        }}
      />
    </RootLayout>
  );
}

