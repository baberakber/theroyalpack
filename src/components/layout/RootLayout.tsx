'use client';

import { type ReactNode } from 'react';
import { SkipLink } from './SkipLink';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { ToastProvider } from '@/components/ui/Toast';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ToastProvider>
      <SkipLink />
      <Header />
      <main id="main-content" className="min-h-screen pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </ToastProvider>
  );
}
