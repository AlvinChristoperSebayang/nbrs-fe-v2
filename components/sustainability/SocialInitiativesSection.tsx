import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { SocialInitiative } from "@/lib/social-sustainability";

type SocialInitiativesSectionProps = { initiatives: SocialInitiative[] };

/** Renders the three editorial initiative treatments from the Social Sustainability page. */
export function SocialInitiativesSection({ initiatives }: SocialInitiativesSectionProps) {
  const [teKworo, ...featureInitiatives] = initiatives;

  return (
    <>
      {teKworo && (
        <section className="border-t-[12px] border-[#F0C7BD] bg-[#07120F] py-12 text-white lg:py-0">
          <Container className="grid items-stretch lg:grid-cols-[400px_minmax(0,770px)] lg:justify-center">
            <div data-aos="fade-up" className="flex flex-col justify-center px-2 py-8 lg:px-0 lg:pr-14">
              <h2 className="font-heading text-3xl uppercase leading-tight lg:text-[40px]">{teKworo.title}</h2>
              <div className="mt-7 space-y-5 text-sm leading-relaxed text-white/90">
                {teKworo.description.split(/\n\s*\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="150" className="relative min-h-72 overflow-hidden lg:min-h-[600px]">
              <ResponsiveImage src={teKworo.image} alt={teKworo.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Container>
        </section>
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
