import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PeopleNavigationGrid } from "@/components/people/PeopleNavigationGrid";
import { FastFactsSection } from "@/components/people/FastFactsSection";
import { getDesigningForPeoplePage } from "@/lib/designing-for-people";
import { CtaSection } from "@/components/cta/CtaSection";

export const metadata: Metadata = {
  title: "People | Designing for People",
};

export default async function PeoplePage() {
  const page = await getDesigningForPeoplePage();

  return (
    <article className="bg-white text-black min-h-screen">
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
      />

      <PeopleNavigationGrid cards={page.navigationCards} />
      <FastFactsSection title={page.fastFacts.heading} facts={page.fastFacts.items} />
      <CtaSection content={page.cta} />
    </article>
  );
}
