import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CrossSellBanner } from '@/components/products/CrossSellBanner';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('cupSleeves.title'),
    description: t('cupSleeves.description'),
    openGraph: {
      title: t('cupSleeves.title'),
      description: t('cupSleeves.description'),
      images: [{ url: '/og/cup-sleeves.jpg', width: 1200, height: 630 }],
    },
  };
}

const sleeveTypes = [
  {
    name: 'Standard Kraft',
    description:
      'Natural brown cardboard sleeves. Eco-friendly, cost-effective, and a classic look that suits any brand.',
    features: ['FSC-certified paper', 'Recyclable', 'Fits 8oz–22oz cups'],
  },
  {
    name: 'White Sleeves',
    description:
      'Clean white canvas for vibrant full-color printing. Make your logo and designs stand out.',
    features: ['Bright white stock', 'Full-color print', 'Premium finish'],
  },
  {
    name: 'Custom Printed',
    description:
      'Your logo, messaging, or seasonal designs. We handle the printing so your brand stays consistent.',
    features: ['Your artwork', 'Spot or full color', 'Low minimums'],
  },
];

export default async function CupSleevesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.cupSleeves' });
  const tNav = await getTranslations({ locale, namespace: 'nav.products' });

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
            {sleeveTypes.map((sleeve, index) => (
              <div
                key={sleeve.name}
                className="bg-bg-secondary rounded-xl p-6 border border-border-light animate-fade-in-up is-visible"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
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

      {/* Why Sleeves CTA */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-text-secondary mb-6">
              {t('cta.description')}
            </p>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
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
            brand: { '@type': 'Brand', name: 'Xerostop Cups' },
            category: 'Food Packaging',
          }),
        }}
      />
    </RootLayout>
  );
}
