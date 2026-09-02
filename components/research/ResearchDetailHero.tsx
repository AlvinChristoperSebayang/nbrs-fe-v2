import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";
import { normalizeNewlines, formatCmsHtml } from "@/lib/text";

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

import { renderTitleWithUnderline } from "@/components/ui/UnderlineHeading";

export const renderResearchTitleWithUnderline = (title: string) =>
  renderTitleWithUnderline(title, true, "border-black");

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
              dangerouslySetInnerHTML={{ __html: formatCmsHtml(description) }}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
