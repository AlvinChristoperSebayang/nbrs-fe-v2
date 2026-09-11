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
        hostname: "new.cms.nbrs.com.au",
        pathname: "/web/media/**",
      },
      {
        protocol: "https",
        hostname: "staging.cms.nbrs.com.au",
        pathname: "/web/media/**",
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
  async redirects() {
    return [
      // Purpose group
      { source: "/about", destination: "/purpose/about-us", permanent: true },
      { source: "/sustainability", destination: "/purpose/sustainability", permanent: true },
      { source: "/social-responsibility", destination: "/purpose/social-responsibility", permanent: true },

      // Purpose > Insights group
      { source: "/design-approach", destination: "/purpose/insights/design-approach", permanent: true },
      { source: "/research", destination: "/purpose/insights/research", permanent: true },
      { source: "/research/:slug", destination: "/purpose/insights/research/:slug", permanent: true },
      { source: "/awards", destination: "/purpose/insights/awards", permanent: true },

      // Sectors: plural → singular
      { source: "/sectors", destination: "/sector", permanent: true },
      { source: "/sectors/:slug", destination: "/sector/:slug", permanent: true },

      // People
      {
        source: "/people/envision-student-program",
        destination: "/people/envision-student-partnership-program",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https:",
              "style-src 'self' 'unsafe-inline' https:",
              "img-src 'self' blob: data: https: http://nbrs-staging.test http://nbrs-update.test",
              "font-src 'self' data: https:",
              "connect-src 'self' https: http://localhost:* ws://localhost:* http://127.0.0.1:* ws://127.0.0.1:* http://nbrs-staging.test http://nbrs-update.test",
              "frame-src 'self' https: http://nbrs-staging.test http://nbrs-update.test",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self' https:",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
