import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'industries' });
  const title = t('restaurants.title');
  const description = t('restaurants.description');

  return {
    title: `${title} | Royal Pack`,
    description,
    openGraph: {
      title: `${title} | Royal Pack`,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [{ url: `${baseUrl}/og/restaurants`, width: 1200, height: 630, alt: title }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/industries/restaurants`,
      languages: {
        en: `${baseUrl}/en/industries/restaurants`,
        ar: `${baseUrl}/ar/industries/restaurants`,
      },
    },
  };
}

export default async function RestaurantsIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'industries' });

  return (
    <RootLayout>
      <div>
        <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
          <div className="container mx-auto px-4">
            <Breadcrumb
              items={[
                { label: t('title'), href: '/industries' },
                { label: t('restaurants.title') },
              ]}
            />
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {t('restaurants.title')}
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              {t('restaurants.description')}
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-text-primary">
                {t('restaurants.details.heading')}
              </h2>
              <p className="text-text-secondary">
                {t('restaurants.details.description')}
              </p>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li>• {t('restaurants.details.item1')}</li>
                <li>• {t('restaurants.details.item2')}</li>
                <li>• {t('restaurants.details.item3')}</li>
                <li>• {t('restaurants.details.item4')}</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border-light bg-white overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/industries/Restuarants.webp"
                  alt={t('restaurants.title')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {t('restaurants.title')}
                </h3>
                <p className="text-text-secondary mb-6">
                  {t('restaurants.details.description')}
                </p>
                <Button
                  variant="accent"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  asChild
                >
                  <Link href="/get-a-quote?industry=restaurants">
                    {t('restaurants.cta.button')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}

