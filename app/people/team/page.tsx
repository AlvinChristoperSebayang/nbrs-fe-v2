import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { TeamListSection } from "@/components/people/TeamListSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getOurPeopleContent } from "@/lib/our-people";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getOurPeopleContent();
  return createPageMetadata({
    pathname: "/people/team",
    title: page.hero?.title || "Our People",
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription || page.hero?.description,
    image: page.seoImage ?? page.hero?.image,
  });
}

export default async function TeamPage() {
  const page = await getOurPeopleContent();

  return (
    <article className="min-h-screen bg-white text-black">
      {page.hero && <Hero image={page.hero.image} title={page.hero.title} description={page.hero.description} />}

      <TeamListSection members={page.people} />

      {page.cta && <CtaSection content={page.cta} />}
    </article>
  );
}
