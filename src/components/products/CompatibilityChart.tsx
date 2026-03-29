'use client';

import { Check, X } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

interface CompatibilityRow {
  cupSize: string;
  flatLid: boolean;
  domeLid: boolean;
  sipLid: boolean;
  paperLid: boolean;
  sleeve: boolean;
  carrier2: boolean;
  carrier4: boolean;
}

type AccessoryKey = keyof Omit<CompatibilityRow, 'cupSize'>;
type CompatibilityColumn = { key: AccessoryKey; label: string };

const compatibilityDataEn: CompatibilityRow[] = [
  {
    cupSize: '2.5oz',
    flatLid: false,
    domeLid: false,
    sipLid: false,
    paperLid: false,
    sleeve: false,
    carrier2: false,
    carrier4: false,
  },
  {
    cupSize: '4oz',
    flatLid: false,
    domeLid: false,
    sipLid: false,
    paperLid: false,
    sleeve: false,
    carrier2: true,
    carrier4: true,
  },
  {
    cupSize: '6-7oz',
    flatLid: false,
    domeLid: false,
    sipLid: false,
    paperLid: false,
    sleeve: false,
    carrier2: true,
    carrier4: true,
  },
  {
    cupSize: '8oz',
    flatLid: true,
    domeLid: false,
    sipLid: true,
    paperLid: true,
    sleeve: true,
    carrier2: true,
    carrier4: true,
  },
  {
    cupSize: '9-10oz',
    flatLid: true,
    domeLid: false,
    sipLid: true,
    paperLid: true,
    sleeve: true,
    carrier2: true,
    carrier4: true,
  },
  {
    cupSize: '12oz',
    flatLid: true,
    domeLid: true,
    sipLid: true,
    paperLid: true,
    sleeve: true,
    carrier2: true,
    carrier4: true,
  },
  {
    cupSize: '14-16oz',
    flatLid: true,
    domeLid: true,
    sipLid: true,
    paperLid: true,
    sleeve: true,
    carrier2: true,
    carrier4: true,
  },
  {
    cupSize: '18-22oz',
    flatLid: true,
    domeLid: true,
    sipLid: false,
    paperLid: false,
    sleeve: false,
    carrier2: false,
    carrier4: true,
  },
];

function CompatibilityCell({
  compatible,
  accessory,
  cupSize,
  isRTL,
}: {
  compatible: boolean;
  accessory: string;
  cupSize: string;
  isRTL: boolean;
}) {
  const label = compatible
    ? (isRTL ? `${accessory} متوافق مع كوب ${cupSize}` : `${accessory} compatible with ${cupSize} cup`)
    : (isRTL ? `${accessory} غير متوافق مع كوب ${cupSize}` : `${accessory} not compatible with ${cupSize} cup`);

  return (
    <td className="p-3 text-center border-b border-border-light">
      {compatible ? (
        <span className="inline-flex items-center justify-center text-success" aria-label={label}>
          <Check className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">{isRTL ? 'متوافق' : 'Compatible'}</span>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center text-text-muted" aria-label={label}>
          <X className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">{isRTL ? 'غير متوافق' : 'Not compatible'}</span>
        </span>
      )}
    </td>
  );
}

export function CompatibilityChart() {
  const { ref, isVisible } = useScrollAnimation();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const compatibilityData = (isRTL
    ? [
      { ...compatibilityDataEn[0], cupSize: '2.5 أونصة' },
      { ...compatibilityDataEn[1], cupSize: '4 أونصة' },
      { ...compatibilityDataEn[2], cupSize: '6-7 أونصة' },
      { ...compatibilityDataEn[3], cupSize: '8 أونصة' },
      { ...compatibilityDataEn[4], cupSize: '9-10 أونصة' },
      { ...compatibilityDataEn[5], cupSize: '12 أونصة' },
      { ...compatibilityDataEn[6], cupSize: '14-16 أونصة' },
      { ...compatibilityDataEn[7], cupSize: '18-22 أونصة' },
    ]
    : compatibilityDataEn);
  const columns: CompatibilityColumn[] = isRTL
    ? [
      { key: 'flatLid', label: 'غطاء مسطح' },
      { key: 'domeLid', label: 'غطاء قُبّبي' },
      { key: 'sipLid', label: 'غطاء رشف' },
      { key: 'paperLid', label: 'غطاء ورقي' },
      { key: 'sleeve', label: 'غلاف' },
      { key: 'carrier2', label: 'حامل كوبين' },
      { key: 'carrier4', label: 'حامل 4 أكواب' },
    ]
    : [
      { key: 'flatLid', label: 'Flat Lid' },
      { key: 'domeLid', label: 'Dome Lid' },
      { key: 'sipLid', label: 'Sip Lid' },
      { key: 'paperLid', label: 'Paper Lid' },
      { key: 'sleeve', label: 'Sleeve' },
      { key: 'carrier2', label: '2-Cup Carrier' },
      { key: 'carrier4', label: '4-Cup Carrier' },
    ];

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2
            className={cn(
              'text-2xl lg:text-3xl font-bold text-text-primary mb-2',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
          >
            {isRTL ? 'دليل التوافق بين الأكواب والإكسسوارات' : 'What Fits What - Compatibility Guide'}
          </h2>
          <p
            className={cn(
              'text-text-secondary',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '100ms' }}
          >
            {isRTL ? 'مرجع سريع لاختيار الإكسسوارات المناسبة لمقاس كوبك.' : 'Quick reference to find the right accessories for your cup size.'}
          </p>
        </div>

        <div
          role="region"
          aria-label={isRTL ? 'جدول توافق الإكسسوارات' : 'Accessories compatibility chart'}
          tabIndex={0}
          className={cn(
            'overflow-x-auto',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '200ms' }}
        >
          <table className="w-full min-w-[700px] border-collapse bg-white rounded-xl overflow-hidden shadow-md border border-border-light">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th
                  scope="col"
                  className="p-3 text-left text-sm font-semibold sticky left-0 bg-primary-500 z-10"
                >
                  {isRTL ? 'مقاس الكوب' : 'Cup Size'}
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className="p-3 text-center text-sm font-semibold"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compatibilityData.map((row, index) => (
                <tr
                  key={row.cupSize}
                  className={cn(
                    'hover:bg-bg-secondary transition-colors',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  )}
                >
                  <th
                    scope="row"
                    className={cn(
                      'p-3 text-left text-sm font-medium text-text-primary border-b border-border-light',
                      'sticky left-0 z-10',
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                      'hover:bg-bg-secondary'
                    )}
                  >
                    {row.cupSize}
                  </th>
                  {columns.map((col) => (
                    <CompatibilityCell
                      key={col.key}
                      compatible={row[col.key]}
                      accessory={col.label}
                      cupSize={row.cupSize}
                      isRTL={isRTL}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
