import { createPageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/cta/CtaSection";
import { GridEffect } from "@/components/ui/GridEffect";
import { Hero } from "@/components/ui/Hero";
import { QuoteSection } from "@/components/ui/QuoteSection";
import { TextGrid } from "@/components/ui/TextGrid";
import { DesignApproachProjectSection } from "@/components/design-approach/DesignApproachProjectSection";
import { getDesignApproachContent } from "@/lib/design-approach";

export async function generateMetadata() {
  const page = await getDesignApproachContent();
  return createPageMetadata({
    pathname: "/design-approach",
    title: page.hero.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription ?? page.hero.description,
    image: page.seoImage ?? page.hero.image,
  });
}

export default async function DesignApproachPage() {
  const content = await getDesignApproachContent();

  return (
    <article>
      <Hero
        image={content.hero.image}
        title={content.hero.title}
        description={content.hero.description}
        button={content.hero.button}
        descriptionClassName="max-w-[430px]"
        className="md:!h-auto md:!min-h-0 md:aspect-[16/10] lg:aspect-[16/9] xl:aspect-[16/9] 2xl:aspect-[16/9]"
        imageClassName="object-cover object-right md:object-top"
      />
      <div>
        <div className="bg-[#DEE1F2] h-1.5 md:h-0" />
        <GridEffect
          items={content.pillars.items}
          title={content.pillars.title}
          description={content.pillars.description}
          viewAllLabel=""
          viewAllUrl=""
          backgroundColor="#DEE1F2"
          titleClassNameNonHover="text-[#BFBFBF]"
        />
      </div>
      <TextGrid
        heading={content.communities.heading}
        description={content.communities.description}
        topImages={content.communities.topImages}
        galleryImages={content.communities.galleryImages}
      />
      <QuoteSection
        image={content.quote.image}
        quote={content.quote.quote}
        author={content.quote.author}
        role={content.quote.role}
      />
      <DesignApproachProjectSection
        heading={content.project.heading}
        description={content.project.description}
        image={content.project.image}
        buttonText={content.project.buttonText}
        buttonHref={content.project.buttonHref}
      />
      <CtaSection content={content.cta} />
    </article>
  );
}

