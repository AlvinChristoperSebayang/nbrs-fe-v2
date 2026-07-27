import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { GridEffect } from "@/components/ui/GridEffect";
import { TextGrid } from "@/components/ui/TextGrid";
import { QuoteSection } from "@/components/ui/QuoteSection";
import { TextImageSection } from "@/components/ui/TextImageSection";
import { CtaSection } from "@/components/cta/CtaSection";
import type { NewsItem,CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Design Approach",
};

export default function DesignApproachPage() {
  const pillars: NewsItem[] = [
    {
      title: "Site & Program",
      description: "Listening, research and immersion.",
      image: "/images/design-approach/pillar1.jpg",
    },
    {
      title: "Cultural Heritage",
      description: "Honouring place, country and culture.",
      image: "/images/design-approach/pillar2.jpg",
    },
    {
      title: "The Big Idea",
      description:
        "A unifying concept guiding decision making, which brings to life a balanced, joyful design.",
      image: "/images/design-approach/pillar3.jpg",
    },
  ];
  const cta: CtaContent[] = [
    {
      image: "/images/contact-bg.png",
      title: "GET IN TOUCH",
      description:"Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
      buttonText: "Contact Us",
      buttonHref: "/contact",
    },
  ];

  return (
    <article>
      <Hero
        image="/images/hero/hero-design-approach.png"
        title="From Insight to Transformative Design"
        description="Every project begins with curiosity and ends with environments that enhance the way people live."
        button={{ text: "See Our Sectors", href: "/projects" }}
      />
      <GridEffect
        items={pillars}
        title="Three Pillars of Design"
        description="Every NBRS project - whether a school, civic centre, hospital or secure space - follows a consistent methodology that adapts to context but never loses its foundation. We call it our Three Pillars:"
        viewAllLabel=""
        viewAllUrl=""
        backgroundColor="#DEE1F2"
      />
      <TextGrid
        heading="Designing with Communities"
        description="Through facilitated conversations and workshops, we uncover the social, cultural and emotional layers that inform meaningful, place-specific solutions."
        topImages={[
          "/images/design-approach/communities1.jpg",
          "/images/design-approach/communities2.jpg",
        ]}
        galleryImages={[
          "/images/design-approach/communities3.jpg",
          "/images/design-approach/communities4.png",
          "/images/design-approach/communities5.jpg",
        ]}
      />
      <QuoteSection
        image="/images/design-approach/andrew-duffin.jpg"
        quote="Architecture should never be imposed. It should emerge through dialogue."
        author="Andrew Duffin"
        role="Director of Design"
      />
      <TextImageSection
        heading="From Possibility to Place"
        description="We follow through with discipline and detail to ensure every design achieves its intended impact."
        image="/images/design-approach/possibility.png"
        buttonText="View Projects"
        buttonHref="/projects"
      />
      <CtaSection cta={cta} />
    </article>
  );
}
