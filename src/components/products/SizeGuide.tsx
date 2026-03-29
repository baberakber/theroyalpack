'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { SiteContainer } from '@/components/layout/SiteContainer';
import { useLocale } from 'next-intl';

interface SizeData {
  sizeOz: number;
  volumeMl: number;
  topDiameter: number;
  bottomDiameter: number;
  height: number;
  commonUse: string;
}

const sizesEn: SizeData[] = [
  { sizeOz: 2.5, volumeMl: 75, topDiameter: 50, bottomDiameter: 35, height: 50, commonUse: 'Espresso' },
  { sizeOz: 4, volumeMl: 120, topDiameter: 62, bottomDiameter: 42, height: 64, commonUse: 'Espresso, tasting' },
  { sizeOz: 6, volumeMl: 180, topDiameter: 73, bottomDiameter: 50, height: 75, commonUse: 'Small coffee' },
  { sizeOz: 7, volumeMl: 210, topDiameter: 73, bottomDiameter: 50, height: 85, commonUse: 'Small coffee' },
  { sizeOz: 8, volumeMl: 240, topDiameter: 80, bottomDiameter: 56, height: 92, commonUse: 'Standard coffee' },
  { sizeOz: 9, volumeMl: 270, topDiameter: 80, bottomDiameter: 56, height: 98, commonUse: 'Coffee, tea' },
  { sizeOz: 10, volumeMl: 300, topDiameter: 85, bottomDiameter: 58, height: 105, commonUse: 'Medium coffee' },
  { sizeOz: 12, volumeMl: 360, topDiameter: 90, bottomDiameter: 60, height: 110, commonUse: 'Medium, iced drinks' },
  { sizeOz: 14, volumeMl: 420, topDiameter: 90, bottomDiameter: 62, height: 125, commonUse: 'Large coffee' },
  { sizeOz: 16, volumeMl: 480, topDiameter: 90, bottomDiameter: 62, height: 135, commonUse: 'Large, smoothies' },
  { sizeOz: 18, volumeMl: 540, topDiameter: 95, bottomDiameter: 65, height: 140, commonUse: 'Extra large' },
  { sizeOz: 20, volumeMl: 600, topDiameter: 95, bottomDiameter: 65, height: 150, commonUse: 'Extra large, cold' },
  { sizeOz: 22, volumeMl: 650, topDiameter: 95, bottomDiameter: 65, height: 160, commonUse: 'Jumbo cold drinks' },
];

