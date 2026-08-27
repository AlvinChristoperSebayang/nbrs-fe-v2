import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { CareersHero } from "@/components/people/CareersHero";
import { CultureValuesSection } from "@/components/people/CultureValuesSection";
import { InitiativesSection } from "@/components/people/InitiativesSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getCultureContent } from "@/lib/culture";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getCultureContent();
  return createPageMetadata({
    pathname: "/people/culture",
    title: page.hero?.title || "Our Culture",
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription || page.hero?.description,
    image: page.seoImage ?? page.hero?.image,
  });
}

export default async function PeopleCulturePage() {
  const page = await getCultureContent();

  return (
    <article className="min-h-screen bg-white text-black">
      {page.hero && (
        <>
          <div className="block lg:hidden">
            <CareersHero
              imageSrc={page.hero.image}
              title={page.hero.title}
              description={page.hero.description}
            />
          </div>
          <div className="hidden lg:block">
            <Hero
              image={page.hero.image}
              title={page.hero.title}
              description={page.hero.description}
            />
          </div>
        </>
      )}

      {page.values && <CultureValuesSection {...page.values} />}
      {page.initiatives && <InitiativesSection {...page.initiatives} />}
      {page.cta && <CtaSection content={page.cta} />}
    </article>
  );
}
