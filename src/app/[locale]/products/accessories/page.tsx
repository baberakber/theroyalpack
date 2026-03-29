import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProductCategoryCard } from '@/components/products/ProductCategoryCard';
import { CrossSellBanner } from '@/components/products/CrossSellBanner';
import { CompatibilityChart } from '@/components/products/CompatibilityChart';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('accessories.title'),
    description: t('accessories.description'),
    openGraph: {
      title: t('accessories.title'),
      description: t('accessories.description'),
      images: [{ url: '/og/accessories', width: 1200, height: 630 }],
    },
  };
}

const accessoryCategories = [
  {
    image: '/images/products/Accessories/Domelid.webp',
    imageAlt: 'Collection of cup lids including flat, dome, and sip lids',
    title: 'Cup Lids',
    description:
      'Flat lids, dome lids, sip lids, and eco-friendly paper lids. Available in multiple sizes to fit our cup range.',
    href: '#lids',
    ctaText: 'View Lids',
  },
  {
    image: '/images/products/Accessories/cup_sleeves.webp',
    imageAlt: 'Insulating cup sleeves in various designs',
    title: 'Cup Sleeves',
    description:
      'Insulating sleeves to protect hands from hot beverages. Available plain or custom printed with your branding.',
    href: '#sleeves',
    ctaText: 'View Sleeves',
  },
  {
    image: '/images/products/Accessories/cup_carriers.webp',
    imageAlt: 'Two-cup and four-cup cardboard carriers',
    title: 'Cup Carriers',
    description:
      'Sturdy cardboard carriers for 2 or 4 cups. Perfect for takeaway orders and delivery services.',
    href: '#carriers',
    ctaText: 'View Carriers',
  },
  {
    image: '/images/products/Accessories/Stirrers & Straws.webp',
    imageAlt: 'Wooden and paper stirrers and straws',
    title: 'Stirrers & Straws',
    description:
      'Eco-friendly wooden stirrers and paper straws. Sustainable alternatives to plastic.',
    href: '#stirrers',
    ctaText: 'View Stirrers',
  },
];

const lidTypes = [
  {
    name: 'Flat Lids',
    description: 'Classic flat lids with sip hole. Ideal for hot drinks.',
    sizes: '8oz - 22oz',
    material: 'PP or CPLA (compostable)',
  },
  {
    name: 'Dome Lids',
    description: 'Extra headroom for whipped cream and toppings.',
    sizes: '12oz - 22oz',
    material: 'PP or PET',
  },
  {
    name: 'Sip Lids',
    description: 'Integrated sip opening, no straw needed.',
    sizes: '8oz - 16oz',
    material: 'PP',
  },
  {
    name: 'Paper Lids',
    description: '100% recyclable paper lids for eco-conscious brands.',
    sizes: '8oz - 16oz',
    material: 'FSC-certified paper',
  },
];

