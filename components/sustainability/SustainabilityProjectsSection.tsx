import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { SustainabilityProject } from "@/lib/sustainability";

export function SustainabilityProjectsSection({ projects }: { projects: SustainabilityProject[] }) {
  if (!projects.length) return null;

  return (
    <section className="bg-[#F5F3EF] py-14 lg:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl uppercase leading-none sm:text-4xl">Sustainable projects</h2>
          <Link
            href="/projects"
            title="View all sustainable projects"
            aria-label="View all sustainable projects"
            className="text-sm underline underline-offset-4"
          >
            View all projects
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={`${project.href}-${project.title}`}
              href={project.href}
              title={project.title}
              aria-label={project.title}
              className="group block"
            >
              <div className="aspect-[4/3] overflow-hidden bg-zinc-200">
                {project.image ? (
                  <ResponsiveImage
                    src={project.image}
                    alt={project.title}
                    title={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 font-heading text-xl uppercase leading-tight group-hover:underline">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
