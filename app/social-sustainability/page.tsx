import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { FeatureGlassSection } from "@/components/sustainability/FeatureGlassSection";
import { SupportedOrganisations } from "@/components/sustainability/SupportedOrganisations";

export const metadata: Metadata = {
  title: "Social Sustainability",
};

export default function SocialSustainabilityPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image="/images/hero/hero6.png"
        title="SOCIAL SUSTAINABILITY"
        description="Creating environments that uplift people, foster inclusion, and support long-term community wellbeing."
      />

      <div className="lg:pb-10">
        <AboutSection
          image_url="/images/about-us-about.png"
          background_color="#F0C7BD"
          heading="People‑centred design for good"
          description="We create environments that foster wellbeing, belonging and transformation. Design that responds directly to human needs."
        />
      </div>

      <FeatureGlassSection
        title="Te-Kworo Foundation"
        paragraphs={[
          "NBRS partners with the Te-Kworo Foundation to transform lives in Northern Uganda through sustainable community architecture, health clinics, and educational infrastructure.",
          "Together, we aim to build empowering environments that foster local resilience, dignity, and generational hope.",
        ]}
        image="/images/about/real-insight.jpg"
        reverse={true}
      />

      <FeatureGlassSection
        title="One Life to Love"
        paragraphs={[
          "Through AWF, NBRS supports One Life to Love, a not‑for‑profit dedicated to the care and education of abandoned and at‑risk children in India.",
          "NBRS has designed a campus in Bangalore housing orphans, neglected families, a school and a skills centre. Construction is starting in 2026.",
        ]}
        image="/images/about/creative-partnership.jpg"
        reverse={false}
      />
      <SupportedOrganisations />
    </article>
  );
}
