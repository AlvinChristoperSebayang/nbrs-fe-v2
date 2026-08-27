import { createPageMetadata } from "@/lib/seo";
import { CareersHero } from "@/components/people/CareersHero";
import { CareersAccordionSection } from "@/components/people/CareersAccordionSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getCareersContent } from "@/lib/careers";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getCareersContent();
  return createPageMetadata({
    pathname: "/people/careers",
    title: page.hero?.title || "Careers",
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription || page.hero?.description,
    image: page.seoImage ?? page.hero?.image,
  });
}

export default async function CareersPage() {
  const page = await getCareersContent();

  return (
    <article className="min-h-screen bg-white text-black">
      {page.hero && <CareersHero title={page.hero.title} description={page.hero.description} imageSrc={page.hero.image} />}
      {page.accordion && <CareersAccordionSection {...page.accordion} />}
      {page.cta && <CtaSection content={page.cta} />}
    </article>
  );
}
