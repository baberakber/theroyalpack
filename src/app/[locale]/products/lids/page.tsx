import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CrossSellBanner } from '@/components/products/CrossSellBanner';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: tMeta('lids.title'),
    description: tMeta('lids.description'),
    openGraph: {
      title: tMeta('lids.title'),
      description: tMeta('lids.description'),
      images: [{ url: '/og/lids', width: 1200, height: 630 }],
    },
  };
}

export default async function LidsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.lids' });
  const tCommon = await getTranslations({ locale, namespace: 'products.commonLabels' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const isRTL = locale === 'ar';
  const lidTypes = locale === 'ar'
    ? [
      {
        name: 'أغطية مسطحة',
        description: 'أغطية مسطحة كلاسيكية بفتحة رشف، مثالية للمشروبات الساخنة.',
        image: '/images/products/Lids/flat-lid.webp',
        imageAlt: 'غطاء مسطح على كوب قهوة سفري',
        imageDescription: 'توفر الأغطية المسطحة إغلاقا محكما يساعد على تقليل الانسكاب أثناء الأخذ الخارجي.',
        sizes: '8-22 أونصة',
        material: 'PP أو CPLA (قابل للتحلل)',
      },
      {
        name: 'أغطية قُبّبية',
        description: 'مساحة إضافية للكريمة والإضافات.',
        image: '/images/products/Lids/dome-lid.webp',
        imageAlt: 'غطاء قُبّبي على مشروب بارد',
        imageDescription: 'تمنح الأغطية القُبّبية حيزا علويا أكبر للرغوة والإضافات في المشروبات الباردة.',
        sizes: '12-22 أونصة',
        material: 'PP أو PET',
      },
      {
        name: 'أغطية رشف',
        description: 'فتحة رشف مدمجة بدون حاجة لشفاط.',
        image: '/images/products/Lids/sip-lid.webp',
        imageAlt: 'غطاء رشف للشرب أثناء الحركة',
        imageDescription: 'تصميم عملي للشرب السهل مع تثبيت جيد على الكوب أثناء التنقل.',
        sizes: '8-16 أونصة',
        material: 'PP',
      },
      {
        name: 'أغطية ورقية',
        description: 'أغطية ورقية قابلة لإعادة التدوير للعلامات المهتمة بالاستدامة.',
        image: '/images/products/Lids/paper-lid.webp',
        imageAlt: 'غطاء ورقي صديق للبيئة على كوب قهوة',
        imageDescription: 'تدعم الأغطية الورقية أهداف الاستدامة عبر تقليل البلاستيك مع تجربة استخدام مريحة.',
        sizes: '8-16 أونصة',
        material: 'ورق معتمد FSC',
      },
    ]
    : [
      {
        name: 'Flat Lids',
        description: 'Classic flat lids with sip hole. Ideal for hot drinks.',
        image: '/images/products/Lids/flat-lid.webp',
        imageAlt: 'Flat coffee cup lid shown on takeaway cup',
        imageDescription: 'Flat lids offer a low-profile, secure closure that helps reduce spills during takeaway service while keeping beverages warm.',
        sizes: '8oz - 22oz',
        material: 'PP or CPLA (compostable)',
      },
      {
        name: 'Dome Lids',
        description: 'Extra headroom for whipped cream and toppings.',
        image: '/images/products/Lids/dome-lid.webp',
        imageAlt: 'Dome lid on cold beverage cup with extra topping space',
        imageDescription: 'Dome lids provide added headspace for whipped cream, foam, and toppings, making them perfect for premium cold drinks.',
        sizes: '12oz - 22oz',
        material: 'PP or PET',
      },
      {
        name: 'Sip Lids',
        description: 'Integrated sip opening, no straw needed.',
        image: '/images/products/Lids/sip-lid.webp',
        imageAlt: 'Sip-through lid designed for convenient on-the-go drinking',
        imageDescription: 'The innovative sip-lid design allows convenient drinking without a straw, with a secure fit that is ideal for customers on the go.',
        sizes: '8oz - 16oz',
        material: 'PP',
      },
      {
        name: 'Paper Lids',
        description: '100% recyclable paper lids for eco-conscious brands.',
        image: '/images/products/Lids/paper-lid.webp',
        imageAlt: 'Eco-friendly paper lid on coffee takeaway cup',
        imageDescription: 'Paper lids support sustainability goals by reducing plastic usage while still delivering a comfortable and reliable drinking experience.',
        sizes: '8oz - 16oz',
        material: 'FSC-certified paper',
      },
    ];

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: tNav('products.label'), href: '/products' },
              { label: tNav('products.lids') },
            ]}
          />
          <div className="text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Lid Types */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lidTypes.map((lid) => (
              <div
                key={lid.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-border-light animate-fade-in-up is-visible"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border-light mb-4">
                  <Image
                    src={lid.image}
                    alt={lid.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  {lid.name}
                </h2>
                <p className="text-text-secondary text-sm mb-4">
                  {lid.description}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {lid.imageDescription}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tCommon('sizes')}:</span>
                    <span className="text-text-primary font-medium">{lid.sizes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tCommon('material')}:</span>
                    <span className="text-text-primary font-medium">{lid.material}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-text-secondary mb-6">
              {t('cta.description')}
            </p>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />}
              asChild
            >
              <Link href="/get-a-quote">{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <CrossSellBanner
        heading={t('crossSell.heading')}
        text={t('crossSell.text')}
        ctaText={t('crossSell.cta')}
        ctaHref="/products/accessories"
      />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cup Lids',
            description:
              'Flat, dome, sip, and paper lids compatible with a wide range of cup sizes.',
            brand: { '@type': 'Brand', name: 'Royal Pack' },
            category: 'Food Packaging',
          }),
        }}
      />
    </RootLayout>
  );
}


