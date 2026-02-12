'use client';

import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

const socialLinks = [
  { key: 'facebook', href: 'https://facebook.com', icon: Facebook },
  { key: 'instagram', href: 'https://instagram.com', icon: Instagram },
  { key: 'linkedin', href: 'https://linkedin.com', icon: Linkedin },
  { key: 'twitter', href: 'https://twitter.com', icon: Twitter },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();

  const footerLinks = {
    products: {
      title: t('footer.products'),
      links: [
        { label: t('nav.products.paperCups'), href: '/products/paper-cups' },
        { label: t('nav.products.cupSleeves'), href: '/products/cup-sleeves' },
        { label: t('nav.products.lids'), href: '/products/lids' },
        { label: t('nav.products.accessories'), href: '/products/accessories' },
      ],
    },
    company: {
      title: t('footer.company'),
      links: [
        { label: t('footer.aboutUs'), href: '/about' },
        { label: t('footer.sustainability'), href: '/sustainability' },
        { label: t('nav.industries'), href: '/industries' },
        { label: t('nav.designSupport'), href: '/design-support' },
      ],
    },
    getStarted: {
      title: t('footer.getStarted'),
      links: [
        { label: t('footer.requestQuote'), href: '/get-a-quote' },
        { label: t('footer.contactUs'), href: '/contact' },
        { label: t('footer.faq'), href: '/faq' },
        { label: t('footer.gallery'), href: '/gallery' },
      ],
    },
  };

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-white.svg"
                alt={t('common.siteName')}
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              {t('footer.description')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'p-2 rounded-lg bg-gray-800 hover:bg-gray-700',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  )}
                  aria-label={t(`footer.social.${social.key}`)}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{footerLinks.products.title}</h3>
            <ul className="space-y-3">
              {footerLinks.products.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{footerLinks.company.title}</h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{footerLinks.getStarted.title}</h3>
            <ul className="space-y-3">
              {footerLinks.getStarted.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t('footer.contactUs')}
              </Link>
              <Link
                href="/faq"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t('footer.faq')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
