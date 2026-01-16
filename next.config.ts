import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Turbopack configuration (default in Next.js 16)
  turbopack: {},
  
  // Enable static export for Netlify
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Webpack configuration for React Three Fiber
  webpack: (config, { isServer }) => {
    // Fix for React Three Fiber
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
      };
    }
    return config;
  },
};

export default nextConfig;
