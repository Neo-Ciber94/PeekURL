/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/q/:url*",
        destination: "/api/q/:url*",
        permanent: true
      },
    ];
  },
};

module.exports = nextConfig;
