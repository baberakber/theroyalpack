'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const clients = [
  { name: 'Coffee House', id: 1 },
  { name: 'Brew Bros', id: 2 },
  { name: 'Cafe Central', id: 3 },
  { name: 'Urban Grind', id: 4 },
  { name: 'Bean & Leaf', id: 5 },
  { name: 'Morning Cup', id: 6 },
];

export function TrustBar() {
  const t = useTranslations('home.trustBar');

  return (
    <section className="py-12 bg-bg-secondary border-y border-border-light overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-text-muted mb-8 uppercase tracking-wider font-medium">
          {t('title')}
        </p>
      </div>

      {/* Desktop: Static grid */}
      <div className="hidden md:block container mx-auto px-4">
        <div className="flex items-center justify-center gap-12 lg:gap-16">
          {clients.map((client) => (
            <ClientLogo key={client.id} name={client.name} />
          ))}
        </div>
      </div>

      {/* Mobile: Marquee */}
      <div className="md:hidden relative">
        <div className="flex animate-marquee">
          {/* First set */}
          {clients.map((client) => (
            <ClientLogo key={`first-${client.id}`} name={client.name} className="mx-6" />
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((client) => (
            <ClientLogo key={`second-${client.id}`} name={client.name} className="mx-6" />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ClientLogoProps {
  name: string;
  className?: string;
}

function ClientLogo({ name, className }: ClientLogoProps) {
  return (
    <div
      className={cn(
        'flex-shrink-0 px-6 py-3 rounded-lg',
        'bg-white border border-border-light',
        'grayscale hover:grayscale-0 transition-all duration-300',
        'hover:shadow-sm',
        className
      )}
    >
      <span className="text-lg font-semibold text-text-secondary whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
