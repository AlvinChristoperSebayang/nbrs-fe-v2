import { Container } from "@/components/ui/Container";

export function PracticeIntroSection({
  image,
  quote,
  alt = "Practice intro image",
}: {
  image: string;
  quote: string;
  alt?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-24 text-black overflow-hidden">
      <Container>
        <div
          data-aos="fade-up"
          className="relative max-w-[1171px] mx-auto min-h-none lg:min-h-[410px] flex flex-col-reverse lg:flex-col lg:block justify-center"
        >
          {/* Main Left Image (770px x 410px) */}
          <div className="w-full lg:w-[770px] h-[300px] sm:h-[380px] lg:h-[410px] relative lg:absolute lg:left-0 lg:top-0 overflow-hidden">
            <img
              src={image}
              alt={alt}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Overlapping Frosted Glass Box (585px wide, overlapping right side of image) */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="w-full lg:w-[585px] relative lg:absolute lg:left-[586px] lg:top-[125px] z-10 bg-white/80 backdrop-blur-[5px] p-0 sm:p-8 lg:p-10 flex items-center border border-white/60 max-lg:mb-4 rounded-sm"
          >
            <p className="font-sans text-base text-black font-normal leading-relaxed max-w-[453px]">
              {quote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
