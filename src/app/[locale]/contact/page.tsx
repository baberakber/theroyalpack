import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  ContactForm,
  ContactInfo,
  MapEmbed,
  BusinessHours,
} from '@/components/forms/ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('contact.title'),
    description: t('contact.description'),
    openGraph: {
      title: t('contact.title'),
      description: t('contact.description'),
      images: [{ url: '/og/contact', width: 1200, height: 630 }],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const isRTL = locale === 'ar';

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3">
              {t('title')}
            </h1>
            <p className="text-text-secondary">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                {t('form.submit')}
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <BusinessHours />

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            {t('map.title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <MapEmbed />
          </div>
          <div className="text-center mt-6">
            <p className="text-text-secondary text-sm">
              {isRTL
                ? 'مخرج 18، السلي، الرياض 14321، المملكة العربية السعودية'
                : 'Exit 18, As Sulay, Riyadh 14321, Saudi Arabia'}
            </p>
            <a
              href="https://maps.google.com/maps?q=Exit+18+As+Sulay+Riyadh+14321"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline text-sm mt-2 inline-block"
            >
              {isRTL ? 'الحصول على الاتجاهات' : 'Get Directions'}
            </a>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link
              href="/get-a-quote"
              className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-text-primary mb-1">
                {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
              </div>
              <p className="text-sm text-text-muted">
                {isRTL ? 'اطلب تسعيرًا مخصصًا لطلبك' : 'Request pricing for your order'}
              </p>
            </Link>
            <Link
              href="/request-sample"
              className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-text-primary mb-1">
                {isRTL ? 'اطلب عينة' : 'Request Sample'}
              </div>
              <p className="text-sm text-text-muted">
                {isRTL ? 'جرّب المنتج قبل الشراء' : 'Try before you buy'}
              </p>
            </Link>
            <Link
              href="/faq"
              className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-text-primary mb-1">FAQ</div>
              <p className="text-sm text-text-muted">
                {isRTL ? 'اعثر على إجابات سريعة' : 'Find quick answers'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'LocalBusiness',
              name: 'Royal Pack',
              image: '/images/Logo-RoyalPack.webp',
              telephone: '+966556240690',
              email: 'sales@theroyalpack.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Exit 18, As Sulay',
                addressLocality: 'Riyadh',
                postalCode: '14321',
                addressCountry: 'SA',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '14:00',
                },
              ],
            },
          }),
        }}
      />
    </RootLayout>
  );
}

