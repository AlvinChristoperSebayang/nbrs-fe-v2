import { Container } from "@/components/ui/Container";

export function RapInsightSection({
  heading = "Insight",
  paragraphs,
  image,
  image_alt = "RAP artwork — Shared Waterways",
}: {
  heading?: string;
  paragraphs: string[];
  image: string;
  image_alt?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        <div data-aos="fade-up" className="flex flex-col gap-6 lg:w-1/2">
          <h2 className="font-heading text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <div className="flex flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm text-black/70 sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="w-full overflow-hidden lg:w-1/2"
        >
          <img
            src={image}
            alt={image_alt}
            className="aspect-square w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
