import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { ResearchSection } from "@/components/research/ResearchSection";
import { TextResearchGrid } from "@/components/research/TextResearchGrid";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Research",
};

const cta: CtaContent[] = [
  {
    image: "/images/contact-bg.png",
    title: "Let’s Shape What’s Next-Together",
    description: "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
    buttonText: "Let’s Shape What’s Next-Together",
    buttonHref: "/contact",
  },
];

export default function ResearchPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image="/images/hero/hero3.png"
        title="Ideas that shape better places"
        description="NBRS research translates real‑world insights into design strategies that elevate outcomes for clients, partners, and communities."
      />
      <section className="bg-white py-16 lg:py-24">
        <Container className="flex flex-col gap-16 lg:gap-24">
          <ResearchSection />
          <TextResearchGrid />
        </Container>
      </section>

      <CtaSection cta={cta} />
    </article>
  );
}
