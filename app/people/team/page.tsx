import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { TeamListSection } from "@/components/people/TeamListSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getOurPeopleContent } from "@/lib/our-people";

export const metadata: Metadata = {
  title: "Meet Our Leaders | Our People",
};

export default async function TeamPage() {
  const page = await getOurPeopleContent();

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      {page.hero && <Hero image={page.hero.image} title={page.hero.title} description={page.hero.description} />}

      {/* 2. TEAM LIST SECTION WITH PRACTICE FILTER */}
      <TeamListSection members={page.people} />

      {/* 3. CTA SECTION */}
      {page.cta && <CtaSection content={page.cta} />}
    </article>
  );
}
