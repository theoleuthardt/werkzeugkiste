import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

export default nextConfig;
