import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectDetail, getKeyProjectsForDetail } from "@/lib/project-detail";
import { ProjectDetailHero } from "@/components/projects/ProjectDetailHero";
import { ProjectDetailLegacyBody } from "@/components/projects/ProjectDetailLegacyBody";
import { ProjectDetailV2Body } from "@/components/projects/ProjectDetailV2Body";
import { KeyProjectsSection, type KeyProjectItem } from "@/components/sectors/KeyProjectsSection";

export const dynamic = "force-dynamic";

function getImageUrlString(source: unknown): string | undefined {
  if (typeof source === "string") return source;
  if (source && typeof source === "object" && "src" in source && typeof (source as { src: unknown }).src === "string") {
    return (source as { src: string }).src;
  }
  return undefined;
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectDetail(slug);
  if (!project) return { title: "Project Not Found" };

  const title = project.seoPageTitle || project.heading || "Project Detail";
  const heroImageRaw = project.splash?.find((slide) => slide.imageUrl)?.imageUrl ?? project.thumbnailUrl;
  const heroImageUrl = getImageUrlString(heroImageRaw);

  return {
    title,
    openGraph: {
      title,
      images: heroImageUrl ? [{ url: heroImageUrl }] : undefined,
    },
  };
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

  const fallbackKeyProjects: KeyProjectItem[] = [
    {
      id: "kp-1",
      title: "ARMIDALE SECONDARY COLLEGE",
      image: "/images/hero/hero1.png",
      href: "/projects/armidale-secondary-college",
    },
    {
      id: "kp-2",
      title: "CANTERBURY SOUTH PUBLIC SCHOOL",
      image: "/images/hero/hero4.png",
      href: "/projects/canterbury-south-public-school",
    },
    {
      id: "kp-3",
      title: "TARONGA INSTITUTE OF SCIENCE AND LEARNING",
      image: "/images/hero/hero3.png",
      href: "/projects/taronga-institute-of-science",
    },
  ];

  const relatedList = await getKeyProjectsForDetail(project);

  const keyProjects: KeyProjectItem[] =
    relatedList.length > 0
      ? relatedList.map((p, idx) => ({
          id: `related-${idx}`,
          title: p.title || p.heading || "Key Project",
          image: p.thumbnailUrl || `/images/hero/hero${(idx % 5) + 1}.png`,
          href: p.uri ? `/${p.uri.replace(/^\//, "")}` : `/projects/${p.slug}`,
        }))
      : fallbackKeyProjects;
  const heroImage = project.splash.find((slide) => slide.imageUrl)?.imageUrl ?? project.thumbnailUrl;

  return (
    <article className="bg-white text-black min-h-screen">
      <ProjectDetailHero
        title={project.heading}
        subheading={project.subheading}
        sectorLabel={sectorLabel}
        practiceLabel={practiceLabel}
        image={heroImage}
        location={locationLabel}
        client={clientLabel}
        collaborators={collaboratorsLabel}
      />

      {project.useV2Body ? (
        <ProjectDetailV2Body blocks={project.v2Content} />
      ) : (
        <ProjectDetailLegacyBody
          storyHtml={project.storyText}
          popupGallery={project.popupGalleryUrls}
        />
      )}

      {/* KEY PROJECTS SECTION */}
      <KeyProjectsSection title="KEY PROJECTS" projects={keyProjects} />

    </article>
  );
}
