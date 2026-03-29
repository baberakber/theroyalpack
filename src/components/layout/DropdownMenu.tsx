'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  isSubItem?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
}

export function DropdownMenu({ trigger, items, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          'inline-flex items-center gap-1 px-3 py-2 rounded-lg',
          'text-sm font-medium text-text-primary',
          'hover:bg-bg-secondary transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
        )}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          'absolute top-full start-0 mt-1 min-w-[220px]',
          'bg-white rounded-xl shadow-lg border border-border-light',
          'py-2 z-[90]',
          'transition-all duration-200 origin-top-left rtl:origin-top-right',
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2.5 text-sm',
              'text-text-primary hover:bg-bg-secondary',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:bg-bg-secondary',
              item.isSubItem && 'ps-8 text-[13px]'
            )}
          >
            <span className="font-medium">{item.label}</span>
            {item.description && (
              <span className="block text-xs text-text-muted mt-0.5">
                {item.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
