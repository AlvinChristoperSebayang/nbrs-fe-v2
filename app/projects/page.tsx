import Link from "next/link";
import { getProjectsListing } from "@/lib/projects-listing";
import { Container } from "@/components/ui/Container";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsFilters } from "@/components/projects/ProjectsFilters";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { PreserveScrollOnNavigate } from "@/components/projects/PreserveScrollOnNavigate";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export async function generateMetadata() {
  const page = await getProjectsListing({ limit: 1 });
  return createPageMetadata({ pathname: "/projects", title: page.pageHeading || "Projects", cmsTitle: page.cmsSeoTitle, description: page.seoDescription, image: page.seoImage ?? page.pageHeroImageUrl });
}

const PAGE_SIZE = 9;

function parseSlugParam(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
}

export default async function ProjectsIndexPage(
  props: PageProps<"/projects">
) {
  const searchParams = await props.searchParams;

  const selectedSectors = parseSlugParam(searchParams.sector);
  const selectedPractices = parseSlugParam(searchParams.practice);
  const page = Math.max(1, Number(searchParams.page) || 1);
  const limit = PAGE_SIZE * page;

  let listing: Awaited<ReturnType<typeof getProjectsListing>> | null = null;
  try {
    listing = await getProjectsListing({
      limit,
      offset: 0,
      sectorSlugs: selectedSectors,
      practiceSlugs: selectedPractices,
    });
  } catch (error) {
    console.warn("Failed to load projects listing from Craft:", error);
  }

  if (!listing) {
    return (
      <main className="bg-white text-black min-h-screen">
        <ProjectsHero />
        <Container className="py-16">
          <p className="max-w-xl text-zinc-600">
            We couldn&apos;t load projects from the CMS right now. Make sure
            the Craft GraphQL API is reachable at the URL configured in{" "}
            <code>CRAFT_GRAPHQL_URL</code>, then refresh this page.
          </p>
        </Container>
      </main>
    );
  }

  const {
    sectors,
    practices,
    projects,
    total,
    pageHeading,
    pageSubheading,
    pageHeroImageUrl,
  } = listing;

  // Guarantee filtering works even if Craft API returns all entries in development/fallback
  let displayProjects = projects;
  if (selectedSectors.length > 0) {
    displayProjects = displayProjects.filter((p) =>
      p.sectors.some((s) => selectedSectors.includes(s.slug))
    );
  }
  if (selectedPractices.length > 0) {
    displayProjects = displayProjects.filter((p) =>
      p.practices.some((pr) => selectedPractices.includes(pr.slug))
    );
  }

  const hasMore = displayProjects.length < total;

  const loadMoreParams = new URLSearchParams();
  if (selectedSectors.length)
    loadMoreParams.set("sector", selectedSectors.join(","));
  if (selectedPractices.length)
    loadMoreParams.set("practice", selectedPractices.join(","));
  loadMoreParams.set("page", String(page + 1));

  return (
    <main className="bg-white text-black min-h-screen">
      <ProjectsHero
        image={pageHeroImageUrl}
        title={pageHeading}
      />
      <Container className="py-16">
        <PreserveScrollOnNavigate>
        <ProjectsFilters
          sectors={sectors}
          practices={practices}
          selectedSectors={selectedSectors}
          selectedPractices={selectedPractices}
        />

        <div className="mt-12">
          <ProjectsGrid projects={displayProjects} />
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href={`/projects?${loadMoreParams.toString()}`}
              scroll={false}
              title="Load more projects"
              aria-label="Load more projects"
              className="inline-flex items-center rounded-full border border-black px-8 py-3 text-sm uppercase text-black transition hover:bg-black hover:text-white"
            >
              Load more
            </Link>
          </div>
        )}
        </PreserveScrollOnNavigate>
      </Container>
    </main>
  );
}
