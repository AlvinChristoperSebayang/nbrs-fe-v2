"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type PracticeCardItem = {
  id: string;
  title: string;
  description: string;
  image: ImageSource;
  bgImage: ImageSource;
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
          <ResponsiveImage
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
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch w-full"
        >
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            const isOtherHovered = hoveredId !== null && !isHovered;

            return (
              <Link
                key={item.id}
                href={item.href}
                title={item.title}
                aria-label={item.title}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-[5px] w-full lg:flex-1 lg:min-w-0 aspect-[16/10] sm:aspect-[21/9] lg:aspect-[370/320] xl:aspect-[370/300] min-h-[260px] lg:min-h-[340px] bg-zinc-900 shadow-md transition-all duration-500 ${
                  isHovered
                    ? "lg:scale-[1.02] shadow-xl z-30"
                    : isOtherHovered
                    ? "scale-100 z-10"
                    : "scale-100 z-10"
                }`}
              >
                {/* Card Cover Image */}
                <ResponsiveImage
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    isOtherHovered
                      ? "grayscale brightness-105 contrast-100 opacity-100"
                      : "grayscale-0 brightness-100 opacity-100"
                  }`}
                />

                {/* Card Bottom Content */}
                <div className="relative z-20 p-5 sm:p-6 lg:p-6 xl:p-8 flex flex-col justify-end text-white pointer-events-none">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-1.5 transition-transform duration-300">
                      <h3 className="font-heading text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold uppercase leading-[1.1] text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        {item.title}
                      </h3>

                      {/* Description (Shown on Hover / Smooth Expand) */}
                      <p
                        className={`font-sans text-sm sm:text-base text-white/90 leading-snug transition-all duration-500 max-w-[280px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                          isHovered
                            ? "max-h-20 opacity-100 mt-1"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="shrink-0 pb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:translate-x-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
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
