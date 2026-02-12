'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { DropdownMenu } from './DropdownMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { Link } from '@/i18n/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations();

  const navItems = [
    {
      label: t('nav.products.label'),
      href: '/products',
      children: [
        { label: t('nav.products.paperCups'), href: '/products/paper-cups', description: t('nav.products.paperCupsDesc') },
        { label: t('nav.products.cupSleeves'), href: '/products/cup-sleeves', description: t('nav.products.cupSleevesDesc') },
        { label: t('nav.products.lids'), href: '/products/lids', description: t('nav.products.lidsDesc') },
        { label: t('nav.products.accessories'), href: '/products/accessories', description: t('nav.products.accessoriesDesc') },
      ],
    },
    {
      label: t('nav.industries.label'),
      href: '/industries',
      children: [
        { label: t('nav.industries.cafes'), href: '/industries/cafes' },
        { label: t('nav.industries.restaurants'), href: '/industries/restaurants' },
        { label: t('nav.industries.hotels'), href: '/industries/hotels' },
        { label: t('nav.industries.events'), href: '/industries/events' },
        { label: t('nav.industries.corporate'), href: '/industries/corporate' },
      ],
    },
    { label: t('nav.gallery'), href: '/gallery' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-sticky',
          'transition-all duration-300',
          'h-16 lg:h-20',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white'
        )}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
            >
              <Image
                src="/logo.svg"
                alt={t('common.siteName')}
                width={140}
                height={40}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) =>
                item.children ? (
                  <DropdownMenu
                    key={item.href}
                    trigger={item.label}
                    items={item.children}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3 py-2 rounded-lg',
                      'text-sm font-medium text-text-primary',
                      'hover:bg-bg-secondary transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <Link href="/get-a-quote">
                <Button variant="accent" size="sm">
                  {t('common.getQuote')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'lg:hidden p-2 rounded-lg',
                'hover:bg-bg-secondary transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
              )}
              aria-label={t('common.openMenu')}
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6 text-text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
