import { Container } from "@/components/ui/Container";

export type FeatureGlassSectionProps = {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  reverse?: boolean;
};

export function FeatureGlassSection({
  title,
  paragraphs,
  image,
  imageAlt = "",
  reverse = false,
}: FeatureGlassSectionProps) {
  return (
    <section className="bg-white py-12 lg:py-16 text-black lg:pb-[143px]">
      <Container>
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Overlapping Glass Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className={`z-10 w-full lg:w-[50%] bg-white/75 backdrop-blur-md border border-[#FDFFEA] p-0 lg:p-10 max-lg:mb-6 ${
              reverse
                ? "lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
                : "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
            }`}
          >
            <h3 className="font-heading text-3xl lg:text-4xl uppercase font-bold text-black leading-tight mb-4">
              {title}
            </h3>
            <div className="flex flex-col gap-4 text-base text-zinc-900 leading-relaxed font-sans">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Feature Image */}
          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className={`w-full lg:w-[68%] aspect-[16/10] overflow-hidden bg-zinc-100 ${
              reverse ? "lg:mr-auto" : "lg:ml-auto"
            }`}
          >
            <img
              src={image}
              alt={imageAlt || title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
