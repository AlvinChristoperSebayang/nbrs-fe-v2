import type { Metadata } from "next";
import { CareersHero } from "@/components/people/CareersHero";
import { CareersAccordionSection } from "@/components/people/CareersAccordionSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Careers | Our People",
};

const cta: CtaContent[] = [
  {
    image: "/images/hero/hero4.png",
    title: "INTERESTED IN NBRS CAREERS?",
    description: "Learn more about working at NBRS",
    buttonText: "CAREERS@NBRS.COM.AU",
    buttonHref: "mailto:careers@nbrs.com.au",
  },
];

export default function CareersPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. CUSTOM CAREERS HERO */}
      <CareersHero />

      {/* 2. OVERVIEW & INTERACTIVE ACCORDIONS SECTION */}
      <CareersAccordionSection showDefaultIntro={true} />

      {/* 3. CAREERS CTA SECTION */}
      <CtaSection cta={cta} />
    </article>
  );
}
