import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
