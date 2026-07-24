import type { Project } from "./types";

const projects: Project[] = [
  {
    slug: "melonba-mega-school",
    title: "Melonba Mega School",
    excerpt: "A new benchmark in large-scale education design.",
    content: "This is the content of the Melonba Mega School project.",
    image: "/images/hero/hero2.png",
    sector: "Education",
    completedAt: "2026-02-01",
  },
  {
    slug: "te-kworo-foundation",
    title: "Te-Kworo Foundation",
    excerpt: "A community space built with and for its people.",
    content: "This is the content of the Te-Kworo Foundation project.",
    image: "/images/hero/hero1.png",
    sector: "Community",
    completedAt: "2026-03-15",
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}
