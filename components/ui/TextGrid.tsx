import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

function renderTextGridHeading(heading: string) {
  const singleLineHeading = heading.replace(/\n+/g, " ").trim();

  let lines: string[];
  if (heading.includes("\n")) {
    lines = heading.split("\n").map((l) => l.trim()).filter(Boolean);
  } else {
    const words = heading.trim().split(/\s+/);
    if (words.length >= 4) {
      const mid = Math.ceil(words.length / 2);
      lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
    } else if (words.length >= 2) {
      lines = [words.slice(0, -1).join(" "), words[words.length - 1]];
    } else {
      lines = [heading];
    }
  }

  const desktopContent =
    lines.length <= 1 ? (
      <span className="inline-block w-fit border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-[1.05]">
        {lines[0]}
      </span>
    ) : (
      <span className="flex flex-col items-start w-fit">
        {lines.slice(0, -1).map((line, idx) => (
          <span key={idx} className="block leading-[1.05]">
            {line}
          </span>
        ))}
        <span className="inline-block w-fit border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-[1.05] mt-1">
          {lines[lines.length - 1]}
        </span>
      </span>
    );

  return (
    <>
      <span className="inline-block w-fit border-b-[4px] border-black pb-1 leading-[1.05] sm:hidden">
        {singleLineHeading}
      </span>
      <span className="hidden sm:inline-flex">{desktopContent}</span>
    </>
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
            className={`flex flex-col justify-start ${textColSpan}`}
          >
            <div className="flex flex-col w-fit max-w-[569px]">
              <h2 className="font-heading text-[#000000] text-[28px] sm:text-4xl md:text-[40px] lg:text-[42px] xl:text-[52px] 2xl:text-[60px] uppercase leading-[1.05] tracking-tight flex flex-col items-start">
                {renderTextGridHeading(heading)}
              </h2>
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
              className="h-56 w-full overflow-hidden xl:h-[300px] lg:col-span-1 rounded-[5px] lg:h-[250px]"
            >
              <ResponsiveImage src={src} alt="NBRS Architecture project" title="NBRS Architecture project" className="h-full w-full object-cover rounded-[5px]" />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-6 lg:gap-6">
          {galleryImages.map((src, index) => (
            <div
              key={`gallery-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="h-56 w-full overflow-hidden xl:h-[300px] lg:h-[250px]"
            >
              <ResponsiveImage src={src} alt="NBRS Architecture project gallery" title="NBRS Architecture project gallery" className="h-full w-full object-cover rounded-[5px]" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
