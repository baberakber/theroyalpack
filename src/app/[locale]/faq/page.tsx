import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { MessageCircle } from 'lucide-react';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import faqData from '@/data/faq.json';
import { whatsappUrl } from '@/lib/contactConstants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('faq.title'),
    description: t('faq.description'),
    openGraph: {
      title: t('faq.title'),
      description: t('faq.description'),
      images: [{ url: '/og/faq', width: 1200, height: 630 }],
    },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('subtitle')}{' '}
              <Link href="/contact" className="text-primary-600 hover:underline">
                {t('contact.button')}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FaqAccordion items={faqData.items} />
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <MessageCircle className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-text-secondary mb-6">
              {t('contact.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" asChild>
                <Link href="/contact">{t('contact.button')}</Link>
              </Button>
              <Button variant="secondary" asChild>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  {t('contact.whatsapp')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            {t('resources.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              href="/products/paper-cups"
              className="p-4 bg-bg-secondary rounded-lg text-center hover:bg-primary-50 transition-colors"
            >
              <span className="font-medium text-text-primary">{t('resources.paperCups')}</span>
              <p className="text-sm text-text-muted mt-1">{t('resources.paperCupsDesc')}</p>
            </Link>
            <Link
              href="/products/custom-printing"
              className="p-4 bg-bg-secondary rounded-lg text-center hover:bg-primary-50 transition-colors"
            >
              <span className="font-medium text-text-primary">{t('resources.printing')}</span>
              <p className="text-sm text-text-muted mt-1">{t('resources.printingDesc')}</p>
            </Link>
            <Link
              href="/design-support"
              className="p-4 bg-bg-secondary rounded-lg text-center hover:bg-primary-50 transition-colors"
            >
              <span className="font-medium text-text-primary">{t('resources.templates')}</span>
              <p className="text-sm text-text-muted mt-1">{t('resources.templatesDesc')}</p>
            </Link>
            <Link
              href="/get-a-quote"
              className="p-4 bg-bg-secondary rounded-lg text-center hover:bg-primary-50 transition-colors"
            >
              <span className="font-medium text-text-primary">{t('resources.quote')}</span>
              <p className="text-sm text-text-muted mt-1">{t('resources.quoteDesc')}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </RootLayout>
  );
}
