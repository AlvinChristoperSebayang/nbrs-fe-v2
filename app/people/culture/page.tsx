import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { CultureValuesSection } from "@/components/people/CultureValuesSection";
import { InitiativesSection } from "@/components/people/InitiativesSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Our Culture | Our People",
};

const cta: CtaContent = {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    description: "Want to experience our studio culture or collaborate with us? Reach out today.",
    buttonText: "CONTACT US",
    buttonHref: "/contact",
  }

export default function PeopleCulturePage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image="/images/hero/hero3.png"
        title="OUR CULTURE"
        description="See how values of Care, Joy and Together turn into everyday studio life, learning and social impact across our studios."
      />

      {/* 2. OUR VALUES SECTION */}
      <CultureValuesSection />

      {/* 3. NBRS INITIATIVES SECTION */}
      <InitiativesSection />

      {/* 4. CTA SECTION */}
      <CtaSection content={cta} />
    </article>
  );
}
