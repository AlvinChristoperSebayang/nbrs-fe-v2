import type { Metadata } from "next";
import { CtaSection } from "@/components/cta/CtaSection";
import { GridEffect } from "@/components/ui/GridEffect";
import { Hero } from "@/components/ui/Hero";
import { QuoteSection } from "@/components/ui/QuoteSection";
import { TextGrid } from "@/components/ui/TextGrid";
import { TextImageSection } from "@/components/ui/TextImageSection";
import { getDesignApproachContent } from "@/lib/design-approach";

export const metadata: Metadata = { title: "Design Approach" };

export default async function DesignApproachPage() {
  const content = await getDesignApproachContent();

  return (
    <article>
      <Hero image={content.hero.image} title={content.hero.title} description={content.hero.description} button={content.hero.button} />
      <GridEffect items={content.pillars.items} title={content.pillars.title} description={content.pillars.description} viewAllLabel="" viewAllUrl="" backgroundColor="#DEE1F2" />
      <TextGrid heading={content.communities.heading} description={content.communities.description} topImages={content.communities.topImages} galleryImages={content.communities.galleryImages} />
      <QuoteSection image={content.quote.image} quote={content.quote.quote} author={content.quote.author} role={content.quote.role} />
      <TextImageSection heading={content.project.heading} description={content.project.description} image={content.project.image} buttonText={content.project.buttonText} buttonHref={content.project.buttonHref} />
      <CtaSection content={content.cta} />
    </article>
  );
}
