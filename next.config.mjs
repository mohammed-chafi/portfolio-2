import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        /*
         * `app/icon.svg` makes Next emit <link rel="icon">, which stops browsers
         * probing /favicon.ico. Crawlers and some tools request it anyway and
         * take a 404, so point them at the same mark.
         */
        source: '/favicon.ico',
        destination: '/icon.svg',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
