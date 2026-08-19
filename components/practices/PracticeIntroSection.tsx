import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export function PracticeIntroSection({
  image,
  quote,
  alt = "Practice intro image",
}: {
  image: ImageSource;
  quote: string;
  alt?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-24 text-black overflow-hidden">
      <Container>
        <div
          data-aos="fade-up"
          className="relative w-full min-h-none lg:min-h-[410px] flex flex-col-reverse lg:flex-col lg:block justify-center gap-6 lg:gap-0"
        >
          {/* Main Left Image (770px x 410px) */}
          <div className="w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-[770px] -mr-4 sm:-mr-6 lg:mr-0 h-[260px] sm:h-[360px] lg:h-[410px] relative lg:absolute lg:left-0 lg:top-0 overflow-hidden">
            <ResponsiveImage
              src={image}
              alt={alt}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Overlapping Frosted Glass Box (585px wide, overlapping right side of image) */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="w-full lg:w-[585px] relative lg:absolute lg:right-0 lg:top-[125px] z-10 bg-transparent lg:bg-white/80 lg:backdrop-blur-[5px] p-0 sm:p-8 lg:p-10 flex items-center border-none lg:border lg:border-white/60"
          >
            <p className="font-sans text-base sm:text-base text-black font-normal leading-relaxed max-w-[453px]">
              {quote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
