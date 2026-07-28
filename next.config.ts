import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/online/:slug",
        destination: "/online-:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
