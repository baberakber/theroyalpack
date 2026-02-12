'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight, Leaf, Recycle, TreeDeciduous, Droplets } from 'lucide-react';
import { RootLayout } from '@/components/layout/RootLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { SustainabilityTimeline } from '@/components/content/SustainabilityTimeline';
import { useTranslations } from 'next-intl';

const ecoInitiatives = [
  {
    icon: TreeDeciduous,
    title: 'FSC-Certified Paper',
    description:
      'All our paper comes from responsibly managed forests. FSC certification ensures sustainable forestry practices.',
    stat: '100%',
    statLabel: 'FSC certified since 2021',
  },
  {
    icon: Leaf,
    title: 'PLA Lining Option',
    description:
      'Our PLA-lined cups use plant-based materials instead of petroleum-based PE, making them industrially compostable.',
    stat: '40%',
    statLabel: 'of orders now choose PLA',
  },
  {
    icon: Droplets,
    title: 'Water-Based Inks',
    description:
      'We use water-based inks for printing, reducing VOC emissions and making cups safer for composting.',
    stat: '100%',
    statLabel: 'water-based printing',
  },
  {
    icon: Recycle,
    title: 'Waste Reduction',
    description:
      'Our production process minimizes waste through efficient cutting patterns and paper offcut recycling programs.',
    stat: '95%',
    statLabel: 'waste diverted from landfill',
  },
];

const sustainabilityMilestones = [
  {
    year: 2019,
    milestone: 'Introduced PLA-lined cups as an eco-friendly alternative',
    isPast: true,
  },
  {
    year: 2020,
    milestone: 'Transitioned to 100% water-based inks for all printing',
    isPast: true,
  },
  {
    year: 2021,
    milestone: 'Achieved FSC Chain of Custody certification',
    isPast: true,
  },
  {
    year: 2023,
    milestone: 'Launched paper lid option to reduce plastic usage',
    isPast: true,
  },
  {
    year: 2025,
    milestone: 'Target: 60% of orders using fully compostable options',
    isPast: false,
  },
  {
    year: 2027,
    milestone: 'Goal: Carbon neutral manufacturing operations',
    isPast: false,
  },
];

const productComparison = [
  {
    feature: 'Material Source',
    standard: 'FSC-certified paper',
    eco: 'FSC-certified paper',
  },
  {
    feature: 'Inner Lining',
    standard: 'PE (Polyethylene)',
    eco: 'PLA (Plant-based)',
  },
  {
    feature: 'Recyclability',
    standard: 'Limited (specialized facilities)',
    eco: 'Industrially compostable',
  },
  {
    feature: 'Printing Inks',
    standard: 'Water-based',
    eco: 'Water-based',
  },
  {
    feature: 'Lid Options',
    standard: 'Plastic or paper',
    eco: 'Paper or PLA',
  },
  {
    feature: 'Best For',
    standard: 'Cost-effective everyday use',
    eco: 'Eco-conscious brands',
  },
];

export default function SustainabilityPage() {
  const t = useTranslations('sustainability');
  return (
    <RootLayout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-eco-50 to-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: t('title') }]} />
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-eco-100 rounded-full mb-6">
              <Leaf className="w-8 h-8 text-eco-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Eco Initiatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {t('initiatives.title')}
            </h2>
            <p className="text-text-secondary">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecoInitiatives.map((initiative) => (
              <div
                key={initiative.title}
                className="bg-bg-secondary rounded-xl p-8 flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-eco-100 rounded-full flex items-center justify-center">
                    <initiative.icon className="w-7 h-7 text-eco-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {initiative.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-eco-600">
                      {initiative.stat}
                    </span>
                    <span className="text-sm text-text-muted">{initiative.statLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Comparison */}
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {t('title')}
            </h2>
            <p className="text-text-secondary">
              {t('subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary-500 text-white">
                  <th className="py-4 px-6 text-left font-semibold">Feature</th>
                  <th className="py-4 px-6 text-center font-semibold">Standard Line</th>
                  <th className="py-4 px-6 text-center font-semibold bg-eco-600">
                    Eco-Friendly Line
                  </th>
                </tr>
              </thead>
              <tbody>
                {productComparison.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="py-4 px-6 font-medium text-text-primary">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-center text-text-secondary">
                      {row.standard}
                    </td>
                    <td className="py-4 px-6 text-center text-eco-700 bg-eco-50/50">
                      {row.eco}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sustainability Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {t('timeline.title')}
            </h2>
            <p className="text-text-secondary">
              {t('timeline.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SustainabilityTimeline items={sustainabilityMilestones} />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-eco-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Certifications & Standards
            </h2>
            <p className="text-text-secondary">
              Our environmental commitments are independently verified
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'FSC', desc: 'Forest Stewardship Council' },
              { name: 'PEFC', desc: 'Programme for the Endorsement of Forest Certification' },
              { name: 'ISO 14001', desc: 'Environmental Management' },
              { name: 'BPI', desc: 'Biodegradable Products Institute' },
            ].map((cert) => (
              <div
                key={cert.name}
                className="bg-white rounded-lg p-6 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-eco-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-eco-600 font-bold text-sm">{cert.name}</span>
                </div>
                <p className="text-xs text-text-muted">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Customers Help */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              How You Can Help
            </h2>
            <p className="text-text-secondary">
              Simple ways to maximize the environmental benefit of your cups
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Choose PLA-lined cups',
                description:
                  'Opt for our plant-based lining option when ordering. It costs slightly more but dramatically improves end-of-life options.',
              },
              {
                title: 'Use paper lids',
                description:
                  'Our paper lids pair perfectly with PLA cups for a fully recyclable/compostable package.',
              },
              {
                title: 'Partner with composting facilities',
                description:
                  'Work with local waste management to ensure cups reach industrial composting facilities.',
              },
              {
                title: 'Educate your customers',
                description:
                  'Add messaging to your cups about proper disposal to increase recycling/composting rates.',
              },
            ].map((tip, index) => (
              <div
                key={tip.title}
                className="flex gap-4 p-4 bg-bg-secondary rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-eco-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{tip.title}</h3>
                  <p className="text-sm text-text-secondary">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-eco-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Go Green?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Ask about our eco-friendly options and make your brand stand out while
            reducing your environmental footprint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              asChild
            >
              <Link href="/get-a-quote">Get an Eco-Friendly Quote</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/request-sample">Request Eco Samples</Link>
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
            '@type': 'WebPage',
            name: 'Sustainability at Xerostop Cups',
            description:
              'Learn about our commitment to sustainable paper cup manufacturing, including FSC certification, PLA linings, and water-based inks.',
            mainEntity: {
              '@type': 'Organization',
              name: 'Xerostop Cups',
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'certificate',
                  name: 'FSC Chain of Custody',
                },
              ],
            },
          }),
        }}
      />
    </RootLayout>
  );
}
