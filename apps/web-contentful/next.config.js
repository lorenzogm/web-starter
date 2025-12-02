/** @type {import('next').NextConfig} */

const SVG_EXTENSION_REGEX = /\.svg$/;

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://app.contentful.com",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://app.contentful.com https://*.contentful.com",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: ["images.unsplash.com", "images.ctfassets.net"].map(
      (pattern) => ({
        protocol: "https",
        port: "",
        hostname: pattern,
      })
    ),
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  reactStrictMode: true,

  trailingSlash: true,

  transpilePackages: ["@repo/ui"],

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer: _isServer }) => {
    config.module.rules.push({
      test: SVG_EXTENSION_REGEX,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
export default nextConfig;

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer(nextConfig);
