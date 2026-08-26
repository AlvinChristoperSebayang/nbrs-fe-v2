import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

function renderPracticeHeading(heading: string) {
  let lines: string[];
  if (heading.includes("\n")) {
    lines = heading.split("\n").map((l) => l.trim()).filter(Boolean);
  } else if (
    /^a\s+practice\s+built\s+on\s+care,?\s+joy\s+and\s+collaboration$/i.test(
      heading.trim()
    )
  ) {
    lines = ["A PRACTICE BUILT ON CARE,", "JOY AND COLLABORATION"];
  } else {
    const words = heading.trim().split(/\s+/);
    if (words.length >= 5) {
      const commaIdx = words.findIndex((w) => w.includes(","));
      const splitIdx = commaIdx !== -1 ? commaIdx + 1 : Math.ceil(words.length / 2);
      lines = [
        words.slice(0, splitIdx).join(" "),
        words.slice(splitIdx).join(" "),
      ];
    } else if (words.length >= 3) {
      lines = [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
    } else {
      lines = [heading];
    }
  }

  if (lines.length <= 1) {
    return (
      <span className="inline-block relative">
        {lines[0]}
        <span className="block mt-3 h-1 w-full bg-black lg:hidden" />
      </span>
    );
  }

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
        {/* On mobile: underline matches the width of the bottom line */}
        <span className="block lg:hidden mt-3 h-1 w-full bg-black" />
      </span>
    </>
  );
}

export type AboutPracticeSectionProps = {
  heading: string;
  description: string;
  mainImage: ImageSource;
  galleryImages: ImageSource[];
};

export function AboutPracticeSection({
  heading,
  description,
  mainImage,
  galleryImages,
}: AboutPracticeSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="overflow-hidden">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <div
            data-aos="fade-up"
            className="flex flex-col justify-center lg:col-span-2"
          >
            <div className="flex flex-col w-fit max-w-[569px]">
              <h2 className="font-heading text-[#000000] text-[28px] uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-[60px]">
                {renderPracticeHeading(heading)}
              </h2>
              {/* On desktop: underline spans the full width of the heading container */}
              <div className="hidden lg:block mt-4 h-1.5 w-full bg-black" />
              <p className="mt-6 text-sm text-black sm:text-base">
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
              alt="NBRS Practice Architecture & Design"
              title="NBRS Practice Architecture & Design"
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
                alt={`NBRS Practice gallery image ${index + 1}`}
                title={`NBRS Practice gallery image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