// Cup SVG component that scales based on size
function CupSvg({ height: cupHeight }: { height: number }) {
  // Scale factor based on the largest cup (160mm for 22oz)
  const scale = cupHeight / 160;
  const svgHeight = 80 * scale;
  const svgWidth = 50 * scale;

  return (
    <div>
      <svg
        width={Math.max(svgWidth, 25)}
        height={Math.max(svgHeight, 40)}
        viewBox="0 0 50 80"
        className="text-primary-500"
        aria-hidden="true"
      >
        <path
          d="M5 5 L10 75 L40 75 L45 5 Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function SizeGuide() {
  const { ref, isVisible } = useScrollAnimation();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const sizes = isRTL
    ? [
      { sizeOz: 2.5, volumeMl: 75, topDiameter: 50, bottomDiameter: 35, height: 50, commonUse: 'إسبريسو' },
      { sizeOz: 4, volumeMl: 120, topDiameter: 62, bottomDiameter: 42, height: 64, commonUse: 'إسبريسو، تذوق' },
      { sizeOz: 6, volumeMl: 180, topDiameter: 73, bottomDiameter: 50, height: 75, commonUse: 'قهوة صغيرة' },
      { sizeOz: 7, volumeMl: 210, topDiameter: 73, bottomDiameter: 50, height: 85, commonUse: 'قهوة صغيرة' },
      { sizeOz: 8, volumeMl: 240, topDiameter: 80, bottomDiameter: 56, height: 92, commonUse: 'قهوة قياسية' },
      { sizeOz: 9, volumeMl: 270, topDiameter: 80, bottomDiameter: 56, height: 98, commonUse: 'قهوة، شاي' },
      { sizeOz: 10, volumeMl: 300, topDiameter: 85, bottomDiameter: 58, height: 105, commonUse: 'قهوة متوسطة' },
      { sizeOz: 12, volumeMl: 360, topDiameter: 90, bottomDiameter: 60, height: 110, commonUse: 'متوسطة، مشروبات مثلجة' },
      { sizeOz: 14, volumeMl: 420, topDiameter: 90, bottomDiameter: 62, height: 125, commonUse: 'قهوة كبيرة' },
      { sizeOz: 16, volumeMl: 480, topDiameter: 90, bottomDiameter: 62, height: 135, commonUse: 'كبيرة، سموذي' },
      { sizeOz: 18, volumeMl: 540, topDiameter: 95, bottomDiameter: 65, height: 140, commonUse: 'حجم كبير جدا' },
      { sizeOz: 20, volumeMl: 600, topDiameter: 95, bottomDiameter: 65, height: 150, commonUse: 'كبير جدا، بارد' },
      { sizeOz: 22, volumeMl: 650, topDiameter: 95, bottomDiameter: 65, height: 160, commonUse: 'مشروبات باردة جامبو' },
    ]
    : sizesEn;

  return (
    <section ref={ref} className="py-16 bg-white">
      <SiteContainer>
        <div className="text-center mb-8">
          <h2
            className={cn(
              'text-2xl lg:text-3xl font-bold text-text-primary mb-2',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
          >
            {isRTL ? 'الأحجام المتوفرة' : 'Available Sizes'}
          </h2>
          <p
            className={cn(
              'text-text-secondary max-w-2xl mx-auto',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '100ms' }}
          >
            {isRTL
              ? 'جميع أنواع الأكواب متوفرة بالمقاسات التالية. غير متأكد من المقاس؟ جرّب أداة ترشيح المقاس بالأسفل.'
              : 'All cup types are available in the following sizes. Not sure which size? Try our size recommender below.'}
          </p>
        </div>

        {/* Visual Size Guide */}
        <div
          className={cn(
            'flex items-end justify-start lg:justify-center gap-4 lg:gap-6 py-8 overflow-x-auto',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '200ms' }}
        >
          {sizes.map((size) => (
            <div key={size.sizeOz} className="flex flex-col items-center">
              <CupSvg height={size.height} />
              <span className="mt-2 text-xs font-medium text-text-primary">{size.sizeOz}{isRTL ? ' أونصة' : 'oz'}</span>
            </div>
          ))}
        </div>

        {/* Size Table */}
        <div
          role="region"
          aria-label="Cup sizes table"
          tabIndex={0}
          className={cn(
            'overflow-x-auto mt-8',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '300ms' }}
        >
          <table className="mx-auto w-full max-w-5xl min-w-[600px] border-collapse bg-white rounded-xl overflow-hidden shadow-md border border-border-light">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th scope="col" className="p-3 text-left text-sm font-semibold">
                  {isRTL ? 'الحجم (أونصة)' : 'Size (oz)'}
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold">
                  {isRTL ? 'السعة (مل)' : 'Volume (ml)'}
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold">
                  {isRTL ? 'القطر العلوي (مم)' : 'Top Diameter (mm)'}
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold">
                  {isRTL ? 'القطر السفلي (مم)' : 'Bottom Diameter (mm)'}
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold">
                  {isRTL ? 'الارتفاع (مم)' : 'Height (mm)'}
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold">
                  {isRTL ? 'الاستخدام الشائع' : 'Common Use'}
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, index) => (
                <tr
                  key={size.sizeOz}
                  className={cn(
                    'hover:bg-bg-secondary transition-colors',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  )}
                >
                  <td className="p-3 text-sm text-text-primary border-b border-border-light font-medium">
                    {size.sizeOz}
                  </td>
                  <td className="p-3 text-sm text-text-secondary border-b border-border-light">
                    {size.volumeMl}
                  </td>
                  <td className="p-3 text-sm text-text-secondary border-b border-border-light">
                    {size.topDiameter}
                  </td>
                  <td className="p-3 text-sm text-text-secondary border-b border-border-light">
                    {size.bottomDiameter}
                  </td>
                  <td className="p-3 text-sm text-text-secondary border-b border-border-light">
                    {size.height}
                  </td>
                  <td className="p-3 text-sm text-text-secondary border-b border-border-light">
                    {size.commonUse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SiteContainer>
    </section>
  );
}
