import type { MetadataRoute } from "next";
import { SECTORS_DATA } from "@/lib/sectors-data";
import { PRACTICES_DATA } from "@/lib/practices-data";
import { getProjectsListing } from "@/lib/projects-listing";
import { getNewsListing } from "@/lib/news-listing";
import { getResearchListing } from "@/lib/research-listing";
import { getOurPeopleContent } from "@/lib/our-people";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/seo";

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs)),
  ]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!ALLOW_INDEXING) return [];

  const staticPaths = [
    "",
    "/about",
    "/sustainability",
    "/social-responsibility",
    "/rap",
    "/awards",
    "/design-approach",
    "/contact",
    "/privacy",
    "/terms",
    "/people",
    "/people/team",
    "/people/culture",
    "/people/careers",
    "/people/envision-student-program",
    "/sectors",
    "/practices",
    "/projects",
    "/news",
    "/news/reflect-reconciliation-action-plan",
    "/research",
    "/9-day-fortnight",
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const sectorPages: MetadataRoute.Sitemap = SECTORS_DATA.map((sector) => ({
    url: `${SITE_URL}/sectors/${sector.slug}`,
  }));

  const practicePages: MetadataRoute.Sitemap = PRACTICES_DATA.map((practice) => ({
    url: `${SITE_URL}/practices/${practice.slug}`,
  }));

  const [projectsResult, newsResult, researchResult, peopleResult] = await Promise.allSettled([
    withTimeout(getProjectsListing({ limit: 100 }).catch(() => ({ projects: [] })), 4000, { projects: [] }),
    withTimeout(getNewsListing({ limit: 100 }).catch(() => ({ articles: [] })), 4000, { articles: [] }),
    withTimeout(getResearchListing().catch(() => ({ articles: [], secondaryResearch: [] })), 4000, { articles: [], secondaryResearch: [] }),
    withTimeout(getOurPeopleContent().catch(() => ({ people: [] })), 4000, { people: [] }),
  ]);

  const projectsData = projectsResult.status === "fulfilled" ? projectsResult.value : { projects: [] };
  const newsData = newsResult.status === "fulfilled" ? newsResult.value : { articles: [] };
  const researchData = researchResult.status === "fulfilled" ? researchResult.value : { articles: [], secondaryResearch: [] };
  const peopleData = peopleResult.status === "fulfilled" ? peopleResult.value : { people: [] };

  const projectPages: MetadataRoute.Sitemap = (projectsData.projects || []).map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
  }));

  const newsPages: MetadataRoute.Sitemap = (newsData.articles || []).map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
  }));

  const allResearch = [...(researchData.articles || []), ...(researchData.secondaryResearch || [])];
  const uniqueResearchSlugs = Array.from(new Set(allResearch.map((research) => research.slug).filter(Boolean)));
  const researchPages: MetadataRoute.Sitemap = uniqueResearchSlugs.map((slug) => ({
    url: `${SITE_URL}/research/${slug}`,
  }));

  const peoplePages: MetadataRoute.Sitemap = (peopleData.people || []).map((person) => ({
    url: `${SITE_URL}/people/team/${person.id}`,
  }));

  return [
    ...staticPages,
    ...sectorPages,
    ...practicePages,
    ...projectPages,
    ...newsPages,
    ...researchPages,
    ...peoplePages,
  ];
}
