'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ChevronRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Link } from '@/i18n/navigation';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-modal">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        {/* Panel */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom={isRTL ? '-translate-x-full' : 'translate-x-full'}
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo={isRTL ? '-translate-x-full' : 'translate-x-full'}
        >
          <Dialog.Panel
            className={cn(
              "fixed inset-y-0 w-full max-w-sm bg-white shadow-xl",
              isRTL ? "left-0" : "right-0"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-border-light">
                <Dialog.Title className="text-lg font-semibold text-text-primary">
                  {t('openMenu')}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className={cn(
                    'p-2 rounded-lg',
                    'hover:bg-bg-secondary transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  )}
                  aria-label={t('closeMenu')}
                >
                  <X className="h-6 w-6 text-text-primary" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      {item.children ? (
                        <MobileNavGroup item={item} onClose={onClose} isRTL={isRTL} />
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center px-4 py-3 rounded-lg',
                            'text-text-primary font-medium',
                            'hover:bg-bg-secondary transition-colors'
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border-light space-y-4">
                <LanguageSwitcher className="w-full justify-center" />
                <Link href="/get-a-quote" onClick={onClose}>
                  <Button className="w-full" variant="accent">
                    {t('getQuote')}
                  </Button>
                </Link>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

interface MobileNavGroupProps {
  item: NavItem;
  onClose: () => void;
  isRTL: boolean;
}

function MobileNavGroup({ item, onClose, isRTL }: MobileNavGroupProps) {
  return (
    <details className="group">
      <summary
        className={cn(
          'flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer',
          'text-text-primary font-medium',
          'hover:bg-bg-secondary transition-colors',
          'list-none [&::-webkit-details-marker]:hidden'
        )}
      >
        {item.label}
        <ChevronRight
          className={cn(
            "h-5 w-5 text-text-muted transition-transform group-open:rotate-90",
            isRTL && "rotate-180 group-open:-rotate-90"
          )}
        />
      </summary>
      <ul className="mt-1 space-y-1 ms-4">
        {item.children?.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onClick={onClose}
              className={cn(
                'block px-4 py-2.5 rounded-lg',
                'text-text-secondary',
                'hover:bg-bg-secondary hover:text-text-primary transition-colors'
              )}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
