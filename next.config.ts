import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google avatar images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    // Will be used in CI/CD but not in production
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
