import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Apache proxies this local Next server through https://nbrs-fe.test.
  // Next 16 rejects its development resources unless the browser origin is
  // explicitly allowed, which prevents client-side behavior such as AOS.
  allowedDevOrigins: ["nbrs-fe.test", "127.0.0.1", "localhost"],
};

export default nextConfig;
