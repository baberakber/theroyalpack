import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { IndustryDetailCard } from '@/components/industries';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('industries.title'),
    description: t('industries.description'),
    openGraph: {
      title: t('industries.title'),
      description: t('industries.description'),
      images: [{ url: '/og/industries', width: 1200, height: 630 }],
    },
  };
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'industries' });

  const industries = [
    {
      iconKey: 'coffee' as const,
      title: t('mainPage.cafes.title'),
      description: t('mainPage.cafes.description'),
      keyNeeds: [
        t('mainPage.cafes.keyNeeds.item1'),
        t('mainPage.cafes.keyNeeds.item2'),
        t('mainPage.cafes.keyNeeds.item3'),
        t('mainPage.cafes.keyNeeds.item4'),
      ],
      backgroundImage: '/images/industries/Cafee%20Shops.webp',
      backgroundAlt: 'Custom branded cups for cafes and coffee shops',
      ctaText: t('mainPage.cafes.ctaText'),
      ctaHref: '/get-a-quote?industry=cafes',
      size: 'full' as const,
    },
    {
      iconKey: 'utensils' as const,
      title: t('mainPage.restaurants.title'),
      description: t('mainPage.restaurants.description'),
      keyNeeds: [
        t('mainPage.restaurants.keyNeeds.item1'),
        t('mainPage.restaurants.keyNeeds.item2'),
        t('mainPage.restaurants.keyNeeds.item3'),
      ],
      backgroundImage: '/images/industries/Restuarants.webp',
      backgroundAlt: 'Restaurant takeaway and dine-in custom paper cups',
      ctaText: t('mainPage.restaurants.ctaText'),
      ctaHref: '/get-a-quote?industry=restaurants',
      size: 'half' as const,
    },
    {
      iconKey: 'hotel' as const,
      title: t('mainPage.hotels.title'),
      description: t('mainPage.hotels.description'),
      keyNeeds: [
        t('mainPage.hotels.keyNeeds.item1'),
        t('mainPage.hotels.keyNeeds.item2'),
        t('mainPage.hotels.keyNeeds.item3'),
      ],
      backgroundImage: '/images/industries/Hotels.webp',
      backgroundAlt: 'Hotel room service and hospitality paper cups',
      ctaText: t('mainPage.hotels.ctaText'),
      ctaHref: '/get-a-quote?industry=hotels',
      size: 'half' as const,
    },
    {
      iconKey: 'plane' as const,
      title: t('events.title'),
      description: t('events.description'),
      keyNeeds: [
        t('events.details.item1'),
        t('events.details.item2'),
        t('events.details.item3'),
      ],
      backgroundImage: '/images/industries/Events.webp',
      backgroundAlt: 'Custom event cups for exhibitions and catering',
      ctaText: t('events.cta.button'),
      ctaHref: '/get-a-quote?industry=events',
      size: 'half' as const,
    },
    {
      iconKey: 'building' as const,
      title: t('mainPage.corporate.title'),
      description: t('mainPage.corporate.description'),
      keyNeeds: [
        t('mainPage.corporate.keyNeeds.item1'),
        t('mainPage.corporate.keyNeeds.item2'),
        t('mainPage.corporate.keyNeeds.item3'),
      ],
      backgroundImage: '/images/industries/Corporate%20Conferences.webp',
      backgroundAlt: 'Corporate conference branded paper cups',
      ctaText: t('mainPage.corporate.ctaText'),
      ctaHref: '/get-a-quote?industry=corporate',
      size: 'full' as const,
    },
  ];

  return (
    <RootLayout>
      <main id="main-content">
        {/* Page Header */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[{ label: t('title') }]} />

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary max-w-[700px]">
              {t('description')}
            </p>
          </div>
        </section>

        {/* Industry Cards */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              {/* Row 1: Cafes (full) */}
              <IndustryDetailCard {...industries[0]} />

              {/* Row 2: Restaurants + Hotels (half each) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IndustryDetailCard {...industries[1]} />
                <IndustryDetailCard {...industries[2]} />
              </div>

              {/* Row 3: Events + Corporate */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IndustryDetailCard {...industries[3]} />
                <IndustryDetailCard {...industries[4]} />
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Industry CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              asChild
            >
              <Link href="/contact">{t('cta.button')}</Link>
            </Button>
          </div>
        </section>
      </main>
    </RootLayout>
  );
}
