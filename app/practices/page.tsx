import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PracticesHoverSection } from "@/components/practices/PracticesHoverSection";
import { getPracticesPageContent } from "@/lib/practices-page";

function formatPracticesIntroHeading(heading?: string | null): string {
  if (!heading) return "OUR PRACTICES\nAT A GLANCE";
  if (heading.includes("\n")) return heading;

  const normalized = heading.trim();
  if (/^our\s+practices\s+at\s+a\s+glance$/i.test(normalized)) {
    return "OUR PRACTICES\nAT A GLANCE";
  }

  const words = normalized.split(/\s+/);
  if (words.length === 5) {
    return `${words.slice(0, 2).join(" ")}\n${words.slice(2).join(" ")}`;
  }

  if (words.length >= 4) {
    const splitIndex = Math.ceil(words.length / 2);
    return `${words.slice(0, splitIndex).join(" ")}\n${words.slice(splitIndex).join(" ")}`;
  }

  return heading;
}

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getPracticesPageContent();
  return createPageMetadata({
    pathname: "/practices",
    title: page.hero.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription ?? page.hero.description,
    image: page.seoImage ?? page.hero.image,
  });
}

export default async function PracticesPage() {
  const content = await getPracticesPageContent();

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero
        image={content.hero.image}
        title={content.hero.title}
        description={content.hero.description}
      />

      <AboutSection
        image_url={content.intro.image}
        background_color="#FDD4B6"
        heading={formatPracticesIntroHeading(content.intro.heading)}
        description={content.intro.description}
        description_class_name="max-w-[363px]"
      />

      <PracticesHoverSection items={content.practices} />
    </article>
  );
}
