import { createPageMetadata } from "@/lib/seo";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { FeatureGlassSection } from "@/components/sustainability/FeatureGlassSection";
import { GreenStarSection } from "@/components/sustainability/GreenStarSection";
import { Hero } from "@/components/ui/Hero";
import { getSustainabilityPage } from "@/lib/sustainability";

function formatSustainabilityIntroHeading(heading?: string | null): string {
  if (!heading) return "GIVING NEW LIFE TO\nEXISTING PLACES";
  if (heading.includes("\n")) return heading;

  const normalized = heading.trim();
  if (/^giving\s+new\s+life\s+to\s+existing\s+places$/i.test(normalized)) {
    return "GIVING NEW LIFE TO\nEXISTING PLACES";
  }

  const words = normalized.split(/\s+/);
  if (words.length === 6) {
    return `${words.slice(0, 4).join(" ")}\n${words.slice(4).join(" ")}`;
  }

  return heading;
}

export async function generateMetadata() {
  const page = await getSustainabilityPage();
  return createPageMetadata({
    pathname: "/sustainability",
    title: page.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription,
    image: page.seoImage ?? page.hero,
  });
}

export default async function SustainabilityPage() {
  const page = await getSustainabilityPage();

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero image={page.hero} title={page.title} description={page.description} />

      <AboutSection
        background_color="#FDD4B6"
        image_url={page.intro.image}
        heading={formatSustainabilityIntroHeading(page.intro.heading)}
        description={page.intro.text}
        description_class_name="max-w-[276px]"
      />

      <div className="pb-0 md:pb-10">
        <GreenStarSection
          heading={page.greenStar.heading}
          description={page.greenStar.text}
          image={page.greenStar.image}
        />
      </div>

      {page.features.map((feature, index) => (
        <FeatureGlassSection
          key={`${feature.title}-${index}`}
          title={feature.title}
          paragraphs={[feature.text]}
          image={feature.image}
          reverse={index % 2 === 0}
          buttonText={feature.href ? "View project" : undefined}
          buttonHref={feature.href}
          imageAlt={feature.title}
        />
      ))}

      <CtaSection content={page.cta} />
    </article>
  );
}

