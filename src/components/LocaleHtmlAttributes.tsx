'use client';

import { useEffect } from 'react';

interface LocaleHtmlAttributesProps {
  locale: string;
  children: React.ReactNode;
}

/** Sets document lang and dir from locale (for when root layout owns <html>). */
export function LocaleHtmlAttributes({ locale, children }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
  }, [locale]);

  return <>{children}</>;
}
