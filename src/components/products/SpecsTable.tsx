'use client';

import { Check, X } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface SpecRow {
  spec: string;
  singleWall: string | boolean;
  doubleWall: string | boolean;
  rippleWall: string | boolean;
}

const specs: SpecRow[] = [
  { spec: 'Wall Layers', singleWall: '1', doubleWall: '2', rippleWall: '1 + ripple wrap' },
  { spec: 'Paper Weight (gsm)', singleWall: '190-260', doubleWall: '2 x 190', rippleWall: '250 + 120 (ripple)' },
  { spec: 'Insulation', singleWall: 'Low', doubleWall: 'High', rippleWall: 'Highest' },
  { spec: 'Sleeve Needed?', singleWall: 'Yes (hot)', doubleWall: 'No', rippleWall: 'No' },
  { spec: 'PE Coating', singleWall: 'Inside', doubleWall: 'Inside', rippleWall: 'Inside' },
  { spec: 'Food Safe', singleWall: true, doubleWall: true, rippleWall: true },
  { spec: 'Microwave Safe', singleWall: false, doubleWall: false, rippleWall: false },
  { spec: 'Recyclable', singleWall: 'Check local', doubleWall: 'Check local', rippleWall: 'Check local' },
  { spec: 'MOQ', singleWall: '1,000 pcs', doubleWall: '1,000 pcs', rippleWall: '1,000 pcs' },
  { spec: 'Lead Time', singleWall: '7-14 days', doubleWall: '10-18 days', rippleWall: '10-18 days' },
];

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex items-center text-success">
        <Check className="w-5 h-5" aria-hidden="true" />
        <span className="sr-only">Yes</span>
      </span>
    ) : (
      <span className="inline-flex items-center text-text-muted">
        <X className="w-5 h-5" aria-hidden="true" />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span>{value}</span>;
}

export function SpecsTable() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 bg-bg-secondary">
      <div className="container mx-auto px-4">
        <h2
          className={cn(
            'text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
        >
          Technical Specifications
        </h2>

        <div
          role="region"
          aria-label="Technical specifications table"
          tabIndex={0}
          className={cn(
            'overflow-x-auto',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
          style={{ animationDelay: '100ms' }}
        >
          <table className="w-full min-w-[500px] border-collapse bg-white rounded-xl overflow-hidden shadow-md">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th scope="col" className="p-4 text-left text-sm font-semibold">
                  Specification
                </th>
                <th scope="col" className="p-4 text-center text-sm font-semibold">
                  Single-Wall
                </th>
                <th scope="col" className="p-4 text-center text-sm font-semibold">
                  Double-Wall
                </th>
                <th scope="col" className="p-4 text-center text-sm font-semibold">
                  Ripple-Wall
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((row, index) => (
                <tr
                  key={row.spec}
                  className={cn(
                    'hover:bg-bg-secondary transition-colors',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  )}
                >
                  <th scope="row" className="p-4 text-left text-sm font-medium text-text-primary border-b border-border-light">
                    {row.spec}
                  </th>
                  <td className="p-4 text-center text-sm text-text-secondary border-b border-border-light">
                    <CellValue value={row.singleWall} />
                  </td>
                  <td className="p-4 text-center text-sm text-text-secondary border-b border-border-light">
                    <CellValue value={row.doubleWall} />
                  </td>
                  <td className="p-4 text-center text-sm text-text-secondary border-b border-border-light">
                    <CellValue value={row.rippleWall} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
