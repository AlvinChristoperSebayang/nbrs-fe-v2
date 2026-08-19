import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { AwardsSection } from "@/components/awards/AwardsSection";
import { getAwardsPage } from "@/lib/awards";

export async function generateMetadata() {
  const page = await getAwardsPage();
  return createPageMetadata({ pathname: "/awards", title: page.hero.title, cmsTitle: page.cmsSeoTitle, description: page.seoDescription, image: page.seoImage ?? page.hero.image });
}

function formatIntroHeading(heading?: string | null): string {
  if (!heading) return "BEST IN PRACTICE\n— AIA AWARD 2022";
  if (heading.includes("\n")) return heading;
  if (/[-–—]/.test(heading)) {
    const parts = heading.split(/\s*[-–—]\s*/);
    return `${parts[0].trim()}\n— ${parts.slice(1).join(" — ").trim()}`;
  }
  return heading;
}

function renderAwardsHeroTitle(title?: string | null) {
  if (!title) return null;

  const rawTitle = title.trim();

  if (rawTitle.includes("\n")) {
    const lines = rawTitle.split("\n").map((l) => l.trim()).filter(Boolean);
    const firstLines = lines.slice(0, -1);
    const lastLine = lines[lines.length - 1];

    return (
      <span className="inline-flex flex-col items-start">
        {firstLines.map((line, idx) => (
          <span key={idx} className="block leading-[1.05]">
            {line}
          </span>
        ))}
        <span className="inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-none mt-1">
          {lastLine}
        </span>
      </span>
    );
  }

  const words = rawTitle.split(/\s+/);

  if (words.length === 4) {
    return (
      <>
        <span className="sm:hidden inline-flex flex-col items-start">
          <span className="block leading-[1.05]">{words[0]}</span>
          <span className="block leading-[1.05]">{words.slice(1, 3).join(" ")}</span>
          <span className="inline-block border-b-[4px] border-white pb-1 leading-none mt-1">
            {words[3]}
          </span>
        </span>

        <span className="hidden sm:inline-flex flex-col items-start">
          <span className="block leading-[1.05]">{words.slice(0, 2).join(" ")}</span>
          <span className="inline-block border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-none mt-1">
            {words.slice(2).join(" ")}
          </span>
        </span>
      </>
    );
  }

  if (words.length >= 5) {
    const mobileChunk1 = Math.ceil(words.length / 3);
    const mobileChunk2 = Math.ceil((words.length * 2) / 3);
    const desktopMid = Math.ceil(words.length / 2);

    return (
      <>
        <span className="sm:hidden inline-flex flex-col items-start">
          <span className="block leading-[1.05]">{words.slice(0, mobileChunk1).join(" ")}</span>
          <span className="block leading-[1.05]">{words.slice(mobileChunk1, mobileChunk2).join(" ")}</span>
          <span className="inline-block border-b-[4px] border-white pb-1 leading-none mt-1">
            {words.slice(mobileChunk2).join(" ")}
          </span>
        </span>

        <span className="hidden sm:inline-flex flex-col items-start">
          <span className="block leading-[1.05]">{words.slice(0, desktopMid).join(" ")}</span>
          <span className="inline-block border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-none mt-1">
            {words.slice(desktopMid).join(" ")}
          </span>
        </span>
      </>
    );
  }

  const firstWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  return (
    <span className="inline-flex flex-col items-start">
      {firstWords && <span className="block leading-[1.05]">{firstWords}</span>}
      <span className="inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-none mt-1">
        {lastWord}
      </span>
    </span>
  );
}

export default async function AwardsPage() {
  const page = await getAwardsPage();

  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image={page.hero.image}
        title={renderAwardsHeroTitle(page.hero.title)}
        description={page.hero.description}
        button={page.hero.button}
        descriptionClassName="max-w-[393px]"
      />

      <div>
        <AboutSection
          image_url={page.intro.image}
          background_color="#DEE1F2"
          heading={formatIntroHeading(page.intro.heading)}
          description={page.intro.description}
          button={page.intro.button}
          description_class_name="max-w-[293px]"
        />
      </div>

      <section id="recognising-awards" className="bg-white py-4 lg:py-24">
        <Container className="md:pb-20">
          <AwardsSection
            heading={page.awards.heading}
            description={page.awards.description}
            items={page.awards.items}
          />
        </Container>
      </section>

      <CtaSection content={page.cta} descriptionClassName="!max-w-[344px]" />
    </article>
  );
}
