import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // lets a verification build run beside `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [{ source: "/solar-101", destination: "/solar-guide", statusCode: 301 }];
  },
};
export default nextConfig;
