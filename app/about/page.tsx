import type { Metadata } from "next";
import { AboutPracticeSection } from "@/components/about/AboutPracticeSection";
import { AboutTimelineSection } from "@/components/about/AboutTimelineSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { AboutSection } from "@/components/home/AboutSection";
import { GridEffect } from "@/components/ui/GridEffect";
import { Hero } from "@/components/ui/Hero";
import { ABOUT_FALLBACK, getAboutContent } from "@/lib/about";

export const metadata: Metadata = {
  title: "About Us",
};

export default async function AboutPage() {
  const about = await getAboutContent().catch(() => ABOUT_FALLBACK);

  return (
    <article>
      <Hero
        image={about.hero.image}
        title={about.hero.title}
        description={about.hero.description}
      />
      <div className="bg-[#FFFFFF] lg:pb-32">
        <AboutSection
          image_url={about.intro.image}
          background_color="#FDD4B6"
          heading={about.intro.heading}
          description={about.intro.description}
        />
      </div>
      <GridEffect
        title={about.approachHeading}
        items={about.approachItems}
        // Unlike Homepage, an empty CTA Element intentionally hides this link.
        // viewAllLabel={about.viewAll?.label ?? ""}
        // viewAllUrl={about.viewAll?.href ?? ""}
        backgroundColor="#EDEDED"
      />
      <AboutPracticeSection
        heading={about.practice.heading}
        description={about.practice.description}
        mainImage={about.practice.images[0]}
        galleryImages={[
          about.practice.images[1],
          about.practice.images[2],
          about.practice.images[3],
        ]}
      />
      <AboutTimelineSection
        label={about.timeline.heading}
        items={about.timeline.items.length ? about.timeline.items : ABOUT_FALLBACK.timeline.items}
      />
      <CtaSection content={about.cta} />
    </article>
  );
}
