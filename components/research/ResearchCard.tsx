"use client";

import { useState } from "react";
import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";
type ResearchCardItem = {
  id: string;
  slug: string;
  title: string;
  image: ImageSource;
  hoverColor: string;
};

function toTitleCase(str: string): string {
  if (!str) return str;
  if (str === str.toUpperCase() && /[A-Z]/.test(str)) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return str;
}

function renderFormattedTitle(title: string) {
  const formatted = toTitleCase(title);
  const colonIndex = formatted.indexOf(":");
  if (colonIndex !== -1) {
    const prefix = formatted.slice(0, colonIndex + 1);
    const suffix = formatted.slice(colonIndex + 1).trim();
    return (
      <div className="font-sans text-xl leading-snug md:max-w-56">
        <span className="block font-bold">{prefix}</span>
        {suffix && <span className="block font-normal">{suffix}</span>}
      </div>
    );
  }

  return (
    <div className="font-sans text-xl font-bold leading-snug">
      {formatted}
    </div>
  );
}

export function ResearchCard({ item }: { item: ResearchCardItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/research/${item.slug}`}
      className="group flex flex-col w-full overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="relative aspect-[370/300] w-full overflow-hidden bg-zinc-100 min-h-[150px] max-h-[150px] md:min-h-[300px] md:max-h-[300px]">
        <ResponsiveImage
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Info Box */}
      <div
        className="flex min-h-[200px]  flex-col justify-between px-5 py-[22px] transition-colors duration-300 h-full"
        style={{
          backgroundColor: isHovered ? item.hoverColor : "#000000",
          color: isHovered ? "#000000" : "#ffffff",
        }}
      >
        {renderFormattedTitle(item.title)}

        <div className="mt-6 flex items-end justify-between">
          <span className="text-base font-normal">Read more</span>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
