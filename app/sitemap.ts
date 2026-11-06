import type { MetadataRoute } from "next";
import { SECTORS_DATA } from "@/lib/sectors-data";
import { PRACTICES_DATA } from "@/lib/practices-data";
import { getSitemapData, type SitemapEntry } from "@/lib/sitemap-data";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/seo";

// ISR: the sitemap is built at deploy time and regenerated in the background
// at most once an hour, on the first request after the hour has passed. If a
// regeneration fails (CMS down/slow), Next keeps serving the last good sitemap.
export const revalidate = 3600;

const STATIC_PATHS = [
  "",
  "/purpose/about-us",
  "/purpose/sustainability",
  "/purpose/social-responsibility",
  "/rap",
  "/purpose/insights/awards",
  "/purpose/insights/design-approach",
  "/contact",
  "/privacy",
  "/terms",
  "/people",
  "/people/team",
  "/people/culture",
  "/people/careers",
  "/people/envision-student-partnership-program",
  "/sector",
  "/practices",
  "/projects",
  "/news",
  "/news/reflect-reconciliation-action-plan",
  "/purpose/insights/research",
  "/9-day-fortnight",
];

function fromEntries(prefix: string, entries: SitemapEntry[]): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: `${SITE_URL}${prefix}/${entry.slug}`,
    ...(entry.dateUpdated ? { lastModified: entry.dateUpdated } : {}),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!ALLOW_INDEXING) return [];

  // Throws if the CMS cannot deliver every section (see lib/sitemap-data.ts).
  const data = await getSitemapData(revalidate);

  const pages: MetadataRoute.Sitemap = [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })),
    // Sector and practice routes come from local data (their pages'
    // generateStaticParams use the same lists).
    ...SECTORS_DATA.map((sector) => ({ url: `${SITE_URL}/sector/${sector.slug}` })),
    ...PRACTICES_DATA.map((practice) => ({ url: `${SITE_URL}/practices/${practice.slug}` })),
    ...fromEntries("/projects", data.projects),
    ...fromEntries("/news", data.news),
    ...fromEntries("/purpose/insights/research", data.research),
    ...fromEntries("/people/team", data.people),
  ];

  const seen = new Set<string>();
  return pages.filter((page) => !seen.has(page.url) && Boolean(seen.add(page.url)));
}
