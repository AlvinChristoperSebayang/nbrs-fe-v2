import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type SubMenuCard = {
  id: string;
  title: string;
  description: string;
  actionText: string;
  href: string;
  image: ImageSource;
};
const ACCENTS = ["bg-[#F0C7BD]", "bg-[#EDE3F0]", "bg-[#FDD4B6]", "bg-[#F2E8D8]"];

export function PeopleNavigationGrid({ cards }: { cards: SubMenuCard[] }) {
  const teamCard = cards[0];
  const gridCards = cards.slice(1);
  if (!teamCard) return null;

  return (
    <section className="bg-white py-12 lg:py-24 text-black">
      <Container className="flex flex-col gap-6 lg:gap-8">
        {/* Featured Card 1: TEAM */}
        <div data-aos="fade-up">
          <Link
            href={teamCard.href}
            className="group relative grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-black text-white cursor-pointer"
          >
            {/* Top Colored Accent Bar Across Card */}
            <div
              className={`w-full h-2 sm:h-2.5 ${ACCENTS[0]} absolute top-0 left-0 right-0 z-20`}
            />

            {/* Left Text Box */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-12 pt-8 sm:pt-10 lg:pt-14 min-h-[250px]">
              <div className="flex flex-col gap-3">
                {/* Mobile Title (Team) vs Desktop Title (TEAM) */}
                <span className="lg:hidden font-sans text-base font-medium text-white/80">
                  {teamCard.title}
                </span>
                <span
                  className="font-heading hidden lg:block text-3xl sm:text-4xl lg:text-[44px] font-bold uppercase tracking-wide leading-none text-rose-200"
                >
                  {teamCard.title}
                </span>

                <p className="font-sans text-xl text-white/90 leading-relaxed max-w-xl mt-1 sm:mt-2">
                  {teamCard.description}
                </p>
              </div>

              <div className="inline-flex items-center justify-between gap-3 font-sans text-base font-medium text-white group-hover:text-rose-200 transition-colors duration-300 mt-2">
                <span>{teamCard.actionText}</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Right Image Box (Desktop Only - Subtle Scale Zoom on Hover) */}
            <div className="hidden lg:block lg:col-span-4 relative min-h-[300px] overflow-hidden">
              <ResponsiveImage
                src={teamCard.image}
                alt={teamCard.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
          </Link>
        </div>

        {/* 3-Card Grid (Culture, Careers, Envision) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {gridCards.map((card, index) => (
            <div key={card.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <Link
                href={card.href}
                className="group relative flex flex-col justify-between overflow-hidden bg-black text-white p-6 sm:p-7 pt-8 min-h-[250px] md:aspect-[370/290] cursor-pointer"
              >
                {/* Top Colored Accent Bar on Mobile */}
                <div
                  className={`w-full h-2.5 ${ACCENTS[index + 1] ?? ACCENTS[0]} md:hidden absolute top-0 left-0 right-0 z-20`}
                />

                {/* Desktop Background Cover Image (Subtle Scale Zoom on Hover) */}
                <ResponsiveImage
                  src={card.image}
                  alt={card.title}
                  className="hidden md:block absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Desktop Dark Gradient Overlay */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-85" />

                {/* Mobile Top Header (Small Title + Description) */}
                <div className="relative z-10 flex flex-col gap-3 md:hidden">
                  <span className="font-sans text-base text-white/80 font-medium">
                    {card.title}
                  </span>
                  <p className="font-sans text-xl text-white/90 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Mobile Action Link & Arrow */}
                <div className="relative z-10 flex md:hidden items-center justify-between text-white pt-4 mt-2 border-t border-white/20">
                  <span className="font-sans text-base font-medium">
                    {card.actionText}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Desktop Bottom Header (Uppercase Title + Arrow side-by-side) */}
                <div className="hidden md:flex relative z-10 h-full items-end justify-between gap-4 text-white w-full">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase leading-tight tracking-wide text-white transition-colors duration-300 group-hover:text-rose-100">
                    {card.title}
                  </h3>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 mb-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
