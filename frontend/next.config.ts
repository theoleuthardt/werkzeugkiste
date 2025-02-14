import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    backend_url: "http://localhost:4000",
  },
};

export default nextConfig;
