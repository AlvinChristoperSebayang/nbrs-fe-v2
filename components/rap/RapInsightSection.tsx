import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

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
    <section className="bg-white pt-10 sm:pt-14 lg:pt-36 pb-16 lg:pb-24">
      <Container className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:gap-16">
        {/* Mobile Heading (visible on mobile only) */}
        <h2
          data-aos="fade-up"
          className="font-heading text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl lg:hidden"
        >
          {heading}
        </h2>

        {/* Artwork Image: below title on mobile, 2nd column on desktop */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="w-full overflow-hidden lg:order-2 lg:w-1/2"
        >
          <ResponsiveImage
            src={image}
            alt={image_alt || heading || "RAP Insight Artwork"}
            title={image_alt || heading || "RAP Insight Artwork"}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Text Content: below image on mobile, 1st column on desktop */}
        <div data-aos="fade-up" className="flex flex-col gap-6 lg:order-1 lg:w-1/2">
          {/* Desktop Heading (hidden on mobile) */}
          <h2 className="hidden font-heading text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl lg:block">
            {heading}
          </h2>
          <div className="flex flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm text-black/70 sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
