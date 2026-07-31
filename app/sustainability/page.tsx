import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { FeatureGlassSection } from "@/components/sustainability/FeatureGlassSection";
import { GreenStarSection } from "@/components/sustainability/GreenStarSection";
import { CtaSection } from "@/components/cta/CtaSection";

export const metadata: Metadata = {
  title: "Sustainability",
};

const cta = {
  image: "/images/hero/hero-sustain.png",
  title: "A Sustainable Future",
  description:
    "A regenerative, insight-driven approach foregrounds climate-responsive design and long term value.",
  buttonText: "See Our Sectors",
  buttonHref: "/projects",
};

export default function SustainabilityPage() {
  return (
    <article className="min-h-screen bg-white text-black">
      <Hero
        image="/images/hero/hero-sustain.png"
        title="A Sustainable Future"
        description="A regenerative, insight-driven approach foregrounds climate-responsive design and long term value."
      />
      <AboutSection
        background_color="#FDD4B6"
        image_url="/images/hero/hero-sustain.png"
        heading="Giving New Life to Existing Places"
        description="We extend the life of meaningful buildings, reduce embodied carbon, and celebrate cultural heritage."
      />
      
      {/* Green Star Accredited Professionals Section */}
      <GreenStarSection
        heading="Green Star Accredited Professionals"
        description="Our multidisciplinary team embeds GBCA principles to realise sustainable, holistic design outcomes."
        image="/images/purpose/2e9a811597bffa70c8424f1ad2597538.png 1.png"
      />

      {/* Adaptive Reuse Feature Section */}
      <FeatureGlassSection
        title="ADAPTIVE REUSE"
        paragraphs={[
          "We design life-changing environments that stand the test of time while extending the use of meaningful buildings through our heritage specialists and experienced design team. successful adaptive reuse supports a positive embodied carbon strategy.",
        ]}
        image="/images/home-about.png"
        reverse
        buttonText="View project"
        buttonHref="/projects"
      />


      <FeatureGlassSection
        title="ADAPTIVE REUSE"
        paragraphs={[
          "We design life-changing environments that stand the test of time while extending the use of meaningful buildings through our heritage specialists and experienced design team. successful adaptive reuse supports a positive embodied carbon strategy.",
        ]}
        image="/images/home-about.png"
        buttonText="View project"
        buttonHref="/projects"
      />

      <CtaSection content={cta} />
    </article>
  );
}
