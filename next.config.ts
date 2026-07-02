import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    // /focus was a removed demo spike; redirect any old links instead of 404ing.
    return [{ source: "/focus", destination: "/", permanent: true }];
  },
  async headers() {
    // Explicit .ts extension: Next 16's native Node.js TypeScript resolver for
    // next.config.ts inherits Node's ESM resolution, which (unlike bundler
    // resolution) requires a file extension on relative specifiers.
    const { securityHeaders } = await import("./src/lib/headers.ts");
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
