import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PeopleNavigationGrid } from "@/components/people/PeopleNavigationGrid";
import { FastFactsSection, type FastFact } from "@/components/people/FastFactsSection";
import { getDesigningForPeoplePage } from "@/lib/designing-for-people";
import { CtaSection } from "@/components/cta/CtaSection";

export const metadata: Metadata = {
  title: "Designing for People",
};

export default async function DesigningForPeoplePage() {
  const page = await getDesigningForPeoplePage();
  const facts: FastFact[] = [
    { number: "90", label: "Team members" },
    { number: "3", label: "Practices" },
    { number: "5", label: "Sectors" },
    { number: "2", label: "Studios" },
    { number: "57+", label: "Years" },
  ];

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

      <PeopleNavigationGrid />
      <FastFactsSection facts={facts} />
      <CtaSection content={page.cta} />
    </article>
  );
}
