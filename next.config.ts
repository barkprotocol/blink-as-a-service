import type { NextConfig } from 'next';

/**
 * @type {NextConfig}
 */
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,  // Parallel Rendering
  },
  images: {
    domains: ['uploadcare.com', 'barkprotocol.app', 'ucarecdn.com'],
  },
  env: {
    API_URL: 'https://api.yourdomain.com',  // Custom API domain as an environment variable
  },
};

export default nextConfig;
