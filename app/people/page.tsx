import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PeopleNavigationGrid } from "@/components/people/PeopleNavigationGrid";
import { FastFactsSection } from "@/components/people/FastFactsSection";
import { getDesigningForPeoplePage } from "@/lib/designing-for-people";
import { CtaSection } from "@/components/cta/CtaSection";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getDesigningForPeoplePage();
  return createPageMetadata({
    pathname: "/people",
    title: page.hero.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription,
    image: page.seoImage ?? page.hero.image,
  });
}

export default async function PeoplePage() {
  const page = await getDesigningForPeoplePage();

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero
        image={page.hero.image}
        title={page.hero.title}
        description={page.hero.description}
      />

      <AboutSection
        image_url={page.intro.image}
        background_color="#C9E5D2"
        heading={page.intro.heading}
        description={page.intro.description}
        heading_size="text-[28px] sm:text-[50px]"
        single_line_heading
      />

      <PeopleNavigationGrid cards={page.navigationCards} />
      <FastFactsSection title={page.fastFacts.heading} facts={page.fastFacts.items} />
      <CtaSection content={page.cta} />
    </article>
  );
}
