import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProductCategoryCard } from '@/components/products/ProductCategoryCard';
import { CrossSellBanner } from '@/components/products/CrossSellBanner';
import { CompatibilityChart } from '@/components/products/CompatibilityChart';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('accessories.title'),
    description: t('accessories.description'),
    openGraph: {
      title: t('accessories.title'),
      description: t('accessories.description'),
      images: [{ url: '/og/accessories.jpg', width: 1200, height: 630 }],
    },
  };
}

const accessoryCategories = [
  {
    image: '/images/products/lids-collection.webp',
    imageAlt: 'Collection of cup lids including flat, dome, and sip lids',
    title: 'Cup Lids',
    description:
      'Flat lids, dome lids, sip lids, and eco-friendly paper lids. Available in multiple sizes to fit our cup range.',
    href: '#lids',
    ctaText: 'View Lids',
  },
  {
    image: '/images/products/sleeves-collection.webp',
    imageAlt: 'Insulating cup sleeves in various designs',
    title: 'Cup Sleeves',
    description:
      'Insulating sleeves to protect hands from hot beverages. Available plain or custom printed with your branding.',
    href: '#sleeves',
    ctaText: 'View Sleeves',
  },
  {
    image: '/images/products/carriers-collection.webp',
    imageAlt: 'Two-cup and four-cup cardboard carriers',
    title: 'Cup Carriers',
    description:
      'Sturdy cardboard carriers for 2 or 4 cups. Perfect for takeaway orders and delivery services.',
    href: '#carriers',
    ctaText: 'View Carriers',
  },
  {
    image: '/images/products/stirrers-collection.webp',
    imageAlt: 'Wooden and paper stirrers and straws',
    title: 'Stirrers & Straws',
    description:
      'Eco-friendly wooden stirrers and paper straws. Sustainable alternatives to plastic.',
    href: '#stirrers',
    ctaText: 'View Stirrers',
  },
];

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

export default async function AccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
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
              { label: 'Accessories' },
            ]}
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Cup Accessories
            </h1>
            <p className="text-lg text-text-secondary max-w-[640px] mx-auto lg:mx-0">
              Everything you need to complete your branded cup experience — lids,
              sleeves, carriers, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Accessory Category Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessoryCategories.map((category, index) => (
              <ProductCategoryCard
                key={category.title}
                {...category}
                className="animate-fade-in-up is-visible"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lid Types Section */}
      <section id="lids" className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Lid Options
            </h2>
            <p className="text-text-secondary">
              Choose the right lid for your beverage and brand values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lidTypes.map((lid) => (
              <div
                key={lid.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-border-light"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {lid.name}
                </h3>
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

      {/* Sleeves Section */}
      <section id="sleeves" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                Insulating Cup Sleeves
              </h2>
              <p className="text-text-secondary mb-6">
                Protect your customers&apos; hands while extending your brand presence.
                Our sleeves are available in standard kraft or custom printed designs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">Standard Kraft:</strong> Natural
                    brown cardboard, eco-friendly and cost-effective
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">White Sleeves:</strong> Clean
                    canvas for vibrant full-color printing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">Custom Printed:</strong> Your
                    logo, messaging, or seasonal designs
                  </span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center">
              <span className="text-primary-300 text-lg">Sleeve Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Carriers Section */}
      <section id="carriers" className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 aspect-video bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center">
              <span className="text-primary-300 text-lg">Carrier Image</span>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                Cup Carriers
              </h2>
              <p className="text-text-secondary mb-6">
                Sturdy cardboard carriers make takeaway and delivery a breeze.
                Available in 2-cup and 4-cup configurations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">2</div>
                  <div className="text-sm text-text-muted">Cup Carrier</div>
                  <div className="text-xs text-text-secondary mt-2">
                    Fits 4oz - 16oz cups
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">4</div>
                  <div className="text-sm text-text-muted">Cup Carrier</div>
                  <div className="text-xs text-text-secondary mt-2">
                    Fits 4oz - 22oz cups
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stirrers Section */}
      <section id="stirrers" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Stirrers & Straws
            </h2>
            <p className="text-text-secondary mb-8">
              Complete your sustainable packaging lineup with eco-friendly stirrers
              and straws. All our options are plastic-free and biodegradable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-bg-secondary rounded-lg p-6">
                <h3 className="font-semibold text-text-primary mb-2">Wooden Stirrers</h3>
                <p className="text-sm text-text-secondary">
                  Birch wood, individually wrapped or bulk packed
                </p>
              </div>
              <div className="bg-bg-secondary rounded-lg p-6">
                <h3 className="font-semibold text-text-primary mb-2">Paper Straws</h3>
                <p className="text-sm text-text-secondary">
                  FSC-certified, multiple colors and patterns available
                </p>
              </div>
              <div className="bg-bg-secondary rounded-lg p-6">
                <h3 className="font-semibold text-text-primary mb-2">PLA Straws</h3>
                <p className="text-sm text-text-secondary">
                  Plant-based, industrially compostable
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Chart */}
      <CompatibilityChart />

      {/* Cross-Sell Banner */}
      <CrossSellBanner
        heading="Bundle Your Order"
        text="Order cups, lids, and sleeves together for simplified logistics and potential savings."
        ctaText="Get a Bundle Quote"
        ctaHref="/get-a-quote"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cup Accessories',
            description:
              'Lids, sleeves, carriers, and stirrers to complement your branded paper cups.',
            brand: {
              '@type': 'Brand',
              name: 'Xerostop Cups',
            },
            category: 'Food Packaging Accessories',
          }),
        }}
      />
    </RootLayout>
  );
}
