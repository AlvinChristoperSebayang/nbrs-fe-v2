import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Apache proxies this local Next server through https://nbrs-fe.test.
  // Next 16 rejects its development resources unless the browser origin is
  // explicitly allowed, which prevents client-side behavior such as AOS.
  allowedDevOrigins: ["nbrs-fe.test", "127.0.0.1", "localhost"],
  images: {
    // `nbrs-staging.test` resolves to 127.0.0.1 in local Laragon. Keep this
    // development-only; the host itself remains constrained by remotePatterns.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phpstack-1082258-6573734.cloudwaysapps.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "cms.nbrs.com.au",
        pathname: "/web/media/**",
      },
      {
        protocol: "http",
        hostname: "nbrs-update.test",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "nbrs-staging.test",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "nbrs-staging.test",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