export default async function AccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products' });
  const tNav = await getTranslations({ locale, namespace: 'nav.products' });
  const isRTL = locale === 'ar';
  const accessoryCategoriesLocalized = isRTL
    ? [
      {
        ...accessoryCategories[0],
        imageAlt: 'تجميعة أغطية أكواب مسطحة وقُبّبية ورشف',
        title: 'أغطية الأكواب',
        description: 'أغطية مسطحة وقُبّبية وأغطية رشف وخيارات ورقية صديقة للبيئة، متوفرة بمقاسات متعددة تناسب مختلف أحجام الأكواب.',
        ctaText: 'عرض الأغطية',
      },
      {
        ...accessoryCategories[1],
        imageAlt: 'أغلفة أكواب عازلة بتصاميم متنوعة',
        title: 'أغلفة الأكواب',
        description: 'أغلفة عازلة تحمي اليد من حرارة المشروبات، متوفرة بخيارات سادة أو بطباعة مخصصة لهوية علامتك.',
        ctaText: 'عرض الأغلفة',
      },
      {
        ...accessoryCategories[2],
        imageAlt: 'حاملات كرتونية لكوبين وأربعة أكواب',
        title: 'حاملات الأكواب',
        description: 'حاملات كرتونية متينة بسعات كوبين أو أربعة أكواب، مناسبة للطلبات الخارجية وخدمات التوصيل.',
        ctaText: 'عرض الحاملات',
      },
      {
        ...accessoryCategories[3],
        imageAlt: 'محركات وشفاطات خشبية وورقية',
        title: 'المحركات والشفاطات',
        description: 'محركات خشبية وشفاطات ورقية صديقة للبيئة كبديل مستدام وخالٍ من البلاستيك.',
        ctaText: 'عرض المحركات',
      },
    ]
    : accessoryCategories;
  const lidTypesLocalized = isRTL
    ? [
      { ...lidTypes[0], name: 'أغطية مسطحة', description: 'أغطية مسطحة كلاسيكية بفتحة رشف مناسبة للمشروبات الساخنة.', material: 'PP أو CPLA (قابل للتحلل)' },
      { ...lidTypes[1], name: 'أغطية قُبّبية', description: 'مساحة إضافية للرغوة والكريمة والإضافات.', material: 'PP أو PET' },
      { ...lidTypes[2], name: 'أغطية رشف', description: 'فتحة رشف مدمجة دون الحاجة إلى شفاط.', material: 'PP' },
      { ...lidTypes[3], name: 'أغطية ورقية', description: 'أغطية قابلة لإعادة التدوير للعلامات المهتمة بالاستدامة.', material: 'ورق معتمد FSC' },
    ]
    : lidTypes;
  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: tNav('label'), href: '/products' },
              { label: tNav('accessories') },
            ]}
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('accessories.title')}
            </h1>
            <p className="text-lg text-text-secondary max-w-[640px] mx-auto lg:mx-0">
              {t('accessories.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Accessory Category Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessoryCategoriesLocalized.map((category, index) => (
              <ProductCategoryCard
                key={category.title}
                {...category}
                imageFit="contain"
                className="animate-fade-in-up is-visible"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lid Types Section */}
      <section id="lids" className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {isRTL ? 'خيارات الأغطية' : 'Lid Options'}
            </h2>
            <p className="text-text-secondary">
                {isRTL ? 'اختر الغطاء المناسب لمشروبك وهوية علامتك.' : 'Choose the right lid for your beverage and brand values.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lidTypesLocalized.map((lid) => (
              <div
                key={lid.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-border-light"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {lid.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {lid.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">{isRTL ? 'الأحجام:' : 'Sizes:'}</span>
                    <span className="text-text-primary font-medium">{lid.sizes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{isRTL ? 'المادة:' : 'Material:'}</span>
                    <span className="text-text-primary font-medium">{lid.material}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sleeves Section */}
      <section id="sleeves" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                {isRTL ? 'أغلفة أكواب عازلة' : 'Insulating Cup Sleeves'}
              </h2>
              <p className="text-text-secondary mb-6">
                {isRTL
                  ? 'تحمي أيدي عملائك من الحرارة وتزيد حضور علامتك. تتوفر بخيارات كرافت قياسية أو طباعة مخصصة.'
                  : 'Protect your customers\' hands while extending your brand presence. Our sleeves are available in standard kraft or custom printed designs.'}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">{isRTL ? 'كرافت قياسي:' : 'Standard Kraft:'}</strong> {isRTL ? 'خامة بنية طبيعية صديقة للبيئة واقتصادية.' : 'Natural brown cardboard, eco-friendly and cost-effective'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">{isRTL ? 'أغلفة بيضاء:' : 'White Sleeves:'}</strong> {isRTL ? 'سطح نظيف لطباعة ملونة زاهية.' : 'Clean canvas for vibrant full-color printing'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">{isRTL ? 'طباعة مخصصة:' : 'Custom Printed:'}</strong> {isRTL ? 'شعارك ورسائلك أو تصاميمك الموسمية.' : 'Your logo, messaging, or seasonal designs'}
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl overflow-hidden">
              <Image
                src="/images/products/Accessories/cup_sleeves.webp"
                alt={isRTL ? 'صورة أغلفة الأكواب' : 'Cup sleeves image'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carriers Section */}
      <section id="carriers" className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative aspect-video bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl overflow-hidden">
              <Image
                src="/images/products/Accessories/cup_carriers.webp"
                alt={isRTL ? 'صورة حاملات الأكواب' : 'Cup carriers image'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-3"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                {isRTL ? 'حاملات الأكواب' : 'Cup Carriers'}
              </h2>
              <p className="text-text-secondary mb-6">
                {isRTL
                  ? 'حاملات كرتونية متينة لتسهيل الطلبات الخارجية والتوصيل، متوفرة بسعة كوبين أو أربعة أكواب.'
                  : 'Sturdy cardboard carriers make takeaway and delivery a breeze. Available in 2-cup and 4-cup configurations.'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">2</div>
                  <div className="text-sm text-text-muted">{isRTL ? 'حامل أكواب' : 'Cup Carrier'}</div>
                  <div className="text-xs text-text-secondary mt-2">
                    {isRTL ? 'مناسب لأكواب 4-16 أونصة' : 'Fits 4oz - 16oz cups'}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">4</div>
                  <div className="text-sm text-text-muted">{isRTL ? 'حامل أكواب' : 'Cup Carrier'}</div>
                  <div className="text-xs text-text-secondary mt-2">
                    {isRTL ? 'مناسب لأكواب 4-22 أونصة' : 'Fits 4oz - 22oz cups'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stirrers Section */}
      <section id="stirrers" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              {isRTL ? 'المحركات والشفاطات' : 'Stirrers & Straws'}
            </h2>
            <p className="text-text-secondary mb-8">
                {isRTL
                  ? 'أكمل حلول التغليف المستدامة لديك بمحركات وشفاطات صديقة للبيئة، جميع الخيارات خالية من البلاستيك وقابلة للتحلل.'
                  : 'Complete your sustainable packaging lineup with eco-friendly stirrers and straws. All our options are plastic-free and biodegradable.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-bg-secondary rounded-lg p-6">
                <h3 className="font-semibold text-text-primary mb-2">{isRTL ? 'محركات خشبية' : 'Wooden Stirrers'}</h3>
                <p className="text-sm text-text-secondary">
                  {isRTL ? 'خشب بيرش، تغليف فردي أو عبوات بالجملة' : 'Birch wood, individually wrapped or bulk packed'}
                </p>
              </div>
              <div className="bg-bg-secondary rounded-lg p-6">
                <h3 className="font-semibold text-text-primary mb-2">{isRTL ? 'شفاطات ورقية' : 'Paper Straws'}</h3>
                <p className="text-sm text-text-secondary">
                  {isRTL ? 'معتمدة FSC، متوفرة بألوان وأنماط متعددة' : 'FSC-certified, multiple colors and patterns available'}
                </p>
              </div>
              <div className="bg-bg-secondary rounded-lg p-6">
                <h3 className="font-semibold text-text-primary mb-2">{isRTL ? 'شفاطات PLA' : 'PLA Straws'}</h3>
                <p className="text-sm text-text-secondary">
                  {isRTL ? 'مصنوعة من مواد نباتية وقابلة للتحلل الصناعي' : 'Plant-based, industrially compostable'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Chart */}
      <CompatibilityChart />

      {/* Cross-Sell Banner */}
      <CrossSellBanner
        heading={isRTL ? 'اجمع طلبك في باقة واحدة' : 'Bundle Your Order'}
        text={isRTL ? 'اطلب الأكواب والأغطية والأغلفة معا لتبسيط التوريد وتحقيق وفر أفضل.' : 'Order cups, lids, and sleeves together for simplified logistics and potential savings.'}
        ctaText={isRTL ? 'احصل على عرض سعر للباقة' : 'Get a Bundle Quote'}
        ctaHref="/get-a-quote"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cup Accessories',
            description:
              'Lids, sleeves, carriers, and stirrers to complement your branded paper cups.',
            brand: {
              '@type': 'Brand',
              name: 'Royal Pack',
            },
            category: 'Food Packaging Accessories',
          }),
        }}
      />
    </RootLayout>
  );
}

