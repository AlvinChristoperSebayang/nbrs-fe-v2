import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { FeatureGlassSection } from "@/components/sustainability/FeatureGlassSection";
import { GreenStarSection } from "@/components/sustainability/GreenStarSection";
// import { SustainabilityProjectsSection } from "@/components/sustainability/SustainabilityProjectsSection";
import { Hero } from "@/components/ui/Hero";
import { getSustainabilityPage } from "@/lib/sustainability";

export const metadata: Metadata = {
  title: "Sustainability",
};

export default async function SustainabilityPage() {
  const page = await getSustainabilityPage();

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero image={page.hero} title={page.title} description={page.description} />

      <AboutSection
        background_color="#FDD4B6"
        image_url={page.intro.image}
        heading={page.intro.heading}
        description={page.intro.text}
      />

      <GreenStarSection
        heading={page.greenStar.heading}
        description={page.greenStar.text}
        image={page.greenStar.image}
      />

      {page.features.map((feature, index) => (
        <FeatureGlassSection
          key={`${feature.title}-${index}`}
          title={feature.title}
          paragraphs={[feature.text]}
          image={feature.image}
          reverse={index % 2 === 0}
          buttonText={feature.href ? "View project" : undefined}
          buttonHref={feature.href}
        />
      ))}

      {/* <SustainabilityProjectsSection projects={page.projects} /> */}

      <CtaSection content={page.cta} />
    </article>
  );
}
