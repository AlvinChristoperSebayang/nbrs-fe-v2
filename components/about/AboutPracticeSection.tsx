import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function AboutPracticeSection({
  heading,
  description,
  mainImage,
  galleryImages,
}: {
  heading: string;
  description: string;
  mainImage: string;
  galleryImages: [string, string, string];
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
              <h2 className="font-heading  text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-[60px]">
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
            className="relative h-56 w-full overflow-hidden sm:h-48 lg:col-span-1 lg:h-56"
          >
            <Image
              src={mainImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-6 lg:gap-6">
          {galleryImages.map((src, index) => (
            <div
              key={src + index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative h-56 w-full overflow-hidden sm:h-48 lg:h-56"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
