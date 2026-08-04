import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectDetail } from "@/lib/project-detail";
import { Container } from "@/components/ui/Container";
import { ProjectDetailHero } from "@/components/projects/ProjectDetailHero";
import { ProjectOverviewSection } from "@/components/projects/ProjectOverviewSection";
import { ProjectStorySection } from "@/components/projects/ProjectStorySection";
import { ProjectFeaturesAlternatingSection } from "@/components/projects/ProjectFeaturesAlternatingSection";
import { KeyProjectsSection, type KeyProjectItem } from "@/components/sectors/KeyProjectsSection";
import { CtaSection } from "@/components/cta/CtaSection";
import type { CtaContent } from "@/lib/types";

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

  const cta: CtaContent = {
    image: "/images/contact-bg.png",
    title: "START A CONVERSATION",
    description: "Let's discuss your next project or architectural inquiry with our team.",
    buttonText: "CONTACT NBRS",
    buttonHref: "/contact",
  };

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

  const keyProjects: KeyProjectItem[] =
    project.relatedProjects && project.relatedProjects.length > 0
      ? project.relatedProjects.map((p, idx) => ({
          id: `related-${idx}`,
          title: p.title || p.heading || "Key Project",
          image: p.thumbnailUrl || `/images/hero/hero${(idx % 5) + 1}.png`,
          href: p.uri ? `/${p.uri.replace(/^\//, "")}` : `/projects/${p.slug}`,
        }))
      : fallbackKeyProjects;

  return (
    <article className="bg-white text-black min-h-screen">
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

      {/* OVERVIEW SECTION (Sliced from Figma) */}
      <ProjectOverviewSection
        headline={project.subheading}
        description={project.impactText}
        image={project.thumbnailUrl}
        alt={project.heading}
      />

      {/* STORY & GALLERY SECTION (Sliced from Figma) */}
      <ProjectStorySection />

      {/* ALTERNATING FEATURES SECTION (4 Dummy Data Items, No Header Title) */}
      <ProjectFeaturesAlternatingSection />

      {/* {project.storyText && (
        <Container className="py-16">
          <div dangerouslySetInnerHTML={{ __html: project.storyText }} />
        </Container>
      )} */}

      {/* KEY PROJECTS SECTION */}
      <KeyProjectsSection title="KEY PROJECTS" projects={keyProjects} />

    </article>
  );
}
