import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default async function CafesIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'industries' });

  return (
    <RootLayout>
      <main id="main-content">
        <section className="bg-bg-secondary py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb
              items={[
                { label: t('title'), href: '/industries' },
                { label: t('cafes.title') },
              ]}
            />
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {t('cafes.title')}
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              {t('cafes.description')}
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-text-primary">
                {t('cafes.details.heading')}
              </h2>
              <p className="text-text-secondary">
                {t('cafes.details.description')}
              </p>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li>• {t('cafes.details.item1')}</li>
                <li>• {t('cafes.details.item2')}</li>
                <li>• {t('cafes.details.item3')}</li>
                <li>• {t('cafes.details.item4')}</li>
              </ul>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 p-8">
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {t('title')}
              </h3>
              <p className="text-text-secondary mb-6">
                {t('description')}
              </p>
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link href="/get-a-quote?industry=cafes">
                  {t('cafes.cta.button')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </RootLayout>
  );
}

