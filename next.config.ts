import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gfeucoulfqzixutkmviu.supabase.co",
      },
      {
        protocol: "https",
        hostname: "api.piknicuz.com",
      },
    ],
  },
};

export default nextConfig;
