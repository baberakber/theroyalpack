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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('paperCups.title'),
    description: t('paperCups.description'),
    openGraph: {
      title: t('paperCups.title'),
      description: t('paperCups.description'),
      images: [{ url: '/og/paper-cups.jpg', width: 1200, height: 630 }],
    },
  };
}

const cupTypes = [
  {
    image: '/images/products/single-wall-cup.webp',
    imageAlt: 'Single-wall paper cup',
    title: 'Single-Wall Cups',
    tagline: 'Light & economical',
    bestFor: ['Cold drinks', 'Water coolers', 'Short-serve hot drinks'],
    priceIndicator: '$' as const,
    cupType: 'single-wall',
  },
  {
    image: '/images/products/double-wall-cup.webp',
    imageAlt: 'Double-wall paper cup',
    title: 'Double-Wall Cups',
    tagline: 'Insulated for comfort',
    bestFor: ['Hot drinks', 'No sleeve needed', 'Premium feel'],
    priceIndicator: '$$' as const,
    cupType: 'double-wall',
  },
  {
    image: '/images/products/ripple-wall-cup.webp',
    imageAlt: 'Ripple-wall paper cup',
    title: 'Ripple-Wall Cups',
    tagline: 'Maximum insulation & grip',
    bestFor: ['Hot drinks', 'Food trucks', 'Premium cafes'],
    priceIndicator: '$$$' as const,
    cupType: 'ripple-wall',
  },
];

export default async function PaperCupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: 'Products', href: '/products' },
              { label: 'Paper Cups' },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Paper Cups
            </h1>
            <p className="text-lg text-text-secondary">
              We manufacture three types of paper cups to suit every need — from
              budget-friendly single-wall cups to premium ripple-wall insulated cups.
              All food-safe, all customizable.
            </p>
          </div>
        </div>
      </section>

      {/* Cup Types Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
            Choose Your Cup Type
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
        </div>
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
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
            Complete Your Order
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Custom Printing Card */}
            <div className="rounded-xl border border-border-light bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Add Custom Printing
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    Put your logo and brand colors on every cup with our full-color
                    printing services.
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/products/cup-printing">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Accessories Card */}
            <div className="rounded-xl border border-border-light bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
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
                    Add Lids & Accessories
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    Complete your setup with matching lids, sleeves, stirrers, and
                    carriers.
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/products/accessories">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Order Paper Cups?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Get a free quote tailored to your needs, or request samples to see
              the quality firsthand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link href="/get-a-quote">Get a Quote</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10"
                asChild
              >
                <Link href="/contact?type=sample">Request a Free Sample</Link>
              </Button>
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
            '@type': 'Product',
            name: 'Paper Cups',
            description:
              'Custom paper cups available in single-wall, double-wall, and ripple-wall configurations.',
            brand: {
              '@type': 'Brand',
              name: 'Xerostop Cups',
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
