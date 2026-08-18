import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { CareersHero } from "@/components/people/CareersHero";
import { CultureValuesSection } from "@/components/people/CultureValuesSection";
import { InitiativesSection } from "@/components/people/InitiativesSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getCultureContent } from "@/lib/culture";

export const metadata = createPageMetadata({ pathname: "/people/culture", title: "Our Culture | Our People" });

export default async function PeopleCulturePage() {
  const page = await getCultureContent();

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION (Mobile: CareersHero, Desktop: Hero) */}
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

      {/* 2. OUR VALUES SECTION */}
      {page.values && <CultureValuesSection {...page.values} />}

      {/* 3. NBRS INITIATIVES SECTION */}
      {page.initiatives && <InitiativesSection {...page.initiatives} />}

      {/* 4. CTA SECTION */}
      {page.cta && <CtaSection content={page.cta} />}
    </article>
  );
}
