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

const rippleWallSpecsEn: SpecRow[] = [
  { item: 'PE-RW04', size: 'Corrugated Ripple Cup - 4oz', paperWeight: '110GSM + 120GSM + 230GSM + 18PE', productSize: '62×45×61', pcsPerCtn: '1000', cartonSizeCm: '51×37×32.5' },
  { item: 'PE-RW08', size: 'Corrugated Ripple Cup - 8oz', paperWeight: '110GSM + 120GSM + 280GSM + 18PE', productSize: '80×56×94', pcsPerCtn: '500', cartonSizeCm: '47.5×41×33.5' },
  { item: 'PE-RW10', size: 'Corrugated Ripple Cup - 10oz', paperWeight: '110GSM + 120GSM + 300GSM + 18PE', productSize: '90×60×95', pcsPerCtn: '500', cartonSizeCm: '46×41×37.5' },
  { item: 'PE-RW12', size: 'Corrugated Ripple Cup - 12oz', paperWeight: '110GSM + 120GSM + 300GSM + 18PE', productSize: '90×58×108', pcsPerCtn: '500', cartonSizeCm: '46.5×46×37.5' },
  { item: 'PE-RW16', size: 'Corrugated Ripple Cup - 16oz', paperWeight: '110GSM + 120GSM + 320GSM + 18PE', productSize: '90×58×137', pcsPerCtn: '500', cartonSizeCm: '58.5×46×37.5' },
  { item: 'PE-RW20', size: 'Corrugated Ripple Cup - 20oz', paperWeight: '110GSM + 120GSM + 320GSM + 18PE', productSize: '90×60×159', pcsPerCtn: '500', cartonSizeCm: '71×46×37.5' },
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
    title: `${t('paperCups.title')} | Ripple Wall`,
    description: 'Ripple wall paper cups with a corrugated outer layer for excellent insulation and grip—ideal for premium hot drinks.',
    openGraph: {
      title: `${t('paperCups.title')} | Ripple Wall`,
      description: 'Ripple wall cups — premium insulation and a secure grip.',
      images: [{ url: '/og/paper-cups', width: 1200, height: 630 }],
    },
  };
}

export default async function RippleWallCupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRTL = locale === 'ar';
  const tNav = await getTranslations({ locale, namespace: 'nav.products' });
  const images = listPublicImages('images/products/Ripple Wall Cups');
  const rippleWallSpecs = isRTL
    ? [
      { item: 'PE-RW04', size: 'جدار متموج - 4 أونصة', paperWeight: '110GSM + 120GSM + 230GSM + 18PE', productSize: '62×45×61', pcsPerCtn: '1000', cartonSizeCm: '51×37×32.5' },
      { item: 'PE-RW08', size: 'جدار متموج - 8 أونصة', paperWeight: '110GSM + 120GSM + 280GSM + 18PE', productSize: '80×56×94', pcsPerCtn: '500', cartonSizeCm: '47.5×41×33.5' },
      { item: 'PE-RW10', size: 'جدار متموج - 10 أونصة', paperWeight: '110GSM + 120GSM + 300GSM + 18PE', productSize: '90×60×95', pcsPerCtn: '500', cartonSizeCm: '46×41×37.5' },
      { item: 'PE-RW12', size: 'جدار متموج - 12 أونصة', paperWeight: '110GSM + 120GSM + 300GSM + 18PE', productSize: '90×58×108', pcsPerCtn: '500', cartonSizeCm: '46.5×46×37.5' },
      { item: 'PE-RW16', size: 'جدار متموج - 16 أونصة', paperWeight: '110GSM + 120GSM + 320GSM + 18PE', productSize: '90×58×137', pcsPerCtn: '500', cartonSizeCm: '58.5×46×37.5' },
      { item: 'PE-RW20', size: 'جدار متموج - 20 أونصة', paperWeight: '110GSM + 120GSM + 320GSM + 18PE', productSize: '90×60×159', pcsPerCtn: '500', cartonSizeCm: '71×46×37.5' },
    ]
    : rippleWallSpecsEn;

  return (
    <RootLayout>
      <section className="pt-24 pb-10 bg-gradient-to-b from-primary-50 to-white">
        <SiteContainer>
          <Breadcrumb
            items={[
              { label: tNav('label'), href: '/products' },
              { label: tNav('paperCups'), href: '/products/paper-cups' },
              { label: isRTL ? 'جدار متموج' : 'Ripple Wall' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
            <div className="lg:col-span-7">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                {isRTL ? 'أكواب ساخنة - جدار متموج' : 'Ripple Wall Hot Cups'}
              </h1>
              <p className="text-lg text-text-secondary">
                {isRTL
                  ? 'أكواب الجدار المتموج مصممة للمشروبات الساخنة بطبقات متعددة وسطح خارجي مموج يمنح عزلا ممتازا وثباتا مريحا لليد دون غلاف إضافي. مصنوعة من ورق آمن غذائيا وعالي الجودة، ومتوفرة بمقاسات وخيارات سماكة وطباعة وأغطية متعددة.'
                  : 'Ripple Wall Paper Cups are designed for serving hot beverages like coffee, tea, and hot chocolate. These cups feature a unique triple-layer design with a corrugated outer layer, providing excellent insulation and a secure grip. The ripple texture not only adds style but also protects hands from the heat, eliminating the need for a separate sleeve. Made from high-quality, food-safe paper, ripple wall cups are durable, eco-friendly, and often recyclable. Ideal for cafes, restaurants, and events, you can choose various sizes, different paper thicknesses, printing options, and lids according to customer requirements.'}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-light bg-white">
                <Image
                  src="/images/products/Ripple-Wall-Paper-Cups-Coffee-Cups.webp"
                  alt={isRTL ? 'أكواب ورقية ساخنة بجدار متموج' : 'Ripple wall hot paper cups'}
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
              altBase={isRTL ? 'أكواب ورقية ساخنة بجدار متموج' : 'Ripple wall hot paper cups'}
            />
          </div>
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3">
              {isRTL ? 'المقاسات ومواصفات الكرتون' : 'Sizes & Carton Specs'}
            </h2>
            <p className="text-text-secondary">
              {isRTL ? 'مرجع سريع للمقاسات الشائعة لأكواب الجدار المتموج من 4 إلى 20 أونصة.' : 'Quick reference for common ripple-wall sizes from 4oz to 20oz.'}
            </p>
          </div>

          <SpecsTable rows={rippleWallSpecs} isRTL={isRTL} />
        </SiteContainer>
      </section>
    </RootLayout>
  );
}

