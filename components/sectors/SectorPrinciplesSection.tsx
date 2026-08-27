import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export function SectorPrinciplesSection({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: ImageSource[];
}) {
  const colonIndex = title.indexOf(":");
  const prefix = "PRINCIPLES:";
  const mainTitle = colonIndex !== -1 ? title.slice(colonIndex + 1).trim() : title;

  return (
    <section className="bg-white py-16 lg:py-24 text-black">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-start">
          {/* Slot 1: Title & Description Text Block */}
          <div data-aos="fade-up" suppressHydrationWarning className="flex flex-col justify-start pr-2 lg:pr-4">
            <div className="mb-3 lg:mb-3 xl:mb-4">
              {/* Mobile (< lg): Single line */}
              <div className="lg:hidden">
                <span className="inline-block font-heading text-3xl sm:text-4xl uppercase font-bold text-black leading-none border-b-4 border-black pb-1">
                  {prefix} {mainTitle}
                </span>
              </div>
              {/* Desktop (>= lg): Two lines */}
              <div className="hidden lg:block">
                <span className="block font-heading text-[26px] lg:text-[28px] xl:text-[44px] 2xl:text-[56px] uppercase font-bold text-black leading-none">
                  {prefix}
                </span>
                <span className="inline-block font-heading text-[26px] lg:text-[28px] xl:text-[44px] 2xl:text-[56px] uppercase font-bold text-black leading-none mt-1 border-b-[3px] xl:border-b-4 border-black pb-1">
                  {mainTitle}
                </span>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm lg:text-[13px] xl:text-[15px] 2xl:text-base text-zinc-900 leading-relaxed lg:leading-[1.42] xl:leading-relaxed">
              {description}
            </p>
          </div>

          {/* Slots 2 to 6: 5 Gallery Images matching SectorsSection 3-column layout */}
          {images.map((imgUrl, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
              suppressHydrationWarning
              className="group relative block aspect-[370/300] w-full overflow-hidden rounded-[5px] bg-zinc-100"
            >
              <ResponsiveImage
                src={imgUrl}
                alt={`${title} principle ${index + 1}`}
                title={`${title} principle ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
