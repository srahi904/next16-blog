/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },

      {
        protocol: "https",
        hostname: "sleek-kookabura-348.convex.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;
