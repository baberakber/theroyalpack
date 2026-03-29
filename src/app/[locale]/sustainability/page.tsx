import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SustainabilityContent } from './SustainabilityContent';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const title = t('sustainability.title');
  const description = t('sustainability.description');
  const canonical = `${baseUrl}/${locale}/sustainability`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      siteName: locale === 'ar' ? 'رويال باك' : 'Royal Pack',
      images: [{ url: `${baseUrl}/og/sustainability`, width: 1200, height: 630, alt: 'Royal Pack Sustainability' }],
    },
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/sustainability`,
        ar: `${baseUrl}/ar/sustainability`,
      },
    },
  };
}

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SustainabilityContent />;
}

