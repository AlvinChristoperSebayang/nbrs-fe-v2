import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getPageCta } from "@/lib/cta";
import { AwardsSection } from "@/components/awards/AwardsSection";
import type { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Awards",
};

const cta: CtaContent[] = [
  {
    image: "/images/contact-bg.png",
    title: "Let’s Shape What’s Next-Together",
    description:
      "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
    buttonText: "Let’s Shape What’s Next-Together",
    buttonHref: "/contact",
  },
];

export default async function AwardsPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image="/images/hero/hero4.png"
        title="AWARD-WINNING DESIGN SHAPING COMMUNITIES"
        description="Our work is recognised for elevating everyday experience through purposeful, people-centred design."
        button={{
          text: "Learn more",
          href: "#recognising-awards",
        }}
      />

      <div className="lg:pb-32">
        <AboutSection
          image_url="/images/about-us-about.png"
          background_color="#DEE1F2"
          heading="People‑centred design for good"
          description="We create environments that foster wellbeing, belonging and transformation. Design that responds directly to human needs."
        />
      </div>

      <section id="recognising-awards" className="bg-white py-16 lg:py-24">
        <Container>
          <AwardsSection />
        </Container>
      </section>

      <CtaSection content={await getPageCta("pages", cta[0], "awards").catch(() => cta[0])} />
    </article>
  );
}
