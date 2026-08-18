import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PracticesHoverSection } from "@/components/practices/PracticesHoverSection";
import { getPracticesPageContent } from "@/lib/practices-page";

export async function generateMetadata() {
  const page = await getPracticesPageContent();
  return createPageMetadata({ pathname: "/practices", title: page.hero.title, description: page.hero.description, image: page.hero.image });
}

export default async function PracticesPage() {
  const content = await getPracticesPageContent();

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image={content.hero.image}
        title={content.hero.title}
        description={content.hero.description}
      />

      {/* 2. ABOUT SECTION */}
        <AboutSection
          image_url={content.intro.image}
          background_color="#FDD4B6"
          heading={content.intro.heading}
          description={content.intro.description}
        /> 
        <PracticesHoverSection items={content.practices} />
      
    </article>
  );
}
