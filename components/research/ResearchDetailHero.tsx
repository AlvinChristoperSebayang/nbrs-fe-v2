import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type ResearchDetailHeroProps = {
  title: string;
  description?: string;
  category?: string;
  image?: ImageSource;
  bgImage?: ImageSource;
  bgColor?: string;
  overlayClassName?: string;
};

function getTitleLines(title: string): string[] {
  if (title.includes("\n")) {
    return title.split("\n").map((l) => l.trim()).filter(Boolean);
  }

  const words = title.trim().split(/\s+/);

  // If 3 words or fewer, keep on 1 line
  if (words.length <= 3) {
    return [title.trim()];
  }

  const totalLength = title.trim().length;
  const targetMid = totalLength / 2;

  let currentLine = "";
  const line1Words: string[] = [];
  const line2Words: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (line1Words.length === 0) {
      line1Words.push(word);
      currentLine = word;
    } else if (currentLine.length < targetMid && i < words.length - 1) {
      line1Words.push(word);
      currentLine += " " + word;
    } else {
      line2Words.push(word);
    }
  }

  if (line2Words.length === 0) {
    return [title];
  }

  return [line1Words.join(" "), line2Words.join(" ")];
}

export function renderResearchTitleWithUnderline(title: string, borderColor: string = "border-black") {
  const lines = getTitleLines(title);

  if (lines.length === 1) {
    return (
      <span className={`inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] ${borderColor} pb-1 sm:pb-2 leading-[1.05]`}>
        {lines[0]}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-start">
      {lines.map((line, idx) => {
        const isLast = idx === lines.length - 1;
        if (isLast) {
          return (
            <span
              key={idx}
              className={`inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] ${borderColor} pb-1 sm:pb-2 leading-none mt-1`}
            >
              {line}
            </span>
          );
        }
        return (
          <span key={idx} className="block leading-[1.05]">
            {line}
          </span>
        );
      })}
    </span>
  );
}

export function ResearchDetailHero({
  title,
  description,
  category = "COMMUNITY",
  image,
  bgImage,
  overlayClassName = "bg-white/30",
}: ResearchDetailHeroProps) {
  const heroImage = image || bgImage || "/images/hero/hero-research.png";

  return (
    <section className="relative h-[610px] lg:h-[85vh] w-full flex items-center overflow-hidden">
      {/* Background Image Container matching standard Hero component */}
      <div className="absolute inset-0 overflow-hidden">
        <ResponsiveImage
          src={heroImage}
          alt=""
          className="h-full w-full object-cover"
          priority
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-center">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Dynamic Category Pill Badge */}
          <div
            data-aos="fade-up"
            className="rounded-[5px] border border-black px-5 py-2 inline-flex items-center gap-2 mb-6 sm:mb-8 bg-transparent"
          >
            <span className="text-black text-sm sm:text-base font-bold tracking-wider uppercase font-sans">
              RESEARCH
            </span>
            <span className="text-black/60 text-sm sm:text-base font-medium">
              |
            </span>
            <span className="text-black text-sm sm:text-base font-light tracking-wider uppercase font-sans">
              {category}
            </span>
          </div>

          {/* Title */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="font-heading text-4xl sm:text-5xl lg:text-[70px] font-bold text-black uppercase leading-[1.05] tracking-tight mb-6"
          >
            {renderResearchTitleWithUnderline(title, "border-black")}
          </h1>

          {/* Description */}
          {description && (
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="font-sans text-base sm:text-lg text-black font-normal leading-relaxed max-w-2xl"
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
