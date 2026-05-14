import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Replace deprecated images.domains with remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
      // Add other hosts you need, like Unsplash if you use those images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Turbopack is now a top-level option, not inside experimental
  turbopack: {
    // Your turbopack configuration, if any
    // For example:
    // rules: {
    //   '*.svg': {
    //     loaders: ['@svgr/webpack'],
    //   },
    // },
  },
};

export default nextConfig;
