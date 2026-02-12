import { setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import {
  HeroSection,
  TrustBar,
  WhatWeDoSection,
  WhyXerostopSection,
  MiniGallery,
  IndustriesPreview,
  CtaBanner,
} from '@/components/home';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <RootLayout>
      <HeroSection />
      <TrustBar />
      <WhatWeDoSection />
      <WhyXerostopSection />
      <MiniGallery />
      <IndustriesPreview />
      <CtaBanner />
    </RootLayout>
  );
}
