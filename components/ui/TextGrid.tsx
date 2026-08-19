import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

function renderTextGridHeading(heading: string) {
  if (heading.includes("\n")) {
    const lines = heading.split("\n").map((l) => l.trim()).filter(Boolean);
    const firstLines = lines.slice(0, -1);
    const lastLine = lines[lines.length - 1];
    return (
      <>
        {firstLines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
        <span className="inline-block relative">
          {lastLine}
          <span className="block lg:hidden mt-3 h-1 w-full bg-black" />
        </span>
      </>
    );
  }

  return (
    <span className="inline-block relative">
      {heading}
      <span className="block lg:hidden mt-3 h-1 w-full bg-black" />
    </span>
  );
}

export function TextGrid({
  heading,
  description,
  topImages,
  galleryImages,
}: {
  heading: string;
  description: string;
  topImages: ImageSource[];
  galleryImages: ImageSource[];
}) {
  const textColSpan = topImages.length >= 2 ? "lg:col-span-1" : "lg:col-span-2";

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="overflow-hidden">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <div
            data-aos="fade-up"
            className={`flex flex-col justify-center ${textColSpan}`}
          >
            <div className="flex flex-col w-fit max-w-[569px]">
              <h2 className="font-heading text-[#000000] text-[28px] sm:text-4xl lg:text-[60px] uppercase leading-[1.05] tracking-tight">
                {renderTextGridHeading(heading)}
              </h2>
              {/* On desktop: underline spans full width of the heading container */}
              <div className="hidden lg:block mt-4 h-1.5 w-full bg-black" />
              <p className="mt-6 text-sm sm:text-base text-black">
                {description}
              </p>
            </div>
          </div>

          {topImages.map((src, index) => (
            <div
              key={`top-${index}`}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
              className="h-56 w-full overflow-hidden sm:h-48 lg:col-span-1 lg:h-[300px]"
            >
              <ResponsiveImage src={src} alt="NBRS Architecture project" title="NBRS Architecture project" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-6 lg:gap-6">
          {galleryImages.map((src, index) => (
            <div
              key={`gallery-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="h-56 w-full overflow-hidden sm:h-48 lg:h-[300px]"
            >
              <ResponsiveImage src={src} alt="NBRS Architecture project gallery" title="NBRS Architecture project gallery" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
