import { createPageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/cta/CtaSection";
import { SectorsSection } from "@/components/home/SectorsSection";
import { Hero } from "@/components/ui/Hero";
import { getSectorsPageContent } from "@/lib/sectors-page";

export async function generateMetadata() {
  const page = await getSectorsPageContent();
  return createPageMetadata({
    pathname: "/sectors",
    title: page.hero.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription ?? page.hero.description,
    image: page.seoImage ?? page.hero.image,
  });
}

export default async function SectorsPage() {
  const content = await getSectorsPageContent();

  const heroTitle = content.hero.title
    ? content.hero.title.replace(/exploring\s+our\s+sectors/i, "EXPLORING\nOUR SECTORS")
    : "EXPLORING\nOUR SECTORS";

  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image={content.hero.image}
        title={heroTitle}
        description={content.hero.description}
        descriptionClassName="max-w-[340px]"
      />

      <SectorsSection sectors={content.sectors} heading={content.sectorsHeading} />

      <CtaSection content={content.cta} />
    </article>
  );
}
