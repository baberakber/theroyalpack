'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = '971501234567',
  message = 'Hello! I am interested in custom paper cups.',
  className,
}: WhatsAppButtonProps) {
  const t = useTranslations('whatsapp');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 z-fixed',
        isRTL ? 'left-6' : 'right-6',
        'flex items-center justify-center',
        'w-14 h-14 rounded-full',
        'bg-[#25D366] hover:bg-[#20BD5A]',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-200',
        'hover:scale-110',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2',
        className
      )}
      aria-label={t('ariaLabel')}
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  );
}
