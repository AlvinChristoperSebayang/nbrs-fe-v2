import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { ResearchSection } from "@/components/research/ResearchSection";
import { TextResearchGrid } from "@/components/research/TextResearchGrid";
import { CtaSection } from "@/components/cta/CtaSection";
import { getResearchListing } from "@/lib/research-listing";
import { getPageCta } from "@/lib/cta";
import type { CtaContent } from "@/lib/types";

export const metadata: Metadata = { title: "Research" };
export const dynamic = "force-dynamic";

const cta: CtaContent = {
  image: "/images/contact-bg.png",
  title: "Let's Shape What's Next-Together",
  description: "Whether it's a place to gather, to heal, to learn or to live - we're ready to collaborate. Let's shape spaces that matter, together.",
  buttonText: "Let's Shape What's Next-Together",
  buttonHref: "/contact",
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
      />
      <section className="bg-white py-16 lg:py-24">
        <Container className="flex flex-col gap-16 lg:gap-24">
          <ResearchSection heading={listing?.pageHeading} subheading={listing?.pageSubheading} sectors={listing?.sectors} practices={listing?.practices} items={listing?.articles} />
          <TextResearchGrid items={listing?.secondaryResearch} />
        </Container>
      </section>
      <CtaSection content={await getPageCta("latestResearch", cta).catch(() => cta)} />
    </article>
  );
}
