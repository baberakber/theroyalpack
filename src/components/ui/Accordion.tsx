'use client';

import { useState, createContext, useContext, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  children,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (allowMultiple) {
        return [...prev, id];
      }
      return [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className={cn('divide-y divide-border-light', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ id, children, className }: AccordionItemProps) {
  return (
    <div className={cn('py-4', className)} data-accordion-item={id}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ id, children, className }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.includes(id);

  return (
    <button
      type="button"
      onClick={() => toggleItem(id)}
      className={cn(
        'flex w-full items-center justify-between text-left',
        'font-medium text-text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded',
        className
      )}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${id}`}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-5 w-5 text-text-muted transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
        aria-hidden="true"
      />
    </button>
  );
}

interface AccordionContentProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ id, children, className }: AccordionContentProps) {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(id);

  return (
    <div
      id={`accordion-content-${id}`}
      role="region"
      aria-labelledby={`accordion-trigger-${id}`}
      className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
      )}
    >
      <div className={cn('text-text-secondary', className)}>{children}</div>
    </div>
  );
}
