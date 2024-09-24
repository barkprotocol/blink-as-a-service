/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    ppr: true,  // Parallel Rendering
  },
  images: {
    domains: ['uploadcare.com', 'barkprotocol.app'],
  },
  env: {
    API_URL: 'https://api.yourdomain.com',  // Custom API domain as an environment variable
  },
};

export default nextConfig;