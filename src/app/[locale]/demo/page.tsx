import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CupVisualizer } from '@/components/demo';
import { SiteContainer } from '@/components/layout/SiteContainer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('demo.title'),
    description: t('demo.description'),
    openGraph: {
      title: t('demo.title'),
      description: t('demo.description'),
    },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'demo' });

  return (
    <RootLayout>
      <section className="pt-20 sm:pt-24 pb-6 sm:pb-10 bg-gradient-to-b from-primary-50 to-white">
        <SiteContainer className="px-3 sm:px-4">
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="max-w-3xl mt-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-2 sm:mb-3">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg text-text-secondary">{t('subtitle')}</p>
          </div>
        </SiteContainer>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-x-hidden">
        <CupVisualizer />
      </section>
    </RootLayout>
  );
}
