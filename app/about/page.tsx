import { createPageMetadata } from "@/lib/seo";
import { AboutPracticeSection } from "@/components/about/AboutPracticeSection";
import { AboutTimelineSection } from "@/components/about/AboutTimelineSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { AboutSection } from "@/components/home/AboutSection";
import { GridEffect } from "@/components/ui/GridEffect";
import { Hero } from "@/components/ui/Hero";
import { ABOUT_FALLBACK, getAboutContent } from "@/lib/about";

export async function generateMetadata() {
  const page = await getAboutContent().catch(() => ABOUT_FALLBACK);
  return createPageMetadata({
    pathname: "/about",
    title: page.hero.title,
    description: page.hero.description,
    image: page.hero.image,
  });
}

function formatAboutIntroHeading(heading?: string | null): string {
  if (!heading) return "PEOPLE-CENTRED\nDESIGN FOR GOOD";
  if (heading.includes("\n")) return heading;
  return "PEOPLE-CENTRED\nDESIGN FOR GOOD";
}

export default async function AboutPage() {
  const about = await getAboutContent().catch(() => ABOUT_FALLBACK);

  return (
    <article>
      <Hero
        image={about.hero.image}
        title={about.hero.title}
        description={about.hero.description}
      />
      <div className="bg-[#FFFFFF] lg:pb-20">
        <AboutSection
          image_url={about.intro.image}
          background_color="#FDD4B6"
          heading={formatAboutIntroHeading(about.intro.heading)}
          description={about.intro.description}
          description_class_name="max-w-none lg:max-w-[314px]"
        />
      </div>
      <GridEffect
        title={about.approachHeading}
        items={about.approachItems}
        viewAllLabel=""
        viewAllUrl=""
        backgroundColor="#EDEDED"
      />
      <AboutPracticeSection
        heading={about.practice.heading}
        description={about.practice.description}
        mainImage={about.practice.images[0]}
        galleryImages={about.practice.images.slice(1, 4)}
      />
      <AboutTimelineSection
        label={about.timeline.heading}
        items={about.timeline.items.length ? about.timeline.items : ABOUT_FALLBACK.timeline.items}
      />
      <CtaSection content={about.cta} />
    </article>
  );
}

