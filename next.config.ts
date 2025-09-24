import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features for Turbopack
  experimental: {
    turbo: {
      rules: {
        // Handle SVG imports with Turbopack
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Image optimization for Next.js 15 with Cloudflare R2
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow images from Cloudflare R2
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'orbanas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-d36eae762288401f967c2f16e37a17b3.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Enable compression
  compress: true,

  // Static optimization settings
  trailingSlash: false,
  
  // Output configuration for better performance
  output: 'standalone',

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Custom headers for performance and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS prefetch control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Performance hints
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/scene/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/team/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Cache fonts
      {
        source: '/(.*).woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
    ];
  },

  // Enable logging for better debugging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

export default nextConfig;