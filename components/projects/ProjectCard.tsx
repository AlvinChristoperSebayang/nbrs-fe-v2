import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <li>
      <Link        
        href={`/projects/${project.slug}`}
        title={project.title}
        aria-label={project.title}
        className="group block"
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            // src={project.image}
            src="/images/placeholder-project.png"
            alt={project.title}
            title={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <p className="mt-4 text-xl font-medium text-black group-hover:underline dark:text-zinc-50">
          {project.title}
        </p>
      </Link>
      {project.sector && (
        <p className="mt-1 text-sm text-zinc-500">{project.sector}</p>
      )}
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        {project.excerpt}
      </p>
    </li>
  );
}
