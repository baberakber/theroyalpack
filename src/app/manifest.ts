import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Royal Pack',
    short_name: 'Royal Pack',
    description: 'Premium custom branded paper cups for businesses.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f766e',
    icons: [
      {
        src: '/images/icon-192.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/images/icon-512.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
}
