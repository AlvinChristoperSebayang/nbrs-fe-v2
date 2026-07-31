import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { AboutSection } from "@/components/home/AboutSection";
import type { SocialInitiative } from "@/lib/social-sustainability";

type SocialInitiativesSectionProps = { initiatives: SocialInitiative[] };

/** Renders the three editorial initiative treatments from the Social Sustainability page. */
export function SocialInitiativesSection({ initiatives }: SocialInitiativesSectionProps) {
  const [teKworo, ...featureInitiatives] = initiatives;

  return (
    <>
      {teKworo && (
        <AboutSection
          background_color="#F0C7BD"
          heading={teKworo.title}
          description={teKworo.description}
          image_url={teKworo.image}
          image_alt={teKworo.title}
        />
      )}

      <section className="space-y-16 bg-white py-16 lg:space-y-[143px] lg:py-[94px]">
        {featureInitiatives.map((initiative, index) => {
          const imageLeft = index % 2 === 0;
          return (
            <Container key={initiative.title}>
              <div className="relative flex flex-col items-center lg:min-h-[410px]">
                <div data-aos="fade-up" className={`w-full overflow-hidden bg-zinc-100 lg:absolute lg:top-0 lg:h-[410px] lg:w-[66%] ${imageLeft ? "lg:left-0" : "lg:right-0"}`}>
                  <ResponsiveImage src={initiative.image} alt={initiative.title} className="aspect-[77/41] h-full w-full object-cover" />
                </div>
                <article data-aos="fade-up" data-aos-delay="150" className={`z-10 w-full border-2 border-[#FDFFEA] bg-white/75 p-8 backdrop-blur-md lg:absolute lg:top-1/2 lg:w-1/2 lg:-translate-y-1/2 lg:p-8 ${imageLeft ? "lg:right-0" : "lg:left-0"}`}>
                  <h2 className="font-heading text-3xl uppercase leading-tight text-black lg:text-[40px]">{initiative.title}</h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-black">
                    {initiative.description.split(/\n\s*\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </article>
              </div>
            </Container>
          );
        })}
      </section>
    </>
  );
}
