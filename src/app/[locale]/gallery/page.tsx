import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { GalleryClient } from './GalleryClient';
import { getGalleryItems } from '@/lib/data/gallery';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('gallery.title'),
    description: t('gallery.description'),
    openGraph: {
      title: t('gallery.title'),
      description: t('gallery.description'),
      images: [{ url: '/og/gallery', width: 1200, height: 630 }],
    },
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = await getGalleryItems();

  return (
    <RootLayout>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Royal Pack Design Gallery',
            description: 'Custom printed paper cup designs for various industries',
            numberOfItems: items.length,
          }),
        }}
      />

      <GalleryClient items={items} />
    </RootLayout>
  );
}

