import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    backend_url: process.env.BACKEND_URL || "http://localhost:4000",
  },
};

export default nextConfig;
