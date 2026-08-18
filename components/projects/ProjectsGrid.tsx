import Link from "next/link";
import type { ProjectListItem } from "@/lib/projects-listing";
import { ProjectThumbnail } from "./ProjectThumbnail";

function ArrowIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5654 12.501L11.0645 25.001L9.03418 22.9707L18.0693 13.9365H0V11.0654H18.0693L9.03418 2.03027L11.0645 0L23.5654 12.501Z" fill="white"/>
    </svg>
  );
}

function ProjectMeta({ project }: { project: ProjectListItem }) {
  const segments = [
    project.sectors.length > 0 &&
      `Sector - ${project.sectors.map((s) => s.title).join(", ")}`,
    project.practices.length > 0 &&
      `Practice - ${project.practices.map((p) => p.title).join(", ")}`,
  ].filter(Boolean);

  if (segments.length === 0) return null;

  return <p className="mt-auto pt-4 text-sm text-[#FFD6CD]">{segments.join(", ")}</p>;
}

export function ProjectsGrid({ projects }: { projects: ProjectListItem[] }) {
  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-zinc-500">
        No projects match these filters.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-x-7 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li
          key={project.id}
          data-aos="fade-up"
          data-aos-delay={(index % 3) * 100}
        >
          <Link href={`/projects/${project.slug}`} className="group block w-full h-full flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#7A0C0C]">
              {project.thumbnailUrl && (
                <ProjectThumbnail
                  src={project.thumbnailUrl}
                  alt={project.heading}
                />
              )}
            </div>
            <div className="flex flex-col gap-1 bg-black p-6 text-white flex-1">
              <h2 className="font-heading text-2xl lg:text-[36px] uppercase leading-tight">
                {project.heading}
              </h2>
              {project.subheading && (
                <p className="font-bold text-[20px] mt-auto">{project.subheading}</p>
              )}
              <ProjectMeta project={project} />
              <div className="mt-6 flex items-center justify-between ">
                <span className="text-sm">Read more</span>
                <ArrowIcon />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
