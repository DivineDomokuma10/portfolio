import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },

  async redirects() {
    return [
      {
        source: "/project",
        destination: "/works",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
