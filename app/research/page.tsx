import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { ResearchSection } from "@/components/research/ResearchSection";
import { TextResearchGrid } from "@/components/research/TextResearchGrid";
import { CtaSection } from "@/components/cta/CtaSection";
import { getResearchListing } from "@/lib/research-listing";
import { getPageCta } from "@/lib/cta";
import type { CtaContent } from "@/lib/types";

export async function generateMetadata() {
  const page = await getResearchListing();
  return createPageMetadata({ pathname: "/research", title: page.pageHeading || "Research", cmsTitle: page.cmsSeoTitle, description: page.seoDescription, image: page.seoImage ?? page.pageHeroImageUrl });
}
export const dynamic = "force-dynamic";

const cta: CtaContent = {
  image: "/images/contact-bg.png",
  title: "HAVE A QUESTION OR A RESEARCH BRIEF?",
  buttonText: "START A CONVERSATION",
  buttonHref: "/contact",
  secondaryButtonText: "SEE NBRS APPROACH",
  secondaryButtonHref: "/design-approach",
};

export default async function ResearchPage() {
  let listing: Awaited<ReturnType<typeof getResearchListing>> | null = null;
  try {
    listing = await getResearchListing();
  } catch (error) {
    console.warn("Failed to load research listing from Craft:", error);
  }

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero
        image={listing?.pageHeroImageUrl ?? "/images/hero/hero3.png"}
        title={listing?.pageHeading ?? "Ideas that shape better places"}
        description={listing?.pageSubheading ?? "NBRS research translates real-world insights into design strategies that elevate outcomes for clients, partners, and communities."}
        descriptionClassName="max-w-[289px] md:max-w-[393px]"
        imageClassName="min-2xl:object-top"
      />
      <section className="bg-white py-16 lg:py-24">
        <Container className="flex flex-col gap-16 lg:gap-24">
          <ResearchSection
            heading={listing?.researchGridHeading}
            subheading={listing?.researchGridDescription}
            sectors={listing?.sectors}
            practices={listing?.practices}
            items={listing?.articles}
          />
          <TextResearchGrid items={listing?.secondaryResearch} />
        </Container>
      </section>
      <CtaSection content={await getPageCta("latestResearch", cta).catch(() => cta)} />
    </article>
  );
}
