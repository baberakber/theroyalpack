import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { RootLayout } from '@/components/layout/RootLayout';
import {
  HeroSection,
  TrustBar,
  WhatWeDoSection,
  WhyXerostopSection,
  CtaBanner,
} from '@/components/home';

const MiniGallery = dynamic(
  () => import('@/components/home/MiniGallery').then((mod) => mod.MiniGallery)
);
const IndustriesPreview = dynamic(
  () => import('@/components/home/IndustriesPreview').then((mod) => mod.IndustriesPreview)
);

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
