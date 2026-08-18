import { createPageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/cta/CtaSection";
import { SectorsSection } from "@/components/home/SectorsSection";
import { Hero } from "@/components/ui/Hero";
import { getSectorsPageContent } from "@/lib/sectors-page";

export async function generateMetadata() {
  const page = await getSectorsPageContent();
  return createPageMetadata({ pathname: "/sectors", title: page.hero.title, description: page.hero.description, image: page.hero.image });
}

export default async function SectorsPage() {
  const content = await getSectorsPageContent();

  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image={content.hero.image}
        title={content.hero.title}
        description={content.hero.description}
      />

      <SectorsSection sectors={content.sectors} heading={content.sectorsHeading} />

      <CtaSection content={content.cta} />
    </article>
  );
}
