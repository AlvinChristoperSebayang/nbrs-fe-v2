import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { TeamListSection } from "@/components/people/TeamListSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getOurPeopleContent } from "@/lib/our-people";

export async function generateMetadata() {
  const page = await getOurPeopleContent();
  return createPageMetadata({ pathname: "/people/team", title: page.hero?.title || "Our People", cmsTitle: page.cmsSeoTitle, description: page.seoDescription || page.hero?.description, image: page.seoImage ?? page.hero?.image });
}

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
