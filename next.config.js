/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/q/:url*",
        destination: "/api/q/:url*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
