'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { SiteContainer } from '@/components/layout/SiteContainer';

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
    <section className="py-10 bg-white border-y border-border-light/60 overflow-hidden">
      <SiteContainer>
        <p className="text-center text-xs text-text-muted mb-8 uppercase tracking-[0.2em] font-medium">
          {t('title')}
        </p>
      </SiteContainer>

      {/* Desktop: spaced row with dividers */}
      <SiteContainer className="hidden md:block">
        <div className="flex items-center justify-center divide-x divide-border-light">
          {clients.map((client) => (
            <ClientLogo key={client.id} name={client.name} />
          ))}
        </div>
      </SiteContainer>

      {/* Mobile: smooth marquee */}
      <div className="md:hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-marquee">
          {clients.map((client) => (
            <ClientLogo key={`first-${client.id}`} name={client.name} className="mx-5" />
          ))}
          {clients.map((client) => (
            <ClientLogo key={`second-${client.id}`} name={client.name} className="mx-5" />
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
        'flex-shrink-0 px-8 py-2',
        'opacity-40 hover:opacity-100',
        'transition-opacity duration-300',
        className
      )}
    >
      <span className="text-lg font-semibold text-text-primary whitespace-nowrap tracking-tight">
        {name}
      </span>
    </div>
  );
}
