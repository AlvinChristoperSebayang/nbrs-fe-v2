import { createPageMetadata } from "@/lib/seo";
import { CareersHero } from "@/components/people/CareersHero";
import { CareersAccordionSection } from "@/components/people/CareersAccordionSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getCareersContent } from "@/lib/careers";

export const metadata = createPageMetadata({ pathname: "/people/careers", title: "Careers | Our People" });

export default async function CareersPage() {
  const page = await getCareersContent();

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. CUSTOM CAREERS HERO */}
      {page.hero && <CareersHero title={page.hero.title} description={page.hero.description} imageSrc={page.hero.image} />}

      {/* 2. OVERVIEW & INTERACTIVE ACCORDIONS SECTION */}
      {page.accordion && <CareersAccordionSection {...page.accordion} />}

      {/* 3. CAREERS CTA SECTION */}
      {page.cta && <CtaSection content={page.cta} />}
    </article>
  );
}
