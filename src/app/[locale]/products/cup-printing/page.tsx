import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  Printer,
  Stamp,
  Image as ImageIcon,
  Palette,
  MessageSquare,
  Brush,
  FileText,
  RotateCw,
  Check,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProcessTimeline } from '@/components/products/ProcessTimeline';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('cupPrinting.title'),
    description: t('cupPrinting.description'),
    openGraph: {
      title: t('cupPrinting.title'),
      description: t('cupPrinting.description'),
      images: [{ url: '/og/cup-printing.jpg', width: 1200, height: 630 }],
    },
  };
}

const printingMethods = [
  {
    icon: Printer,
    title: 'Offset Printing',
    description:
      'High-resolution printing with photographic quality. Ideal for detailed logos, gradients, and multi-color designs. Uses CMYK color model.',
    bestFor: 'Complex designs, gradients, photo-realistic images',
    colors: 'Full CMYK (unlimited)',
    moq: '5,000 pcs',
    features: [
      'Photographic quality reproduction',
      'Smooth gradient transitions',
      'Precise color matching',
      'Best for intricate designs',
    ],
    image: '/images/products/offset-printing.webp',
  },
  {
    icon: Stamp,
    title: 'Flexographic Printing',
    description:
      'Cost-effective printing for simpler designs using flexible relief plates. Great for solid colors, text, and simple logos.',
    bestFor: 'Solid colors, text-heavy designs, large runs',
    colors: '1-4 spot colors',
    moq: '1,000 pcs',
    features: [
      'Most cost-effective option',
      'Vibrant solid colors',
      'Fast production times',
      'Lower minimum quantities',
    ],
    image: '/images/products/flexo-printing.webp',
  },
];

const printableItems = [
  {
    icon: ImageIcon,
    title: 'Company Logo',
    description: 'Your logo in full color, perfectly positioned',
  },
  {
    icon: Palette,
    title: 'Brand Colors',
    description: 'Match your exact brand colors using Pantone or CMYK',
  },
  {
    icon: MessageSquare,
    title: 'Marketing Messages',
    description: 'Promotions, taglines, QR codes, social handles',
  },
  {
    icon: Brush,
    title: 'Patterns & Artwork',
    description: 'Custom patterns, illustrations, seasonal designs',
  },
  {
    icon: FileText,
    title: 'Regulatory Info',
    description: 'Food safety marks, recycling symbols, barcodes',
  },
  {
    icon: RotateCw,
    title: 'Full Wrap Design',
    description: '360° coverage — design wraps around the entire cup',
  },
];

const turnaroundData = [
  { quantity: '1,000-5,000', offset: 'N/A (min 5,000)', flexo: '7-10 business days' },
  { quantity: '5,000-10,000', offset: '10-14 business days', flexo: '7-10 business days' },
  { quantity: '10,000-50,000', offset: '12-18 business days', flexo: '10-14 business days' },
  { quantity: '50,000+', offset: '18-25 business days', flexo: '14-18 business days' },
];

export default async function CupPrintingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: 'Products', href: '/products' },
              { label: 'Cup Printing' },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Custom Cup Printing
            </h1>
            <p className="text-lg text-text-secondary">
              Transform plain cups into powerful brand touchpoints. We offer full-color
              printing using offset and flexographic methods, with free design support
              for every order.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="relative aspect-[3/1] lg:aspect-[4/1] rounded-xl overflow-hidden bg-primary-100">
            <Image
              src="/images/products/cup-printing-hero.webp"
              alt="Custom printed cups being produced in the printing facility"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Printing Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
            Our Printing Methods
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {printingMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="rounded-xl border border-border-light bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Method Image */}
                  <div className="relative aspect-video bg-primary-50">
                    <Image
                      src={method.image}
                      alt={`${method.title} process`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">
                          {method.title}
                        </h3>
                        <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-accent-50 text-accent-700 rounded-full">
                          Best for: {method.bestFor}
                        </span>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4">{method.description}</p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-medium text-text-primary">Colors:</span>{' '}
                        <span className="text-text-secondary">{method.colors}</span>
                      </div>
                      <div>
                        <span className="font-medium text-text-primary">MOQ:</span>{' '}
                        <span className="text-text-secondary">{method.moq}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2">
                      {method.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-success flex-shrink-0" />
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Can Be Printed */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
            What You Can Print on Your Cups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {printableItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{item.title}</h4>
                    <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Turnaround Table */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2 text-center">
            Turnaround Times
          </h2>
          <p className="text-text-secondary text-center mb-8">
            Estimated production times from design approval to ready for dispatch.
          </p>

          <div
            role="region"
            aria-label="Turnaround times table"
            tabIndex={0}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[500px] border-collapse bg-white rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr className="bg-primary-500 text-white">
                  <th scope="col" className="p-4 text-left text-sm font-semibold">
                    Quantity
                  </th>
                  <th scope="col" className="p-4 text-center text-sm font-semibold">
                    Offset Printing
                  </th>
                  <th scope="col" className="p-4 text-center text-sm font-semibold">
                    Flexo Printing
                  </th>
                </tr>
              </thead>
              <tbody>
                {turnaroundData.map((row, index) => (
                  <tr
                    key={row.quantity}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <th
                      scope="row"
                      className="p-4 text-left text-sm font-medium text-text-primary border-b border-border-light"
                    >
                      {row.quantity}
                    </th>
                    <td className="p-4 text-center text-sm text-text-secondary border-b border-border-light">
                      {row.offset}
                    </td>
                    <td className="p-4 text-center text-sm text-text-secondary border-b border-border-light">
                      {row.flexo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-text-muted text-center mt-4">
            Need it faster?{' '}
            <Link href="/contact" className="text-primary-600 hover:underline">
              Contact us about rush orders
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Design Support CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Need Help with Your Design?
              </h3>
              <p className="text-text-secondary mb-6">
                Our in-house design team can help you create the perfect cup design —
                from scratch or based on your existing branding. This service is free
                with every printing order.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/design-support">
                  Learn About Design Support
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-primary-100">
              <Image
                src="/images/products/design-support.webp"
                alt="Designer working on cup design mockup"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Print Your Brand?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Get started with a free quote and see your design come to life.
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
                <Link href="/gallery">View Gallery</Link>
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
            '@type': 'Service',
            name: 'Custom Cup Printing',
            provider: {
              '@type': 'Organization',
              name: 'Xerostop Cups',
            },
            description:
              'Full-color custom printing on paper cups using offset and flexographic methods.',
          }),
        }}
      />
    </RootLayout>
  );
}
