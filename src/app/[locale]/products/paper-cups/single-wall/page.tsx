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

const singleWallSpecsEn: SpecRow[] = [
  { item: 'PE-SW03', size: 'Single Wall - 2.5/3oz', paperWeight: '170GSM + 18PE', productSize: '55×40×54', pcsPerCtn: '2000', cartonSizeCm: '45.5×29×32' },
  { item: 'PE-SW04', size: 'Single Wall - 4oz', paperWeight: '190GSM + 18PE', productSize: '62×45×61', pcsPerCtn: '1000', cartonSizeCm: '32.5×26×33.5' },
  { item: 'PE-SW05', size: 'Single Wall - 5oz', paperWeight: '210GSM + 18PE', productSize: '67×47×72', pcsPerCtn: '2000', cartonSizeCm: '55×28.5×36' },
  { item: 'PE-SW07', size: 'Single Wall - 7oz', paperWeight: '240GSM + 18PE', productSize: '72×50×79', pcsPerCtn: '1000', cartonSizeCm: '37.5×30×34.5' },
  { item: 'PE-SW08', size: 'Single Wall - 8oz', paperWeight: '280GSM + 18PE', productSize: '80×56×94', pcsPerCtn: '1000', cartonSizeCm: '40.5×32.5×47.5' },
  { item: 'PE-SW10S', size: 'Single Wall - 10oz', paperWeight: '280GSM + 18PE', productSize: '90×60×95', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×45.5' },
  { item: 'PE-SW12', size: 'Single Wall - 12oz', paperWeight: '300GSM + 18PE', productSize: '90×58×108', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×49' },
  { item: 'PE-SW14', size: 'Single Wall - 14oz', paperWeight: '300GSM + 18PE', productSize: '90×61×124', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×54' },
  { item: 'PE-SW16', size: 'Single Wall - 16oz', paperWeight: '300GSM + 18PE', productSize: '90×58×137', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×56' },
  { item: 'PE-SW20', size: 'Single Wall - 20oz', paperWeight: '320GSM + 18PE', productSize: '90×60×159', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×64' },
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
    title: `${t('paperCups.title')} | Single Wall`,
    description: 'Single wall paper cups for espresso, samples, and short-serve hot drinks. Lightweight, economical, and customizable.',
    openGraph: {
      title: `${t('paperCups.title')} | Single Wall`,
      description: 'Single wall paper cups — lightweight, economical and customizable.',
      images: [{ url: '/og/paper-cups', width: 1200, height: 630 }],
    },
  };
}

export default async function SingleWallCupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRTL = locale === 'ar';
  const tNav = await getTranslations({ locale, namespace: 'nav.products' });
  const images = listPublicImages('images/products/Single Wall Cups');
  const singleWallSpecs = isRTL
    ? [
      { item: 'PE-SW03', size: 'جدار واحد - 2.5/3 أونصة', paperWeight: '170GSM + 18PE', productSize: '55×40×54', pcsPerCtn: '2000', cartonSizeCm: '45.5×29×32' },
      { item: 'PE-SW04', size: 'جدار واحد - 4 أونصة', paperWeight: '190GSM + 18PE', productSize: '62×45×61', pcsPerCtn: '1000', cartonSizeCm: '32.5×26×33.5' },
      { item: 'PE-SW05', size: 'جدار واحد - 5 أونصة', paperWeight: '210GSM + 18PE', productSize: '67×47×72', pcsPerCtn: '2000', cartonSizeCm: '55×28.5×36' },
      { item: 'PE-SW07', size: 'جدار واحد - 7 أونصة', paperWeight: '240GSM + 18PE', productSize: '72×50×79', pcsPerCtn: '1000', cartonSizeCm: '37.5×30×34.5' },
      { item: 'PE-SW08', size: 'جدار واحد - 8 أونصة', paperWeight: '280GSM + 18PE', productSize: '80×56×94', pcsPerCtn: '1000', cartonSizeCm: '40.5×32.5×47.5' },
      { item: 'PE-SW10S', size: 'جدار واحد - 10 أونصة', paperWeight: '280GSM + 18PE', productSize: '90×60×95', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×45.5' },
      { item: 'PE-SW12', size: 'جدار واحد - 12 أونصة', paperWeight: '300GSM + 18PE', productSize: '90×58×108', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×49' },
      { item: 'PE-SW14', size: 'جدار واحد - 14 أونصة', paperWeight: '300GSM + 18PE', productSize: '90×61×124', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×54' },
      { item: 'PE-SW16', size: 'جدار واحد - 16 أونصة', paperWeight: '300GSM + 18PE', productSize: '90×58×137', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×56' },
      { item: 'PE-SW20', size: 'جدار واحد - 20 أونصة', paperWeight: '320GSM + 18PE', productSize: '90×60×159', pcsPerCtn: '1000', cartonSizeCm: '45.5×36.5×64' },
    ]
    : singleWallSpecsEn;

  return (
    <RootLayout>
      <section className="pt-24 pb-10 bg-gradient-to-b from-primary-50 to-white">
        <SiteContainer>
          <Breadcrumb
            items={[
              { label: tNav('label'), href: '/products' },
              { label: tNav('paperCups'), href: '/products/paper-cups' },
              { label: isRTL ? 'جدار واحد' : 'Single Wall' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
            <div className="lg:col-span-7">
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                {isRTL ? 'أكواب ساخنة - جدار واحد' : 'Single Wall Hot Cups'}
              </h1>
              <p className="text-lg text-text-secondary">
                {isRTL
                  ? 'أكواب الجدار الواحد خيار اقتصادي وصديق للبيئة لتقديم القهوة والشاي والمشروبات الساخنة. تُصنع من طبقة واحدة من ورق آمن غذائيا عالي الجودة، وهي خفيفة ومتينة ومناسبة للمقاهي والمطاعم والفعاليات. تتوفر بخيارات سماكات وطباعة وأغطية متعددة ويمكن تخصيصها بشعارك.'
                  : 'Single Wall Hot Paper Cups are an economical and eco-friendly choice for serving hot beverages such as coffee, tea, and hot chocolate. Made from a single layer of high-quality, food-safe paper, they are lightweight, durable, and perfect for cafes, restaurants, and events. You can choose different paper thicknesses, printing options, and lids according to customer requirements. These cups are often customizable with logos or branding, and are recyclable, providing a sustainable alternative to plastic. Available in various sizes, they are a practical and responsible solution for serving hot beverages.'}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-light bg-white">
                <Image
                  src="/images/products/Single-Wall-Paper-Cups.webp"
                  alt={isRTL ? 'أكواب ورقية ساخنة بجدار واحد' : 'Single wall hot paper cups'}
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
              altBase={isRTL ? 'أكواب ورقية ساخنة بجدار واحد' : 'Single wall hot paper cups'}
            />
          </div>
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3">
              {isRTL ? 'المقاسات ومواصفات الكرتون' : 'Sizes & Carton Specs'}
            </h2>
            <p className="text-text-secondary">
              {isRTL ? 'مرجع سريع للمقاسات الشائعة لأكواب الجدار الواحد (من 2.5/3 إلى 20 أونصة).' : 'Quick, practical reference for common single-wall sizes (2.5/3oz up to 20oz).'}
            </p>
          </div>

          <SpecsTable rows={singleWallSpecs} isRTL={isRTL} />
        </SiteContainer>
      </section>
    </RootLayout>
  );
}

