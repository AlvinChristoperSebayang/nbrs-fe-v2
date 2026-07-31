import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";

export const metadata: Metadata = {
  title: "Sustainability",
};

export default function SustainabilityPage() {
  return (
    <article>
      <Hero
        image="/images/hero/hero-sustain.png"
        title="A Sustainable Future"
        description="A regenerative, insight-driven approach foregrounds climate-responsive design and long term value."
      />
      <AboutSection
        image_url="/images/hero/hero-sustain.png"
        heading="Giving New Life to Existing Places"
        description="We extend the life of meaningful buildings, reduce embodied carbon, and celebrate cultural heritage."
      />
    </article>
  );
}
