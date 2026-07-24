import type { TemplatePage } from "./types";

const pages: TemplatePage[] = [
  {
    slug: "about",
    title: "About Us",
    description: "Learn more about who we are.",
    content: "This is the about page content.",
  },
  {
    slug: "services",
    title: "Our Services",
    description: "Explore what we offer.",
    content: "This is the services page content.",
  },
];

export async function getPages(): Promise<TemplatePage[]> {
  return pages;
}

export async function getPageBySlug(
  slug: string
): Promise<TemplatePage | undefined> {
  return pages.find((page) => page.slug === slug);
}
