import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProductImageSlider } from '@/components/products/ProductImageSlider';
import { listPublicImages } from '@/lib/publicImages';
import { SiteContainer } from '@/components/layout/SiteContainer';

type SpecRow = {
  item: string;
  size: string;
  paperWeight: string;
  productSize: string;
  pcsPerCtn: string;
  cartonSizeCm: string;
};

const doubleWallSpecsEn: SpecRow[] = [
  { item: 'PE-DW08', size: 'Hollow Cup - 8oz', paperWeight: '250GSM + 300GSM + 18PE', productSize: '80×56×94', pcsPerCtn: '500', cartonSizeCm: '55.5×41×33' },
  { item: 'PE-DW10', size: 'Hollow Cup - 10oz', paperWeight: '250GSM + 300GSM + 18PE', productSize: '90×60×95', pcsPerCtn: '500', cartonSizeCm: '52.5×46×37' },
  { item: 'PE-DW12', size: 'Hollow Cup - 12oz', paperWeight: '250GSM + 300GSM + 18PE', productSize: '90×58×108', pcsPerCtn: '500', cartonSizeCm: '61×46×37' },
  { item: 'PE-DW16', size: 'Hollow Cup - 16oz', paperWeight: '250GSM + 320GSM + 18PE', productSize: '90×58×137', pcsPerCtn: '500', cartonSizeCm: '73×46×37' },
  { item: 'PE-DW20', size: 'Hollow Cup - 20oz', paperWeight: '250GSM + 320GSM + 18PE', productSize: '90×60×159', pcsPerCtn: '500', cartonSizeCm: '79×46×37' },
];

