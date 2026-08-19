import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { AboutSection } from "@/components/home/AboutSection";
import type { SocialInitiative } from "@/lib/social-responsibility";

type SocialInitiativesSectionProps = { initiatives: SocialInitiative[] };

function InitiativeDescription({ description, className }: { description: string; className: string }) {
  const normalisedDescription = description.replace(/\\n/g, "\n").replace(/\r\n?/g, "\n");
  const isRichText = /<\/?[a-z][\s\S]*>/i.test(normalisedDescription);
  const richTextClassName = `${className} [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc`;

  if (isRichText) {
    return <div className={richTextClassName} dangerouslySetInnerHTML={{ __html: normalisedDescription }} />;
  }

  return (
    <div className={className}>
      {normalisedDescription.split(/\n\s*\n/).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export function SocialInitiativesSection({ initiatives }: SocialInitiativesSectionProps) {
  const [teKworo, ...featureInitiatives] = initiatives;

  return (
    <>
      {teKworo && (
        <AboutSection
          background_color="#F0C7BD"
          heading={teKworo.title}
          heading_size="!max-w-full text-[28px] sm:text-[40px]"
          single_line_heading={true}
          description={teKworo.description}
          image_url={teKworo.image}
          image_alt={teKworo.title}
        />
      )}

      <section className="bg-white py-12 sm:py-16 lg:py-[94px]">
        <Container className="space-y-12 sm:space-y-16 lg:space-y-[143px]">
          {featureInitiatives.map((initiative, index) => {
            const imageLeft = index % 2 === 0;
            return (
              <div key={initiative.title}>
                <div className="flex flex-col lg:hidden">
                  <div data-aos="fade-up">
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase leading-tight text-black mb-3">
                      {initiative.title}
                    </h2>
                    <InitiativeDescription
                      description={initiative.description}
                      className="mb-6 space-y-3 font-sans text-sm leading-relaxed text-black sm:text-base"
                    />
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="w-full overflow-hidden bg-zinc-100 rounded-[5px]"
                  >
                    <ResponsiveImage
                      src={initiative.image}
                      alt={initiative.title}
                      title={initiative.title}
                      className="aspect-[4/3] sm:aspect-[77/41] h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Desktop View (>= lg): Overlapping Image + Glass Card */}
                <div className="hidden lg:relative lg:flex lg:flex-col lg:items-center lg:min-h-[410px]">
                  <div
                    data-aos="fade-up"
                    className={`absolute top-0 h-[410px] w-[66%] overflow-hidden bg-zinc-100 ${
                      imageLeft ? "left-0" : "right-0"
                    }`}
                  >
                    <ResponsiveImage
                      src={initiative.image}
                      alt={initiative.title}
                      title={initiative.title}
                      className="aspect-[77/41] h-full w-full object-cover"
                    />
                  </div>
                  <article
                    data-aos="fade-up"
                    data-aos-delay="150"
                    className={`absolute top-1/2 z-10 w-1/2 -translate-y-1/2 border-2 border-[#FDFFEA] bg-white/75 p-8 backdrop-blur-md ${
                      imageLeft ? "right-0" : "left-0"
                    }`}
                  >
                    <h2 className="font-heading text-[32px] uppercase leading-tight font-bold text-black">
                      {initiative.title}
                    </h2>
                    <InitiativeDescription
                      description={initiative.description}
                      className="mt-5 space-y-4 font-sans text-sm leading-relaxed text-black"
                    />
                  </article>
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}
