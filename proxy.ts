const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nbrs.com.au"
).replace(/\/$/, "");
const ALLOW_INDEXING =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING?.toLowerCase() !== "false";

export function proxy(): Response {
  const robots = ALLOW_INDEXING
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";

  return new Response(
    robots,
    {
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  );
}

export const config = {
  matcher: "/robots.txt",
};
