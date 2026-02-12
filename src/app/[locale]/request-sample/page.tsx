import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SampleRequestForm, SampleSidebar } from '@/components/forms/SampleRequestForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('sample.title'),
    description: t('sample.description'),
    openGraph: {
      title: t('sample.title'),
      description: t('sample.description'),
      images: [{ url: '/og/sample.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function RequestSamplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'sample' });

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
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sample Request Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 md:p-8">
                <SampleRequestForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SampleSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            Sample Kit FAQs
          </h2>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5">
              <h3 className="font-medium text-text-primary mb-2">
                What is included in the sample kit?
              </h3>
              <p className="text-sm text-text-secondary">
                Our standard sample kit includes a selection of single-wall, double-wall,
                and ripple-wall cups in your preferred sizes. We also include a product
                specification sheet and examples of printed cups when available.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5">
              <h3 className="font-medium text-text-primary mb-2">
                Is there any cost for the sample kit?
              </h3>
              <p className="text-sm text-text-secondary">
                Standard sample kits are free of charge, including shipping within the
                UAE and GCC. For custom printed samples, there is a nominal fee that
                can be credited toward your first order.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5">
              <h3 className="font-medium text-text-primary mb-2">
                How long does delivery take?
              </h3>
              <p className="text-sm text-text-secondary">
                Sample kits are typically shipped within 3-5 business days. UAE
                deliveries usually arrive within 1-2 business days after shipping.
                GCC deliveries may take 3-5 business days.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5">
              <h3 className="font-medium text-text-primary mb-2">
                Can I request specific cup types or sizes?
              </h3>
              <p className="text-sm text-text-secondary">
                Yes! Use the preferences section in the form to tell us exactly what
                you are looking for. We will do our best to include the specific cups
                you want to evaluate.
              </p>
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
            name: 'Request Free Paper Cup Samples',
            description:
              'Request a free sample kit of paper cups from Xerostop Cups.',
            mainEntity: {
              '@type': 'Offer',
              name: 'Free Paper Cup Sample Kit',
              price: '0',
              priceCurrency: 'AED',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Xerostop Cups',
              },
            },
          }),
        }}
      />
    </RootLayout>
  );
}
