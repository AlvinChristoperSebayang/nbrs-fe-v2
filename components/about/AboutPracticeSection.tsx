import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export function AboutPracticeSection({
  heading,
  description,
  mainImage,
  galleryImages,
}: {
  heading: string;
  description: string;
  mainImage: ImageSource;
  galleryImages: [ImageSource, ImageSource, ImageSource];
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="overflow-hidden">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <div
            data-aos="fade-up"
            className="flex flex-col justify-center lg:col-span-2"
          >
            <div className="flex flex-col w-full max-w-[569px]">
              <h2 className="font-heading text-[#000000] text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-[60px]">
                {heading}
              </h2>
              <div className="mt-4 h-1 w-full bg-black lg:h-1.5" />
              <p className="mt-6  text-sm text-black sm:text-base">
                {description}
              </p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="relative w-full overflow-hidden rounded-[5px] lg:col-span-1 aspect-[320/300] md:aspect-[370/300]"
          >
            <ResponsiveImage
              src={mainImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-6 lg:gap-6">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative w-full overflow-hidden rounded-[5px] aspect-[320/300] md:aspect-[370/300]"
            >
              <ResponsiveImage
                src={src}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
