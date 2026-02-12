'use client';

import { Check, X } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

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

const compatibilityData: CompatibilityRow[] = [
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

const columns = [
  { key: 'flatLid', label: 'Flat Lid' },
  { key: 'domeLid', label: 'Dome Lid' },
  { key: 'sipLid', label: 'Sip Lid' },
  { key: 'paperLid', label: 'Paper Lid' },
  { key: 'sleeve', label: 'Sleeve' },
  { key: 'carrier2', label: '2-Cup Carrier' },
  { key: 'carrier4', label: '4-Cup Carrier' },
] as const;

function CompatibilityCell({
  compatible,
  accessory,
  cupSize,
}: {
  compatible: boolean;
  accessory: string;
  cupSize: string;
}) {
  const label = compatible
    ? `${accessory} compatible with ${cupSize} cup`
    : `${accessory} not compatible with ${cupSize} cup`;

  return (
    <td className="p-3 text-center border-b border-border-light">
      {compatible ? (
        <span className="inline-flex items-center justify-center text-success" aria-label={label}>
          <Check className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Compatible</span>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center text-text-muted" aria-label={label}>
          <X className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Not compatible</span>
        </span>
      )}
    </td>
  );
}

export function CompatibilityChart() {
  const { ref, isVisible } = useScrollAnimation();

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
            What Fits What — Compatibility Guide
          </h2>
          <p
            className={cn(
              'text-text-secondary',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '100ms' }}
          >
            Quick reference to find the right accessories for your cup size.
          </p>
        </div>

        <div
          role="region"
          aria-label="Accessories compatibility chart"
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
                  Cup Size
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
