import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { RapMetaSection } from "@/components/rap/RapMetaSection";
import { RapInsightSection } from "@/components/rap/RapInsightSection";
import { CtaSection } from "@/components/cta/CtaSection";
import type { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Reconciliation Action Plan",
};

export default function RapPage() {
   const cta: CtaContent[] = [
      {
        image: "/images/contact-bg.png",
        title: "Download full reflect RAP",
        description: "For insight into the implementation of each action",
        buttonText: "Download Reflect Rap",
        buttonHref: "/contact",
      },
    ];
  return (
    <article>
      <Hero
        image="/images/hero/hero-rap.png"
        title="Reflect Reconciliation Action Plan"
      />
      <RapMetaSection
        title="Reconciliation Action Plan"
        publicationDate="2026"
        author="RAP Working Group (Andrew Duffin, Samantha Polkinghorne, Melanie Karaca, Mengling Fu)"
        endorsedBy="Reconciliation Australia"
        readTime="5 mins"
      />
      <RapInsightSection
        image="/images/rap/insight.png"
        paragraphs={[
          "Place and Country are key design principles at NBRS. We support the cultural heritage of the land on which we design. We support Aboriginal and Torres Strait Islander peoples with initiatives that pay respect to their culture. The newest initiative which has been endorsed by Reconciliation Australia is our own Reflect Reconciliation Action Plan (RAP).",
          "This plan is being spearheaded by the NBRS RAP working group; Convener Melanie Karaca, Andrew Duffin, Samantha Polkinghorne, Mengling Fu along with Olivia Ash who will work through our RAP commitments.",
          "A special mention must go to Christopher Tobin who created our RAP's artwork. The title of the artwork is Shared Waterways and connects deeply with our values and how we design collectively on Country.",
          "Chris is a Dharug man from Western Sydney who is a descendant of the original clans that belong to this Country and have lived in balance with the environment for millennia.",
          "The RAP artwork Shared Waterways envisages modern practices of settlement formed around Aboriginal values and understanding of Country. The artwork represents the aspirations of many Aboriginal and non-Aboriginal people who work for the health and wellbeing of Country. It also represents the hope for future developments to begin to listen to Country first and work around or within these principles to keep her healthy.",
          "The RAP is NBRS's commitment to a reconciliation journey. NBRS recognises the important role our industry plays in shaping the built environment and influencing social and cultural outcomes. We aim to embed reconciliation and wellbeing of place and Country into our design processes.",
        ]}
      />
      <CtaSection cta={cta} />
    </article>
  );
}
