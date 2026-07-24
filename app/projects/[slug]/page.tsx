import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  return { title: project?.title ?? "Not Found" };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <Container className="py-16">
      <article>
        <PageHeader title={project.title} description={project.sector} />
        {project.completedAt && (
          <p className="-mt-6 mb-8 text-sm text-zinc-500">
            {project.completedAt}
          </p>
        )}
        <img
          src={project.image}
          alt={project.title}
          className="mb-8 min-h-screen w-full object-cover"
        />
        <div>{project.content}</div>
      </article>
    </Container>
  );
}
