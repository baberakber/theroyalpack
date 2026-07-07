'use client';

import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { SiteContainer } from '@/components/layout/SiteContainer';

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
        { label: t('nav.industries.label'), href: '/industries' },
        { label: t('nav.designSupport'), href: '/design-support' },
      ],
    },
    getStarted: {
      title: t('footer.getStarted'),
      links: [
        { label: t('footer.requestQuote'), href: '/get-a-quote' },
        { label: t('nav.demo'), href: '/demo' },
        { label: t('footer.contactUs'), href: '/contact' },
        { label: t('footer.faq'), href: '/faq' },
        { label: t('footer.gallery'), href: '/gallery' },
      ],
    },
  };

  return (
    <footer className="bg-zinc-950 text-white">
      {/* Main Footer */}
      <SiteContainer className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column - wider */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/Logo-RoyalPack.png"
                alt={t('common.siteName')}
                width={1024}
                height={960}
                unoptimized
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-800',
                    'hover:bg-zinc-800 hover:border-zinc-700',
                    'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  )}
                  aria-label={t(`footer.social.${social.key}`)}
                >
                  <social.icon className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-300 mb-5">
              {footerLinks.products.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-300 mb-5">
              {footerLinks.company.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Column */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-300 mb-5">
              {footerLinks.getStarted.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.getStarted.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SiteContainer>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800/80">
        <SiteContainer className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">
              &copy; {currentYear} {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="text-zinc-500 hover:text-white transition-colors duration-300 text-sm"
              >
                {t('footer.contactUs')}
              </Link>
              <Link
                href="/faq"
                className="text-zinc-500 hover:text-white transition-colors duration-300 text-sm"
              >
                {t('footer.faq')}
              </Link>
            </div>
          </div>
        </SiteContainer>
      </div>
    </footer>
  );
}
