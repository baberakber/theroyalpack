import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = (messages as any).metadata?.home || {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com';
  return {
    title: metadata.title || 'Royal Pack | Custom Printed Packaging That Promotes Your Brand',
    description:
      metadata.description ||
      'Paper cups, juice cups, ice-cream cups, burger boxes, complete food packaging and more—professionally printed packaging designed to make your brand stand out.',
    keywords: ['paper cups', 'custom cups', 'branded cups', 'eco-friendly cups', 'disposable cups'],
    openGraph: {
      title: metadata.title || 'Royal Pack | Custom Printed Packaging That Promotes Your Brand',
      description:
        metadata.description ||
        'Paper cups, juice cups, ice-cream cups, burger boxes, complete food packaging and more—professionally printed packaging designed to make your brand stand out.',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      siteName: locale === 'ar' ? 'رويال باك' : 'Royal Pack',
      images: [{ url: `${baseUrl}/og/home`, width: 1200, height: 630, alt: 'Royal Pack' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title || 'Royal Pack | Custom Printed Packaging That Promotes Your Brand',
      description:
        metadata.description ||
        'Paper cups, juice cups, ice-cream cups, burger boxes, complete food packaging and more—professionally printed packaging designed to make your brand stand out.',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com'}/${locale}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com'}/en`,
        ar: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com'}/ar`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: isRTL ? 'رويال باك' : 'Royal Pack',
            description: isRTL
              ? 'مصنع أكواب ورقية مخصصة عالية الجودة'
              : 'Premium custom branded paper cups manufacturer',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com',
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com'}/images/Logo-RoyalPack.png`,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              availableLanguage: ['English', 'Arabic'],
            },
          }),
        }}
      />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}

