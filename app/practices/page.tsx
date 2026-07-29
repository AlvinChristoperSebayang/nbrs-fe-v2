import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PracticesHoverSection } from "@/components/practices/PracticesHoverSection";

export const metadata: Metadata = {
  title: "Our Practices",
};

export default function PracticesPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image="/images/hero/hero2.png"
        title="OUR PRACTICES"
        description="Multidisciplinary design excellence uniting architecture, landscape, interior design, and heritage."
      />

      {/* 2. ABOUT SECTION */}
        <AboutSection
          image_url="/images/about-us-about.png"
          background_color="#DEE1F2"
          heading="Integrated disciplines for holistic design"
          description="Our multidisciplinary practice brings together architecture, interior design, landscape architecture, and heritage expertise to create cohesive, life-changing environments."
        /> 
        <PracticesHoverSection />
      
    </article>
  );
}
