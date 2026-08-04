import { Container } from "@/components/ui/Container";

export type ResearchDetailHeroProps = {
  title: string;
  description?: string;
  category?: string;
  bgImage?: string;
  bgColor?: string;
};

// Category Background Colors according to project design system
const CATEGORY_BG_COLORS: Record<string, string> = {
  community: "#F2E8D8",
  wellness: "#DEE1F2",
  education: "#EDE3F0",
  "secure spaces": "#FDD4B6",
  "secure-spaces": "#FDD4B6",
  heritage: "#F0C7BD",
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

export function renderResearchTitleWithUnderline(title: string) {
  const lines = getTitleLines(title);

  if (lines.length === 1) {
    return (
      <span className="inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-[1.05]">
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
              className="inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-none mt-1"
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
  bgImage,
  bgColor,
}: ResearchDetailHeroProps) {
  const normalizedCategory = category.toLowerCase().trim();
  const activeBgColor =
    bgColor || CATEGORY_BG_COLORS[normalizedCategory] || "#F2E8D8";

  return (
    <section
      className="relative max-md:h-[80vh] lg:h-[90vh] w-full flex items-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: activeBgColor }}
    >
      {/* Background Graphic / Waves SVG Overlay */}
      {bgImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : (
        <svg
          className="absolute right-0 bottom-0 top-0 h-full w-auto opacity-30 pointer-events-none stroke-white"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-200 600C100 400 300 500 500 300C700 100 900 200 1200 0"
            stroke="white"
            strokeWidth="4"
          />
          <path
            d="M-150 650C150 450 350 550 550 350C750 150 950 250 1250 50"
            stroke="white"
            strokeWidth="3"
          />
          <path
            d="M-100 700C200 500 400 600 600 400C800 200 1000 300 1300 100"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      )}

      <Container className="relative z-10 flex h-full flex-col justify-center pb-12 lg:pb-16">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Dynamic Category Pill Badge */}
          <div
            data-aos="fade-up"
            className="rounded-[5px] border border-black px-5 py-2 inline-flex items-center gap-2 mb-6 sm:mb-8 bg-transparent"
          >
            <span className="text-black text-sm sm:text-base font-bold tracking-wider uppercase font-sans">
              RESEARCH
            </span>
            <span className="text-black text-sm sm:text-base font-medium opacity-60">
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
            {renderResearchTitleWithUnderline(title)}
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
