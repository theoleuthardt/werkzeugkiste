import type { NextConfig } from "next";

const NEXT_PUBLIC_BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_URL || ""
    : "http://localhost:4000";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BACKEND_URL: NEXT_PUBLIC_BACKEND_URL,
  },
};

export default nextConfig;
