/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lakshmanadeepesh.in' }],
        destination: 'https://lakshmanadeepesh.in/:path*',
        permanent: true
      },
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://lakshmanadeepesh.in/:path*',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
