/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  allowedDevOrigins: ['192.168.43.208'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ttf$/,
      use: ['file-loader']
    });
    return config;
  },
};

module.exports = nextConfig;