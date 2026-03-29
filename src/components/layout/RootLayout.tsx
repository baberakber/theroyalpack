'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { SkipLink } from './SkipLink';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastProvider } from '@/components/ui/Toast';

const WhatsAppButton = dynamic(
  () => import('./WhatsAppButton').then((mod) => mod.WhatsAppButton),
  { ssr: false }
);

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ToastProvider>
      <SkipLink />
      <Header />
      <main id="main-content" className="min-h-screen pt-20 lg:pt-24">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </ToastProvider>
  );
}
