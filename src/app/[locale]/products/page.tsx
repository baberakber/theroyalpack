import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProductCategoryCard } from '@/components/products/ProductCategoryCard';
import { CrossSellBanner } from '@/components/products/CrossSellBanner';
import { listPublicImages } from '@/lib/publicImages';
import { SiteContainer } from '@/components/layout/SiteContainer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('products.title'),
    description: t('products.description'),
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('products');

  const productCategories = [
    {
      image: listPublicImages('images/products/Double Wall Cups')[0]
        ?? listPublicImages('images/products/Single Wall Cups')[0]
        ?? listPublicImages('images/products/Ripple Wall Cups')[0]
        ?? '/images/products/double-wall-paper-cups.webp',
      imageAlt: t('paperCups.subtitle'),
      title: t('paperCups.title'),
      description: t('paperCups.description'),
      href: '/products/paper-cups',
      ctaText: t('cta.button'),
    },
    {
      image: '/images/products/printed-cups-showcase.webp',
      imageAlt: t('cupPrinting.subtitle'),
      title: t('cupPrinting.title'),
      description: t('cupPrinting.description'),
      href: '/products/custom-printing',
      ctaText: t('cta.button'),
    },
    {
      image: '/images/products/lids-accessories.webp',
      imageAlt: t('accessories.subtitle'),
      title: t('accessories.title'),
      description: t('accessories.description'),
      href: '/products/accessories',
      ctaText: t('cta.button'),
    },
  ];

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <SiteContainer>
          <Breadcrumb
            items={[{ label: t('title') }]}
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary max-w-[640px] mx-auto lg:mx-0">
              {t('subtitle')}
            </p>
          </div>
        </SiteContainer>
      </section>

      {/* Product Category Cards */}
      <section className="py-16 bg-white">
        <SiteContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <ProductCategoryCard
                key={category.title}
                {...category}
                className="animate-fade-in-up is-visible"
                style={{ animationDelay: `${index * 150}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </SiteContainer>
      </section>

      {/* Cross-Sell Banner */}
      <CrossSellBanner
        heading={t('cta.title')}
        text={t('cta.description')}
        ctaText={t('cta.button')}
        ctaHref="/get-a-quote"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Royal Pack Products',
            description:
              'Paper cups, custom printing, and accessories for branded takeaway experiences.',
            hasPart: [
              {
                '@type': 'Product',
                name: 'Paper Cups',
                url: '/products/paper-cups',
              },
              {
                '@type': 'Product',
                name: 'Custom Cup Printing',
                url: '/products/custom-printing',
              },
              {
                '@type': 'Product',
                name: 'Cup Accessories',
                url: '/products/accessories',
              },
            ],
          }),
        }}
      />
    </RootLayout>
  );
}

