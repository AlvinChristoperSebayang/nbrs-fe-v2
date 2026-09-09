import {
  getProjectsCards,
  getProjectsSeo,
  getProjectsShell,
  parseProjectFilterSlugs,
  PROJECTS_PAGE_SIZE,
} from "@/lib/projects-listing";
import { Container } from "@/components/ui/Container";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsFilters } from "@/components/projects/ProjectsFilters";
import { ProjectsLoadMore } from "@/components/projects/ProjectsLoadMore";
import { PreserveScrollOnNavigate } from "@/components/projects/PreserveScrollOnNavigate";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const seo = await getProjectsSeo();
  return createPageMetadata({
    pathname: "/projects",
    title: seo.pageHeading || "Projects",
    cmsTitle: seo.cmsSeoTitle,
    description: seo.seoDescription,
    image: seo.seoImage,
  });
}

export default async function ProjectsIndexPage(
  props: PageProps<"/projects">
) {
  const searchParams = await props.searchParams;

  const selectedSectors = parseProjectFilterSlugs(searchParams.sector);
  const selectedPractices = parseProjectFilterSlugs(searchParams.practice);

  let shell: Awaited<ReturnType<typeof getProjectsShell>> | null = null;
  let cards: Awaited<ReturnType<typeof getProjectsCards>> | null = null;

  try {
    [shell, cards] = await Promise.all([
      getProjectsShell(),
      getProjectsCards({
        limit: PROJECTS_PAGE_SIZE,
        offset: 0,
        sectorSlugs: selectedSectors,
        practiceSlugs: selectedPractices,
      }),
    ]);
  } catch (error) {
    console.warn("Failed to load projects listing from Craft:", error);
  }

  if (!shell || !cards) {
    return (
      <div className="bg-white text-black min-h-screen">
        <ProjectsHero />
        <Container className="py-16">
          <p className="max-w-xl text-zinc-600">
            We couldn&apos;t load projects from the CMS right now. Make sure
            the Craft GraphQL API is reachable at the URL configured in{" "}
            <code>CRAFT_GRAPHQL_URL</code>, then refresh this page.
          </p>
        </Container>
      </div>
    );
  }

  const filterKey = `${selectedSectors.join(",")}|${selectedPractices.join(",")}`;

  return (
    <article className="bg-white text-black min-h-screen">
      <ProjectsHero
        image={shell.pageHeroImageUrl}
        title={shell.pageHeading}
      />
      <Container className="py-16">
        <PreserveScrollOnNavigate>
          <ProjectsFilters
            sectors={shell.sectors}
            practices={shell.practices}
            selectedSectors={selectedSectors}
            selectedPractices={selectedPractices}
          />

          <ProjectsLoadMore
            key={filterKey}
            initialProjects={cards.projects}
            total={cards.total}
            sectorSlugs={selectedSectors}
            practiceSlugs={selectedPractices}
          />
        </PreserveScrollOnNavigate>
      </Container>
    </article>
  );
}
