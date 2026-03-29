'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { SiteContainer } from '@/components/layout/SiteContainer';
import { useLocale } from 'next-intl';

interface ComparisonRow {
  feature: string;
  singleWall: number; // 1-3 scale
  doubleWall: number;
  rippleWall: number;
  singleBest?: string;
  doubleBest?: string;
  rippleBest?: string;
}

const comparisonsEn: ComparisonRow[] = [
  { feature: 'Budget-friendly', singleWall: 3, doubleWall: 1, rippleWall: 1 },
  { feature: 'Hot drink insulation', singleWall: 1, doubleWall: 3, rippleWall: 3 },
  { feature: 'No sleeve required', singleWall: 0, doubleWall: 3, rippleWall: 3 },
  { feature: 'Premium feel', singleWall: 1, doubleWall: 2, rippleWall: 3 },
  { feature: 'Print area quality', singleWall: 2, doubleWall: 2, rippleWall: 3 },
  { feature: 'Eco-friendly options', singleWall: 1, doubleWall: 1, rippleWall: 1 },
];

const bestForEn = {
  singleWall: 'Water coolers, events',
  doubleWall: 'Cafes, offices',
  rippleWall: 'Premium cafes, hotels',
};

function RatingDots({ count }: { count: number }) {
  if (count === 0) {
    return (
      <span className="text-text-muted text-lg" aria-label="Not applicable">
        -
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1" aria-label={`${count} out of 3`}>
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          className={cn(
            'w-3 h-3 rounded-full',
            dot <= count ? 'bg-primary-500' : 'bg-gray-200'
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ComparisonTable() {
  const { ref, isVisible } = useScrollAnimation();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const comparisons = isRTL
    ? [
      { feature: 'مناسب للميزانية', singleWall: 3, doubleWall: 1, rippleWall: 1 },
      { feature: 'عزل المشروبات الساخنة', singleWall: 1, doubleWall: 3, rippleWall: 3 },
      { feature: 'لا يحتاج غلافا إضافيا', singleWall: 0, doubleWall: 3, rippleWall: 3 },
      { feature: 'إحساس فاخر', singleWall: 1, doubleWall: 2, rippleWall: 3 },
      { feature: 'جودة مساحة الطباعة', singleWall: 2, doubleWall: 2, rippleWall: 3 },
      { feature: 'خيارات صديقة للبيئة', singleWall: 1, doubleWall: 1, rippleWall: 1 },
    ]
    : comparisonsEn;
  const bestFor = isRTL
    ? { singleWall: 'مبردات المياه، الفعاليات', doubleWall: 'المقاهي، المكاتب', rippleWall: 'المقاهي الراقية، الفنادق' }
    : bestForEn;

  return (
    <section ref={ref} className="py-16 bg-white">
      <SiteContainer>
        <h2
          className={cn(
            'text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
        >
          {isRTL ? 'أي نوع كوب مناسب لك؟' : 'Which Cup Type Is Right for You?'}
        </h2>

        <div
          role="region"
          aria-label="Cup type comparison table"
          tabIndex={0}
          className={cn(
            'overflow-x-auto',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '100ms' }}
        >
          <table className="mx-auto w-full max-w-5xl min-w-[500px] border-collapse bg-white rounded-xl overflow-hidden shadow-md border border-border-light">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th scope="col" className="p-4 text-left text-sm font-semibold">
                  {isRTL ? 'الميزة' : 'Feature'}
                </th>
                <th scope="col" className="p-4 text-center text-sm font-semibold">
                  {isRTL ? 'جدار واحد' : 'Single-Wall'}
                </th>
                <th scope="col" className="p-4 text-center text-sm font-semibold">
                  {isRTL ? 'جدار مزدوج' : 'Double-Wall'}
                </th>
                <th scope="col" className="p-4 text-center text-sm font-semibold">
                  {isRTL ? 'جدار متموج' : 'Ripple-Wall'}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr
                  key={row.feature}
                  className={cn(
                    'hover:bg-bg-secondary transition-colors',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  )}
                >
                  <th scope="row" className="p-4 text-left text-sm font-medium text-text-primary border-b border-border-light">
                    {row.feature}
                  </th>
                  <td className="p-4 text-center border-b border-border-light">
                    <RatingDots count={row.singleWall} />
                  </td>
                  <td className="p-4 text-center border-b border-border-light">
                    <RatingDots count={row.doubleWall} />
                  </td>
                  <td className="p-4 text-center border-b border-border-light">
                    <RatingDots count={row.rippleWall} />
                  </td>
                </tr>
              ))}
              {/* Best For Row */}
              <tr className="bg-primary-50">
                <th scope="row" className="p-4 text-left text-sm font-semibold text-text-primary">
                  {isRTL ? 'الأنسب لـ' : 'Best for'}
                </th>
                <td className="p-4 text-center text-sm text-text-secondary font-medium">
                  {bestFor.singleWall}
                </td>
                <td className="p-4 text-center text-sm text-text-secondary font-medium">
                  {bestFor.doubleWall}
                </td>
                <td className="p-4 text-center text-sm text-text-secondary font-medium">
                  {bestFor.rippleWall}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SiteContainer>
    </section>
  );
}
