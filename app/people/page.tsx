import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PeopleNavigationGrid } from "@/components/people/PeopleNavigationGrid";
import { FastFactsSection } from "@/components/people/FastFactsSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Our People",
};

const cta: CtaContent[] = [
  {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    description: "Want to join our collective or collaborate on a project? Reach out to our leadership team.",
    buttonText: "CONTACT US",
    buttonHref: "/contact",
  },
];

export default function PeoplePage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image="/images/hero/about-hero.png"
        title="OUR PEOPLE"
        description="A collective of visionary leaders, architects, interior designers, and researchers."
      />

      {/* 2. ABOUT SECTION */}
      <AboutSection
        image_url="/images/about-us-about.png"
        background_color="#C9E5D2"
        heading="Diverse expertise united by design purpose"
        description="Our multidisciplinary practice brings together passionate leaders and creative specialists to craft human-centric places across Australia and beyond."
      />

      {/* 3. PEOPLE NAVIGATION GRID SECTION (Team, Culture, Careers, Envision) */}
      <PeopleNavigationGrid />

      {/* 4. FAST FACTS SECTION */}
      <FastFactsSection />

      {/* 5. CTA SECTION */}
      <CtaSection cta={cta} />
    </article>
  );
}
