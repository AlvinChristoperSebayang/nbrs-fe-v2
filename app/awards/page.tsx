import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { AwardsSection } from "@/components/awards/AwardsSection";
import { getAwardsPage } from "@/lib/awards";

export const metadata = createPageMetadata({ pathname: "/awards", title: "Awards" });

function formatIntroHeading(heading?: string | null): string {
  if (!heading) return "BEST IN PRACTICE\n— AIA AWARD 2022";
  if (heading.includes("\n")) return heading;
  if (/[-–—]/.test(heading)) {
    const parts = heading.split(/\s*[-–—]\s*/);
    return `${parts[0].trim()}\n— ${parts.slice(1).join(" — ").trim()}`;
  }
  return heading;
}

export default async function AwardsPage() {
  const page = await getAwardsPage();

  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image={page.hero.image}
        title={page.hero.title}
        description={page.hero.description}
        button={page.hero.button}
      />

      <div>
        <AboutSection
          image_url={page.intro.image}
          background_color="#DEE1F2"
          heading={formatIntroHeading(page.intro.heading)}
          description={page.intro.description}
          button={page.intro.button}
        />
      </div>

      <section id="recognising-awards" className="bg-white py-16 lg:py-24">
        <Container>
          <AwardsSection
            heading={page.awards.heading}
            description={page.awards.description}
            items={page.awards.items}
          />
        </Container>
      </section>

      <CtaSection content={page.cta} />
    </article>
  );
}
