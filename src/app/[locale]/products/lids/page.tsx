import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CrossSellBanner } from '@/components/products/CrossSellBanner';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const lidTypes = [
  {
    name: 'Flat Lids',
    description: 'Classic flat lids with sip hole. Ideal for hot drinks.',
    sizes: '8oz - 22oz',
    material: 'PP or CPLA (compostable)',
  },
  {
    name: 'Dome Lids',
    description: 'Extra headroom for whipped cream and toppings.',
    sizes: '12oz - 22oz',
    material: 'PP or PET',
  },
  {
    name: 'Sip Lids',
    description: 'Integrated sip opening, no straw needed.',
    sizes: '8oz - 16oz',
    material: 'PP',
  },
  {
    name: 'Paper Lids',
    description: '100% recyclable paper lids for eco-conscious brands.',
    sizes: '8oz - 16oz',
    material: 'FSC-certified paper',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: tMeta('lids.title'),
    description: tMeta('lids.description'),
    openGraph: {
      title: tMeta('lids.title'),
      description: tMeta('lids.description'),
      images: [{ url: '/og/lids.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function LidsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.lids' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: tNav('products.label'), href: '/products' },
              { label: tNav('products.lids') },
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

      {/* Lid Types */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lidTypes.map((lid, index) => (
              <div
                key={lid.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-border-light animate-fade-in-up is-visible"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  {lid.name}
                </h2>
                <p className="text-text-secondary text-sm mb-4">
                  {lid.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Sizes:</span>
                    <span className="text-text-primary font-medium">{lid.sizes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Material:</span>
                    <span className="text-text-primary font-medium">{lid.material}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            {t('cta.heading')}
          </h2>
          <p className="text-text-secondary mb-6">
            {t('cta.description')}
          </p>
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            asChild
          >
            <Link href="/get-a-quote">{t('cta.button')}</Link>
          </Button>
        </div>
      </section>

      {/* Cross-sell */}
      <CrossSellBanner
        heading={t('crossSell.heading')}
        text={t('crossSell.text')}
        ctaText={t('crossSell.cta')}
        ctaHref="/products/accessories"
      />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cup Lids',
            description:
              'Flat, dome, sip, and paper lids compatible with a wide range of cup sizes.',
            brand: { '@type': 'Brand', name: 'Xerostop Cups' },
            category: 'Food Packaging',
          }),
        }}
      />
    </RootLayout>
  );
}

