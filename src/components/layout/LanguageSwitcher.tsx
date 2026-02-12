'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  const targetLang = locale === 'en' ? t('arabic') : t('english');

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg',
        'text-sm font-medium text-text-secondary',
        'hover:bg-bg-secondary transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className
      )}
      aria-label={t('switchTo', { language: targetLang })}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span className="uppercase">{locale === 'en' ? t('ar') : t('en')}</span>
    </button>
  );
}
