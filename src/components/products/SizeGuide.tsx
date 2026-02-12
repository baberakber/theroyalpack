'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface SizeData {
  sizeOz: number;
  volumeMl: number;
  topDiameter: number;
  bottomDiameter: number;
  height: number;
  commonUse: string;
}

const sizes: SizeData[] = [
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
function CupSvg({ sizeOz, height: cupHeight }: { sizeOz: number; height: number }) {
  // Scale factor based on the largest cup (160mm for 22oz)
  const scale = cupHeight / 160;
  const svgHeight = 80 * scale;
  const svgWidth = 50 * scale;

  return (
    <div className="flex flex-col items-center">
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
      <span className="mt-2 text-xs font-medium text-text-primary">{sizeOz}oz</span>
    </div>
  );
}

export function SizeGuide() {
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
            Available Sizes
          </h2>
          <p
            className={cn(
              'text-text-secondary max-w-2xl mx-auto',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '100ms' }}
          >
            All cup types are available in the following sizes. Not sure which size?
            Try our size recommender below.
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
            <CupSvg key={size.sizeOz} sizeOz={size.sizeOz} height={size.height} />
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
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-bg-secondary">
                <th scope="col" className="p-3 text-left text-sm font-semibold text-text-primary border-b border-border-light">
                  Size (oz)
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold text-text-primary border-b border-border-light">
                  Volume (ml)
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold text-text-primary border-b border-border-light">
                  Top Diameter (mm)
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold text-text-primary border-b border-border-light">
                  Bottom Diameter (mm)
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold text-text-primary border-b border-border-light">
                  Height (mm)
                </th>
                <th scope="col" className="p-3 text-left text-sm font-semibold text-text-primary border-b border-border-light">
                  Common Use
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
      </div>
    </section>
  );
}
