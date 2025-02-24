import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

export default nextConfig;
