import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectDetail } from "@/lib/project-detail";
import { Container } from "@/components/ui/Container";
import { ProjectDetailHero } from "@/components/projects/ProjectDetailHero";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectDetail(slug);

  return { title: project?.seoPageTitle ?? project?.heading ?? "Not Found" };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = await getProjectDetail(slug);

  if (!project) notFound();

  const sectorLabel = project.sectors.map((s) => s.title).join(", ");
  const practiceLabel = project.practices.map((p) => p.title).join(", ");
  const locationLabel = project.locations.map((l) => l.title).join(", ");
  const clientLabel = project.clients.map((c) => c.title).join(", ");
  const collaboratorsLabel = project.collaborators
    .map((c) => c.title)
    .join(", ");

  return (
    <article>
      <ProjectDetailHero
        title={project.heading}
        subheading={project.subheading}
        sectorLabel={sectorLabel}
        practiceLabel={practiceLabel}
        image={project.thumbnailUrl}
        location={locationLabel}
        client={clientLabel}
        collaborators={collaboratorsLabel}
      />
      {project.storyText && (
        <Container className="py-16">
          <div dangerouslySetInnerHTML={{ __html: project.storyText }} />
        </Container>
      )}
    </article>
  );
}
