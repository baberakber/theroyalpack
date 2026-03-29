import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Royal Pack';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const titles: Record<string, string> = {
  'home': 'Premium Custom Branded Paper Cups',
  'products': 'Products - Paper Cups, Printing & Accessories',
  'paper-cups': 'Paper Cups - Single, Double & Ripple Wall',
  'cup-printing': 'Custom Cup Printing - Offset & Flexo',
  'accessories': 'Cup Accessories - Lids, Sleeves & Carriers',
  'industries': 'Industries We Serve',
  'gallery': 'Gallery - Custom Printed Cup Designs',
  'about': 'About Us',
  'sustainability': 'Sustainability',
  'faq': 'FAQ - Frequently Asked Questions',
  'design-support': 'Design Support - Templates & Design Services',
  'contact': 'Contact Us',
  'quote': 'Get a Quote - Custom Paper Cups',
  'sample': 'Request Free Sample - Paper Cup Samples',
  'cafes': 'Paper Cups for Cafes',
  'restaurants': 'Paper Cups for Restaurants',
  'hotels': 'Paper Cups for Hotels',
  'events': 'Paper Cups for Events',
  'corporate': 'Paper Cups for Corporate Events',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const key = slug.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const title = titles[key] || 'Royal Pack | Premium Custom Branded Paper Cups';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 56,
            fontWeight: 700,
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.2,
            padding: 40,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: 28,
            marginTop: 16,
          }}
        >
          Royal Pack
        </div>
      </div>
    ),
    { ...size }
  );
}

