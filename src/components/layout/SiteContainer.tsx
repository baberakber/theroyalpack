import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SiteContainer({ children, className }: SiteContainerProps) {
  return (
    <div className={cn('mx-auto w-[min(90vw,1280px)] px-4', className)}>
      {children}
    </div>
  );
}