function SpecsTable({ rows, isRTL }: { rows: SpecRow[]; isRTL: boolean }) {
  return (
    <div className="overflow-x-auto max-w-5xl mx-auto">
      <table className="w-full min-w-[860px] border-collapse bg-white rounded-xl overflow-hidden shadow-md border border-border-light text-sm">
        <thead className="bg-primary-500 text-white">
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold">{isRTL ? 'الصنف' : 'Item'}</th>
            <th className="px-4 py-3 font-semibold">{isRTL ? 'المقاس' : 'Size'}</th>
            <th className="px-4 py-3 font-semibold">{isRTL ? 'وزن الورق' : 'Paper weight'}</th>
            <th className="px-4 py-3 font-semibold">{isRTL ? 'مقاس الكوب (علوي×سفلي×ارتفاع)' : 'Cup size (Top×Bottom×Height)'}</th>
            <th className="px-4 py-3 font-semibold">{isRTL ? 'عدد/كرتون' : 'PCS / CTN'}</th>
            <th className="px-4 py-3 font-semibold">{isRTL ? 'مقاس الكرتون (سم)' : 'Carton size (cm)'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item} className="border-t border-border-light hover:bg-primary-50 transition-colors duration-200">
              <td className="px-4 py-3 font-medium text-text-primary">{row.item}</td>
              <td className="px-4 py-3 text-text-secondary">{row.size}</td>
              <td className="px-4 py-3 text-text-secondary">{row.paperWeight}</td>
              <td className="px-4 py-3 text-text-secondary">{row.productSize}</td>
              <td className="px-4 py-3 text-text-secondary">{row.pcsPerCtn}</td>
              <td className="px-4 py-3 text-text-secondary">{row.cartonSizeCm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `${t('paperCups.title')} | Double Wall`,
    description: 'Double wall (hollow wall) paper cups with an air gap for insulation—keeps drinks hot and hands comfortable.',
    openGraph: {
      title: `${t('paperCups.title')} | Double Wall`,
      description: 'Double wall paper cups — insulated with a comfortable grip.',
      images: [{ url: '/og/paper-cups', width: 1200, height: 630 }],
    },
  };
}

export default async function DoubleWallCupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRTL = locale === 'ar';
  const tNav = await getTranslations({ locale, namespace: 'nav.products' });
  const images = listPublicImages('images/products/Double Wall Cups');
  const doubleWallSpecs = isRTL
    ? [
      { item: 'PE-DW08', size: 'جدار مزدوج - 8 أونصة', paperWeight: '250GSM + 300GSM + 18PE', productSize: '80×56×94', pcsPerCtn: '500', cartonSizeCm: '55.5×41×33' },
      { item: 'PE-DW10', size: 'جدار مزدوج - 10 أونصة', paperWeight: '250GSM + 300GSM + 18PE', productSize: '90×60×95', pcsPerCtn: '500', cartonSizeCm: '52.5×46×37' },
      { item: 'PE-DW12', size: 'جدار مزدوج - 12 أونصة', paperWeight: '250GSM + 300GSM + 18PE', productSize: '90×58×108', pcsPerCtn: '500', cartonSizeCm: '61×46×37' },
      { item: 'PE-DW16', size: 'جدار مزدوج - 16 أونصة', paperWeight: '250GSM + 320GSM + 18PE', productSize: '90×58×137', pcsPerCtn: '500', cartonSizeCm: '73×46×37' },
      { item: 'PE-DW20', size: 'جدار مزدوج - 20 أونصة', paperWeight: '250GSM + 320GSM + 18PE', productSize: '90×60×159', pcsPerCtn: '500', cartonSizeCm: '79×46×37' },
    ]
    : doubleWallSpecsEn;

  return (
    <RootLayout>
      <section className="pt-24 pb-10 bg-gradient-to-b from-primary-50 to-white">
        <SiteContainer>
          <Breadcrumb
            items={[
              { label: tNav('label'), href: '/products' },
              { label: tNav('paperCups'), href: '/products/paper-cups' },
              { label: isRTL ? 'جدار مزدوج' : 'Double Wall' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
            <div className="lg:col-span-7">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                {isRTL ? 'أكواب ساخنة - جدار مزدوج' : 'Double Wall (hollow wall) Hot Cups'}
              </h1>
              <p className="text-lg text-text-secondary">
                {isRTL
                  ? 'أكواب الجدار المزدوج (الهوائي) مخصصة للمشروبات الساخنة مثل القهوة والشاي. تتكون من طبقتين مع فراغ عازل بينهما لاحتفاظ أفضل بالحرارة وحماية اليد دون الحاجة لغلاف إضافي. مناسبة للمقاهي والمطاعم والفعاليات، مع خيارات متعددة للمقاسات والسماكات والطباعة والأغطية.'
                  : 'Double Wall Paper Cups, also known as hollow wall cups, are designed for serving hot beverages like coffee, tea, and hot chocolate. These cups feature two layers of paper with an air gap between them, providing superior insulation compared to single-wall cups. This design keeps drinks hot while protecting the user’s hands from heat, eliminating the need for a separate sleeve. Double wall paper cups are ideal for cafes, restaurants, and events where hot drinks are frequently served. Made from high-quality, food-grade materials, these cups are both durable and eco-friendly. You can choose the sizes, different paper thicknesses, printing options, and lids according to customer requirements.'}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-light bg-white">
                <Image
                  src="/images/products/double-wall-paper-cups.webp"
                  alt={isRTL ? 'أكواب ورقية ساخنة بجدار مزدوج' : 'Double wall (hollow wall) hot paper cups'}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </SiteContainer>
      </section>

      <section className="py-14 bg-white">
        <SiteContainer>
          <div className="mb-10 lg:mb-12">
            <ProductImageSlider
              images={images}
              altBase={isRTL ? 'أكواب ورقية ساخنة بجدار مزدوج' : 'Double wall hot paper cups'}
            />
          </div>
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3">
              {isRTL ? 'المقاسات ومواصفات الكرتون' : 'Sizes & Carton Specs'}
            </h2>
            <p className="text-text-secondary">
              {isRTL ? 'مرجع سريع للمقاسات الشائعة لأكواب الجدار المزدوج من 8 إلى 20 أونصة.' : 'Quick reference for common double-wall (hollow wall) sizes from 8oz to 20oz.'}
            </p>
          </div>

          <SpecsTable rows={doubleWallSpecs} isRTL={isRTL} />
        </SiteContainer>
      </section>
    </RootLayout>
  );
}

