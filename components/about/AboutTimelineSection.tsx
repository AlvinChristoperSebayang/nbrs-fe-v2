"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";

export type TimelineItem = {
  year: string;
  description: string;
};

export type AboutTimelineSectionProps = {
  label?: string;
  items?: TimelineItem[];
};

const BORDER_COLORS = [
  "#E5A89B", // Soft peach pink
  "#E5E7EB", // Soft white
  "#E5A89B", // Soft peach pink
  "#C8E2D4", // Pale mint
  "#717784", // Muted grey
  "#E5A89B",
  "#C8E2D4",
];

const DEFAULT_TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "1968",
    description: "Founded by Noel Bell and Ridley Smith. First project Anglicare St Johns Village Glebe",
  },
  {
    year: "1976",
    description: "St Andrew's House - First high rise school.",
  },
  {
    year: "1983",
    description: "NBRS receives Sulman Award for Parklea Correctional Centre.",
  },
  {
    year: "1998",
    description: "Olympic Upgrade - City of Sydney George Street & Circular Quay.",
  },
  {
    year: "2002",
    description: "Convention Centre Hillsong Church Vista built.",
  },
  {
    year: "2022",
    description: "Studios open in Melbourne, expanding NBRS nationally.",
  },
  {
    year: "2025",
    description: "Celebrating decades of designing for people, place and purpose.",
  },
];

export function AboutTimelineSection({
  label = "FOUNDED IN 1968",
  items = DEFAULT_TIMELINE_ITEMS,
}: AboutTimelineSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, items]);

  const scrollByOffset = (offset: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleItemClick = (index: number) => {
    const itemEl = itemRefs.current[index];
    if (itemEl) {
      itemEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <section className="bg-[#131722] py-14 lg:py-20 text-white overflow-hidden">
      <Container>
        <div className="flex items-center justify-between gap-4 mb-8 lg:mb-12">
          <h2
            data-aos="fade-up"
            className="font-heading text-lg sm:text-xl lg:text-2xl uppercase tracking-wider font-bold text-white"
          >
            {label}
          </h2>

          {/* Timeline Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByOffset(-280)}
              disabled={!canScrollLeft}
              aria-label="Scroll timeline left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.41406 8.70703L16.4141 8.70703"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9.41406 16.707L1.41406 8.70703L9.41406 0.707031"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByOffset(280)}
              disabled={!canScrollRight}
              aria-label="Scroll timeline right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5859 8.70703L0.585938 8.70703"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7.58594 0.707031L15.5859 8.70703L7.58594 16.707"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative mt-4">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex overflow-x-auto gap-2 lg:gap-4 pb-4 scroll-smooth"
          >
            {items.map((item, index) => (
              <div
                key={`${item.year}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleItemClick(index)}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                style={{
                  borderLeftColor: BORDER_COLORS[index % BORDER_COLORS.length],
                }}
                className="group w-[230px] sm:w-[260px] lg:w-[280px] flex-shrink-0 border-l-[1.5px] pl-5 pr-3 cursor-pointer select-none transition-opacity hover:opacity-100"
              >
                <div className="flex items-center gap-7">
                  <span className="font-heading text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-white leading-none">
                    {item.year}
                  </span>
                  <svg
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 text-white transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 1L7.5 7.5L1 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-white/85 leading-relaxed font-sans max-w-[220px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Left Fade Gradient Mask */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#131722] via-[#131722]/80 to-transparent transition-opacity duration-300" />
          )}

          {/* Right Fade Gradient Mask */}
          {canScrollRight && (
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#131722] via-[#131722]/80 to-transparent transition-opacity duration-300" />
          )}
        </div>
      </Container>
    </section>
  );
}
