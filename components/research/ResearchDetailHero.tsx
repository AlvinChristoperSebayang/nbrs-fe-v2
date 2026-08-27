import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type ResearchDetailHeroProps = {
  title: string;
  description?: string;
  category?: string;
  bgImage?: ImageSource | null;
  bgColor?: string;
};

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
    return title.split("\n").map((line) => line.trim()).filter(Boolean);
  }

  const words = title.trim().split(/\s+/);
  if (words.length <= 3) return [title.trim()];

  const MAX_LINE_LENGTH = 26;
  const lines: string[] = [];
  let currentWords: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    const wordLength = word.length;
    const nextLength = currentLength === 0 ? wordLength : currentLength + 1 + wordLength;

    if (nextLength <= MAX_LINE_LENGTH || currentWords.length === 0) {
      currentWords.push(word);
      currentLength = nextLength;
    } else {
      lines.push(currentWords.join(" "));
      currentWords = [word];
      currentLength = wordLength;
    }
  }

  if (currentWords.length > 0) {
    lines.push(currentWords.join(" "));
  }

  if (lines.length > 1) {
    const lastLineWords = lines[lines.length - 1].split(" ");
    if (lastLineWords.length === 1 && lastLineWords[0].length < 10) {
      const prevLineWords = lines[lines.length - 2].split(" ");
      if (prevLineWords.length > 1) {
        const movedWord = prevLineWords.pop()!;
        lines[lines.length - 2] = prevLineWords.join(" ");
        lines[lines.length - 1] = `${movedWord} ${lastLineWords[0]}`;
      }
    }
  }

  return lines;
}

export function renderResearchTitleWithUnderline(title: string) {
  const lines = getTitleLines(title);

  if (lines.length === 1) {
    return (
      <span className="inline-block border-b-[4px] border-black pb-1 leading-[1.05] sm:border-b-[5px] sm:pb-2 lg:border-b-[6px]">
        {lines[0]}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-start">
      {lines.map((line, index) =>
        index === lines.length - 1 ? (
          <span
            key={`${line}-${index}`}
            className="mt-1 inline-block border-b-[4px] border-black pb-1 leading-none sm:border-b-[5px] sm:pb-2 lg:border-b-[6px]"
          >
            {line}
          </span>
        ) : (
          <span key={`${line}-${index}`} className="block leading-[1.05]">
            {line}
          </span>
        ),
      )}
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
  const activeBgColor = bgColor || CATEGORY_BG_COLORS[normalizedCategory] || "#F2E8D8";
  const activeBgImage = bgImage ?? "/images/research-banner-pattern.png";

  return (
    <section
      className="relative flex h-[610px] w-full items-center overflow-hidden transition-colors duration-500 lg:h-[85vh] lg:min-h-[85vh] xl:min-h-[90vh] xl:h-[910px]"
      style={{ backgroundColor: activeBgColor }}
    >
      <div className="pointer-events-none absolute inset-0">
        <ResponsiveImage src={activeBgImage} alt="" priority className="h-full w-full object-cover" />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-center pb-12 lg:pb-16">
        <div className="flex max-w-4xl flex-col items-start">
          <div
            data-aos="fade-up"
            className="mb-6 inline-flex items-center gap-2 rounded-[5px] border border-black bg-transparent px-5 py-2 sm:mb-8"
          >
            <span className="font-sans text-sm font-bold tracking-wider text-black uppercase sm:text-base">RESEARCH</span>
            <span className="text-sm font-medium text-black opacity-60 sm:text-base">|</span>
            <span className="font-sans text-sm font-light tracking-wider text-black uppercase sm:text-base">{category}</span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="mb-6 font-heading text-4xl leading-[1.05] font-bold tracking-tight text-black uppercase sm:text-5xl lg:text-[70px]"
          >
            {renderResearchTitleWithUnderline(title)}
          </h1>

          {description && (
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="max-w-2xl font-sans text-base leading-relaxed font-normal text-black sm:text-lg"
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
