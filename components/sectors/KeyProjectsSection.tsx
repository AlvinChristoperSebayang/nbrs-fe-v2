import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type KeyProjectItem = {
  id: string;
  title: string;
  image: ImageSource;
  href: string;
};

export function KeyProjectsSection({
  title = "KEY PROJECTS",
  projects,
}: {
  title?: string;
  projects: KeyProjectItem[];
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="bg-white py-12 lg:py-16 text-black">
      <Container>
        <h2
          data-aos="fade-up"
          className="font-heading text-3xl lg:text-4xl uppercase font-bold text-black tracking-tight mb-8"
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id || project.title}
              href={project.href}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
              className="group flex flex-col w-full cursor-pointer"
            >
              {/* Project Cover Image */}
              <div className="aspect-[370/300] w-full overflow-hidden bg-zinc-100 mb-4 rounded-sm">
                <ResponsiveImage
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Arrow Row */}
              <div className="flex items-end justify-between gap-4">
                <h3 className="font-heading text-[26px] uppercase font-bold text-black leading-snug">
                  {project.title}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1.5 mb-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m0 0l-6-6m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
