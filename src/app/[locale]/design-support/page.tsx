import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Download, Palette, FileCheck, MessageCircle } from 'lucide-react';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { TemplateDownloadCard } from '@/components/content/TemplateDownloadCard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('designSupport.title'),
    description: t('designSupport.description'),
    openGraph: {
      title: t('designSupport.title'),
      description: t('designSupport.description'),
      images: [{ url: '/og/design-support', width: 1200, height: 630 }],
    },
  };
}

const cupTemplates = [
  {
    cupSize: '4oz Espresso',
    formats: [
      { label: 'AI', href: '/templates/4oz-template.ai', size: '1.2 MB' },
      { label: 'PDF', href: '/templates/4oz-template.pdf', size: '0.8 MB' },
      { label: 'PSD', href: '/templates/4oz-template.psd', size: '2.1 MB' },
    ],
  },
  {
    cupSize: '8oz Small',
    formats: [
      { label: 'AI', href: '/templates/8oz-template.ai', size: '1.4 MB' },
      { label: 'PDF', href: '/templates/8oz-template.pdf', size: '0.9 MB' },
      { label: 'PSD', href: '/templates/8oz-template.psd', size: '2.3 MB' },
    ],
  },
  {
    cupSize: '12oz Medium',
    formats: [
      { label: 'AI', href: '/templates/12oz-template.ai', size: '1.6 MB' },
      { label: 'PDF', href: '/templates/12oz-template.pdf', size: '1.0 MB' },
      { label: 'PSD', href: '/templates/12oz-template.psd', size: '2.5 MB' },
    ],
  },
  {
    cupSize: '16oz Large',
    formats: [
      { label: 'AI', href: '/templates/16oz-template.ai', size: '1.8 MB' },
      { label: 'PDF', href: '/templates/16oz-template.pdf', size: '1.1 MB' },
      { label: 'PSD', href: '/templates/16oz-template.psd', size: '2.7 MB' },
    ],
  },
  {
    cupSize: '20oz Extra Large',
    formats: [
      { label: 'AI', href: '/templates/20oz-template.ai', size: '2.0 MB' },
      { label: 'PDF', href: '/templates/20oz-template.pdf', size: '1.2 MB' },
      { label: 'PSD', href: '/templates/20oz-template.psd', size: '2.9 MB' },
    ],
  },
  {
    cupSize: '22oz Cold Drink',
    formats: [
      { label: 'AI', href: '/templates/22oz-template.ai', size: '2.1 MB' },
      { label: 'PDF', href: '/templates/22oz-template.pdf', size: '1.3 MB' },
      { label: 'PSD', href: '/templates/22oz-template.psd', size: '3.0 MB' },
    ],
  },
];

const designProcess = [
  {
    step: 1,
    title: 'Share Your Vision',
    description:
      'Tell us about your brand, share your logo, and describe what you envision for your cups.',
  },
  {
    step: 2,
    title: 'Concept Development',
    description:
      'Our designers create 2-3 concept options based on your brief, incorporating your brand elements.',
  },
  {
    step: 3,
    title: 'Refinement',
    description:
      'We refine your chosen concept based on your feedback until it is perfect.',
  },
  {
    step: 4,
    title: 'Print-Ready Files',
    description:
      'You receive print-ready artwork files with all specifications for production.',
  },
];

const designTips = [
  {
    title: 'Keep It Simple',
    description:
      'Bold, simple designs often look best on cups. Avoid overly intricate patterns that may not print clearly.',
  },
  {
    title: 'Consider the Seam',
    description:
      'Cups have a seam where the paper overlaps. Important elements should avoid this area.',
  },
  {
    title: 'Use High-Resolution Assets',
    description:
      'Provide logos and images at 300 DPI minimum to ensure sharp, clear printing.',
  },
  {
    title: 'Think About Color',
    description:
      'Dark backgrounds use more ink. Consider using your brand colors strategically.',
  },
];

export default async function DesignSupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('designSupport');

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Design Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Free Templates */}
            <div className="bg-bg-secondary rounded-xl p-8 text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-7 h-7 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">
                {t('services.templates.title')}
              </h2>
              <p className="text-text-secondary mb-4">
                {t('services.templates.description')}
              </p>
              <Button variant="secondary" asChild>
                <a href="#templates">Download Templates</a>
              </Button>
            </div>

            {/* Design Assistance */}
            <div className="bg-bg-secondary rounded-xl p-8 text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-7 h-7 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">
                {t('services.assistance.title')}
              </h2>
              <p className="text-text-secondary mb-4">
                {t('services.assistance.description')}
              </p>
              <Button variant="secondary" asChild>
                <Link href="/get-a-quote">Get Started</Link>
              </Button>
            </div>

            {/* Full Design Service */}
            <div className="bg-primary-500 rounded-xl p-8 text-center text-white">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Full Design Service</h2>
              <p className="text-white/90 mb-4">
                {t('services.consultation.description')}
              </p>
              <Button variant="accent" asChild>
                <Link href="/contact">Request Design</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {t('templates.title')}
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              {t('templates.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {cupTemplates.map((template) => (
              <TemplateDownloadCard
                key={template.cupSize}
                cupSize={template.cupSize}
                formats={template.formats}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-text-muted">
              {t('templates.description')}{' '}
              <Link href="/contact" className="text-primary-600 hover:underline">
                {t('cta.button')}
              </Link>{' '}
              {t('templates.formats')}
            </p>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {t('services.title')}
            </h2>
            <p className="text-text-secondary">
              {t('subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designProcess.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Tips */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {t('guidelines.title')}
            </h2>
            <p className="text-text-secondary">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {designTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-lg p-6 border border-border-light"
              >
                <h3 className="font-semibold text-text-primary mb-2">{tip.title}</h3>
                <p className="text-text-secondary text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artwork Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
              {t('guidelines.title')}
            </h2>

            <div className="bg-bg-secondary rounded-xl p-8">
              <h3 className="font-semibold text-text-primary mb-4">
                {t('guidelines.bleed')}
              </h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>
                    <strong>Format:</strong> Vector files preferred (AI, EPS, PDF). High-res
                    raster files (PSD, TIFF) accepted at 300 DPI minimum.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>
                    <strong>Color Mode:</strong> CMYK for offset printing. Pantone
                    references for flexographic printing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>
                    <strong>Bleed:</strong> Include 3mm bleed on all edges that extend to
                    the cup rim or base.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>
                    <strong>Fonts:</strong> Convert all text to outlines/curves to avoid
                    font substitution issues.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>
                    <strong>Maximum File Size:</strong> 50MB per file. Contact us for
                    larger files.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Create Your Custom Cups?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Whether you have a design ready or need our help, we are here to make your
            branded cups a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              asChild
            >
              <Link href="/get-a-quote">Get a Quote</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<MessageCircle className="w-5 h-5" />}
              asChild
            >
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Cup Design Support',
            provider: {
              '@type': 'Organization',
              name: 'Royal Pack',
            },
            description:
              'Free design templates and professional design services for custom paper cups.',
            areaServed: 'UAE, GCC, Middle East',
          }),
        }}
      />
    </RootLayout>
  );
}

