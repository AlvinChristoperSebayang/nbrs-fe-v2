import { createPageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/cta/CtaSection";
import { GridEffect } from "@/components/ui/GridEffect";
import { Hero } from "@/components/ui/Hero";
import { QuoteSection } from "@/components/ui/QuoteSection";
import { TextGrid } from "@/components/ui/TextGrid";
import { DesignApproachProjectSection } from "@/components/design-approach/DesignApproachProjectSection";
import { getDesignApproachContent } from "@/lib/design-approach";

export async function generateMetadata() {
  const page = await getDesignApproachContent();
  return createPageMetadata({ pathname: "/design-approach", title: page.hero.title, description: page.hero.description, image: page.hero.image });
}

export default async function DesignApproachPage() {
  const content = await getDesignApproachContent();

  return (
    <article>
      <Hero image={content.hero.image} title={content.hero.title} description={content.hero.description} button={content.hero.button} />
      <div>
        <div className="bg-[#DEE1F2] h-1.5 md:h-0"></div>
        <GridEffect items={content.pillars.items} title={content.pillars.title} description={content.pillars.description} viewAllLabel="" viewAllUrl="" backgroundColor="#DEE1F2" />
      </div>
      <TextGrid heading={content.communities.heading} description={content.communities.description} topImages={content.communities.topImages} galleryImages={content.communities.galleryImages} />
      <QuoteSection image={content.quote.image} quote={content.quote.quote} author={content.quote.author} role={content.quote.role} />
      <DesignApproachProjectSection
        heading={content.project.heading}
        description={content.project.description}
        image={content.project.image}
        buttonText={content.project.buttonText}
        buttonHref={content.project.buttonHref}
      />
      <CtaSection content={content.cta} />
    </article>
  );
}
