import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export function CultureValuesSection({ heading, description, image }: { heading: string; description: string; image: ImageSource }) {
  return (
    <section className="bg-zinc-100 py-16 lg:py-24 text-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Title & Text */}
          <div data-aos="fade-up" className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[52px] font-bold uppercase tracking-wide text-black leading-none">
              {heading}
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-800 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Right Column: Values Diagram Graphic */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="lg:col-span-5 flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-64 sm:w-72 aspect-square flex items-center justify-center">
              <ResponsiveImage
                src={image}
                alt="NBRS Our Values Diagram"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
