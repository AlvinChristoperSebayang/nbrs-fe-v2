"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export type PracticeCardItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  bgImage: string;
  href: string;
};

const PRACTICES_ITEMS: PracticeCardItem[] = [
  {
    id: "arch",
    title: "ARCHITECTURE",
    description: "Design for purpose, responding to people.",
    image: "/images/hero/hero1.png",
    bgImage: "/images/hero/hero1.png",
    href: "/practices/architecture",
  },
  {
    id: "interior",
    title: "INTERIOR DESIGN",
    description: "Creating intuitive, sensory-rich interior environments.",
    image: "/images/hero/hero3.png",
    bgImage: "/images/hero/hero3.png",
    href: "/practices/interior-design",
  },
  {
    id: "landscape",
    title: "LANDSCAPE ARCHITECTURE",
    description: "Connecting built environments with natural landscapes.",
    image: "/images/hero/hero4.png",
    bgImage: "/images/hero/hero4.png",
    href: "/practices/landscape-architecture",
  },
];

export function PracticesHoverSection({
  items = PRACTICES_ITEMS,
}: {
  items?: PracticeCardItem[];
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      onMouseLeave={() => setHoveredId(null)}
      className="relative w-full overflow-hidden bg-white pt-12 lg:pt-[147px] pb-16 lg:pb-[153px] text-black transition-colors duration-500 z-0"
    >
      {/* Full-Bleed Background Images for Hover Effect */}
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
            hoveredId === item.id ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.bgImage}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Light Frosted Glass Overlay for Smooth Contrast */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[3px]" />
        </div>
      ))}

      {/* Content Container */}
      <Container className="relative z-10">
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            const isOtherHovered = hoveredId !== null && !isHovered;

            return (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-[5px] aspect-[320/300] md:aspect-[370/300] min-h-[300px] lg:min-h-[340px] bg-zinc-900 shadow-xl transition-all duration-500 ${
                  isHovered
                    ? "scale-[1.02] shadow-2xl z-30"
                    : isOtherHovered
                    ? "scale-100 z-10"
                    : "scale-100 z-10"
                }`}
              >
                {/* Card Cover Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    isOtherHovered
                      ? "grayscale contrast-125 opacity-80"
                      : "grayscale-0 opacity-100"
                  }`}
                />

                {/* Dark Gradient Overlay at Bottom for Readable Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 pointer-events-none" />

                {/* Card Bottom Content */}
                <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-end gap-2 text-white pointer-events-none">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-1.5 transition-transform duration-300">
                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight text-white tracking-wide">
                        {item.title}
                      </h3>

                      {/* Description (Shown on Hover / Smooth Expand) */}
                      <p
                        className={`font-sans text-sm sm:text-base text-white/90 leading-snug transition-all duration-500 max-w-[260px] ${
                          isHovered
                            ? "max-h-20 opacity-100 mt-1"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="shrink-0 mb-1">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
