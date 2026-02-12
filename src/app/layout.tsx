import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: '--font-noto-sans-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3001';

export const metadata: Metadata = {
  title: 'Xerostop Cups | Premium Custom Branded Paper Cups',
  description: 'High-quality custom branded paper cups for businesses.',
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
