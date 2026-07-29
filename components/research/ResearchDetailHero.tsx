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
            className="font-heading text-4xl sm:text-5xl lg:text-[70px] font-bold text-black uppercase leading-[1.05] tracking-tight"
          >
            {title}
          </h1>

          {/* Underline Divider Line */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mt-6 mb-6 h-1.5 lg:h-2 w-48 sm:w-64 bg-black origin-left"
          />

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
